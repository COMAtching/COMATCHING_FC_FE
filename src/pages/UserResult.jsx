import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { totalScores, userResult } from "../Atoms";
import { useNavigate } from "react-router-dom";
import RadarChart from "../components/RadarChart";

import "../css/pages/UserResult.css";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");

function UserResult() {
  const [result, setResult] = useRecoilState(userResult);
  const [scores, setScores] = useRecoilState(totalScores);

  // const [result, setResult] = useState({
  //   cheerPropensity: "인싸형", // 예시: "인싸형"
  //   players: [
  //     { playerName: "김형근", backNumber: 7, position: "FW" },
  //     { playerName: "이상혁", backNumber: 10, position: "MF" },
  //   ],
  // });

  // const [scores, setScores] = useState({
  //   passionType: 80,
  //   focusType: 70,
  //   soccerNoviceType: 60,
  //   soccerExpertType: 90,
  //   mukbangType: 50,
  //   socialType: 85,
  // }); 화면 목데이터
  const navigate = useNavigate();
  const radarData = [
    scores.passionType,
    scores.focusType,
    scores.soccerNoviceType,
    scores.soccerExpertType,
    scores.mukbangType,
    scores.socialType,
  ];
  const getTextContent = (cheerPropensity) => {
    switch (cheerPropensity) {
      case "축린이형":
        return {
          text: "나는야 귀여운 축린이!",
          topic: "순수한 축린이형",
          
        };
      case "인싸형":
        return {
          text: "관중계의 떠오르는 별!",
          topic: "멋쟁이 인싸형",
          
        };
      case "열정형":
        return {
          text: "앗 뜨거! 타오르는 열정!",
          topic: "불타는 열정형",
          
        };
      case "먹방형":
        return {
          text: "먹방은 내게 맡겨!",
          topic: "행복한 먹방형",
          
        };
      case "집중형":
        return {
          text: "혜안을 가진 사람!",
          topic: "분석하는 집중형",
          
        };
      case "축잘알형":
        return {
          text: "축구를 잘아는 당신!",
          topic: "다아는 축잘알형",
          
        };
    }
  };
  const { text, topic } = getTextContent(result.cheerPropensity);
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate("/")}
      />
      <div className="register-info-container">
        <div className="select-topic">당신은 {result.cheerPropensity}!</div>
        <div className="Divider" />
      </div>
      <div className="UserResult-container">
        <div className="UserResult-info-container">
          <div className="UserResult-text">{text}</div>
          <div className="UserResult-topic">{topic}</div>
          <div className="chart-container">
            <RadarChart data={radarData} />
          </div>
          {/* <img
            className="Mascot"
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/${image}`}
            alt="마스코트"
          /> */}
        </div>
        {/* <div className="UserResult-similar-text">나와 같은 유형의 축구선수</div>
        {result.players.map((player, index) => (
          <div key={index} className="UserResult-similar-container">
            <img
              className="similar-player-img"
              src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/player/${
                player.playerName
              }.png`}
              alt="마스코트"
            />
            <div className="similar-player-name">
              {player.backNumber}. {player.playerName}
            </div>
            <div className="similar-player-positon">{player.position}</div>
          </div>
        ))} */}
      </div>

      <button className={"UserResult-Next"} onClick={() => navigate("/")}>
        친구 만들러 가기!
      </button>
    </div>
  );
}

export default UserResult;
