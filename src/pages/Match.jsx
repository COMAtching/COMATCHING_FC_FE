import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms";
import { useNavigate } from "react-router-dom";

import "../css/pages/Match.css";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");

function Match() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressState, setProgressState] = useRecoilState(progress);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [imagePosition, setImagePosition] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setProgressState((prevProgress) => ({
      progressState: prevProgress.progressState + 100 / 14,
    }));
  }, []);

  const handleTouchStart = (e) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newProgress = Math.max(0, Math.min(touch.clientX - 50, 250)); // 50은 시작 위치, 250은 최대 이동 거리
    setSwipeProgress(newProgress);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeProgress > 200) {
      alert("매칭을 시작합니다!");
    } else {
      setSwipeProgress(0);
    }
  };

  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="Match-topic">친구 매칭하기</div>
      <div className="Divider" />
      <div className="Match-container">
        <div className="Match-category">응원유형</div>
        <div className="Match-exp">자신과 동일한 유형이 선택될 거에요.</div>
        <div className="Match-button-container">
          <div className="Match-button-select">열정형</div>
          <div className="Match-button-block">집중형</div>
        </div>
        <div className="Match-button-container">
          <div className="Match-button-block">축린이형</div>
          <div className="Match-button-block">축잘알형</div>
        </div>
        <div className="Match-button-container">
          <div className="Match-button-block">먹방형</div>
          <div className="Match-button-block">인싸형</div>
        </div>
        <div className="small-Divider" />
        <div className="Match-category">성별</div>
        <div className="Match-exp">상대의 성별을 골라주세요</div>
        <div className="Match-button-container">
          <div className="Match-button-unselelct">남자</div>
          <div className="Match-button-select">여자</div>
          <div className="Match-button-unselelct">상관없음</div>
        </div>
        <div className="small-Divider" />
        <div className="Match-category">나이대</div>
        <div className="Match-exp">자신의 연령대에 고정되어 선택될 거에요</div>
        <div className="Match-button-container">
          <div className="Match-button-block">10대</div>
          <div className="Match-button-select">20대</div>
          <div className="Match-button-block">30대</div>
        </div>
        <div className="small-Divider" />
      </div>
      <div className="swipe-area">
        <div
          className="swipe-handle"
          style={{ transform: `translateX(${swipeProgress}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            className="backspace"
            src={`${
              import.meta.env.VITE_PUBLIC_URL
            }../../assets/arrowpixel.png`}
            alt="뒤로가기"
            onClick={() => navigate(-1)}
          />
        </div>
        밀어서 친구찾기
      </div>
    </div>
  );
}

export default Match;
