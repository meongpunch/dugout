// Calendar.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Calendar.css";

/* ✅ 타임라인 데이터: 여기만 추가/수정하면 됨 */
const TIMELINE_ITEMS = [
  {
    id: "1",
    date: "2026-07-11",
    day: "토",
    teamLogo: "/img/lockerroom-calendar-team-kia.png",
    homeTeam: "기아 타이거즈",
    awayTeam: "삼성 라이온즈",
    stadium: "서울 잠실 야구장",
    time: "14:00",
    meta: "2차전 • 96번째 경기",
    seat: "3루 블루석 116블록 4열 40번",
    reviewLink: "/lockerroom/review/2026-07-11",
    hasReview: false,
  },
  {
    id: "2",
    date: "2026-07-11",
    day: "토",
    teamLogo: "/img/lockerroom-calendar-team-kia.png",
    homeTeam: "기아 타이거즈",
    awayTeam: "삼성 라이온즈",
    stadium: "서울 잠실 야구장",
    time: "14:00",
    meta: "2차전 • 96번째 경기",
    seat: "3루 블루석 116블록 4열 40번",
    reviewLink: "/lockerroom/review/2026-07-11-2",
    hasReview: true,
  },
  {
    id: "3",
    date: "2026-07-05",
    day: "일",
    teamLogo: "/img/lockerroom-calendar-team-kia.png",
    homeTeam: "기아 타이거즈",
    awayTeam: "LG 트윈스",
    stadium: "서울 잠실 야구장",
    time: "18:30",
    meta: "2차전 • 96번째 경기",
    seat: "1루 테이블석 10블록 2열 5번",
    reviewLink: "/lockerroom/review/2026-07-05",
    hasReview: false,
  },
];

/* ✅ "07.11" 형태 만들기 */
function formatMMDD(dateStr) {
  const [, mm, dd] = dateStr.split("-");
  return `${mm}.${dd}`;
}

