import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumPgReview.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

const mockSeat = {
  stadiumName: "서울 잠실 야구장",
  seatTitle: "오렌지 219구역 194번",
  price: "금액 주중: 18,000원 / 주말 : 20,000원",
  tags: ["#도파민충전", "#시야정면", "#화장실미리GO"],
  heroImg: "/img/stadium-review-main.svg",
};

const mockSummary = [
  { key: "view", label: "시야 좋아요", count: 1528, icon: "👀" },
  { key: "photo", label: "사진 잘 나와요", count: 985, icon: "📷" },
  { key: "toilet", label: "화장실 멀어요", count: 905, icon: "🚽" },
  { key: "family", label: "응원하기 좋아요", count: 546, icon: "📣" },
  { key: "safe", label: "좌석 좁아요", count: 521, icon: "💀" },
  { key: "food", label: "매점 가까워요", count: 123, icon: "🛒" },
];

const mockReviews = [
  {
    id: 1,
    user: "대전초신맹구",
    avatar: "/img/stadium-profile-1.svg",
    rating: 4.0,
    seatExp: "직관 8 · 잠실구장 방문 수 2",
    imgs: ["/img/stadium-review-1.svg", "/img/stadium-review-1-1.svg"],
    text:
      "잠실은 두 번째 직관인데 야푸로 유명한 이유가 있네요 사실 이거 또 먹고 싶어서 야구보러 옴ㅋㅋㅎ 야구는 잘 모르지만 응원 열기가 뜨거워서 신나는 기분 내기 좋은 좌석이에요 굿굿👍",
    chips: ["매점 가까워요", "응원하기 좋아요", "시야 좋아요"],
    icon: ["🛒", "📣", "👀"],
    counts: { food: 123, family: 546, view: 1528 },
  },
  {
    id: 2,
    user: "서초구일찐김혜원",
    avatar: "/img/stadium-profile-2.svg",
    rating: 4.0,
    seatExp: "직관 8 · 잠실구장 방문 수 2",
    imgs: ["/img/stadium-review-2.svg", "/img/stadium-review-2-1.svg"],
    text:
      "내야 외야 다 잘 보이는 최고 시야 자리.. 지금은 시원한데 한여름엔 더울 듯. 선수들 보기에는 거리가 조금 있지만 응원열기 느끼기에는 최고네요ㅎㅎ 근데 앉아 있을 새가 없어서 조금 힘들긴 함 😂 다음엔 응원단석이랑 조금 멀리 앉을 것 같아요",
    chips: ["화장실 멀어요", "응원하기 좋아요", "매점 가까워요"],
    icon: ["🚽", "📣", "🛒"],
    counts: { toilet: 905, family: 546, view: 1528 },
  },
  {
    id: 3,
    user: "신림동낙화유수딘",
    avatar: "/img/stadium-profile-3.svg",
    rating: 4.0,
    seatExp: "직관 8 · 잠실구장 방문 수 2",
    imgs: ["/img/stadium-review-3.svg", "/img/stadium-review-3-1.svg"],
    text:
      "잠실구장 풍경 보고 싶고, 내야 외야 한 눈에 보고 싶고, 무엇보다 열정적으로🔥 응원하는 자리 좋아하는 분들이라면 이 자리 강추.. 얼마나 열정적이냐? 야푸 먹을 시간이 없습니다.",
    chips: ["응원하기 좋아요", "사진 잘 나와요", "좌석 좁아요"],
    counts: { family: 546, photo: 985, safe: 123 },
  },
];

export default function SeatReview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ state 없을 때 대비 (직접 url로 들어오는 경우)
  const stadiumName = state?.stadiumName ?? mockSeat.stadiumName;

  const [sort, setSort] = useState("추천순");
  const [filterKey, setFilterKey] = useState(null);

  const filtered = useMemo(() => {
    let list = [...mockReviews];
    if (filterKey) {
      const target = mockSummary.find((s) => s.key === filterKey)?.label;
      if (target) list = list.filter((r) => r.chips.includes(target));
    }
    if (sort === "최신순") list = list.slice().reverse();
    return list;
  }, [sort, filterKey]);

  return (
    <>
      <div className="sr-page">
        <section
        className="sr-hero"
        style={{ backgroundImage: `url(${mockSeat.heroImg})` }}
        >
        <div className="hero-header">
            <MainPgHeader logoType="back" btnType="ticket" />
        </div>

        <div className="detail-title detail-title--onHero">
            <p className="stadium-name">{stadiumName}</p>
        </div>
        </section>

        {/* CONTENT SHEET */}
        <main className="sr-sheet">
          <div className="sr-seatTitle">{mockSeat.seatTitle}</div>
          <div className="sr-price">{mockSeat.price}</div>

          <div className="sr-tagsRow">
            {mockSeat.tags.map((t) => (
              <span key={t} className="sr-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="sr-sectionHead">
            <h2 className="sr-h2">리뷰</h2>
          </div>

          <div className="sr-summary">
            {mockSummary.map((s) => {
              const active = filterKey === s.key;
              return (
                <button
                  key={s.key}
                  className={`sr-pill ${active ? "isActive" : ""}`}
                  onClick={() => setFilterKey(active ? null : s.key)}
                  type="button"
                >
                  <span className="sr-pillIcon">{s.icon}</span>
                  <span className="sr-pillText">{s.label}</span>
                  <span className="sr-pillCount">{s.count.toLocaleString()}</span>
                </button>
              );
            })}
          </div>

          <div className="sr-sortRow">
            <button
              type="button"
              className={`sr-sortBtn ${sort === "추천순" ? "isOn" : ""}`}
              onClick={() => setSort("추천순")}
            >
              + 추천순
            </button>
            <button
              type="button"
              className={`sr-sortBtn ${sort === "최신순" ? "isOn" : ""}`}
              onClick={() => setSort("최신순")}
            >
              + 최신순
            </button>
          </div>

          <section className="sr-list" aria-label="리뷰 리스트">
            {filtered.map((r) => (
              <article key={r.id} className="sr-card">
                <div className="sr-cardHead">
                  <div className="sr-user">
                    <img className="sr-avatar" src={r.avatar} alt="" />
                    <div>
                      <div className="sr-userName">{r.user}</div>
                      <div className="sr-userMeta">
                        <span className="sr-rating">리뷰 ★ {r.rating}</span>
                        <span className="sr-dot">·</span>
                        <span>{r.seatExp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sr-photoGrid">
                  <img className="sr-photo" src={r.imgs[0]} alt="" />
                  <img className="sr-photo" src={r.imgs[1]} alt="" />
                </div>

                <p className="sr-text">{r.text}</p>

                <div className="sr-actions">
                  {r.chips.map((label) => {
                    const found = mockSummary.find((s) => s.label === label);
                    const cnt =
                      found?.key && r.counts[found.key]
                        ? r.counts[found.key].toLocaleString()
                        : "0";
                    return (
                      <button key={label} type="button" className="sr-actionPill">
                        <span className="sr-actionLabel">{label}</span>
                        <span className="sr-actionCount">{cnt}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
