# COMAtching FC - 부천 FC 관람 티켓을 활용한 AI 응원 친구 매칭 서비스

![COMAtching FC](attachment:d371632a-0f5e-4bf4-81c2-c1e3de4f3286:f9a47982-261b-4b57-90ec-3477960a1a7f.png)

**소개:**  
부천 FC 축구 경기장에서 실제 운영된 AI 매칭 서비스로, 관람 티켓을 활용해 관중 간 함께 응원할 친구를 AI가 매칭해주는 웹앱

**기간:**  
2024.9.4 ~ 2024.10.30

**역할:**  
프론트엔드 (2명 공동 개발)

---

## 💻 기술 스택

- `React`
- `Recoil`
- `jsQR`
- `react-router-dom`
- `Axios`
- `Chart.js / react-chartjs-2`
- `react-modal`

[GitHub Repository](https://github.com/ojspp41/Catspot_front)  
[Demo Video](https://youtube.com/shorts/ZDS1km9BB_k?si=KI7-pVQ4PTc8RRJN)

---

## 🔑 주요 성과

- **동적 공지사항 및 사용자 인터랙션 경험 강화**  
  - `Modal` 컴포넌트를 통한 순차적 공지사항 전달로 사용자 정보 제공 강화

- **React 기반 데이터 시각화 컴포넌트 개발**  
  - `Chart.js (react-chartjs-2)`를 활용해 사용자 성향(열정형, 집중형, 축알못형, 축잘알형, 먹방형, 인싸형)을 한눈에 파악할 수 있는 레이더 차트 구현

- **실시간 QR 코드 인식 및 인증 시스템 개발**  
  - 실시간 카메라 스트림 및 이미지 업로드를 활용해 `jsQR` 라이브러리 기반 QR 코드 스캔 및 인식 구현  
  - `<canvas>`를 활용하여 프레임 단위 영상 캡처 및 이미지 데이터 처리 수행  
  - 요청 중복 방지 로직을 통해 안정적인 API 인증 처리 구현  
  - 정규 표현식을 활용해 티켓 코드(‘T’로 시작, 10자리 숫자)의 유효성 검사 수행

- **멀티 스텝 사용자 등록 플로우 구현**  
  - 동적 UI 렌더링과 입력 유효성 검사를 통해 단계별로 필드(연령, 성별, SNS 아이디, 응원 선수, 닉네임) 순차 노출 및 등록 진행

- **재밌는 설문유형 및 사용자 인터랙션 강화**  
  - 참여자가 재미있게 유형을 선택할 수 있도록 설문 UI 구성  
  - **Recoil 상태 관리**를 활용하여 동적 질문과 점수 집계 구현, 실시간 사용자 성향 분석 진행

- **친구 매칭 시스템 개발**  
  - **Recoil 상태 관리**를 활용해 사용자 정보(응원 유형, 성별 등)를 전역으로 관리  
  - **드래깅(Dragging) 기능**을 도입하여 터치 스와이프 제스처로 직관적인 매칭 요청 진행  
  - 비동기 API 통신 및 로딩 컴포넌트를 통해 안정적인 매칭 요청 처리 및 결과 전달

---


## 추가 자료

- [React와 Chart.js로 구현하는 레이더 차트](https://ojspp41.tistory.com/99)
- [React와 Chart.js로 구현하는 레이더 차트: RadarChart 컴포넌트 분석](https://ojspp41.tistory.com/98)
