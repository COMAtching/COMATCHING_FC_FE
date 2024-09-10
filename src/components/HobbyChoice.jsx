import React from "react";

function HobbyChoice({ index, hobby, pickHobby, handleHobbyClick }) {
  return (
    <button
      key={index}
      className={`hobby-item ${
        pickHobby.hobby.includes(hobby.label) ? "selected" : ""
      }`}
      onClick={() => handleHobbyClick(hobby.label)}
    >
      {/* <object data={hobby.image} type="image/svg+xml" aria-label={hobby.alt}>
        <img src={hobby.image} alt={hobby.alt} />
      </object> */}
        <img src={hobby.image} alt={hobby.alt} />
      <div>{hobby.label}</div>
    </button>
  );
}

export const MemoizedHobbyChoice = React.memo(HobbyChoice);
export default MemoizedHobbyChoice;