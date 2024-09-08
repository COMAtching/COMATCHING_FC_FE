import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderBack from "../components/HeaderBack";
import "../css/pages/Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import ResultInfoRrev from "../components/ResultInfoRrev";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig"; // 전역 axios 인스턴스 불러오기

function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState); // 결과 리뷰 상태 관리
  
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시된 사용자 인덱스

  useEffect(() => {
    // 결과 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await instance.get("/auth/user/api/history/matching");
        console.log("response history", response);
        if (response.status === 200 && response.data.code === "GEN-000") {
          setIsReview(response.data.data); // 응답 데이터 설정
          console.log("response.data.data", response.data.data);
        } else if (response.data.code === "HIS-001") {
          alert("결과가 남아있지 않습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [navigate, setIsReview]);

  const handleNextUser = () => {
    if (currentIndex < isReview.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousUser = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };



  return (
    <div>
      <div className="container">
        <HeaderBack />
        {isReview.length > 0 ? (
          isReview.map((user, index) => (
            <div key={index} style={{ marginBottom: "50px" }}>
              <ResultInfoRrev
                user={user} // 개별 사용자 정보를 전달
                ifMainpage={true}
              />
            </div>
          ))
        ) : (
          <p>사용자 정보를 불러오는 중...</p>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Checkresult;
