import React, { useState, useEffect  } from "react";
import { useRecoilState } from "recoil";
import Background from "../components/Background.jsx";
import { useNavigate } from "react-router-dom";
import "../css/pages/Charge.css"; // 스타일링을 위한 CSS 파일 생성
import HeaderBackPoint from "../components/HeaderBackPoint.jsx";
import { charge,userState } from "../Atoms";
import AccountButtonInfo from "../components/AccountButtonInfo.jsx";
import instance from "../axiosConfig.jsx"; // axios 인스턴스 불러오기
import ChargeConfirmationModal from "../components/ChargeConfirmationModal.jsx";// Modal 컴포넌트 불러오기

function Charge() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [userPoint, setUserPoint] = useRecoilState(userState);
  const [chargeState, setChargeState] = useRecoilState(charge); // Recoil 상태 불러오기
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal 상태 추가
  const navigate = useNavigate();
  const accountNumber = "토스뱅크 1001-4935-3543"; // 계좌번호를 여기에 입력

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAccountToggleClick = () => {
    setIsAccountClicked((prevIsClicked) => !prevIsClicked);
  };

  const handleSubmit = async () => {
    if (amount == "" || parseInt(amount) <= 0) {
      alert("충전할 금액을 1원 이상 입력해 주세요.");
      return; // 유효하지 않으면 함수 종료
    }
    setShowModal(true); // Modal 표시
  };

  const handleConfirm = async () => {
    setShowModal(false); // Modal 닫기
    setIsButtonDisabled(true);

    try {
      const response = await instance.post("/auth/user/api/charge", {
        amount: parseInt(amount),
      });

      if (response.status === 200) {
        navigator.clipboard.writeText(accountNumber);
        alert(
          "충전 요청이 성공적으로 전송되었습니다. 부스에 가서 계좌 입금 확인 해주세요!"
        );
        alert("토스뱅크 1001-4935-3543\n계좌번호가 복사되었습니다.");
        navigate("/", { replace: true });
      } else {
        alert("충전 요청에 실패했습니다.");
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error submitting charge request:", error);
      alert("충전 요청 중 오류가 발생했습니다.");
      setIsButtonDisabled(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Modal 닫기
  };
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
  return (
    <div className="container">
      <HeaderBackPoint currentPoint={userPoint.point} />
      <Background />
      {isAccountClicked ? (
        <AccountButtonInfo
          handleToggleClick={handleAccountToggleClick}
          accountNumber={accountNumber}
        />
      ) : (
        <div className="charge-request-unclicked">
          💸입금 계좌 확인하기
          <button className="charge-request-unclicked-img" onClick={handleAccountToggleClick}>
            <img src={`${
                import.meta.env.VITE_PUBLIC_URL
              }../../assets/arrowbottom.svg`} alt="충전요청 열기" />
          </button>
        </div>
      )}
      <div className="charge-request-clicked">
        <div className="charge-clicked-top-page">포인트 충전 요청하기</div>
        <div className="request-text">입금 후 입금 금액을 입력해주세요</div>
        <div className="charge-input-container">
          <img src="/assets/chargepoint.svg" alt="Charge Point" className="charge-img" />
          <input
            type="text"
            className="charge-inputs"
            value={amount}
            onChange={handleAmountChange}
            placeholder="금액 입력"
          />
          <span className="currency-circle">원</span>
        </div>
        <button className="charge-button" onClick={handleSubmit} disabled={isButtonDisabled}>
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
          <ChargeConfirmationModal
            amount={amount}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            accountNumber={accountNumber}
          />
        )}
    </div>
  );
}

export default Charge;
