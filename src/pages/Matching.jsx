import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState , useResetRecoilState} from "recoil";
import { useNavigate } from "react-router-dom";
import HeaderPoint from "../components/Headerpoint";
import Background from "../components/Background";
import { MatchPickState, MatchResultState, userState } from "../Atoms";
import MatchOptionButtonclass from "../components/MatchOptionButton_Class";
import MBTISection from "../components/MBTISection";
import AgeButton from "../components/AgeButton";
import MatchOptionButton from "../components/MatchOptionButton";
import hobbyIcons from "../data/hobbyIcons"; // 취미 아이콘 데이터 가져오기
import Cookies from "js-cookie";
import "../css/pages/Matching.css";
import Loading from "./Loading.jsx";
import HeaderBack from "../components/HeaderBack.jsx";
import instance from "../axiosConfig.jsx";
function Matching() {
  const [MatchState, setMatchState] = useRecoilState(MatchPickState); // 뽑은 선택 리스트
  const [userPoint, setUserPoint] = useRecoilState(userState);
  const [imagePosition, setImagePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMBTISelected, setIsMBTISelected] = useState(false); // MBTI 2개 선택 여부를 추적
  const startX = useRef(0);
  const [matchPageResult, setMatchPageResult] =
    useRecoilState(MatchResultState); // 뽑기 결과 상태 관리
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const resetMatchState = useResetRecoilState(MatchPickState);
  const resetMatchResultState = useResetRecoilState(MatchResultState);
  const handleHobbyClick = (index) => {
    const isAlreadySelected = MatchState.formData.hobbyOption.includes(index);
    const updatedHobbies = isAlreadySelected
      ? MatchState.formData.hobbyOption.filter((hobby) => hobby !== index)
      : MatchState.formData.hobbyOption.length < 5
      ? [...MatchState.formData.hobbyOption, index]
      : MatchState.formData.hobbyOption;

    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        hobbyOption: updatedHobbies,
      },
    }));
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때 Recoil 상태 초기화
    resetMatchState();  // MatchPickState 초기화
    
    resetMatchResultState(); // MatchResultState 초기화
  }, [resetMatchState,  resetMatchResultState]);
  const handleStart = (e) => {
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    if (!isMBTISelected) return; // MBTI 2개가 선택되지 않으면 드래그 불가
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
  };

  const handleMove = (e) => {
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    if (isDragging) {
      const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
      const deltaX = clientX - startX.current;
      const newPosition = Math.min(Math.max(0, imagePosition + deltaX), 252); // 252는 이동 가능한 최대 위치
      setImagePosition(newPosition);
      startX.current = clientX; // 현재 위치 업데이트
    }
  };
  const handleEnd = async () => {
    if (!isDragging) return;
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    setIsDragging(false);

    // 필수 선택 확인
    const isAgeSelected = MatchState.isUseOption[0]
      ? MatchState.formData.age_option !== ""
      : true;
    const isContactFrequencySelected = MatchState.isUseOption[1]
      ? MatchState.formData.contact_frequency_option !== ""
      : true;
    const isHobbySelected = MatchState.isUseOption[2]
      ? MatchState.formData.hobbyOption.length > 0
      : true;

    if (!isAgeSelected) {
      alert("나이를 선택해 주세요.");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (!isContactFrequencySelected) {
      alert("연락 빈도를 선택해 주세요.");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (!isHobbySelected) {
      alert("취미를 선택해 주세요.(최대 5개");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (imagePosition >= 252) {
      alert("다음 단계로 이동합니다."); // 이동 완료 후 원하는 동작 수행
      // 다음 단계로 이동 로직 추가
    }

    const FormData = {
      ageOption: MatchState.isUseOption[0]
        ? MatchState.formData.age_option
        : "UNSELECTED",
      mbtiOption: MatchState.selectedMBTI
        .filter((letter) => letter !== "X")
        .join(","),
      hobbyOption: MatchState.isUseOption[2]
        ? MatchState.formData.hobbyOption
        : ["UNSELECTED"],
      contactFrequencyOption: MatchState.isUseOption[1]
        ? MatchState.formData.contact_frequency_option
        : "UNSELECTED",
      sameMajorOption: MatchState.isUseOption[3] ? true : false,
    };
    setMatchState((prev) => ({
      ...prev,
      formData: {
        FormData,
      },
    }));
    

    try {
      setLoading(true);
      const response = await instance.post(
        "/auth/user/api/match/request",
        FormData
      );
      
      if (response.status === 200) {
        await setMatchPageResult((prev) => ({
          ...prev,
          age: response.data.data.age,
          comment: response.data.data.comment,
          contactFrequency: response.data.data.contactFrequency,
          currentPoint: response.data.data.currentPoint,
          gender: response.data.data.gender,
          hobby: response.data.data.hobby,
          major: response.data.data.major,
          mbti: response.data.data.mbti,
          socialId: response.data.data.contactId,
          song: response.data.data.song,
        }));
        await setUserPoint((prev) => ({
          ...prev,
          point: response.data.data.currentPoint,
        }));
        
        navigate("/match-result",{ replace: true });
      } else {
        alert("실패하였습니다");
        navigate("/");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // MBTI 선택 핸들러
  const handleMBTISelection = (value) => {
    // 선택한 것의 카테고리 구분
    const category =
      value === "E" || value === "I"
        ? 0
        : value === "S" || value === "N"
        ? 1
        : value === "T" || value === "F"
        ? 2
        : 3;

    setMatchState((prev) => {
      const updatedMBTI = [...prev.selectedMBTI];
      const updatedCategory = [...prev.selectedCategory];

      if (updatedCategory.includes(category)) {
        updatedMBTI[category] = value; // 이미 선택된 카테고리를 업데이트
      } else {
        if (updatedCategory.length >= 2) {
          updatedMBTI[updatedCategory[0]] = "X"; // 기존 선택을 제거
          updatedCategory.shift();
        }
        updatedMBTI[category] = value;
        updatedCategory.push(category);
      }

      const isSelected = updatedCategory.length === 2; // 2개 선택 여부 확인
      setIsMBTISelected(isSelected); // 2개가 선택되었을 때만 슬라이더 활성화

      return {
        ...prev,
        selectedMBTI: updatedMBTI,
        selectedCategory: updatedCategory,
      };
    });
  };

  const handleAgeSelection = (value, location) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [location]: prev.formData[location] === value ? "" : value, // 선택 취소 로직
      },
    }));
  };

  // 유료 버튼 사용 클릭 핸들러
  const handleButtonClick = (index, cost) => {
    setMatchState((prev) => {
      const newIsUseOption = prev.isUseOption.map((option, i) =>
        i === index ? !option : option
      );

      // 비용 계산 로직
      const newPoint = newIsUseOption[index]
        ? prev.point + cost
        : prev.point - cost;

      return {
        ...prev,
        point: newPoint,
        isUseOption: newIsUseOption,
      };
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <Background />
          <HeaderBack />
          <div className="matchcontent">
            <div className="match-title">
              <div className="match-title-text">Matching</div>
              <div className="match-title-inst-txt">
                매칭되고 싶은 상대를 입력하세요
              </div>
            </div>
          </div>
          <div className="matchcontent_mbti">
            <div className="match-title">
              <div className="match-title-text">
                MBTI <span className="match-required-text">필수</span>
              </div>
              <div className="match-title-inst-txt">
                상대방의 MBTI 2개를 골라주세요.
              </div>
            </div>
            <MBTISection
              user={MatchState.selectedMBTI}
              onClick={handleMBTISelection}
              name="MBTIButton"
            />
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(0, 100)}
              >
                <div>
                  <div className="match-title-text">
                    나이<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 나이를 골라주세요
                  </div>
                </div>
                <MatchOptionButton
                  state={MatchState.isUseOption[0]}
                  num={0}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(0, 100);
                  }}
                />
              </div>
            </div>
            {/* MatchOptionButton 클릭 시만 나이 선택 버튼 표시 */}
            {MatchState.isUseOption[0] && (
              <div className="match-select-button">
                <AgeButton
                  formData={MatchState.formData.age_option}
                  value="YOUNGER"
                  text="연하"
                  onClick={() => handleAgeSelection("YOUNGER", "age_option")}
                  isClickable={MatchState.isUseOption[0]}
                />
                <AgeButton
                  formData={MatchState.formData.age_option}
                  value="EQUAL"
                  text="동갑"
                  onClick={() => handleAgeSelection("EQUAL", "age_option")}
                  isClickable={MatchState.isUseOption[0]}
                />
                <AgeButton
                  formData={MatchState.formData.age_option}
                  text="연상"
                  value="OLDER"
                  onClick={() => handleAgeSelection("OLDER", "age_option")}
                  isClickable={MatchState.isUseOption[0]}
                />
              </div>
            )}
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(1, 100)} // 클릭 이벤트 추가
              >
                <div>
                  <div className="match-title-text">
                    연락 빈도<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    원하는 연락 빈도 선택
                  </div>
                </div>
                <MatchOptionButton
                  state={MatchState.isUseOption[1]}
                  num={1}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(0, -100);
                  }}
                />
              </div>
            </div>
            {MatchState.isUseOption[1] && (
              <div className="match-select-button">
                <AgeButton
                  formData={MatchState.formData.contact_frequency_option}
                  text="자주"
                  value="FREQUENT"
                  onClick={() =>
                    handleAgeSelection("FREQUENT", "contact_frequency_option")
                  }
                  isClickable={MatchState.isUseOption[1]}
                />
                <AgeButton
                  formData={MatchState.formData.contact_frequency_option}
                  text="보통"
                  value="NORMAL"
                  onClick={() =>
                    handleAgeSelection("NORMAL", "contact_frequency_option")
                  }
                  isClickable={MatchState.isUseOption[1]}
                />
                <AgeButton
                  formData={MatchState.formData.contact_frequency_option}
                  text="가끔"
                  value="NOT_FREQUENT"
                  onClick={() =>
                    handleAgeSelection(
                      "NOT_FREQUENT",
                      "contact_frequency_option"
                    )
                  }
                  isClickable={MatchState.isUseOption[1]}
                />
              </div>
            )}
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(2, 100)}
              >
                <div>
                  <div className="match-title-text">
                    취미<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 취미를 5개를 골라주세요
                  </div>
                </div>
                <MatchOptionButton
                  state={MatchState.isUseOption[2]}
                  num={2}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(2, 100);
                  }}
                />
              </div>
            </div>
            {MatchState.isUseOption[2] && (
              <div className="match-hobby-grid">
                {hobbyIcons.map((hobby, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`hobby-item ${
                      MatchState.isUseOption[2]
                        ? `${
                            MatchState.formData.hobbyOption.includes(
                              hobby.label
                            )
                              ? "selected"
                              : ""
                          }`
                        : " "
                    }`}
                    onClick={() => handleHobbyClick(hobby.label)}
                    disabled={!MatchState.isUseOption[2]}
                  >
                    <img src={hobby.image} alt={hobby.alt} />
                    <div>{hobby.label}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="matchcontent_detail matchfinalcontent">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(3, 200)} // 클릭 이벤트 추가
              >
                <div>
                  <div className="match-title-text">
                    같은과는 싫어요
                    <span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    과 CC를 피할 수 있어요
                  </div>
                </div>
                <MatchOptionButtonclass
                  state={MatchState.isUseOption[3]}
                  num={3}
                  money={200}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(0, 100);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="cost-bubble"
            style={{
              display:
              isMBTISelected && MatchState.point > 0
                  ? "block"
                  : "none",
            }}
          >
            <img src="/assets/footercoin.svg" alt="coin" />
            <span>{MatchState.point}P 소모</span>
          </div>

          <div
            className="footer_btn"
            onMouseMove={isMBTISelected ? handleMove : null}
            onMouseUp={isMBTISelected ? handleEnd : null}
            onTouchMove={isMBTISelected ? handleMove : null}
            onTouchEnd={isMBTISelected ? handleEnd : null}
          >
            <div
              className="footer_btn_box"
              style={{
                backgroundColor: isMBTISelected ? "white" : "lightgray",
                opacity: isMBTISelected ? 1 : 0.5,
                boxShadow: isMBTISelected
                  ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  : "none",
              }}
            >
              <img
                src={
                  isMBTISelected
                    ? "/assets/slider_active.svg"
                    : "/assets/slider.svg"
                } // 이미지 변경
                alt=""
                style={{
                  left: `${imagePosition}px`,
                  cursor: isMBTISelected ? "pointer" : "not-allowed",
                }} // 커서 변경
                onMouseDown={handleStart}
                onTouchStart={handleStart}
              />
              <p>
                {isMBTISelected
                ? "밀어서 커플되기"
                : "조건을 선택해 주세요"}
              </p>
            </div>
          </div>

          <div className="footer"></div>
        </div>
      )}
    </>
  );
}

export default Matching;
