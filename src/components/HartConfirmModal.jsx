import React, { useState } from "react";
import "../css/components/HartConfirmModal.css"; // 스타일링 파일 불러오기

function HartConfirmationModal({ totalAmount,heartCount,remainingPoint, onConfirm, onCancel }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "heart-modal-overlay") {
      onCancel();
    }
  };

  return (
    <div className="heart-modal-overlay" onClick={handleOverlayClick}>
      <div className="heart-modal-content">
        <div className="heart-modal-message">다음 내용이 맞나요?</div>
        <div className="heart-modal-warning">충전 요청 전에 꼭 확인해 주세요!</div>
        <div className="heart-input-container">
          <img src="/assets/chargepoint.svg" alt="Charge Point" className="heart-img" />
          <p className="heart-inputs">{totalAmount}</p>
          <img src="/assets/heartslash.svg" alt="" className="heartslash"/>
          <img src="/assets/heartcha.svg" alt="Charge Point" className="heart-img" />
          <p className="heart-inputs">{heartCount}</p>
        </div>
        <div className="remaining-point" style={{ color: 'gray' }}>
          잔여 포인트: {remainingPoint}원
        </div>
        
        <div className="terms-container" onClick={handleCheckClick}>
          <img
            src={isChecked ? "/assets/chargechecked.svg" : "/assets/chargecheck.svg"}
            alt="check"
            className="modal-check-img"
          />
          <span className="modal-terms-text">약관의 사용동의</span>
          <span className="modal-required-text">필수</span>
          <img src="/assets/chargemore.svg" alt="check" className="modal-more-img" />
        </div>
        <button
          className={`modal-confirm-button ${isChecked ? "active" : "inactive"}`}
          onClick={isChecked ? onConfirm : undefined}
        >
          {isChecked ? "네 맞아요" : "잠시만요!"}
        </button>
      </div>
    </div>
  );
}

export default HartConfirmationModal;