export default function Calendar({
  initialYear = 2026,
  initialMonth = 6, // ✅ 처음 화면: 7월(0=1월)
  events = {
    "2026-07-11": {
      imageUrl: "/img/lockerroom-calendar-bg-1.png",
      link: "/game/2026-07-11",
    },
    "2026-06-15": {
      imageUrl: "/img/lockerroom-calendar-bg-2.png",
      link: "/concert/2026-07-15",
    },
    "2026-07-05": {
      imageUrl: "/img/lockerroom-calendar-bg-3.png",
      link: "/match/2026-07-22",
    },
  },
}) {
  const navigate = useNavigate();
  const [ym, setYm] = useState({ y: initialYear, m: initialMonth });

  // ✅ 6주(42칸) 고정 + 일요일 시작(일~토)
  const weeks = useMemo(
    () => buildMonthGrid6WeeksSunStart(ym.y, ym.m),
    [ym.y, ym.m]
  );

  // ✅ 선택 날짜(이벤트 없어도 선택 테두리 표시)
  const [selectedKey, setSelectedKey] = useState(null);

  const goPrev = () => {
    setYm((prev) => {
      const d = new Date(prev.y, prev.m - 1, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
    setSelectedKey(null);
  };

  const goNext = () => {
    setYm((prev) => {
      const d = new Date(prev.y, prev.m + 1, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
    setSelectedKey(null);
  };

  const title = `${ym.y}.${String(ym.m + 1).padStart(2, "0")}`;
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // ✅ 어떤 날짜든 선택은 되고, 이벤트 있는 날만 이동
  const handleCellClick = (cell) => {
    setSelectedKey(cell.key);
    const link = events[cell.key]?.link;
    if (link) navigate(link);
  };

  // ✅ 타임라인: 날짜별 묶지 않고 그대로 리스트 렌더
  const timelineItems = useMemo(() => {
    // 최신 날짜가 위로 오게 하고 싶으면 아래 sort 유지
    return [...TIMELINE_ITEMS].sort((a, b) => (a.date < b.date ? 1 : -1));
    // 정렬 필요 없으면: return TIMELINE_ITEMS;
  }, []);

  return (
    <div className="calendarPg">
      {/* ✅ 상단 헤더 */}
      <section className="header">
        <div className="inner">
          <div className="editCover-top">
            <Link to="/lockerroom" className="back">
              <img src="/img/lockerroom-back.svg" alt="뒤로가기" />
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ 달력 */}
      <section className="calendar">
        <div className="inner">
          <div className="mc-panel">
            <div className="mc-header">
              <button
                type="button"
                onClick={goPrev}
                className="mc-arrow"
                aria-label="prev"
              >
                <img src="/img/lockerroom-chevron.svg" alt="" />
              </button>

              <div className="mc-title">{title}</div>

              <button
                type="button"
                onClick={goNext}
                className="mc-arrow"
                aria-label="next"
              >
                <img src="/img/lockerroom-chevron-2.svg" alt="" />
              </button>
            </div>

            <div className="mc-weekHead">
              {weekDays.map((d) => (
                <div key={d} className="mc-weekDay">
                  {d}
                </div>
              ))}
            </div>

            <div className="mc-grid">
              {weeks.flat().map((cell) => {
                const ev = events[cell.key];
                const isSelected = selectedKey === cell.key;
                const isEventDay = !!ev;

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => handleCellClick(cell)}
                    className={[
                      "mc-cell",
                      cell.inMonth ? "inMonth" : "outMonth",
                      isEventDay ? "eventDay" : "noEvent",
                      isSelected ? "selected" : "",
                    ].join(" ")}
                    aria-label={cell.key}
                  >
                    <span className="mc-dayNum">{cell.day}</span>

                    {ev?.imageUrl && (
                      <img
                        src={ev.imageUrl}
                        alt=""
                        draggable={false}
                        className="mc-eventImg"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 요약 */}
      <section className="summary">
        <div className="inner">
          <h2 className="title">이번달 직관 승률</h2>

          <div className="gauge" role="group" aria-label="이번달 직관 승률 게이지">
            <div className="bege">
              <p className="deco-text">
                3연승 중<span aria-hidden="true">🔥</span>
              </p>
            </div>

            <div className="gauge-box">
              <div className="arc" aria-hidden="true">
                <img
                  className="arcImg"
                  src="/img/lockerroom-calendar-stats.svg"
                  alt=""
                />
              </div>

              <div className="baseball-icon" aria-hidden="true">
                <img src="/img/lockerroom-baseball.png" alt="" />
                <div className="result">
                  <p className="percent">67%</p>
                  <p className="comment">마음 편한 직관러</p>
                </div>
              </div>
            </div>
          </div>

          <div className="gauge-btn">
            <Link to="" className="gauge-cta">
              <p className="btn-txt">
                내 직관 히스토리{" "}
                <span className="cta-icon" aria-hidden="true">
                  <img src="/img/editProfile-arrow.svg" alt="" />
                </span>
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ 타임라인 (날짜별 묶기 X / 카드 1개씩 그대로 나열) */}
<section className="timeline">
  <div className="inner">
    <h2 className="title">타임라인</h2>

    <div className="timeline-list">
      {timelineItems.map((it) => (
        <div key={it.id} className="timeline-row">

          {/* ===== 왼쪽 날짜 ===== */}
          <div className="timeline-date">
            <p className="timeline-mmdd">{formatMMDD(it.date)}</p>
            <p className="timeline-day">{it.day}</p>
          </div>

          {/* ===== 오른쪽 카드 ===== */}
            <article className="timeline-card">
            <div className="card-grid">
                {/* ✅ 왼쪽: 로고 + 세로라인 묶음 */}
                <div className="card-left" aria-hidden="true">
                <img className="timeline-logo" src={it.teamLogo} alt="" />
                <span className="vline"></span>
                </div>

                {/* ✅ 오른쪽: 제목 + 본문 묶음 */}
                <div className="card-right">
                <div className="timeline-head">
                    <p className="timeline-match-txt">
                    {it.homeTeam} <span className="vs">vs</span> {it.awayTeam}
                    </p>

                    <button type="button" className="timeline-more" aria-label="more">
                    <img src="/img/lockerroom-dots-vertical.svg" alt="" />
                    </button>
                </div>

                <div className="timeline-body">
                    <p className="timeline-stadium">{it.stadium}</p>

                    <div className="timeline-meta">
                    <strong className="timeline-time">{it.time}</strong>
                    <span className="timeline-dots">•</span>
                    <span className="timeline-sub">{it.meta}</span>
                    </div>

                    <p className="timeline-seat">{it.seat}</p>

                    <div className="timeline-actions">
                    <Link to={it.reviewLink} className="timeline-review">
                        <img src="/img/lockerroom-calendar-review.svg" alt="" />
                        리뷰 쓰기
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </article>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}

/* ✅ 달력 그리드 생성 */
function buildMonthGrid6WeeksSunStart(y, m) {
  const first = new Date(y, m, 1);
  const startDow = first.getDay(); // 0=일..6=토
  const gridStart = new Date(y, m, 1 - startDow);

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);

    const yy = d.getFullYear();
    const mm = d.getMonth();
    const dd = d.getDate();

    const key = `${yy}-${String(mm + 1).padStart(2, "0")}-${String(dd).padStart(
      2,
      "0"
    )}`;

    return { key, day: dd, inMonth: yy === y && mm === m };
  });

  const weeks = [];
  for (let i = 0; i < 6; i++) weeks.push(cells.slice(i * 7, i * 7 + 7));
  return weeks;
}
