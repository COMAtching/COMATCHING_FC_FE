import React, { useState } from "react";
import {
    tutorialBackdrop,
    tutorialSlide,
    tutorialImage,
} from "../css/components/TutorialSlides.css.ts"; // 수정된 import 경로

function TutorialSlides({ onComplete }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // TODO: 데이터 추후 디자인 확정되면 수정
    const slides = [
        {
        title: "가입 완료",
        message: "코매칭에 오신 것을 환영합니다!",
        image: " ",
        actionText: "밀어서 시작하기 →",
        },
        {
        title: "충전하기",
        message: "부스에 오셔서 포인트를 충전해요",
        image: " ",
        actionText: "밀어서 다음으로 →",
        },
        {
        title: "매칭하기",
        message: "원하는 옵션을 고르고 매칭해요",
        image: " ",
        actionText: "밀어서 다음으로  →",
        },
        {
        title: "단체미팅",
        message: "소개팅과 미팅까지 빠르고 편리하게",
        image: " ",
        actionText: "시작하기 →",
        },
    ];

    const handleSwipe = () => {
        if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
        } else {
        onComplete();
        }
    };

    return (
        <div className={tutorialBackdrop}>
        <div className={tutorialSlide} onClick={handleSwipe}>
            <h3>{slides[currentSlide].title}</h3>
            <h2>{slides[currentSlide].message}</h2>
            <div className={tutorialImage}>{slides[currentSlide].image}</div>
            <h2>{slides[currentSlide].actionText}</h2>
        </div>
        </div>
    );
}

export default TutorialSlides;