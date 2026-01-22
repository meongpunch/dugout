/* =========================
   Ticket.jsx (오른쪽으로만 회전)
========================= */
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Ticket.css";
import { TIMELINE_ITEMS } from "./Calendar"; // ✅ Calendar.jsx에서 export 한 데이터 재사용

// ✅ 팀명 -> 로고(svg) 매핑
const TEAM_LOGO = {
  "기아 타이거즈": "/img/ticket-kia.svg",
  "삼성 라이온즈": "/img/ticket-samsung.svg",
  "LG 트윈스": "/img/ticket-lg.svg",
  "SSG 랜더스": "/img/ticket-ssg.svg",
};

// ✅ "2025-07-26" -> "2025.07.26"
function formatDotDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

// ✅ "2025-07-26" -> "07.26"
function formatMMDD(dateStr) {
  const [, m, d] = dateStr.split("-");
  return `${m}.${d}`;
}

const Ticket = () => {
  const navigate = useNavigate();
  const { date } = useParams(); // ✅ URL에서 날짜 받음 (YYYY-MM-DD)

  // ✅ 회전 누적 (0, 180, 360, 540...)
  const [turn, setTurn] = useState(0);
  const onFlip = () => setTurn((t) => t + 1);

  // ✅ 해당 날짜의 경기 데이터 찾기
  const item = useMemo(
    () => TIMELINE_ITEMS.find((x) => x.date === date),
    [date]
  );

  // ✅ 방어: 해당 날짜 데이터 없을 때
  if (!item) {
    return (
      <div className="ticketPg">
        <section className="top-btn">
          <div className="inner">
            <div className="link-btn">
              <img src="/img/ticket-external.svg" alt="" />
            </div>

            <div className="colse-btn">
              <img
                className="colse-btn-img"
                src="/img/lockerroom-x-close.svg"
                alt="닫기"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/lockerroom/calendar");
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate("/lockerroom/calendar");
                }}
              />
            </div>
          </div>
        </section>

        <div style={{ padding: 24, color: "#fff" }}>
          <p style={{ marginBottom: 12 }}>해당 날짜의 티켓 정보가 없어요.</p>
          <button type="button" onClick={() => navigate("/lockerroom/calendar")}>
            캘린더로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const backLogo = TEAM_LOGO["기아 타이거즈"];
  const homeLogo = TEAM_LOGO[item.homeTeam] || "/img/ticket-default.svg";
  const awayLogo = TEAM_LOGO[item.awayTeam] || "/img/ticket-default.svg";

  return (
    <div className="ticketPg">
      <section className="top-btn">
        <div className="inner">
          <div className="link-btn">
            <img src="/img/ticket-external.svg" alt="" />
          </div>

          <div className="colse-btn">
            <img
              className="colse-btn-img"
              src="/img/lockerroom-x-close.svg"
              alt="닫기"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/lockerroom/calendar");
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate("/lockerroom/calendar");
              }}
            />
          </div>
        </div>
      </section>

      <section className="ticket">
        <div
          className="guide-click"
          style={{
            top: "38%",
            right: "10%",
            zIndex: 100,
          }}
        />
        <div className="inner">
          <div
            className="ticket-card"
            onClick={onFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onFlip();
            }}
          >
            {/* ✅ 항상 +방향으로 누적 회전 */}
            <div
              className="ticket-cardInner"
              style={{ transform: `rotateY(${turn * 180}deg)` }}
            >
              {/* FRONT */}
              <div className="ticket-face ticket-front">
                <div className="ticket-visual">

                  {/* ✅ 상단 날짜 */}
                  <p className="ticket-date">{formatDotDate(item.date)}</p>

                  <div className="ticket-info">
                    {/* ✅ 구장 */}
                    <p className="stadium">{item.stadium}</p>

                    <div className="teams">
                      <div className="home-team">
                        <div className="home-kia">
                          {/* ✅ 홈 로고 */}
                          <img src={homeLogo} alt={`${item.homeTeam} 로고`} />
                          <p className="home-name">{item.homeTeam}</p>
                        </div>

                        <p className="vs">vs</p>

                        <div className="away">
                          {/* ✅ 어웨이 로고 (날짜별로 자동 변경) */}
                          <img src={awayLogo} alt={`${item.awayTeam} 로고`} />
                          <p className="away-name">{item.awayTeam}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-schedule">
                      <div className="schedule-date">
                        <p className="schedule-label">일정</p>
                        <p className="match-date">
                          {formatMMDD(item.date)} <em className="sub">({item.day})</em>
                        </p>
                      </div>

                      <div className="schedule-time">
                        <p className="schedule-label">경기 시작</p>
                        <p className="match-date">
                          {item.time} <em className="sub">~</em>
                        </p>
                      </div>
                    </div>

                    <div className="ticket-bottom">
                      <div className="ticket-seat">
                        <p className="seat-label">좌석</p>
                        {/* ✅ seat 문자열에 줄바꿈이 필요하면 그대로 렌더해도 됨 */}
                        <p className="seat-text">{item.seat}</p>
                      </div>

                      <div className="qr">
                        <img className="qr-img" src="/img/ticket-qr.svg" alt="" />
                        <p className="qr-code">102485800</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className="ticket-face ticket-back">
                <div className="ticket-backVisual">
                  <img
                    className="ticket-backImg"
                    src="/img/ticket-flip.svg"
                    alt="티켓 뒷면"
                  />
                  {/* ✅ 뒷면 날짜도 자동 */}
                  <p className="ticket-date back">{formatDotDate(item.date)}</p>

                  {/* ✅ 뒷면 로고도 홈팀 로고로 넣고 싶으면 */}
                  <img className="kia-logo" src={backLogo} alt="기아 타이거즈 로고" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ticket;
