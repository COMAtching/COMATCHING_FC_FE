import { useEffect, useRef, useState } from "react";
import "../css/pages/AdminPage.css";
import { useNavigate } from "react-router-dom";

import instance from "../axiosConfig.jsx";

function AdminPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Title");
  const [body, setBody] = useState("content");

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/check-role");
      // console.log("final:", response);
      // console.log("response.data:", response.data);
      // console.log("Role:", response.data.data);
      if (response.data.status === 200) {
        if (response.data.data === "ROLE_ADMIN") {
          // ROLE_ADMIN인 경우의 로직
        } else {
          // ROLE_ADMIN이 아닌 경우
          alert("접근 불가");
          navigate("/");
        }
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await instance.post("/auth/admin/api/notice/register", {
        title,
        body,
        expireDate: "2024-10-19",
      });
      console.log("response: ", response);
      if (response.data.status === 200) {
        alert("공지가 성공적으로 등록되었습니다.");
      } else {
        alert("공지 등록 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("공지 등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <div>
      <div className="adminpage-top">
        <img
          className="adminpage-Logo"
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/Logo.png`}
          alt="로고"
        />
      </div>
      <div className="adminpage-container">
        <div className="adminpage-preview">
          <div className="adminpage-preview-text">미리보기</div>
          <div className="adminpage-preview-container">
            <div className="adminpage-preview-title">{title}</div>
            <div className="adminpage-preview-maintext">{body}</div>
            <button className="adminpage-preview-button">네, 확인했어요</button>
          </div>
        </div>
        <div className="adminpage-typing">
          <div className="adminpage-typing-text">팝업 제목</div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="팝업 제목을 입력하세요"
            className="adminpage-topic-typing"
          />
          <div className="adminpage-typing-text">내용</div>

          <textarea
            name="body"
            value={body}
            onChange={handleInputChange}
            placeholder="공지 내용을 입력하세요"
            className="adminpage-text-typing"
          />
        </div>
      </div>
      <button className="Next-button active" onClick={handlePublish}>
        공지하기
      </button>
    </div>
  );
}

export default AdminPage;
