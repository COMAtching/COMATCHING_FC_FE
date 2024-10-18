import React from "react";
// 단순한 가이드북 페이지인데 이것도 당시 시간 부족으로 그냥 큰 이미지 하나 넣었습니다. 수정필요해보입니다.
import { useNavigate } from "react-router-dom";
import "../css/pages/Faq.css";
function Faq() {
  const navigate = useNavigate();
  const faqData = [
    {
      question: "Q1. BFC1995는 무슨 서비스를 제공하나요?",
      answer: "A. BFC1995의 메인 서비스는 같은 경기 관람 유형의 친구 찾기입니다. 같은 팀을 응원하는 같은 유형의 또래친구를 매칭해 보세요! 그 외에 경기장 정보를 간략하게 볼 수 있습니다.",
    },
    {
      question: "Q2. 위 1번의 축구 관람 유형에는 어떤 것들이 있나요?",
      answer: "A. 관람 유형은 총 6개로, ‘순수한 축린이형’, ‘멋쟁이 인싸형’, ‘불타는 열정형’, ‘행복한 먹방형’, ‘분석하는 집중형’, 그리고 ‘똑똑한 축잘알형’이 있습니다.",
    },
    {
      question: "Q3. 친구 찾기를 할 때 어떤 조건들을 선택할 수 있나요?",
      answer: "A. 친구 찾기(매칭)시 고를 수 있는 선택지는 성별로, ‘남성’, ‘여성’ 혹은 ‘상관없음’이 있습니다. ‘응원유형’은 가입자와 같은 유형으로 고정됩니다. 나이 또한 큰 차이가 나지 않게 매칭됩니다!",
    },
    {
      question: "Q4. 한 번 가입하면 무조건 남들도 저를 뽑을 수 있나요?",
      answer: "A. 네, 회원가입 완료 시 다른 유저들이 매칭할 때 1회 뽑힐 수 있습니다. 탈퇴 시에는 유저 데이터가 삭제되며 더 이상 뽑히지 않게 됩니다.",
    },
    {
      question: "Q6. 매칭에서 또래가 아닌 사람 / 선택한 성별과 다른 성별의 사람이 나왔어요.",
      answer: "A. AI는 1순위로 같은 유형의 가입자를 물색합니다. 같은 유형의 가입자 데이터가 남아있지 않을 경우 매칭은 실패하고, 추후에 다시 매칭을 시도할 수 있습니다. 다만 또래나 선택 성별의 가입자가 남아있지 않을 경우 해당 유형의 가입자가 남아 있다면 해당 유형 가입자중 매칭 조건과 그 다음으로 유사한 가입자를 찾아 매칭해 줍니다.",
    },
    {
      question: "Q7. 상대방 인스타 ID를 입력해보았지만 인스타에 뜨지 않아요!",
      answer: "A. 아쉽게도 상대가 잘못된 인스타 ID를 입력한 경우, 이를 해결할 방안은 없습니다. 그러나 상대가 ID 정보 수정을 할 시 매칭자 메인화면에 뜨는 ID도 변경됩니다.",
    },
    {
      question: "Q8. 매칭을 한 번 더 할 수 없나요?",
      answer: "A. BFC1995는 이벤트 서비스로 매칭은 1인(1티켓)당 1회로 제한이 되어있습니다.",
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
