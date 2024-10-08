import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { QUESTIONS, ANSWERS } from "../data/questions";
import { progress } from "../Atoms";
import { useNavigate } from "react-router-dom";
import "../css/pages/Form.css";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement("#root");

function Form() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressState, setProgressState] = useRecoilState(progress);
  const [scores, setScores] = useState({
    SocialType: 0,
    MukbangType: 0,
    SoccerNoviceType: 0,
    SoccerExpertType: 0,
    FocusType: 0,
    PassionType: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    age: false,
    marketing: false,
  });

  const handleLogin = async () => {
    console.log("scores: ", scores);
    try {
      const response = await axios.post(
        "https://cuk.comatching.site/auth/pending/survey",
        scores,
        { withCredentials: true }
      );
      console.log("response: ", response);
      if (response.data.code === "GEN-000") {
        navigate("/");
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
        progressState: prevProgress.progressState + 100 / 14,
      }));
    } else {
      console.log("최종 점수:", scores);
      setIsModalOpen(true);
    }
  };

  const toggleAgreement = (key) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allAgreementsChecked =
    agreements.terms &&
    agreements.privacy &&
    agreements.age &&
    agreements.marketing;
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
        <h2>약관에 동의해주세요</h2>
        <p>여러분의 소중한 개인정보를 잘 지켜 드릴게요</p>

        <ul>
          <li onClick={() => toggleAgreement("terms")}>
            이용약관 동의 {agreements.terms ? "✔️" : "❌"}
          </li>
          <li onClick={() => toggleAgreement("privacy")}>
            개인정보 수집 이용 동의 {agreements.privacy ? "✔️" : "❌"}
          </li>
          <li onClick={() => toggleAgreement("age")}>
            만 14세 이상입니다 {agreements.age ? "✔️" : "❌"}
          </li>
          <li onClick={() => toggleAgreement("marketing")}>
            마케팅 정보 수신 동의 {agreements.marketing ? "✔️" : "❌"}
          </li>
        </ul>

        <button
          disabled={!allAgreementsChecked}
          onClick={() => handleLogin()}
          className={`start-button ${allAgreementsChecked ? "active" : ""}`}
        >
          시작하기
        </button>
      </Modal>
    </div>
  );
}

export default Form;
