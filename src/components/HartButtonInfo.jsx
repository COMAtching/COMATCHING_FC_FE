import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms"; // Assuming this is correctly exported from somewhere

function HartButtonInfo({
    point,
    handleChargeRequest,
    chargeclick,
    handleToggleClick,
}) {
    

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [hearts, setHearts] = useState("");
    const pointsPerHeart = 500; // 하트 당 500 포인트

    const handleHeartsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setHearts(value > 0 ? value : 0);
      };
    
      const totalPointsNeeded = hearts * pointsPerHeart;
    
      const handleHeartExchange = async () => {
        if (point >= totalPointsNeeded) {
            try {
            const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
                const [name, value] = cookie.split('=');
                acc[name] = value;
                return acc;
            }, {});
            const accessToken = cookies.Authorization;
    
            const response = await axios.post("https://cuk.comatching.site/auth/user/api/pickme", {
                amount: hearts
            }, {
                headers: {
                Authorization: `Bearer ${accessToken}`
            }
            });
    
            if (response.status === 200) {
                alert("교환 성공!");
                
                setUserInfo(prevState => ({
                ...prevState,
                point: prevState.point - totalPointsNeeded,
                pickme: prevState.pickme + hearts
                
            }));
            window.location.reload();
            handleToggleClick();
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
    return (
        <div className="charge-request-clicked">
        <div className="charge-request-clicked-top">
            ❤️포인트 하트로 교환하기
            <button
            className="charge-request-clicked-img"
            type="button"
            onClick={handleToggleClick}
            //onClick={handleNotService}
            >
            <img
                src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrowup.svg`}
                alt="충전요청 닫기"
            />
            </button>
        </div>
        <li className="charge-request-clicked-text">
            500P당 1회의 기회를 가질 수 있습니다
        </li>
        <li className="charge-request-clicked-text">
            포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
        </li>
        
            <div className="heart-input-container">
                <label htmlFor="heart-input">❤️교환할 하트 수 :</label>
                <input
                    type="number"
                    value={hearts}
                    onChange={handleHeartsChange}
                    min="0"
                    className="heart-input"
                    placeholder="0"
                />
            </div>

            <div className="points-needed ">
                <div> 
                    <p>필요 포인트: {totalPointsNeeded}P</p>
                    <p>현재 포인트: {point}P</p>
                </div>
                <button
                className="charge-request-clicked-button"
                onClick={() => { if (point >= totalPointsNeeded) handleHeartExchange(); }}
                disabled={point < totalPointsNeeded}
                >
                    {point >= totalPointsNeeded ? "교환하기" : "포인트부족"}
                </button>
            </div>
        
        </div>
    );
}

export default HartButtonInfo;
