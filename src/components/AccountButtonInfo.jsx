import React from 'react';
import "../css/components/AccountButtonInfo.css";
function AccountButtonInfo({handleToggleClick}) {
    const accountNumber = "카카오뱅크 3333-17-9418736"; 
    const accountHolder = "홍길동";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountNumber);
        alert("계좌 번호가 복사되었습니다!");
    };

    return (
        <div className="charge-request-clicked">
            <div className="charge-request-clicked-top">
                💸입금 계좌 확인하기
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
            <div className="account-box">
                <p className="account-number">{accountNumber}</p>
                <p className="account-holder">{accountHolder}</p>
                
            </div>
            <button className="copy-button" onClick={copyToClipboard}>클립보드 복사</button>
        </div>
    );
}

export default AccountButtonInfo;
