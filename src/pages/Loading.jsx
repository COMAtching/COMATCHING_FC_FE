import React from "react";
import "../css/pages/Loading.css";

const Loading = () => {
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
      <div className="loading-content">
        <div className="loading-text">
          코매칭 AI가 입력하신 결과를 바탕으로 <br />
          비슷한 매칭 상대를 찾고 있어요..
        </div>
      </div>
    </div>
  );
};

export default Loading;
