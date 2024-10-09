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
    age: 0,
    gender: "",
    socialId: "",
    cheeringPlayer: "",
    username: "",
  });

  const handleNextClick = async () => {
    console.log("inputCode: ", userInfo);
    try {
      const response = await instance.post("/auth/pending/feature", userInfo);
      console.log("response: ", response);
      if (response.data.code === "GEN-000") {
        navigate("/form");
        setProgressState((prevProgress) => ({
          progressState: prevProgress.progressState + 100 / 14,
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
    return age.length === 2 && /^\d{2}$/.test(age) && parseInt(age) >= 10;
  };

  const validateInstagramId = (id) => {
    return /^@[A-Za-z0-9._]+$/.test(id);
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputEnd = (field, value) => {
    if (field === "age" && !validateAge(value)) {
      alert("나이를 정확히 입력해주세요");
      return;
    }
    if (field === "socialId" && !validateInstagramId(value)) {
      alert("아이디를 정확히 입력해주세요");
      return;
    }
    if (value && field === getFieldForStep(step)) {
      setStep((prev) => prev + 1);
      setProgressState((prevProgress) => ({
        progressState: prevProgress.progressState + 100 / 14,
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
      validateInstagramId(userInfo.socialId)
    );
  };
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
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
                value={userInfo.InstaId}
                onChange={(e) => handleInputChange("socialId", e.target.value)}
                onBlur={(e) => handleInputEnd("socialId", e.target.value)}
                placeholder="@user_id"
                className="input-field ID-input"
              />
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
        disabled={!isActive()}
      >
        다음으로
      </button>
    </div>
  );
}

export default Register;
