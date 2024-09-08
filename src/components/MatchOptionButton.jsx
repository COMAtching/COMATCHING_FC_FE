import React from "react";

function MatchOptionButton({ state, num, handleButtonClick, money }) {
  return (
    <div className="match-premium-option-right">
      {!state ? (
        <button
          type="button"
          className="match-premium-option-unclick-button"
          onClick={() => {
            
            handleButtonClick(num, money); // 함수 호출
          }}
        >
          <div className="match-premium-option-cost">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/point.svg`}
              alt="cost"
            />
            {money}
          </div>
        </button>
      ) : (
        <button
          type="button"
          className="match-premium-option-click-button"
          onClick={() => {
            
            handleButtonClick(num, -money)
          }}
        >
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Backspace.svg`}
            alt="닫기"
          />
        </button>
      )}
    </div>
  );
}

export default MatchOptionButton;
