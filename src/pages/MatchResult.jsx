import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { charge, userState } from "../Atoms";
import "../css/pages/MatchResult.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import instance from "../axiosConfig";
import Cookies from "js-cookie"; // js-cookie import 추가
import BottomNavButton from "../components/BottomNavButton";
function MatchResult() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [isPointClicked, setIsPointClicked] = useState(false); // 포인트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [isHeartClicked, setIsHeartClicked] = useState(false); // 하트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [showTutorial, setShowTutorial] = useState(false); // Show tutorial on login
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [userTeam, setUserTeam] = useState("Home");
  const [userResult, setUserResult] = useState(1);
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [chargeclick, setchargeclick] = useRecoilState(charge);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleAccountToggleClick = () => {
    setIsAccountClicked((prevIsClicked) => !prevIsClicked);
  };
  // 포인트 충전 토글 클릭 핸들러
  const handlePointToggleClick = () => {
    setIsPointClicked((prevIsClicked) => !prevIsClicked);
  };

  // 하트 충전 토글 클릭 핸들러
  const handleHeartToggleClick = () => {
    setIsHeartClicked((prevIsClicked) => !prevIsClicked);
  };
  const handleLogout = () => {
    // 쿠키에서 Authorization, RefreshToken 제거
    Cookies.remove("Authorization");
    Cookies.remove("RefreshToken");

    window.location.reload();
  };
  useEffect(() => {
    // eventokay가 false일 때만 모달을 띄웁니다.
    if (userInfo.eventokay === false) {
      setShowEventModal(true);
    }
  }, [userInfo.eventokay]);
  const handleCancel = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/no-pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
        }));
        setShowEventModal(false); // Close modal after successful participation
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };

  const handleParticipate = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
        }));
        setShowEventModal(false); // Close modal after successful participation
        window.location.reload();
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };

  const handleNotService = () => {
    alert("해당 서비스는 9/12일 10:00에 오픈됩니다 축제까지 기다려주세요!");
  };
  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleCharge = () => {
    navigate("/charge");
  };
  const handlehartCharge = () => {
    navigate("/heart");
  };
  const handleClickmatch = () => {
    navigate("/matching");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
  };

  // 충전 요청
  const handleChargeRequest = async () => {
    const response = await instance.get("/user/charge/request");
    setchargeclick({
      chargeclick: true, // 클릭된 것으로 상태 변경, 클릭시 관리자 페이지에 뜹니다.
    });
    if (response.data.code === "CHR-001") {
      alert("이미 요청되었습니다."); // 이미 요청된 경우 알림
    }
  };
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
        <div className="">
          <div className="match-text">저는</div>
          <div className="match-text">
            <span className="match-text-span">23</span>살,
            <span className="match-text-span">여성</span>입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저를</div>
          <div className="match-text">
            <span className="match-text-span">보라</span>라고 불러주세요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">저는</div>
          <div className="match-text">
            <span className="match-text-span">열정형</span>이에요.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">제가 응원하는 선수는</div>
          <div className="match-text">
            <span className="match-text-span">1. 김형근</span>입니다.
          </div>
        </div>
        <div className="match-element">
          <div className="match-text">아래 계정으로 DM 주세요!</div>
          <div className="match-text-span ID-span">@ID</div>
        </div>
      </div>
      <div className="MatchResult-Button-Container">
        <img
          className="MatchResult-backspace"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <button className="MatchResult-copy" onClick={handleClickmatch}>
          연락처 복사하기
        </button>
      </div>
    </div>
  );
}

export default MatchResult;
