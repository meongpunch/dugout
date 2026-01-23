import React, { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ReviewComplete.css";

const TIMELINE_ITEMS = [
  {
    id: "1",
    homeTeam: "기아 타이거즈",
    awayTeam: "삼성 라이온즈",
    stadium: "서울 잠실 야구장",
    time: "14:00",
    seatZone: "3루 블루석 116블록",
    seatNumber: "4열 40번",
  },
  {
    id: "2",
    homeTeam: "기아 타이거즈",
    awayTeam: "LG 트윈스",
    stadium: "서울 잠실 야구장",
    time: "18:30",
    seatZone: "1루 레드석 210블록",
    seatNumber: "7열 12번",
  },
  {
    id: "3",
    homeTeam: "SSG 랜더스",
    awayTeam: "기아 타이거즈",
    stadium: "인천 SSG랜더스필드",
    time: "19:00",
    seatZone: "외야 필드석 108B구역",
    seatNumber: "B열 22번",
  },
];

const ReviewComplete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const match = useMemo(
    () => TIMELINE_ITEMS.find((m) => m.id === id),
    [id]
  );

  // ✅ match 없으면 먼저 return
  if (!match) return <div className="reviewPg">경기 정보를 찾을 수 없어요.</div>;

  // ✅ 여기서 seatLabel 만들기
  const seatLabel = `[${match.stadium} · ${match.seatZone}]`;

  return (
    <div className="completePg">
      <section className="review-done">
        <div className="inner">
          <div className="review-container">
            <div className="colse-btn">
              <div className="colse-btn-img">
                <img
                  className="btn-img"
                  src="/img/lockerroom-x-close.svg"
                  alt="닫기"
                  onClick={() => navigate("/lockerroom/calendar")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      navigate("/lockerroom/calendar");
                  }}
                />
              </div>
            </div>

            <div className="review-tit-box">
              <h3 className="title">리뷰 작성 완료</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 아래 섹션에 seatLabel 출력 */}
      <section className="done-info">
        <div className="inner">
          <div className="done-card">
            <p className="done-desc">
              이 좌석에 대한 관람 후기가<br />
              좌석 정보에 추가됐어요
            </p>
            <div className="seat-chip">{seatLabel}</div>
          </div>
        </div>
      </section>

      <section className="done-footer">
        <div className="inner">
          <Link to="/lockerroom/calendar" className="done-btn">
            <div className="guide-dot"></div>
            완료
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReviewComplete;
