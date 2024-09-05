import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/AdminNavbar.css";

function AdminNavbar() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chargeRequestCount, setChargeRequestCount] = useState(3);
  const navigate = useNavigate();

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    setMenuOpen(false);
    navigate(path); // 네비게이트 함수로 경로 이동
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // This useEffect hook will simulate fetching data from the backend

  return (
    <div className="admin-navbar">
      {/* 로고 */}
      <img src="/assets/admin_logo.svg" alt="Logo" className="logo" />

      {/* 햄버거 메뉴 아이콘 */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* 메뉴 */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <div
          className={`menu-item ${activeMenu === "main" ? "active" : ""}`}
          onClick={() => handleMenuClick("main", "/adminpage/charge-requests")}
        >
          Main
        </div>
        <div
          className={`menu-item ${activeMenu === "request" ? "active" : ""}`}
          onClick={() =>
            handleMenuClick("request", "/adminpage/charge-requests")
          }
        >
          충전요청
          {chargeRequestCount > 0 && <span className="request-count">0 </span>}
        </div>
        <div
          className={`menu-item ${
            activeMenu === "user-management" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("user-management", "/adminpage/charge-requests")
          }
        >
          가입자관리
        </div>
        <div
          className={`menu-item ${
            activeMenu === "team-management" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("team-management", "/adminpage/charge-requests")
          }
        >
          팀관리
        </div>
      </div>
      <div className={`admin-info ${menuOpen ? "open" : ""}`}>
        <p className="admin-info_admin">관리자 오준석님</p>
        <p className="admin-info_class">가톨릭대학교</p>
      </div>
    </div>
  );
}

export default AdminNavbar;
