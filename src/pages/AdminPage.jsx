import { useEffect, useRef, useState } from "react";
import "../css/pages/AdminLoginPage.css";
import { useNavigate } from "react-router-dom";

import instance from "../axiosConfig.jsx";

function AdminPage() {
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "code") {
      setInputCode(value);
    } else if (name === "password") {
      setInputPassword(value);
    }
    setIsButtonActive(inputCode && inputPassword);
  };

  const handleLogin = async () => {
    const postData = {
      username: inputCode,
      password: inputPassword,
    };
    try {
      const response = await instance.post("/admin/login", postData);
      console.log("response: ", response);

      if (response.data === "로그인에 성공했습니다.") {
        navigate("/admin-dashboard");
      } else {
        alert("로그인 실패");
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
      <div className="select-topic">관리자 페이지</div>
      <div className="Divider" />

      <input
        type="ID"
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

export default AdminPage;
