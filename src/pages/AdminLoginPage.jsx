import { useEffect, useRef, useState } from "react";
import "../css/pages/AdminLoginPage.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms.jsx";

import instance from "../axiosConfig.jsx";

function AdminLoginPage() {
  const fileInputRef = useRef(null);
  const [inputCode, setInputCode] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleLogin = async (code) => {
    const postData = {
      type: "online",
      ticket: code,
    };
    try {
      const response = await instance.post("/user/login", postData);
      console.log("response: ", response);

      if (response.data.code === "GEN-000") {
        if (response.data.data === "ROLE_USER") {
          navigate("/");
        } else {
          navigate("/register");
        }
        setProgressState((prevProgress) => ({
          progressState: prevProgress.progressState + 100 / 14,
        }));
      } else {
        alert("미로그인");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };
  const handleNextClick = () => {
    handleLogin(inputCode);
  };

  return (
    <div className="container">
      <div className="select-topic">관리자 로그인</div>
      <div className="Divider" />
      <div className="select-exptext">
        티켓 전면에 있는 예매번호를 입력해주세요
        <br />
        (예: T0123456789)
      </div>
      <input
        type="ID"
        value={inputCode}
        onChange={handleInputChange}
        placeholder="T0123456789"
        className="code-input"
      />
      <input
        type="password"
        value={inputCode}
        onChange={handleInputChange}
        placeholder="T0123456789"
        className="code-input"
      />

      <button className="Next-button  active" onClick={handleNextClick}>
        로그인
      </button>
    </div>
  );
}

export default AdminLoginPage;
