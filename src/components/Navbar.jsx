import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/components/Navbar.css'; // 별도의 CSS 파일을 사용한다고 가정

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    
    <div className="navbar">
        <Link to="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
            <img src="./assets/home.svg" alt="Home" className="icon" />
            <span className="label">Home</span>
        </Link>
        <Link to="/chat" className={`nav-item ${pathname === '/chat' ? 'active' : ''}`}>
            <img src="./assets/chat.svg" alt="Chat" className="icon" />
            <span className="label">Chat</span>
        </Link>
        <Link to="/meetings" className={`nav-item ${pathname === '/meetings' ? 'active' : ''}`}>
            <img src="./assets/meetings.svg" alt="Meetings" className="icon" />
            <span className="label">Meetings</span>
        </Link>
        <Link to="/mypage" className={`nav-item ${pathname === '/mypage' ? 'active' : ''}`}>
            <img src="./assets/mypage.svg" alt="My Page" className="icon" />
            <span className="label">My Page</span>
        </Link>
    </div>

  );
};

export default NavBar;
