import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainpageUnLogin from "./MainpageUnLogin.jsx";
import MainpageLogin from "./MainpageLogin.jsx";

// mainpage 로그인 비로그인 페이지를 구분하기 위한 페이지입니다
// 쿠키에 토큰의 유무로 확인합니다.
function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  useEffect(() => {
    // 쿼리 파라미터에서 accessToken과 userRole 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken'); 
    const userRole = urlParams.get('userRole');
    const setCookieWithExpiry = (name, value, hours) => {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000); // 1 hour in milliseconds
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value}; path=/; ${expires};`;
    };
    // accessToken이 있다면 쿠키에 저장
    if (accessToken) {
      setCookieWithExpiry('Authorization', accessToken, 1);
      setIsLoggedIn(true);
      if (refreshToken) {
        setCookieWithExpiry('RefreshToken', refreshToken, 1);
      }
      
      // userRole이 'SOCIAL'이면 /hobby로 리다이렉션
      if (userRole === 'SOCIAL') {
        navigate('/hobby');
        
      }
      if(userRole === 'USER'){
        navigate('/');
      }
    } else {
      // 쿠키에서 토큰 확인
      const checkTokenInCookies = () => {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(cookie => cookie.startsWith('Authorization='));
        if (tokenCookie) {
          setIsLoggedIn(true);  // 토큰이 있으면 로그인 상태로 설정
        } else {
          setIsLoggedIn(false); // 토큰이 없으면 비로그인 상태로 설정
        }
      };
      checkTokenInCookies();
    }
  }, [navigate]);

  // 로그인 상태에 따라 다른 컴포넌트 렌더링
  return isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />;
}

export default Mainpage;
