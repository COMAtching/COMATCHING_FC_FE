import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import hobbyIcons from "../data/hobbyIcons.jsx";
import HeaderNav from "../components/HeaderNav.jsx";
import ProgressBar from "../components/Progressbar.jsx";
import Background from "../components/Background.jsx";
import MemoizedHobbyElement from "../components/HobbyElement.jsx";
import MemoizedHobbyChoice from "../components/HobbyChoice.jsx";
import "../css/pages/Hobbyform.css";

function Hobbyform() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState); 
  const [pickHobby, setPickHobby] = useRecoilState(userState);

  const handleSubmit = () => {
    if (pickHobby.hobby.length < 1) {
      alert("관심사를 최소 1개 이상 선택해주세요.");
      return false;
    }
    setUser((prevUser) => ({
      ...prevUser,
      hobby: pickHobby.hobby,
    }));
    console.log(user);
    navigate("/userinfo");
  };

  const handleHobbyClick = (index) => {
    const isAlreadySelected = pickHobby.hobby.includes(index);
    const updatedHobbies = isAlreadySelected
      ? pickHobby.hobby.filter((hobby) => hobby !== index)
      : pickHobby.hobby.length < 5
      ? [...pickHobby.hobby, index]
      : pickHobby.hobby;

    setPickHobby((prevUser) => ({
      ...prevUser,
      hobby: updatedHobbies,
    }));
  };

  const categories = ["예술활동", "야외활동", "운동/스포츠", "정적인", "동적인"];
  const hobbyCards = [];

  for (let i = 0; i < hobbyIcons.length; i += 3) {
    const hobbyChunk = hobbyIcons.slice(i, i + 3);
    hobbyCards.push(
      <div className="hobby-card" key={i}>
        <div className="hobby-card-title">{categories[i / 3]}</div>
        <div className="hobby-card-content">
          {hobbyChunk.map((hobby, index) => (
            <MemoizedHobbyChoice
              key={index}
              index={index}
              hobby={hobby}
              pickHobby={pickHobby}
              handleHobbyClick={handleHobbyClick}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Background/>
      <HeaderNav />
      <div className="content">
        <div className="info-card">
          <div className="select-hobby-topic">취미 선택하기</div>
          <div className="select-hobby-text">
            본인의 취미를 알려주세요. (1-5개)
          </div>
          <ProgressBar progress={0} />
        </div>
        <div className="hobby-card-container">
          {hobbyCards}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          다음으로
        </button>
      </div>
    </div>
  );
}

export default Hobbyform;