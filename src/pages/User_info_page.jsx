import React, { useState,useEffect } from "react";
import axios from "../axiosConfig";
// import { validateForm } from "../myfunction/formValidation";
import instance from "../axiosConfig"; // axiosConfig 인스턴스 불러오기
import { useRecoilState } from "recoil";
import { userState, selectedMBTIState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import HeaderBack from "../components/HeaderBack";
import MajorSelector from "../components/MajorSelector";
import Cookies from 'js-cookie';
import "../css/pages/User_info.css";
import AgeInputInput from "../components/AgeInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import MBTISection from "../components/MBTISection";
// import hobbyIcons from "../data/hobbyIcons";
// import Agreement from "../components/Agreement";
import AdmissionYearInput from "../components/AdmissionYearInput";
import Background from "../components/Background";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
import TermsAgreementModal from "../components/TermsAgreementModal"; 
import { endFileScope } from "@vanilla-extract/css/fileScope";
import HeaderMain from "../components/HeaderMain";
Modal.setAppElement("#root");

function Userinfo() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState); // 유저 상태 관리
    const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
    const [checkMethod, setCheckMethod] = useState({
        school: "",
        department: "",
        major: "",
        contactVerified: true,
    });
    const [registerCheck, setRegisterCheck] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
    });
    const handleMBTISelection = (value) => {
        const category =
            value === "E" || value === "I"
                ? "EI"
                : value === "S" || value === "N"
                ? "SN"
                : value === "T" || value === "F"
                ? "TF"
                : "PJ";
    
        setSelectedMBTI((prevMBTI) => ({
            ...prevMBTI,
            [category]: value,
        }));
    
        setUser((prevUser) => {
            const updatedMBTI = {
                EI: category === "EI" ? value : selectedMBTI.EI,
                SN: category === "SN" ? value : selectedMBTI.SN,
                TF: category === "TF" ? value : selectedMBTI.TF,
                PJ: category === "PJ" ? value : selectedMBTI.PJ,
            };
    
            // All MBTI parts concatenated
            const mbtiString = `${updatedMBTI.EI || ""}${updatedMBTI.SN || ""}${updatedMBTI.TF || ""}${updatedMBTI.PJ || ""}`;
    
            return {
                ...prevUser,
                mbti: mbtiString,
                isLoggedIn: true,
            };
        });
    };

    const [isGenderSelectable, setIsGenderSelectable] = useState(false); 
    const [isContactVerified, setIsContactVerified] = useState(false);
    const [isSongInputVisible, setIsSongInputVisible] = useState(false);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [isFiveChars, setIsFiveChars] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isGenderSelected, setIsGenderSelected] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            
            case "song":
                if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,20}$/.test(value)) {
                    // 특수기호 타이핑 확인
                    errorMessage = "노래에는 특수 기호를 사용할 수 없고 20자리 이내로 작성해주세요";
                }else {
                    setIsCommentVisible(true);
                }
                break;
            case "comment":
                if (value.length <= 5) { // 'comment' 필드가 최대 5글자까지만 입력되도록 제한
                    setUser((prevUser) => ({ ...prevUser, comment: value }));
                    setIsCommentVisible(true); // 'comment' 필드가 표시되도록 설정
                    setIsFiveChars(true); 
                }
                
                break;
            case "age":
                setUser((prevUser) => ({ ...prevUser, age: parseInt(value, 10) || "" }));
                
                break;
            case "admissionYear":
                setUser((prevUser) => ({ 
                    ...prevUser, 
                    admissionYear: value !== "" ? parseInt(value, 10) : "" 
                }));
                break;
            case "gender":
                if (value === "MALE" || value === "FEMALE") {
                    setUser((prevUser) => ({ ...prevUser, gender: value }));
                    setIsGenderSelected(true);
                } else {
                    errorMessage = "성별은 MALE 또는 FEMALE로 선택해야 합니다.";
                }
                break;
            default:
                break;
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };
    // const handleContactVerified = () => {
    //     setIsContactVerified(true);
    // };
    const fieldLabels = {
        major: "전공",
        age: "나이",
        mbti: "MBTI",
        gender: "성별",
        contactFrequency: "연락 빈도",
        hobby: "취미",
        song: "좋아하는 노래",
        comment: "소개할 다섯글자",
        admissionYear: "입학년도"
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const requiredFields = [
            "major",
            "age",
            "mbti",
            "gender",
            "contactFrequency",
            "hobby",
            "song",
            "comment",
            "admissionYear",
        ];
        for (let field of requiredFields) {
            if (!user[field] || (Array.isArray(user[field]) && user[field].length === 0)) {
                alert(`${fieldLabels[field]} 빈칸을 채워주세요`);
                return;
            }
        }

        const postData = {
            university: user.university,
            contactId: user.contact_id,
            major: user.major,
            age: user.age,
            mbti: user.mbti,
            gender: user.gender,
            contactFrequency: user.contactFrequency,
            hobby: user.hobby,
            song: user.song,
            comment: user.comment,
            admissionYear: user.admissionYear,
        };
        try {
            const response = await instance.post(
                "/auth/social/api/user/info",
                postData
            );
            
            if (response.data.status === 200) {
                alert("가입이 완료되었습니다.");
                navigate("/");
            } else {
                alert("가입 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };



    const isMajorSelectorComplete = checkMethod.school && checkMethod.department && checkMethod.major;
    const isAgeInputComplete = user.age;

    const progress = isFiveChars ? 100 : isCommentVisible ? 90 : isSongInputVisible ? 80 : isMajorSelectorComplete ? (isAgeInputComplete ? 60 : 45) : 30;

    useEffect(() => {
        checkAllFieldsSelected(); // Initial check on load
    }, [checkMethod, user.age, user.admissionYear, user.mbti, user.contactFrequency]);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const handleAgeClick = (value) => {
        setUser((prev) => ({
            ...prev,
            contactFrequency: value,
        }));
        checkAllFieldsSelected();
    };
    const checkAllFieldsSelected = () => {
        const isAllSelected =
            checkMethod.university &&
            checkMethod.department &&
            checkMethod.major &&
            user.age &&
            user.admissionYear && user.admissionYear.length === 2 &&
            user.mbti && user.mbti.length >= 4 &&
            user.contactFrequency;

        if (isAllSelected) {
            setIsGenderSelectable(true);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div className="container">
            <Background />
            <HeaderMain />
            <div className="info-card">
                <div className="select-hobby-topic">학교를 선택해 주세요.</div>
                <div className="select-hobby-text">
                    커플이 되기까지 단 한걸음!
                </div>
                <ProgressBar progress={progress} />
            </div>
            <form className= "form_container" onSubmit={handleSubmit}>
                <div className="form-inner-content">
                    <MajorSelector
                        user={user}
                        setUser={setUser}
                        checkMethod={checkMethod}
                        setCheckMethod={setCheckMethod}
                    />
                    <AgeInputInput value={user.age} onChange={handleChange} />
                    <AdmissionYearInput value={user.admissionYear} onChange={handleChange} />
                    <h3>MBTI</h3>
                    <MBTISection
                        user={user.mbti}
                        onClick={handleMBTISelection}
                        name="form-MBTIButton"
                    />
                    <div>
                    <h3>연락빈도</h3>
                    <div className="match-select-button">
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "자주" ? "selected" : ""
                            }`}
                            value={"자주"}
                            onClick={() => handleAgeClick("자주")}
                        >
                            자주
                        </button>
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "보통" ? "selected" : ""
                            }`}
                            value={"보통"}
                            onClick={() => handleAgeClick("보통")}
                        >
                            보통
                        </button>
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "가끔" ? "selected" : ""
                            }`}
                            value={"가끔"}
                            onClick={() => handleAgeClick("가끔")}
                        >
                            가끔
                        </button>
                    </div>
                    </div>
                    
                    
                    {isGenderSelectable && (
                        <GenderSelect
                            user={user}
                            setUser={setUser}
                            onChange={handleChange}
                            setIsGenderSelected={setIsGenderSelected}
                        />
                    )}
                    {isGenderSelected && (
                        <ContactMethod
                            checkMethod={checkMethod}
                            setCheckMethod={setCheckMethod}
                            setIsContactVerified={setIsContactVerified}
                            user={user}
                            setUser={setUser}
                            handleChange={handleChange}
                        />
                    )}
                    {isContactVerified && (
                        <div>
                            <label>
                                <h3 className="music_title">좋아하는 노래</h3>
                                <div className="music">
                                    <MyInput
                                        name="song"
                                        value={user.song}
                                        onChange={handleChange}
                                        placeholder="Young Man"
                                        className="song-input"
                                    />
                                </div>
                            </label>
                        </div>
                    )}
                    {isCommentVisible && (
                        <div>
                            <label>
                                <h3 className="commet_title"> 나를 소개할 다섯글자</h3>
                                <div className="music">
                                    <MyInput
                                        name="comment"
                                        value={user.comment}
                                        onChange={handleChange}
                                        placeholder="5글자 이상 작성해주세요"
                                        className="comment-input"
                                        maxLength={5}
                                    />
                                </div>
                            </label>
                        </div>
                    )}
                    
                    {isFiveChars && (
                        <button
                            className="start-button"
                            type="button"
                            onClick={openModal} // Open modal on button click
                        >
                            코매칭 시작하기
                        </button>
                    )}
                    
                </div>
            </form>
            <TermsAgreementModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                handleSubmit={handleSubmit}
                registerCheck={registerCheck}
                setRegisterCheck={setRegisterCheck}
            />
        </div>
    );
}

export default Userinfo;
