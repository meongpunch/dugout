import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./TodayQuiz.css";
import "../../components/Guide.css";

const TodayQuiz = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  // 토스트 상태
  const [toastOpen, setToastOpen] = useState(false);

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

  // 1.6초 뒤 토스트 자동 닫기
  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 700);
    return () => clearTimeout(t);
  }, [toastOpen]);

  const triggerConfetti = () => {
    // 1. 이모지 모양 정의
    const baseball = confetti.shapeFromText({ text: '⚾', scalar: 3 });
    const party = confetti.shapeFromText({ text: '🎉', scalar: 3 });

    // 공통 설정값
    const defaults = {
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C3000F", "#ffffff", "#EFFF33"], // 기아 컬러
      ticks: 200,
    };

    // 💥 1탄: 주인공들 (야구공, 폭죽) - 많이, 크게!
    confetti({
      ...defaults,
      particleCount: 80, // 이모지 개수를 100개로 넉넉하게!
      shapes: [baseball, party],
      scalar: 2, // 이모지는 커야 잘 보입니다
    });

    // 🎊 2탄: 배경 효과 (동그라미, 네모) - 적당히, 작게!
    confetti({
      ...defaults,
      particleCount: 30, // 배경은 50개 정도만
      shapes: ['circle', 'square'],
      scalar: 1, // 배경은 작게
    });
  };

  const handleOptionClick = (id) => {
    if (id === 2) {
      setSelectedOption(id);
      triggerConfetti();
      setToastOpen(false);
    } else {
      // 오답일 때 토스트 열기
      setToastOpen(true);
      setSelectedOption(null);
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
              className={`option-btn ${selectedOption === option.id ? "active" : ""
                }`}
              onClick={() => handleOptionClick(option.id)}
              disabled={isCorrectSelected && option.id !== 2}
            >
              <span className="option-text">{option.name}</span>
              {option.id === 2 && !isCorrectSelected && (
                <div className="guide-dot"></div>
              )}
            </button>
          ))}
        </div>

        {isCorrectSelected && (
          <div className="confirm-area">
            <button className="confirm-btn btn" onClick={() => navigate(-1)}>
              <div className="guide-dot"></div>
              확인
            </button>
          </div>
        )}
      </div>

      {/* 토스트 메시지 UI */}
      {toastOpen && <div className="toast-msg">아웃! 다시 도전하세요!</div>}
    </div>
  );
};

export default TodayQuiz;
