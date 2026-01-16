import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti"; // 1. 라이브러리 임포트
import "./TodayQuiz.css";

const TodayQuiz = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const quizData = {
    question:
      "2024년도 KBO 리그 최초로,\n최연소·최소 경기 30-30 클럽에\n달성한 선수는 누구일까요?",
    options: [
      { id: 1, name: "박종혁" },
      { id: 2, name: "김도영" },
      { id: 3, name: "이의리" },
      { id: 4, name: "홍원빈" },
    ],
  };

  const images = {
    default: "/img/quiz_child.jpg",
    correct: "/img/quiz_kim_heart.jpg",
  };

  // 2. 폭죽 터뜨리는 함수
  const triggerConfetti = () => {
    confetti({
      particleCount: 150, // 종이 조각 개수
      spread: 70, // 퍼지는 각도
      origin: { y: 0.6 }, // 시작 위치 (0.6은 화면 중간보다 약간 아래)
      colors: ["#C3000F", "#ffffff", "#EFFF33"], // 기아 타이거즈 색상 (빨강, 흰색, 형광노랑)
    });
  };

  const handleOptionClick = (id) => {
    setSelectedOption(id);

    // 3. 김도영(id: 2)을 눌렀을 때만 폭죽 실행
    if (id === 2) {
      triggerConfetti();
    }
  };

  const isCorrectSelected = selectedOption === 2;

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="header-title">오늘의 퀴즈</h2>
      </header>

      <div className="inner quiz">
        <div className="quiz-img-box">
          <img
            src={isCorrectSelected ? images.correct : images.default}
            alt="퀴즈 이미지"
          />
        </div>

        <p className="quiz-question">
          {quizData.question.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        <div className="quiz-options">
          {quizData.options.map((option) => (
            <button
              key={option.id}
              className={`option-btn ${
                selectedOption === option.id ? "active" : ""
              }`}
              onClick={() => handleOptionClick(option.id)}
            >
              <span className="option-text">{option.name}</span>
              {option.id === 2 &&
                !isCorrectSelected &&
                selectedOption === null && <span className="hint-dot"></span>}
            </button>
          ))}
        </div>

        {/* 확인 버튼: 보기를 선택했을 때만 나타남 */}
        {selectedOption && (
          <div className="confirm-area">
            <button className="confirm-btn btn" onClick={() => navigate("/")}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayQuiz;
