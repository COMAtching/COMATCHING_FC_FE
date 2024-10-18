import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import instance from "../axiosConfig";
import BottomNavButton from "../components/BottomNavButton";
import { userState } from "../Atoms";
import RadarChart from "../components/RadarChart";
import Modal from "react-modal";

function MainpageLogin() {
  const navigate = useNavigate();
  const [totalUser, setTotalUser] = useState(0);
  const [friendState, setFriendState] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (announcements.length > 0) {
      setIsModalOpen(true);
    }
  }, [announcements]);

  const closeModal = () => {
    if (currentAnnouncementIndex < announcements.length - 1) {
      setCurrentAnnouncementIndex(currentAnnouncementIndex + 1);
    } else {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/participations");
        // console.log("response: ", response);
        if (response.status === 200) {
          setTotalUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMyInfo = async () => {
      try {
        console.log("정보 요청!");
        const response = await instance.get("/auth/user/info");
        // console.log("response: ", response);
        if (response.data.status === 200) {
          setUserInfo(response.data.data.myInfo);
          setFriendState(response.data.data.enemyInfo);
        }
        // console.log("FriendState:, ", friendState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchannouncement = async () => {
      try {
        const response = await instance.get("/auth/user/api/inquiry/notice");
        // console.log("response: ", response);
        if (response.data.code === "GEN-000") {
          setAnnouncements(response.data.data);
          // console.log("announcements",announcements);
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchannouncement();

    fetchData();
    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await instance.get("/auth/user/logout");
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleVisitGuide = () => {
    navigate("/guide");
  };

  const handleClickmatch = () => {
    // navigate("/match");
    alert("매칭은 13:00부터 가능합니다.");
  };
  const handleEditInfo = () => {
    navigate("/editinfo");
  };

  const getTextContent = (cheerPropensity) => {
    switch (cheerPropensity) {
      case "축린이형":
        return {
          text: "나는야 귀여운 축린이!",
          topic: "순수한 축린이형",
          
        };
      case "인싸형":
        return {
          text: "관중계의 떠오르는 별!",
          topic: "멋쟁이 인싸형",
          
        };
      case "열정형":
        return {
          text: "앗 뜨거! 타오르는 열정!",
          topic: "불타는 열정형",
          
        };
      case "먹방형":
        return {
          text: "먹방은 내게 맡겨!",
          topic: "행복한 먹방형",
          
        };
      case "집중형":
        return {
          text: "혜안을 가진 사람!",
          topic: "분석하는 집중형",
          
        };
      case "축잘알형":
        return {
          text: "축구를 잘아는 당신!",
          topic: "다아는 축잘알형",
          
        };
    }
  };
  const { text, topic } = getTextContent(userInfo.cheerPropensity);
  const radarData = [
    userInfo.passionType,
    userInfo.focusType,
    userInfo.soccerNoviceType,
    userInfo.soccerExpertType,
    userInfo.mukbangType,
    userInfo.socialType,
  ];
  return (
    <div className="container">
      <img
        className="Mainpage-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.svg`}
        alt="로고"
      />
      {userInfo.age < 20 ? (
        <>
          <div className="Mainpage-welcome">
            반가워요
            <br />
            승리를 향해! 부천FC1995
          </div>
          <div className="UserResult-container">
            <div className="UserResult-info-container">
              <div className="UserResult-text">{text}</div>
              <div className="UserResult-topic">{topic}</div>
              <div className="chart-container">
                <RadarChart data={radarData} />
              </div>
              {/* <img
                className="Mascot"
                src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/${image}`}
                alt="마스코트"
              /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
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
                src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/mascot_1.svg`}
                alt="로고"
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
                  <span className="match-text-span">
                    {friendState.username}
                  </span>
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
        </>
      )}
      <div className="button-group">
        <BottomNavButton
          onClick={handleEditInfo}
          imgSrc={`../../assets/mascot_2.svg`}
          imgText="내정보 수정"
          buttonText="내정보 수정"
        />
        <BottomNavButton
          onClick={handleVisitGuide}
          imgSrc={`../../assets/soccer.svg`}
          imgText="경기장 정보"
          buttonText="경기장 정보"
        />
      </div>
      <div className="help-text">이용에 도움이 필요하신가요?</div>
      <div className="privacy-button" onClick={() => navigate("/faq")}>
        서비스 이용법 안내
      </div>
      <div onClick={handleLogout} className="logout-link">
        로그아웃
      </div>
      
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Announcement"
        className="mainpage-modal-background"
      >
        {announcements.length > 0 && (
          <div className="mainpage-modal-container">
            <div className="mainpage-modal-title">
              {announcements[currentAnnouncementIndex].title}
            </div>
            <div className="mainpage-modal-text">
              {announcements[currentAnnouncementIndex].body}
            </div>
            <button onClick={closeModal} className="mainpage-modal-button">
              {currentAnnouncementIndex < announcements.length - 1
                ? "다음"
                : "네, 확인했어요"}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MainpageLogin;
