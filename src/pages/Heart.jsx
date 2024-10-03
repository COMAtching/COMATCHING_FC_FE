import React, { useState,useEffect} from "react";
import { useRecoilState } from "recoil";
import Background from "../components/Background.jsx";
import { useNavigate } from "react-router-dom";
import { userState } from "../Atoms";
// 스타일링을 위한 CSS 파일 생성
import HeaderBackPoint from "../components/HeaderBackPoint.jsx";
import { charge } from "../Atoms";
import HartConfirmationModal from "../components/HartConfirmModal.jsx";
import instance from "../axiosConfig.jsx"; // axios 인스턴스 불러오기

import "../css/pages/Heart.css"
function Heart() {
  const navigate = useNavigate();
  const [userPoint, setUserPoint] = useRecoilState(userState);
  const [heartCount, setHeartCount] = useState(0); // 하트 갯수 상태 관리
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const calculateTotalAmount = (count) => {
    const groupOfThree = Math.floor(count / 3); // Each group of 3 is charged at the 1000 point rate
    const remainder = count % 3;

    let total = groupOfThree * 1000; // Groups of 3
    if (remainder > 0) {
      total += remainder * 500; // Charge remaining hearts at the regular rate
    }
    return total;
  };

  const totalAmount = calculateTotalAmount(heartCount); // 총 금액 계산
  const remainingPoint = userPoint.point - totalAmount; // 잔여 포인트 계산
  useEffect(() => {
      // Fetch currentPoint from backend when component mounts
      const fetchCurrentPoint = async () => {
        try {
          const response = await instance.get("/auth/user/api/currentPoint");
          
          // Assuming response.data.currentPoint is the point value you want to set in Recoil
          setUserPoint((prev) => ({
            ...prev,
            point: response.data.data.currentPoint, // Update the point in Recoil
          }));
        } catch (error) {
          console.error("Failed to fetch currentPoint:", error);
        }
        // setUserPoint((prev) => ({
        //       ...prev,
        //       point: 1000, // Update the point in Recoil
        //     }));
      };

      fetchCurrentPoint();
  }, [setUserPoint]); 

  const handleIncreaseHeart = () => {
    // 하트가 증가했을 때의 새로운 하트 개수와 새로운 총 금액을 계산
    const newHeartCount = heartCount + 1;
    const newTotalAmount = calculateTotalAmount(newHeartCount);
  
    // 사용자의 포인트가 새로운 총 금액 이상인 경우에만 하트 추가 가능
    if (userPoint.point >= newTotalAmount) {
      setHeartCount(newHeartCount); // 하트 갯수 증가
    } else {
      alert("잔여 포인트가 부족합니다.");
    }
  };

  const handleDecreaseHeart = () => {
    if (heartCount > 0) {
      setHeartCount(heartCount - 1); // 하트 갯수 감소
    }
  };
  const handleHeartExchange = async () => {
    if (userPoint.point >= totalAmount) {
      try {
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
          const [name, value] = cookie.split("=");
          acc[name] = value;
          return acc;
        }, {});
        const accessToken = cookies.Authorization;

        const response = await instance.post(
          "https://cuk.comatching.site/auth/user/api/pickme",
          {
            amount: heartCount,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("교환 성공!");

          setUserPoint((prevState) => ({
            ...prevState,
            point: prevState.point - totalAmount,
            pickme: prevState.pickme + heartCount,
          }));
          navigate("/", { replace: true });
        } else {
          alert("교환 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("교환 중 에러 발생:", error);
        alert("교환 요청 처리 중 오류가 발생했습니다.");
      }
    } else {
      alert("포인트가 부족합니다.");
    }
  };
  const handleConfirm = () => {
    setShowModal(false);
    handleHeartExchange();
  };
  return (
    <div className="container">
      <HeaderBackPoint currentPoint={userPoint.point} />
      <Background />
      
      <div className="charge-request-clicked">
        <div className="heart-clicked-top-page">포인트 전환하기</div>
        <div className="request-text">하트를 늘려서 내가 뽑힐 기회를 추가하세요</div>
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
        <div className="heart-counter">
            <button className="heart-decrease" onClick={handleDecreaseHeart}>-</button>
            <span className="heart-count">{heartCount}</span>
            <button className="heart-increase" onClick={handleIncreaseHeart}>+</button>
        </div>

        <button className="heart-button" onClick={() => setShowModal(true)}>
          충전 요청
        </button>
        <hr className="gray-divider" />

        {/* 주의 사항 텍스트 추가 */}
        <div className="caution-text">주의 사항</div>

        <li className="charge-request-clicked-text">
          입금 후 포인트 충전을 원하거나
        </li>
        <li className="charge-request-clicked-text">
          포인트를 PickMe로 바꾸고 싶을때 
        </li>
        <li className="charge-request-clicked-text">
          요청 후에는 입금 화면과 아이디를 보여 주세요.
        </li>
        <li className="charge-request-clicked-text">
          버튼 남용 시 이용이 제한될 수 있으니 
        </li>
      </div>
      {showModal && (
        <HartConfirmationModal
          totalAmount={totalAmount}
          heartCount={heartCount}
          remainingPoint={remainingPoint}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Heart;
