import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MatchPickState, progress } from "../Atoms";
import ProgressBar from "../components/Progressbar";
import "../css/pages/QRReader.css";

const QRReader = () => {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useRecoilState(progress);
  const [data, setData] = useState("");
  const [codeState, setCodeState] = useRecoilState(MatchPickState);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);
  const fileInputRef = useRef(null);

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
              navigate("/Register", { state: { code: code.data } });
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
    const codePattern = /^T\d{10}$/;
    if (codePattern.test(hashCode)) {
      // alert("Valid code: " + hashCode);
      navigate("/Register");
    }
    // const response = await axios.get(
    //   `/comatching/code-req/admin?code=${hashCode}`
    // );
    // if (response.data.status === 200) {

    //   navigate("/Register");
    // } else {
    //   throw new Error("Unexpected response code or status");
    // }
    // catch (error) {
    //   console.error("Error sending hash code:", error);
    // }
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
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
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
          setData(code.data);
          sendCode(code.data);
        }
      }
      requestAnimationFrame(tick);
    }
  }, []);

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
            onClick={() => navigate("/CodeTyping")}
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
