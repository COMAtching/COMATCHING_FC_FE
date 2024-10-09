import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { QUESTIONS, ANSWERS } from "../data/questions";
import { progress, userResult } from "../Atoms";
import { useNavigate } from "react-router-dom";
import "../css/pages/Form.css";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal";
import instance from "../axiosConfig";
Modal.setAppElement("#root");

function Form() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressState, setProgressState] = useRecoilState(progress);
  const [formResult, setFormResult] = useRecoilState(userResult);
  const [scores, setScores] = useState({
    socialType: 0,
    mukbangType: 0,
    soccerNoviceType: 0,
    soccerExpertType: 0,
    focusType: 0,
    passionType: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const handleLogin = async () => {
    console.log("scores: ", scores);
    try {
      const response = await instance.post("/auth/pending/survey", scores);
      console.log("response: ", response);
      if (response.data.code === "GEN-000") {
        setFormResult(response.data.data);
        navigate("/userresult");
      } else {
        alert("미로그인");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

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
        progressState: prevProgress.progressState + 100 / 13,
      }));
    } else {
      console.log("최종 점수:", scores);
      setIsModalOpen(true);
    }
  };

  const toggleAgreement = (key) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allAgreementsChecked = agreements.terms && agreements.privacy;
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
      <img
        className="formImage"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/form/formImage${
          currentQuestionIndex + 1
        }.png`}
        alt="질문이미지"
      />
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {}}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="modal-Topic">약관에 동의해주세요</div>
        <div className="modal-text">
          여러분의 소중한 개인정보를 잘 지켜 드릴게요
        </div>
        <div className="modal-text-element">
          <div
            className={`modal-check  ${agreements.terms ? "active" : ""}`}
            onClick={() => toggleAgreement("terms")}
          >
            ✓
          </div>
          <div className="modal-title">이용약관 동의</div>
          <div className="modal-essential">필수</div>
        </div>
        <div className="modal-text-element">
          <div
            className={`modal-check ${agreements.privacy ? "active" : ""}`}
            onClick={() => toggleAgreement("privacy")}
          >
            ✓
          </div>
          <div className="modal-title">개인정보 수집 이용 동의</div>
          <div className="modal-essential">필수</div>
        </div>
        <button
          disabled={!allAgreementsChecked}
          onClick={() => handleLogin()}
          className={`modal-button ${allAgreementsChecked ? "active" : ""}`}
        >
          시작하기
        </button>
      </Modal>
    </div>
  );
}

export default Form;
