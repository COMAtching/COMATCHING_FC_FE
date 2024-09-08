import React, { useState } from "react";
import "../css/pages/Adminpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Adminpageunlogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ accountId: "", password: "" });
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://cuk.comatching.site/admin/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      // 로그인 응답 데이터에서 status 코드를 확인
      if (response.data.status === 200) {
        console.log("로그인 성공");
        const token = response.headers["authorization"];

        if (token && token.startsWith("Bearer ")) {
          const tokenWithoutBearer = token.slice(7);
          Cookies.set("Authorization", tokenWithoutBearer,{ path: "/", expires: 1/6 });
        }
        navigate("/adminpage/charge-requests"); // 로그인 성공 시 페이지 이동
      } else {
        console.log("로그인 실패:", response.data.message); // 로그인 실패 시 메시지 로깅
        alert("로그인 실패: " + response.data.message); // 사용자에게 실패 메시지를 보여줍니다.
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert(
        "로그인 중 오류가 발생했습니다. 자세한 사항은 콘솔을 확인해 주세요."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/assets/admin_page_logo.svg" alt="Logo" className="logo" />
        <h2 className="partners-page">Partners Page</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="accountId"
            placeholder="ID입력"
            className="login-input"
            value={formData.accountId}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="비밀번호 입력"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              id="show-password-checkbox"
              checked={passwordVisible}
              onChange={togglePasswordVisibility}
            />
            <span className="custom-checkbox"></span>
            <span className="checkbox-label">비밀번호 보기</span>
          </label>
          <button type="submit" className="login-button">
            다음으로
          </button>
        </form>
        <div className="links-container">
          <div className="link-row">
            <a href="#signup" className="login-link">
              오퍼레이터 가입하기
            </a>
            <a href="#find-id-password" className="login-link">
              | ID/비밀번호 찾기
            </a>
          </div>
          <a href="#contact" className="login-link login-link-contact">
            문의하기
          </a>
        </div>
      </div>
    </div>
  );
}

export default Adminpageunlogin;
