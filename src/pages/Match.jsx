import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { matchResult, progress, userState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import "../css/pages/Match.css";
import Loading from "./Loading";

function Match() {
  const navigate = useNavigate();
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [matchUserInfo, setMatchUserInfo] = useRecoilState(userState);
  const [pickGender, setPickGender] = useState("RANDOM");
  const [isLoading, setIsLoading] = useState(false);
  const [pickReslt, setPickResult] = useRecoilState(matchResult);
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newProgress = Math.max(0, Math.min(touch.clientX - 50, 250)); // 50은 시작 위치, 250은 최대 이동 거리
    setSwipeProgress(newProgress);
  };
  const handleMatch = async () => {
    try {
      setIsLoading(true);
      const response = await instance.post("/auth/user/match/request", {
        genderOption: pickGender,
      });
      // console.log("response: ", response);

      if (response.data.code === "GEN-000") {
        setPickResult(response.data.data);
        setIsLoading(false);

        navigate("/matchresult");
      } else {
        alert("매칭 실패");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeProgress > 200) {
      handleMatch();
    } else {
      setSwipeProgress(0);
    }
  };

  return isLoading === true ? (
    <Loading />
  ) : (
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
          <div
            className={`${
              matchUserInfo.cheerPropensity === "열정형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            열정형
          </div>
          <div
            className={`${
              matchUserInfo.cheerPropensity === "집중형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            집중형
          </div>
        </div>
        <div className="Match-button-container">
          <div
            className={`${
              matchUserInfo.cheerPropensity === "축린이형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            축린이형
          </div>
          <div
            className={`${
              matchUserInfo.cheerPropensity === "축잘알형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            축잘알형
          </div>
        </div>
        <div className="Match-button-container">
          <div
            className={`${
              matchUserInfo.cheerPropensity === "먹방형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            먹방형
          </div>
          <div
            className={`${
              matchUserInfo.cheerPropensity === "인싸형"
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            인싸형
          </div>
        </div>
        <div className="small-Divider" />
        <div className="Match-category">성별</div>
        <div className="Match-exp">상대의 성별을 골라주세요</div>
        <div className="Match-button-container">
          <div
            className={`${
              pickGender === "MALE"
                ? "Match-button-select"
                : "Match-button-unselect"
            }`}
            onClick={() => setPickGender("MALE")}
          >
            남자
          </div>
          <div
            className={`${
              pickGender === "FEMALE"
                ? "Match-button-select"
                : "Match-button-unselect"
            }`}
            onClick={() => setPickGender("FEMALE")}
          >
            여자
          </div>
          <div
            className={`${
              pickGender === "RANDOM"
                ? "Match-button-select"
                : "Match-button-unselect"
            }`}
            onClick={() => setPickGender("RANDOM")}
            // onClick={() => handleMatch()} //컴터에서 테스트용
          >
            상관없음
          </div>
        </div>
        <div className="small-Divider" />
        {/* <div className="Match-category">나이대</div>
        <div className="Match-exp">자신의 연령대에 고정되어 선택될 거에요</div>
        <div className="Match-button-container">
          <div
            className={`${
              matchUserInfo.age < 20
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            10대
          </div>
          <div
            className={`${
              matchUserInfo.age >= 20 && matchUserInfo.age < 30
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            20대
          </div>
          <div
            className={`${
              matchUserInfo.age >= 30
                ? "Match-button-select"
                : "Match-button-block"
            }`}
          >
            30대
          </div>
        </div> */}
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
            className="arrowpixel"
            src={`${
              import.meta.env.VITE_PUBLIC_URL
            }../../assets/arrowpixel.png`}
            alt="화살표"
          />
        </div>
        <div className="swipe-text">밀어서 친구찾기</div>
      </div>
    </div>
  );
}

export default Match;
