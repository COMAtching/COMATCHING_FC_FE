import { useEffect, useState } from "react";
import "../css/pages/MainpageUnLogin.css";
import Footer from "../components/Footer.jsx";
import TotalUsersCounter from "../components/TotalUsersCounter.jsx";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig.jsx";

function MainpageUnLogin() {
  const navigate = useNavigate();
  const [numParticipants, setNumParticipants] = useState(null);
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "transparent",
  });

  const handleLogin = () => {
    setButtonStyle({
      backgroundColor: "#cc0000",
      color: "#ffffff",
      transition: "background-color 0.5s",
    });
    setTimeout(() => {
      navigate("/codeselect");
    }, 500);
  };

  // 참가자 수를 가져오는 비동기 함수
  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/participations");
        console.log("response: ", response);
        if (response.status === 200) {
          setNumParticipants(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setNumParticipants]);

  return (
    <div className="container">
      <img
        className="Unlogin-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.png`}
        alt="로고"
        onClick={() => navigate(-1)}
      />
      <div className="UnloginMain-text">나와 잘 맞는 응원 친구는?</div>
      <img
        className="Mascot"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/mascot.svg`}
        alt="마스코트"
      />
      <div className="bubble-counter">
        <TotalUsersCounter
          font_size="16px"
          color="#cc0000"
          pointcolor="1e2024"
          numParticipants={numParticipants}
        />
      </div>
      <button
        className="start-button"
        onClick={handleLogin}
        style={buttonStyle}
      >
        시작하기
      </button>

      <div className="help-text">이용에 도움이 필요하신가요?</div>
      <div className="privacy-button" onClick={() => navigate("/guide")}>
        서비스 이용법 안내
      </div>
      <Footer />
    </div>
  );
}

export default MainpageUnLogin;
