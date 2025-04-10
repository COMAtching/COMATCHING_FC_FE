import { useState } from "react";
import "../css/pages/AdminLoginPage.css";
import { useNavigate } from "react-router-dom";

import instance from "../axiosConfig.jsx";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [inputID, setInputID] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ID") {
      setInputID(value);
    } else if (name === "password") {
      setInputPassword(value);
    }
    setIsButtonActive(inputID && inputPassword);
  };

  const handleLogin = async () => {
    const postData = {
      accountId: inputID,
      password: inputPassword,
    };
    // console.log("postData: ", postData);
    try {
      const response = await instance.post("/admin/login", postData);
      // console.log("response: ", response);

      if (response.data.message === "로그인에 성공했습니다.") {
        navigate("/adminpage"); // 관리자 대시보드로 이동
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <img
        className="AdminLogin-Logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo_main.svg`}
        alt="로고"
      />
      <div className="AdminLogin-Topic">Partners Page</div>
      <div className="admin-input-container">
        <input
          type="text"
          name="ID"
          value={inputID}
          onChange={handleInputChange}
          placeholder="관리자 ID"
          className="admin-input"
        />
        <input
          type="password"
          name="password"
          value={inputPassword}
          onChange={handleInputChange}
          placeholder="비밀번호"
          className="admin-input"
        />
      </div>
      <button
        className={`Admin-button ${isButtonActive ? "active" : ""}`}
        onClick={handleLogin}
        disabled={!isButtonActive}
      >
        로그인
      </button>
    </div>
  );
}

export default AdminLoginPage;
