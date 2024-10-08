import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useRecoilState } from "recoil";
import { QUESTIONS, ANSWERS } from "../data/questions";
import { progress } from "../Atoms";
import { useNavigate } from "react-router-dom";

import "../css/pages/Form.css";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");

function Form() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressState, setProgressState] = useRecoilState(progress);
  const [scores, setScores] = useState({
    인싸형: 0,
    먹방형: 0,
    축린이: 0,
    축잘알형: 0,
    집중형: 0,
    열정형: 0,
  });
  useEffect(() => {
    setProgressState((prevProgress) => ({
      progressState: prevProgress.progressState + 100 / 14,
    }));
  }, []);
  const handleAnswerSelect = (answerScores) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.keys(answerScores).forEach((key) => {
        newScores[key] += answerScores[key];
      });
      return newScores;
    });

    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setProgressState((prevProgress) => ({
        progressState: prevProgress.progressState + 100 / 14,
      }));
    } else {
      console.log("최종 점수:", scores);
    }
  };
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="info-card">
        <div className="select-text">Step.3</div>
        <div className="select-topic">나는 무슨 유형일까?</div>
        <ProgressBar progress={progressState.progressState} />
        <div className="Divider" />
      </div>
      <div className="form-container">
        <div className="question-num">Q{currentQuestionIndex + 1}.</div>
        <div className="form-text">{QUESTIONS[currentQuestionIndex]}</div>
      </div>
      <div className="answers-container">
        {ANSWERS[currentQuestionIndex].map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer.scores)}
            className="answer-button"
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Form;
