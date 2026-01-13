import React from "react";
import { useNavigate } from "react-router-dom";

// 1. 방금 만든 CSS 파일 연결하기
import "./BackButton.css";

const BackButton = ({ title }) => {
  const navigate = useNavigate();

  return (
    // style={...} 대신 className="..."을 쓰면 돼
    <div className="back-header-container">
      {/* 뒤로가기 버튼 */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <img src="/img/chevron-left.svg" alt="뒤로가기" />
      </button>

      {/* 타이틀 (있을 때만 표시) */}
      {title && <span className="header-title">{title}</span>}

      {/* 오른쪽 여백 */}
      <div className="empty-space"></div>
    </div>
  );
};

export default BackButton;
