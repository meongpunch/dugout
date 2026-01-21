import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumPgReview.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

const getRandomViewCountById = (id) => {
  // id 기준으로 항상 같은 값 나오게
  const min = 1;
  const max = 15;

  const seed = id * 997; // 소수로 시드 고정
  return (seed % (max - min + 1)) + min;
};

const mockSeat = {
  stadiumName: "서울 잠실 야구장",
  seatTitle: "오렌지 219구역 194번",
  price: "금액 주중: 18,000원 / 주말 : 20,000원",
  tags: ["#도파민충전", "#시야정면", "#화장실미리GO"],
  heroImg: "/img/stadium-review-main.jpg",
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
    imgs: [
      "/img/stadium-review-1.svg",
      "/img/stadium-review-1-1.svg",
      "/img/stadium-review-1-2.svg",
    ],
    text: "잠실은 두 번째 직관인데 야푸로 유명한 이유가 있네요 사실 이거 또 먹고 싶어서 야구보러 옴ㅋㅋㅎ 야구는 잘 모르지만 응원 열기가 뜨거워서 신나는 기분 내기 좋은 좌석이에요 굿굿👍",
    chips: ["시야 좋아요", "응원하기 좋아요", "매점 가까워요"],
    counts: { view: 1528, family: 546, food: 123 },
  },
  {
    id: 2,
    user: "서초구일찐김혜원",
    avatar: "/img/stadium-profile-2.svg",
    rating: 4.0,
    seatExp: "직관 8 · 잠실구장 방문 수 2",
    imgs: [
      "/img/stadium-review-2.svg",
      "/img/stadium-review-2-1.svg",
      "/img/stadium-review-2-2.svg",
    ],
    text: "내야 외야 다 잘 보이는 최고 시야 자리.. 지금은 시원한데 한여름엔 더울 듯. 선수들 보기에는 거리가 조금 있지만 응원열기 느끼기에는 최고네요ㅎㅎ 근데 앉아 있을 새가 없어서 조금 힘들긴 함 😂 다음엔 응원단석이랑 조금 멀리 앉을 것 같아요",
    chips: ["화장실 멀어요", "응원하기 좋아요", "매점 가까워요"],
    counts: { toilet: 905, family: 546, food: 123 },
  },
  {
    id: 3,
    user: "신림동낙화유수딘",
    avatar: "/img/stadium-profile-3.svg",
    rating: 4.0,
    seatExp: "직관 8 · 잠실구장 방문 수 2",
    imgs: [
      "/img/stadium-review-3.svg",
      "/img/stadium-review-3-1.svg",
      "/img/stadium-review-3-2.svg",
      "/img/stadium-review-3-3.svg",
    ],
    text: "잠실구장 풍경 보고 싶고, 내야 외야 한 눈에 보고 싶고, 무엇보다 열정적으로🔥 응원하는 자리 좋아하는 분들이라면 이 자리 강추.. 얼마나 열정적이냐? 야푸 먹을 시간이 없습니다.",
    chips: ["사진 잘 나와요", "응원하기 좋아요", "좌석 좁아요"],
    counts: { photo: 985, family: 546, safe: 521 },
  },
];

// ✅ SeatDetail에서 이미 쓰는 키랑 맞춤
const LS_KEY = "seatReviewSelection";

