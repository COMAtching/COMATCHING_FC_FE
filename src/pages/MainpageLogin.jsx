import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import instance from "../axiosConfig";
import Cookies from "js-cookie"; // js-cookie import 추가
import BottomNavButton from "../components/BottomNavButton";
import axios from "axios";
import { userState } from "../Atoms";
function MainpageLogin() {
  const navigate = useNavigate();
  const [totalUser, setTotalUser] = useState(0);
  const [friendState, setFriendState] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/participations");
        console.log("response: ", response);
        if (response.status === 200) {
          setTotalUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMyInfo = async () => {
      try {
        const response = await instance.get("/auth/user/info");
        console.log("response: ", response);
        if (response.data.status === 200) {
          setUserInfo(response.data.data.myInfo);
          setFriendState(response.data.data.enemyInfo);
        }
        console.log("FriendState:, ", friendState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await instance.get("/auth/user/logout");
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleQuit = async () => {
    try {
      const response = await instance.get("/auth/user/quit");
      console.log("response: ", response);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVisitGuide = () => {
    navigate("/guide");
  };

  const handleClickmatch = () => {
    navigate("/matching");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
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
        {friendState === null ? (
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
      {friendState === null ? (
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
          <div className="match-element">
            <div className="match-text">저는</div>
            <div className="match-text">
              <span className="match-text-span">{friendState.age}</span>살,
              <span className="match-text-span">{friendState.gender}</span>
              입니다.
            </div>
          </div>
          <div className="match-element">
            <div className="match-text">저를</div>
            <div className="match-text">
              <span className="match-text-span">{friendState.username}</span>
              라고 불러주세요.
            </div>
          </div>
          <div className="match-element">
            <div className="match-text">저는</div>
            <div className="match-text">
              <span className="match-text-span">
                {friendState.cheerPropensity}
              </span>
              이에요.
            </div>
          </div>
          <div className="match-element">
            <div className="match-text">제가 응원하는 선수는</div>
            <div className="match-text">
              <span className="match-text-span">
                {friendState.cheeringPlayer}
              </span>
              입니다.
            </div>
          </div>
          <div className="match-element">
            <div className="match-text">아래 계정으로 DM 주세요!</div>
            <div className="match-text-span ID-span">
              {friendState.socialId}
            </div>
          </div>
        </div>
      )}
      {friendState === null ? (
        <button className="matching-button" onClick={handleClickmatch}>
          AI 매칭하기 ▶
          <TotalUsersCounter
            font_size="15px"
            pointcolor="#c3c5cb"
            color="#c3c5cb"
            numParticipants={totalUser}
          />
        </button>
      ) : (
        ""
      )}

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

      <div onClick={handleLogout} className="logout-link">
        로그아웃
      </div>
      <div onClick={handleQuit} className="logout-link">
        탈퇴하기
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
