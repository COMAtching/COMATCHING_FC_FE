import { useEffect, useRef, useState } from "react";
import "../css/pages/CodeTyping.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms.jsx";
import ProgressBar from "../components/Progressbar.jsx";
import jsQR from "jsqr";
import instance from "../axiosConfig.jsx";

function CodeTyping() {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const fileInputRef = useRef(null);
  const [inputCode, setInputCode] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setProgressState(() => ({
      progressState: 100 / 14,
    }));
  }, []);

  useEffect(() => {
    const regex = /^T\d{10}$/;
    setIsButtonActive(regex.test(inputCode));
  }, [inputCode]);

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

  const validateCode = (code) => {
    const codePattern = /^T\d{10}$/;
    return codePattern.test(code);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            if (validateCode(code.data)) {
              handleLogin(code.data);
            } else {
              alert(
                "유효하지 않은 티켓 코드입니다. 'T'로 시작하고 10자리 숫자여야 합니다."
              );
            }
          } else {
            alert("QR 코드를 인식할 수 없습니다.");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageLoadClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="select-text">Step.1</div>
      <div className="select-topic">티켓 인증이 필요해요</div>
      <ProgressBar progress={progressState.progressState} />
      <div className="Divider" />
      <div className="select-exptext">
        티켓 전면에 있는 예매번호를 입력해주세요
        <br />
        (예: T0123456789)
      </div>
      <input
        type="text"
        value={inputCode}
        onChange={handleInputChange}
        placeholder="T0123456789"
        className="code-input"
      />
      <div className="help-text">* 온라인 예매자에 한함.</div>

      <button
        className={`Next-button ${isButtonActive ? "active" : ""}`}
        onClick={handleNextClick}
        disabled={!isButtonActive}
      >
        다음으로
      </button>
      <button className="select-button" onClick={handleImageLoadClick}>
        이미지 불러오기
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
        accept="image/*"
      />
      <button className="select-button" onClick={() => navigate("/qr-reader")}>
        티켓 촬영하기
      </button>
    </div>
  );
}

export default CodeTyping;
