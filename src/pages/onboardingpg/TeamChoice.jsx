import React, { useState } from "react";
import "./TeamChoice.css";
import { useNavigate } from "react-router-dom";

const TEAMS = [
  { id: "ssg", name: "SSG 랜더스", logo: "/img/onboarding-logo-ssg.svg" },
  { id: "kiwoom", name: "키움 히어로즈", logo: "/img/onboarding-logo-kiwoom.svg" },
  { id: "lg", name: "LG 트윈스", logo: "/img/onboarding-logo-lg.svg" },
  { id: "kt", name: "KT 위즈", logo: "/img/onboarding-logo-kt.svg" },
  { id: "kia", name: "KIA 타이거즈", logo: "/img/onboarding-logo-kia.svg" },
  { id: "nc", name: "NC 다이노스", logo: "/img/onboarding-logo-nc.svg" },
  { id: "samsung", name: "삼성 라이온즈", logo: "/img/onboarding-logo-samsung.svg" },
  { id: "lotte", name: "롯데 자이언츠", logo: "/img/onboarding-logo-lotte.svg" },
  { id: "doosan", name: "두산 베어스", logo: "/img/onboarding-logo-doosan.svg" },
  { id: "hanwha", name: "한화 이글스", logo: "/img/onboarding-logo-hanwha.svg" },
];

const TeamChoice = () => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam((prev) => {
      const next = prev?.id === team.id ? null : team;
      if (!next) localStorage.removeItem("favoriteTeamId");
      return next;
    });
  };

  const handleStart = () => {
    if (!selectedTeam) return;
    localStorage.setItem("favoriteTeamId", selectedTeam.id);
    navigate("/");
  };

  return (
    <div className="TeamChoice-container">
      <div className="inner">
        {/* 상단 헤더 */}
        <div className="TeamchoiceHeader">
          <div className="innerHeader">
            <button
              className="back-btn"
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로가기"
            >
              <img src="/img/onboarding-back-icon.svg" alt="" />
            </button>
          </div>
        </div>

        {/* ✅ 스크롤 영역: 타이틀 + 카드 + 스페이서 전부 포함 */}
          <div className="contents">
            <h2>
              이제, 10번째 선수로 <br />
              계약할 시간입니다
            </h2>
            <h3>당신의 심장이 뛰는 구단을 선택해 주세요.</h3>
          </div>
 <div className="scrollArea">
          <div className="choice-box">
            {TEAMS.map((team) => {
              const isSelected = selectedTeam?.id === team.id;

              return (
                <button
                  key={team.id}
                  type="button"
                  className={`team-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleTeamClick(team)}
                  aria-pressed={isSelected}
                >
                  <div className="team-logo-wrap">
                    <img className="team-logo" src={team.logo} alt={team.name} />
                  </div>
                  <p className="team-name">{team.name}</p>
                  {isSelected && <span className="selected-dot" />}
                </button>
              );
            })}
          </div>

          {/* ✅ CTA에 가리지 않게 하는 물리적 스페이서 */}
          <div className="scroll-spacer" aria-hidden="true" />
        </div>

        {/* 하단 CTA */}
        <div className="cta-fixed">
          <button
            className={`start-btn ${selectedTeam ? "active" : ""}`}
            type="button"
            disabled={!selectedTeam}
            onClick={handleStart}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChoice;
