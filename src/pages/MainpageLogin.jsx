import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import axiosInstance from "../axiosConfig";
import HeaderMain from "../components/HeaderMain";
import UserInfoRrev from "../components/UserInfoRrev";
import { charge, userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import MyInfoButton from "../components/MyInfoButton";
import ChargeButtonInfo from "../components/ChargeButtonInfo";
import NavBar from "../components/Navbar";
import TutorialSlides from "../components/TutorialSlides";
import HartButtonInfo from "../components/HartButtonInfo";
function MainpageLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [isPointClicked, setIsPointClicked] = useState(false); // 포인트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [isHeartClicked, setIsHeartClicked] = useState(false); // 하트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [showTutorial, setShowTutorial] = useState(false); // Show tutorial on login
  
  const [userInfo, setUserInfo] = useState({
    username: "천승환",
    major: "정보통신전자공학부",
    admissionYear: 19,
    song: "Make it to christmas",
    mbti: "INTJ",
    point: 0,
    pickMe: 0,
    canRequestCharge: true,
    hobby: ["독서", "게임"],
    comment: "모두들 안녕",
    numParticipants: 100,
  });
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [chargeclick, setchargeclick] = useRecoilState(charge);
  const handleToggleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };
  // 포인트 충전 토글 클릭 핸들러
  const handlePointToggleClick = () => {
    setIsPointClicked((prevIsClicked) => !prevIsClicked);
  };

  // 하트 충전 토글 클릭 핸들러
  const handleHeartToggleClick = () => {
    setIsHeartClicked((prevIsClicked) => !prevIsClicked);
  };
  // 사용자 정보를 가져오는 비동기 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 쿠키에서 Authorization 토큰을 가져오기
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
          const [name, value] = cookie.split('=');
          acc[name] = value;
          return acc;
        }, {});
        const accessToken = cookies.Authorization;

        if (!accessToken) {
          throw new Error('No access token found in cookies');
        }

        // Authorization 헤더에 토큰을 추가하여 요청
        const response = await axios.get("http://backend.comatching.site:8080/auth/user/api/info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        

        if (response.status === 200) {
          setUserInfo((prev) => ({
            ...prev,
            username: response.data.data.username,
            major: response.data.data.major,
            age: response.data.data.age,
            song: response.data.data.song,
            mbti: response.data.data.mbti,
            point: response.data.data.point,
            pickMe: response.data.data.pickMe,
            contact_id : 'jseok_492',
            canRequestCharge: response.data.data.canRequestCharge,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 

  const handleNotService = () => {
    alert("서비스가 종료되었습니다.");
  };
  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleCharge = () => {
    navigate("/charge-request");
  };
  const handlehartCharge = () => {
    navigate("/hart-charge-request");
  };
  const handleClickmatch = () => {
    navigate("/QR-generator");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    // 쿠키 삭제인데 지금보면 필요없어 보이긴합니다.
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    window.location.reload();
  };

  // 충전 요청
  const handleChargeRequest = async () => {
    const response = await axiosInstance.get("/user/charge/request");
    setchargeclick({
      chargeclick: true, // 클릭된 것으로 상태 변경, 클릭시 관리자 페이지에 뜹니다.
    });
    if (response.data.code === "CHR-001") {
      alert("이미 요청되었습니다."); // 이미 요청된 경우 알림
    }
  };
  return (
    <div className="container">
      <HeaderMain />
      <div className="welcome">
        {userInfo.username}님,<br />
        환영합니다.
      </div>
      <div className="Mainpage__Login">
        <UserInfoRrev
          user={userInfo}
          // ifMainpage={true}
          numParticipants={userInfo.numParticipants}
        />
        <div
          //onClick={handleClickmatch}
          onClick={handleNotService}
        >
          <button className="matching-button">
            AI 매칭하기 ▶
            <TotalUsersCounter
              font_size="15px"
              numParticipants={userInfo.numParticipants}
            />
          </button>
        </div>
        <div className="button-group">
          <MyInfoButton
            imgSrc={`../../assets/point.svg`}
            infoText={`${userInfo.point}P`}
            buttonText="잔여포인트"
            handleCharge={handleCharge}
          />
          <MyInfoButton
            imgSrc={`../../assets/heart.svg`}
            infoText={`${userInfo.pickMe}회`}
            buttonText="내가 뽑힐 횟수"
            handleCharge={handleCharge}
          />
        </div>

        {isPointClicked ? (
          <ChargeButtonInfo
            //handleNotService={handleNotService}
            handleChargeRequest={handleCharge}
            handleToggleClick={handlePointToggleClick}
            chargeclick={chargeclick}
          />
        ) : (
          <div className="charge-request-unclicked">
            💁 부스에 포인트 충전 요청하기
            {userInfo.canRequestCharge ? (
              <button
                className="charge-request-unclicked-img"
                type="button"
                onClick={handlePointToggleClick}
              >
                <img
                  src={`${
                    import.meta.env.VITE_PUBLIC_URL
                  }../../assets/arrowbottom.svg`}
                  alt="충전요청 열기"
                />
              </button>
            ) : (
              <div className="charge-request-disabled">
                요청완료
              </div>
            )}
          </div>
        )}
        {isHeartClicked ? (
          <HartButtonInfo
            //handleNotService={handleNotService}
            point={userInfo.point}
            handleChargeRequest={handlehartCharge}
            handleToggleClick={handleHeartToggleClick}
            chargeclick={chargeclick}
          />
        ) : (
          <div className="charge-request-unclicked">
            ❤️ 포인트 하트로 교환하기
            {userInfo.canRequestCharge ? (
              <button
                className="charge-request-unclicked-img"
                type="button"
                onClick={handleHeartToggleClick}
              >
                <img
                  src={`${
                    import.meta.env.VITE_PUBLIC_URL
                  }../../assets/arrowbottom.svg`}
                  alt="충전요청 열기"
                />
              </button>
            ) : (
              <div className="charge-request-disabled">
                요청완료
              </div>
            )}
          </div>
        )}
        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`../../assets/checkresult.svg`}
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`../../assets/guidebook.svg`}
            imgText="가이드북"
            buttonText="가이드북"
          />
        </div>
        <div  style={{ height: '50px' }}></div>
        
      </div>
      
      <NavBar/>

      {showTutorial && (
        <TutorialSlides onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}

export default MainpageLogin;
