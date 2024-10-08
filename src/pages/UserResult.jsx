import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms";
import { useNavigate } from "react-router-dom";

import "../css/pages/UserResult.css";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");

function UserResult() {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const [step, setStep] = useState(1);

  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="register-info-container">
        <div className="select-topic">당신은 인싸형!</div>
        <ProgressBar progress={progressState.progressState} />
        <div className="Divider" />
      </div>
      <div className="UserResult-container">
        <div className="UserResult-info-container">
          <div className="UserResult-text">나는야 귀여운 축린이!</div>
          <div className="UserResult-topic">순수한 축린이형</div>
          <img
            className="Mascot"
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/image.png`}
            alt="마스코트"
          />
        </div>
        <div className="UserResult-similar-text">나와 같은 유형의 축구선수</div>
        <div className="UserResult-similar-container">
          <img
            className="similar-player-img"
            src={`${
              import.meta.env.VITE_PUBLIC_URL
            }../../assets/player/김형근.svg`}
            alt="마스코트"
          />
          <div className="similar-player-name">1. 김형근</div>
          <div className="similar-player-positon">GK</div>
        </div>
      </div>
      <button className={"UserResult-Next"} onClick={() => navigate("/Form")}>
        친구 만들러 가기!
      </button>
    </div>
  );
}

export default UserResult;
