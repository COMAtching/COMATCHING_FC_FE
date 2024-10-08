import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import MainpageUnLogin from "./MainpageUnLogin.jsx";
import MainpageLogin from "./MainpageLogin.jsx";
import axios from "axios";
// import instance from "../axiosConfig.jsx";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://cuk.comatching.site/check-role",
        { withCredentials: true }
      ); // instance로 요청
      console.log("final:", response);
      if (response.status === "200") {
        if (response.data.data === "ROLE_USER") {
          setIsLoggedIn(true);
        }
      }
      console.log("isLoggedIn:", isLoggedIn);
    };

    fetchData();
  }, []);

  return isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />;
}

export default Mainpage;
