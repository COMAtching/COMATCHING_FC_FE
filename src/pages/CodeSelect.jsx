import { useEffect, useRef } from "react";
import "../css/pages/CodeSelect.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms.jsx";
import ProgressBar from "../components/Progressbar.jsx";
import jsQR from "jsqr";
import instance from "../axiosConfig.jsx";

function CodeSelect() {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProgressState(() => ({
      progressState: 100 / 14,
    }));
  }, []);

  const validateCode = (code) => {
    const codePattern = /^T\d{10}$/;
    return codePattern.test(code);
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
          progressState: prevProgress.progressState + 100 / 13,
        }));
      } else if (response.data.code === "SEC-007") {
        alert("유효하지 않은 코드입니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    }
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
              alert("유효하지 않은 티켓 코드입니다.");
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
        가지고 있는 티켓을 불러오거나,
        <br />
        티켓 바코드를 촬영해서 인증을 해주세요.
      </div>
      <img
        className="select-logo"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/ticket.svg`}
        alt="이미지"
      />
      <div className="help-text">티켓 데이터 수집으로 인해<br />경기 시작 4시간 전 예매자만 참여 가능합니다.</div>
      <button
        className="select-button imageLoad-button"
        onClick={handleImageLoadClick}
      >
        이미지 불러오기
      </button>
      <div>
        <button
          className="select-button"
          onClick={() => navigate("/qr-reader")}
        >
          티켓 촬영하기
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
        <button
          className="select-button"
          onClick={() => navigate("/codetyping")}
        >
          직접 티켓번호 입력
        </button>
      </div>
    </div>
  );
}

export default CodeSelect;
