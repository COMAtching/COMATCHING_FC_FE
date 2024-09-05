import React, { useState } from "react";
import axios from "axios";
import Background from "../components/Background.jsx";
import HeaderPoint from "../components/Headerpoint.jsx";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { MatchResultState, MatchPickState } from "../Atoms";
import "../css/pages/Matchresult.css";
import { useNavigate } from "react-router-dom";
import hobbyIcons from "../data/hobbyIcons";
import Cookies from "js-cookie";
import Loading from "./Loading.jsx";

function Matchresult() {
  const navigate = useNavigate();
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);
  const [loading, setLoading] = useState(false);

  // 현재 목업 값으로 보임. 실데이터 사용할 경우 주석처리.
  const mockData = {
    major: "컴퓨터정보공학부",
    age: 25,
    hobby: ["음악감상", "독서", "게임", "스포츠시청"],
    mbti: "INTJ",
    song: "Young Man - 혁오",
    contactFrequency: "적음",
    contactId: ["@", "mock_instagram"],
    generatedCode: 2001,
  };

  // 같은 조건으로 다시 매칭하기 핸들러
  const handleSubmit = async () => {
    // if (MatchState.balance < MatchState.point) {
    //   alert("돈이 부족합니다");
    //   return false;
    // }
    try {
      const accessToken = Cookies.get("Authorization");
      setLoading(true);
      const response = await axios.post(
        "https://backend.comatching.site/api/match/match-request",
        MatchState.formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ACCESSTOKEN을 Authorization 헤더에 추가
          },
        }
      );

      if (
        response.data.code[0] === "SEC-001" ||
        response.data.code[0] === "SEC-002"
      ) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (response.data.status === 200) {
        setLoading(false);
        // 다시 결과 값 받아오기
        setMatchResult({
          age: response.data.data.age,
          comment: response.data.data.comment,
          contactFrequency: response.data.data.contactFrequency,
          currentPoint: response.data.data.currentPoint,
          gender: response.data.data.gender,
          hobby: response.data.data.hobby,
          major: response.data.data.major,
          mbti: response.data.data.mbti,
          socialId: response.data.data.socialId,
          song: response.data.data.song,
        });
        // navigate("/loading");
      } else {
        throw new Error("Unexpected response code or status");
      }
    } catch (error) {
      console.error("Error during match request", error);
    }
  };

  // 취미를 아이콘과 매핑하는 함수
  const mapHobbiesWithIcons = (hobbyList) => {
    return hobbyList.map((hobbyName) => {
      const matchedIcon = hobbyIcons.find((icon) => icon.label === hobbyName);
      return { name: hobbyName, image: matchedIcon?.image || "" };
    });
  };

  // 목업 데이터일 경우
  // const resultData = {
  //   ...mockData,
  //   hobby: mapHobbiesWithIcons(mockData.hobby),
  // };

  // 실데이터일 경우
  const resultData = {
    ...MatchResult,
    hobby: mapHobbiesWithIcons(MatchResult.hobby),
  };

  // 다시뽑기 버튼 핸들러
  const handleRematch = () => {
    navigate("/match");
  };

  const handleSendText = () => {
    alert("아직 준비중인 기능이에요!");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <Background />
            <HeaderPoint />

            <div className="circle-icon">💟</div>

            {resultData.generatedCode === 2002 ? (
              <div className="matchresult-content">
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "24px" }}>
                    이성이 데이터에 한명도 없습니다
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="matchresult-content">
                  <div className="MatchResult-Container">
                    <div className="MatchResult-Major">
                      <div className="MatchResult-Topic-Top">전공</div>
                      <div className="MatchResult-Text">{resultData.major}</div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Age">
                      <div className="MatchResult-Topic">나이</div>
                      <div className="MatchResult-Text">{resultData.age}</div>
                    </div>
                    <div className="MatchResult-MBTI">
                      <div className="MatchResult-Topic">MBTI</div>
                      <div className="MatchResult-Text">{resultData.mbti}</div>
                    </div>
                    <div className="MatchResult-Frequency">
                      <div className="MatchResult-Topic">연락빈도</div>
                      <div className="MatchResult-Text">
                        {resultData.contactFrequency}
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Hobby">
                      <div className="MatchResult-Topic">취미</div>
                      <div className="MatchResult-Text-Hobby">
                        {resultData.hobby.map((hobby, index) => (
                          <div key={index} className="hobby-box">
                            <img
                              src={hobby.image}
                              alt={hobby.name}
                              className="hobby-icon"
                            />
                            <span className="hobby-text">{hobby.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Song">
                    <div className="MatchResult-Topic">좋아하는 노래</div>
                    <div className="MatchResult-Text">{resultData.song}</div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Contact">
                      <div className="MatchResult-Topic">
                        {resultData.socialId[0] === "@" ? "instagram" : "kakao"}
                      </div>
                      <div className="MatchResult-Text MatchResult-Text-Contact">
                        {resultData.socialId}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-same-button" onClick={handleSubmit}>
                    <div className="Retry-same-button-point">
                      <img
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }../../assets/point.svg`}
                        alt="cost"
                      />
                      1000P
                    </div>
                    같은 조건으로 한번 더 뽑기
                  </button>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-button" onClick={handleRematch}>
                    다시뽑기
                  </button>

                  {/* <button className="SendText-button" onClick={handleSendText}>
                쪽지 보내기
              </button> */}
                </div>
              </div>
            )}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default Matchresult;
