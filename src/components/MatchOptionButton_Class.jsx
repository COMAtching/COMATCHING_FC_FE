import React from "react";

function MatchOptionButtonclass({ state, num, handleButtonClick, money }) {
  return (
    <div className="match-premium-option-right">
      {!state ? (
        <button
          type="button"
          className="match-premium-option-unclick-button"
          onClick={() => handleButtonClick(num, money)}
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
          className="match-premium-option-class-click-button"
          onClick={() => handleButtonClick(num, -money)}
        >
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/check_class.svg`}
            alt="닫기"
          />
        </button>
      )}
    </div>
  );
}

export default MatchOptionButtonclass;
