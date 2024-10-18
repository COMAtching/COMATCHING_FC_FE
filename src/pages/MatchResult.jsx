import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../css/pages/MatchResult.css";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { matchResult } from "../Atoms";
function MatchResult() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [pickMatchReslt, setPickMatchResult] = useRecoilState(matchResult);
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(pickMatchReslt.socialId);
    alert(`아이디 ${pickMatchReslt.socialId}가 복사되었습니다!`); // 복사 성공 알림
  };
  return (
    <div className="container">
      <img
        className="Mainpage-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.svg`}
        alt="로고"
      />

      <img
        className="AI-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/AI.png`}
        alt="AI로고"
      />
      {pickMatchReslt.lackOfResource === true && (
        <div className="match-result-nodata">
          해당하는 데이터가 없어서
          <br /> 가장 유사한 사람을 추천해드렸습니다.
        </div>
      )}
      <div className="match-container">
        <div className="match-element">
          <div className="match-text">응원친구는</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.age}</span>살,
            <span className="match-text-span">{pickMatchReslt.gender}</span>
            입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저를</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.username}</span>
            (이)라고 불러주세요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저는</div>
          <div className="match-text">
            <span className="match-text-span">{pickMatchReslt.propensity}</span>
            이에요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">제가 응원하는 선수는</div>
          <div className="match-text">
            <span className="match-text-span">
              {pickMatchReslt.cheeringPlayer}
            </span>
            입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">아래 계정으로 DM 주세요!</div>
          <div className="match-text-span ID-span">
            {pickMatchReslt.socialId}
          </div>
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
          onClick={handleCopyClick}
        >
          인스타 ID 복사하기
        </button>
      </div>
    </div>
  );
}

export default MatchResult;
