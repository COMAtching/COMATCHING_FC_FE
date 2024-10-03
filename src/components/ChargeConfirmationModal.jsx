import React, { useState } from "react";
import "../css/components/ChargeConfirmationModal.css"; // 스타일링 파일 불러오기

function ChargeConfirmationModal({ amount, onConfirm, onCancel,accountNumber }) {
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 클릭 시 상태 변경 함수
  const handleCheckClick = () => {
    setIsChecked(!isChecked); // 체크 상태를 반전
  };
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onCancel();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-message">다음 내용이 맞나요?</div>
        <div className="modal-warning">충전 요청 전에 꼭 확인해 주세요!</div>
        <div className="point_container">
          <img src="/assets/chargepoint.svg" alt="" className="modal-charge-img"  />
          <span className="modal-amount-value">{amount}원</span>
          
        </div>
        <div className="modal-account-number">입금계좌: {accountNumber} 서승준</div>
        <div className="terms-container"  onClick={handleCheckClick}>
          <img 
              src={isChecked ? "/assets/chargechecked.svg" : "/assets/chargecheck.svg"} 
              alt="check" 
              className="modal-check-img" 
          />
          <span className="modal-terms-text">적혀진 계좌로 입금했어요</span>
          <span className="modal-required-text">필수</span>
          <img src="/assets/chargemore.svg" alt="check" className="modal-more-img" />
        </div>
        <button
          className={`modal-confirm-button ${isChecked ? "active" : "inactive"}`}
          onClick={isChecked ? onConfirm : undefined} // 체크되지 않았을 때 버튼 클릭을 막음
        >
          {isChecked ? "네 맞아요" : "잠시만요!"}
        </button>
      </div>
      
    </div>
  );
}

export default ChargeConfirmationModal;
