import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms";
import { useNavigate } from "react-router-dom";

import "../css/pages/Register.css";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");

function Register() {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    age: "",
    gender: "",
    socialId: "",
    cheeringPlayer: "",
    username: "",
  });
  const [isSocialIdValid, setIsSocialIdValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleNextClick = async () => {
    // console.log("userInfo: ", userInfo);
    const postData = {
      age: parseInt(userInfo.age),
      gender: userInfo.gender,
      socialId: userInfo.socialId,
      cheeringPlayer: userInfo.cheeringPlayer,
      username: userInfo.username,
    };
    // console.log("postData: ", postData);
    try {
      const response = await instance.post("/auth/pending/feature", postData);
      // console.log("response: ", response);
      if (response.data.code === "GEN-000") {
        navigate("/form");
        setProgressState((prevProgress) => ({
          progressState: prevProgress.progressState + 100 / 13,
        }));
      } else {
        alert("미로그인");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const validateAge = (age) => {
    return age >= 14 && age <= 99;
  };

  const validateInstagramId = (id) => {
    return /^@[A-Za-z0-9._]+$/.test(id);
  };

  // const handleInputChange = (field, value) => {
  //   setUserInfo((prev) => ({ ...prev, [field]: value }));
  // };

  const handleInputChange = (field, value) => {
    if (field === "socialId") {
      // socialId 필드에 입력된 값이 @로 시작하지 않으면 자동으로 추가
      if (!value.startsWith("@")) {
        value = "@" + value;
      }
    }
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    if (field === "age" && validateAge(value)&& step === 1) {
      setStep(2); // 나이가 유효하면 바로 다음 단계로 이동
      setProgressState((prevProgress) => ({
        progressState: prevProgress.progressState + 100 / 13,
      }));
    }
    
  };
  const handleCheckInstagramId = () => {
    if (isSocialIdValid) {
      return; // 이미 성공적으로 통과된 경우 더 이상 실행되지 않음
    }
    if (validateInstagramId(userInfo.socialId)) {
      setIsSocialIdValid(true); // 유효성 통과
      setStep(4); // 다음 단계로 이동
      setProgressState((prevProgress) => ({
        progressState: prevProgress.progressState + 100 / 13,
      }));
      setIsButtonDisabled(true); // 버튼 비활성화
    } else {
      alert("올바른 인스타그램 아이디 형식(@user_id)을 입력해 주세요.");
      setIsSocialIdValid(false); // 유효성 실패
    }
  };

  const handleInputEnd = (field, value) => {
    if (field === "age" && !validateAge(value)) {
      alert("14세부터 99세까지만 참여 가능합니다.");
      return;
    }
    if (field === "socialId" && !validateInstagramId(value)) {
      alert("아이디를 정확히 입력해주세요");
      return;
    }
    if (value && field === getFieldForStep(step)) {
      setStep((prev) => prev + 1);
      setProgressState((prevProgress) => ({
        progressState: prevProgress.progressState + 100 / 13,
      }));
    }
  };

  const getFieldForStep = (stepNumber) => {
    const fields = ["age", "gender", "socialId", "cheeringPlayer", "username"];
    return fields[stepNumber - 1];
  };
  const isActive = () => {
    return (
      Object.values(userInfo).every((value) => value !== "") &&
      validateAge(userInfo.age) &&
      isSocialIdValid // 유효성 검사 통과 여부
    );
  };
  return (
    <div className="container">
      <div className="backspace-container">
        <img
          className="backspace"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <span className="backspace-text">처음으로</span>
      </div>
      
      <div className="register-info-container">
        <div className="select-text">Step.2</div>
        <div className="select-topic">당신을 소개해주세요.</div>
        <ProgressBar progress={progressState.progressState} />
        <div className="Divider" />
      </div>
      <div className="question-container">
        {step >= 5 && (
          <div className="register-text">
            <div>저를</div>
            <div className="register-answer-text">
              <input
                type="text"
                value={userInfo.nickName}
                onChange={(e) => handleInputChange("username", e.target.value)}
                onBlur={(e) => handleInputEnd("username", e.target.value)}
                placeholder="닉네임"
                className="input-field nickNamwe-input"
                maxLength={8} // 닉네임 최대 6글자 제한
              />
              라고 불러주세요!
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="register-text">
            <div>제가 응원하는 선수는</div>
            <div className="register-answer-text">
              <select
                value={userInfo.Favorite}
                onChange={(e) => {
                  handleInputChange("cheeringPlayer", e.target.value);
                  handleInputEnd("cheeringPlayer", e.target.value);
                }}
                name="선수"
                className="select-field"
              >
                <option value="" hidden>
                  선택하세요
                </option>
                <option value="김형근">1. 김형근</option>
                <option value="이상혁">2. 이상혁</option>
                <option value="서명관">3. 서명관</option>
                <option value="정호진">5. 정호진</option>
                <option value="닐손주니어">6. 닐손주니어</option>
                <option value="최병찬">7. 최병찬</option>
                <option value="이정빈">8. 이정빈</option>
                <option value="박호민">9. 박호민</option>
                <option value="조수철">10. 조수철</option>
                <option value="11">11. 박창준</option>
                <option value="박형진">13. 박형진</option>
                <option value="최재영">14. 최재영</option>
                <option value="송진규">15. 송진규</option>
                <option value="박현빈">16. 박현빈</option>
                <option value="김규민">17. 김규민</option>
                <option value="이의형">18. 이의형</option>
                <option value="황재환">19. 황재환</option>
                <option value="홍성욱">20. 홍성욱</option>
                <option value="윤재운">21. 윤재운</option>
                <option value="한지호">22. 한지호</option>
                <option value="카즈">23. 카즈</option>
                <option value="김동현">24. 김동현</option>
                <option value="남현욱">25. 남현욱</option>
                <option value="설현빈">28. 설현빈</option>
                <option value="정희웅">29. 정희웅</option>
                <option value="전인규">30. 전인규</option>
                <option value="김현엽">31. 김현엽</option>
                <option value="정재용">32. 정재용</option>
                <option value="전성수">33. 전성수</option>
                <option value="김선호">37. 김선호</option>
                <option value="루페타">42. 루페타</option>
                <option value="유승현">66. 유승현</option>
                <option value="김규민">77. 김규민</option>
                <option value="바사니">97. 바사니</option>
              </select>
              입니다.
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="register-text">
            <div>이 계정으로 DM 주세요!</div>
            <div className="register-answer-text">
              
              <input
                type="text"
                value={userInfo.socialId}
                onChange={(e) => handleInputChange("socialId", e.target.value)}
                
                placeholder="@user_id"
                className="input-field ID-input"
              />
              <button
                className="check-button" // 확인 버튼 스타일 지정
                onClick={handleCheckInstagramId}
                disabled={isButtonDisabled} // 버튼 비활성화 조건
              >확인</button>
            </div>
          </div>
        )}
        {step >= 2 && (
          <div className="register-text">
            <div>저는</div>
            <div className="register-answer-text">
              <select
                value={userInfo.gender}
                onChange={(e) => {
                  handleInputChange("gender", e.target.value);
                  handleInputEnd("gender", e.target.value);
                }}
                className="select-field"
              >
                <option value="" hidden>
                  선택하세요
                </option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
              입니다.
            </div>
          </div>
        )}
        {step >= 1 && (
          <div className="register-text">
            <div>저는</div>
            <div className="register-answer-text age-answer">
              <input
                type="text"
                value={userInfo.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                onBlur={(e) => handleInputEnd("age", e.target.value)}
                placeholder="23"
                className="input-field age-input"
              />
              살 입니다.
            </div>
          </div>
        )}
      </div>
      <button
        className={`register-Next-button ${isActive() ? "active" : ""}`}
        onClick={() => handleNextClick()}
        
      >
        다음으로
      </button>
    </div>
  );
}

export default Register;
