/* =========================
   Ticket.jsx (오른쪽으로만 회전)
========================= */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ticket.css";

const Ticket = () => {
  const navigate = useNavigate();

  // ✅ 회전 누적 (0, 180, 360, 540...)
  const [turn, setTurn] = useState(0);
  const onFlip = () => setTurn((t) => t + 1);

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
                  <p className="ticket-date">2026.07.11</p>

                  <div className="ticket-info">
                    <p className="stadium">서울 잠실 야구장</p>

                    <div className="teams">
                      <div className="home-team">
                        <div className="home-kia">
                          <img src="/img/ticket-kia.svg" alt="" />
                          <p className="home-name">기아 타이거즈</p>
                        </div>

                        <p className="vs">vs</p>

                        <div className="away">
                          <img src="/img/ticket-samsung.svg" alt="" />
                          <p className="away-name">삼성 라이온즈</p>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-schedule">
                      <div className="schedule-date">
                        <p className="schedule-label">일정</p>
                        <p className="match-date">
                          07.11 <em className="sub">(토)</em>
                        </p>
                      </div>

                      <div className="schedule-time">
                        <p className="schedule-label">경기 시작</p>
                        <p className="match-date">
                          14:00 <em className="sub">~</em>
                        </p>
                      </div>
                    </div>

                    <div className="ticket-bottom">
                      <div className="ticket-seat">
                        <p className="seat-label">좌석</p>
                        <p className="seat-text">
                          3루 블루석
                          <br />
                          116블록 4열 40번
                        </p>
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
                  <img className="ticket-backImg" src="/img/ticket-flip.svg" alt="티켓 뒷면"/>
                  <p className="ticket-date back">2026.07.11</p>
                  <img className="kia-logo" src="/img/ticket-kia-logo.svg" alt="" />
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
