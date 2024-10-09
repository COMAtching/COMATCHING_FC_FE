import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../css/pages/MatchResult.css";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { matchResult } from "../Atoms";
function MatchResult() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [pickMatchReslt, setPickMatchResult] = useRecoilState(matchResult);
  return (
    <div className="container">
      <img
        className="Mainpage-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.svg`}
        alt="로고"
        onClick={() => navigate(-1)}
      />
      <img
        className="AI-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/AI.png`}
        alt="AI로고"
        onClick={() => navigate(-1)}
      />

      <div className="match-container">
        <div className="match-element">
          <div className="match-text">저는</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.age}</span>살,
            <span className="match-text-span">{pickMatchReslt.gender}</span>
            입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저를</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.userName}</span>
            라고 불러주세요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저는</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.category}</span>
            이에요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">제가 응원하는 선수는</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.player}</span>
            입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">아래 계정으로 DM 주세요!</div>
          <div className="match-text-span ID-span">{pickMatchReslt.ID}</div>
        </div>
      </div>
      <div className="MatchResult-Button-Container">
        <img
          className="MatchResult-backspace"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
          alt="뒤로가기"
          onClick={() => navigate("/")}
        />
        <button
          className="MatchResult-copy"
          onClick={() => navigator.clipboard.writeText(pickMatchReslt.ID)}
        >
          연락처 복사하기
        </button>
      </div>
    </div>
  );
}

export default MatchResult;
