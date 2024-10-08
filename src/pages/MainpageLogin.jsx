import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { charge, userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import instance from "../axiosConfig";
import Cookies from "js-cookie"; // js-cookie import 추가
import BottomNavButton from "../components/BottomNavButton";
function MainpageLogin() {
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

  // // 사용자 정보를 가져오는 비동기 함수
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.get("/auth/user/api/info"); // instance로 요청

  //       if (response.status === 200) {
  //         setUserInfo((prev) => ({
  //           ...prev,
  //           username: response.data.data.username,
  //           major: response.data.data.major,
  //           age: response.data.data.age,
  //           song: response.data.data.song,
  //           mbti: response.data.data.mbti,
  //           point: response.data.data.point,
  //           pickMe: response.data.data.pickMe,
  //           hobby: response.data.data.hobbies,
  //           comment: response.data.data.comment,
  //           contact_frequency: response.data.data.contactFrequency,
  //           contact_id: response.data.data.contactId,
  //           canRequestCharge: response.data.data.canRequestCharge,
  //           numParticipants: response.data.data.participations,
  //           eventokay: response.data.data.event1,
  //         }));
  //       }
  //     } catch (error) {
  //       Cookies.remove("Authorization");
  //       Cookies.remove("RefreshToken");
  //       console.error("Error fetching data:", error);
  //       window.location.reload();
  //     }
  //   };
  //   fetchData();
  // }, []);
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
      <div className="Mainpage-welcome">
        {userResult > 0 ? (
          <>
            반가워요
            <br />
            매칭하고 같이 승리를 즐겨요!
          </>
        ) : (
          <>
            연락은 해보셨나요?
            <br />
            즐거운 관람 되세요!
          </>
        )}
      </div>
      {userResult < 0 ? (
        <div className="unmatch-container">
          <img
            className="logo"
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.svg`}
            alt="로고"
            onClick={() => navigate(-1)}
          />
          <div className="unmatch-text">
            아직 매칭된 상대가 없어요
            <br />
            나와 딱 맞는 축구친구를 만들어봐요!
          </div>
        </div>
      ) : (
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
      )}
      <button className="matching-button" onClick={handleClickmatch}>
        AI 매칭하기 ▶
        <TotalUsersCounter
          font_size="15px"
          pointcolor="#c3c5cb"
          color="#c3c5cb"
          numParticipants={userInfo.numParticipants}
        />
      </button>

      <div className="button-group">
        <BottomNavButton
          onClick={handleVisitcheckresult}
          imgSrc={`../../assets/checkresult.svg`}
          imgText="내 정보 수정"
          buttonText="내 정보 수정"
        />
        <BottomNavButton
          onClick={handleVisitGuide}
          imgSrc={`../../assets/guidebook.svg`}
          imgText="경기장 정보"
          buttonText="경기장 정보"
        />
      </div>

      {/* <div className="logout-container"> */}
      <div href="#" onClick={handleLogout} className="logout-link">
        로그아웃
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default MainpageLogin;
