import { useEffect, useState } from "react";
import MainpageUnLogin from "./MainpageUnLogin.jsx";
import MainpageLogin from "./MainpageLogin.jsx";
import instance from "../axiosConfig.jsx";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/check-role");
      console.log("final:", response);
      console.log("response.data:", response.data);
      console.log("Role:", response.data.data);
      if (response.data.status === 200) {
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
