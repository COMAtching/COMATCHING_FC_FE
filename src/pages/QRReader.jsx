import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { progress } from "../Atoms";
import ProgressBar from "../components/Progressbar";
import "../css/pages/QRReader.css";
import instance from "../axiosConfig";

const QRReader = () => {
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  let requestLock = false; // 추가적인 잠금 변수
  useEffect(() => {
    setProgressState(() => ({
      progressState: 100 / 13,
    }));
  }, []);

  const validateCode = (code) => {
    const codePattern = /^T\d{10}$/;
    return codePattern.test(code);
  };
  const handleLogin = async (code) => {
    if (isRequestSent || requestLock) return;
    requestLock = true; // 즉시 잠금 걸기
    setIsRequestSent(true); // 상태도 업데이트
    const postData = {
      type: "online",
      ticket: code,
    };
    deleteCookie("accesstoken");
    try {
      const response = await instance.post("/user/login", postData);
      // console.log("response: ", response);
      
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
        alert("온라인 예매가 아니거나 인증이 불가한 티켓입니다.");
        navigate("/", { replace: true }); 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
      navigate("/", { replace: true }); 
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

  const sendCode = async (hashCode) => {
    if (requestLock) return; // 잠금 확인 후 진행
    const codePattern = /^T\d{10}$/;
    if (codePattern.test(hashCode)) {
      
        handleLogin(hashCode);

      
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        requestAnimationFrame(tick);

        return () => {
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
          }
        };
      })
      .catch(() => {
        console.error("카메라 접근 불가");
      });

    function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA   && !requestLock) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
            // QR 코드 인식 시 즉시 스캔 중지
            sendCode(code.data);  // QR 코드 처리 함수 호출
            
          }
        } 
        requestAnimationFrame(tick);
      }
  }, [isRequestSent]);

  return (
    <div className="qr-reader-container">
      <div className="qr-reader-background">
        <video
          ref={videoRef}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="overlay-content">
        <img
          className="backspace"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrowwhite.svg`}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <div className="select-text" style={{ color: "#ffffff" }}>
          Step.1
        </div>
        <div className="select-topic" style={{ color: "#ffffff" }}>
          티켓 인증이 필요해요
        </div>

        <ProgressBar progress={progressState.progressState} />
        <div className="Divider" style={{ backgroundColor: "#ffffff" }} />
        <div className="select-exptext" style={{ color: "#ffffff" }}>
          영역 안에 바코드를 인식하면
          <br />
          자동으로 촬영됩니다.
        </div>
        <div className="scanner-area">
          <div className="scanner-plus">+</div>
        </div>
        <div className="select-button-container">
          <button
            className="code-type-button"
            onClick={() => navigate("/codetyping")}
          >
            티켓번호 입력
          </button>
          <button className="load-button" onClick={handleImageLoadClick}>
            이미지 불러오기
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default QRReader;