function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function PhotoSwiper({ imgs }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e) => {
      // ✅ 터치는 기본 스크롤이 자연스러움
      if (e.pointerType === "touch") return;

      isDown = true;
      el.classList.add("dragging");
      el.setPointerCapture?.(e.pointerId);

      startX = e.clientX;
      startLeft = el.scrollLeft;
    };

    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startLeft - dx;
      e.preventDefault();
    };

    const onUp = () => {
      isDown = false;
      el.classList.remove("dragging");
      el.style.scrollBehavior = "smooth";
      el.scrollTo({ left: el.scrollLeft, behavior: "smooth" });
      requestAnimationFrame(() => (el.style.scrollBehavior = ""));
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <ul className="sr-photoSwiper" ref={ref} role="list" aria-label="리뷰 사진">
      {imgs.map((src, idx) => (
        <li className="sr-photoSlide" key={src + idx}>
          <img
            src={src}
            alt={`리뷰 사진 ${idx + 1}`}
            className="sr-photo"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );
}

export default function StadiumPgReview() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ URL 쿼리 우선, 없으면 localStorage 복구
  const selection = useMemo(() => {
    const params = new URLSearchParams(location.search);

    const stadium = params.get("stadium") || "";
    const seatType = params.get("seatType") || "";
    const section = params.get("section") || "";
    const seatNumber = params.get("seatNumber") || "";

    if (stadium) {
      return {
        stadiumName: stadium,
        seatType: seatType || "오렌지",
        section: Number(section) || 219,
        seatNumber: Number(seatNumber) || 194,
        from: "query",
      };
    }

    const saved = safeParseJSON(localStorage.getItem(LS_KEY) || "");
    if (saved?.stadiumName) {
      return {
        stadiumName: saved.stadiumName,
        seatType: saved.seatType || "오렌지",
        section: Number(saved.section) || 219,
        seatNumber: Number(saved.seatNumber) || 194,
        from: "storage",
      };
    }

    return null;
  }, [location.search]);

  // ✅ 값 없으면 stadium로 보내고, storage로 왔으면 URL도 채우기
  useEffect(() => {
    if (!selection?.stadiumName) {
      navigate("/stadium", { replace: true });
      return;
    }

    // 항상 최신값 저장 (새로고침/직접접근 대비)
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        stadiumName: selection.stadiumName,
        seatType: selection.seatType,
        section: selection.section,
        seatNumber: selection.seatNumber,
      }),
    );

    // storage 복구였다면 URL에도 반영(공유/북마크 안정)
    if (selection.from === "storage") {
      const params = new URLSearchParams(location.search);
      if (!params.get("stadium")) {
        params.set("stadium", selection.stadiumName);
        params.set("seatType", selection.seatType);
        params.set("section", String(selection.section));
        params.set("seatNumber", String(selection.seatNumber));
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });
      }
    }
  }, [selection, location.pathname, location.search, navigate]);

  if (!selection?.stadiumName) return null;

  const { stadiumName, seatType, section, seatNumber } = selection;
  const seatTitle = `${seatType} ${section}구역 ${seatNumber}번`;

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

  const seatExpWithSelectedStadium = (review) => {
    const viewCount = getRandomViewCountById(review.id);
    return `직관 ${viewCount} · ${stadiumName}`;
  };

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

          {/*여기 경기장 이름이 “선택한 값”으로 바뀜 */}
          <div className="stadium-titlebar">
            <p className="stadium-title">{stadiumName}</p>
          </div>

          <div className="sr-heroShade" />
        </section>

        <main className="sr-sheet">
          <div className="sr-seatTitle">{seatTitle}</div>
          <div className="sr-price">{mockSeat.price}</div>

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
                  <span
                    className={`sr-pillIcon ${s.key === "view" ? "ic-eyes" : ""}`}
                  >
                    {s.icon}
                  </span>
                  <span className="sr-pillText">{s.label}</span>
                  <span className="sr-pillCount">
                    {s.count.toLocaleString()}
                  </span>
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
              추천순
            </button>
            <button
              type="button"
              className={`sr-sortBtn ${sort === "최신순" ? "isOn" : ""}`}
              onClick={() => setSort("최신순")}
            >
              최신순
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
                        <span>{seatExpWithSelectedStadium(r)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <PhotoSwiper imgs={r.imgs} />
                <p className="sr-text">{r.text}</p>

                <div className="sr-actions">
                  {r.chips.map((label) => {
                    const found = mockSummary.find((s) => s.label === label);
                    const cnt =
                      found?.key && r.counts[found.key]
                        ? r.counts[found.key].toLocaleString()
                        : "0";

                    return (
                      <button
                        key={label}
                        type="button"
                        className="sr-actionPill"
                      >
                        <span className="sr-actionIcon">{found?.icon}</span>
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
