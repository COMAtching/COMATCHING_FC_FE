import React from "react";
// 단순한 가이드북 페이지인데 이것도 당시 시간 부족으로 그냥 큰 이미지 하나 넣었습니다. 수정필요해보입니다.
import { useNavigate } from "react-router-dom";
function Guide() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="register-info-container">
        <div className="select-topic">경기장 정보</div>
        <div className="Divider" />
      </div>
      <div className="content">
        <p className="guide-text">부천 FC 1995 <br/>
        HOME STADIUM</p>
        <img
          className="guide-img"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/guide.svg`}
          alt="가이드 이미지1"
          style={{
            width: "90%",
            height: "auto",
            paddingTop: "30px",
          }}
        />
      </div>
    </div>
  );
}

export default Guide;
