import React from "react";
// 단순한 가이드북 페이지인데 이것도 당시 시간 부족으로 그냥 큰 이미지 하나 넣었습니다. 수정필요해보입니다.
import { useNavigate } from "react-router-dom";
import "../css/pages/Faq.css";
function Faq() {
  const navigate = useNavigate();
  const faqData = [
    {
      question: "Q1 당신은 누구입니까?",
      answer: "Ans 저는 개발을 좋아하는 이안입니다.",
    },
    {
      question: "Q2 이 프로젝트의 목적은 무엇입니까?",
      answer: "Ans 사용자에게 편리함을 제공하기 위한 플랫폼입니다.",
    },
    {
      question: "Q3 어떤 기술을 사용하셨나요?",
      answer: "Ans React, Recoil, Axios 등을 사용했습니다.",
    },
    {
      question: "Q4 이 프로젝트에서 가장 어려웠던 점은 무엇인가요?",
      answer: "Ans 시간 부족과 복잡한 로직 처리였습니다.",
    },
    {
      question: "Q5 앞으로의 계획은 무엇인가요?",
      answer: "Ans 더 많은 기능을 추가하고, UI를 개선할 계획입니다.",
    },
  ];
  return (
    <div className="container">
      <img
        className="backspace"
        src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrow.svg`}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      />
      <div className="register-info-container">
        <div className="select-topic">FAQ</div>
        <div className="Divider" />
      </div>
      
        {faqData.map((item, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question">{item.question}</div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
      
    </div>
  );
}

export default Faq;
