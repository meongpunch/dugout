import React, { useEffect, useState } from "react";
import "./Review.css";
import "../../components/Guide.css";
import { useNavigate, Link, useParams } from "react-router-dom";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ 캘린더 TIMELINE_ITEMS랑 같은 데이터(지금은 임시로 Review에도 둠)
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

  const match = TIMELINE_ITEMS.find((m) => m.id === id);

  // ✅ 스크롤 시 헤더 접힘 상태
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCollapsed(window.scrollY > 40); // 기준값(원하면 조절)
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const SEAT_KEYWORDS = [
    { id: 1, icon: "👀", label: "시야가 좋아요" },
    { id: 2, icon: "⚾️", label: "경기 흐름이 잘 보여요" },
    { id: 3, icon: "🔍", label: "선수가 가까워요" },
    { id: 4, icon: "🎯", label: "타구가 잘 보여요" },
    { id: 5, icon: "🔥", label: "현장감이 좋아요" },
    { id: 6, icon: "🎺", label: "응원 분위기가 좋아요" },
    { id: 7, icon: "🧍", label: "혼자 보기 좋아요" },
    { id: 8, icon: "💺", label: "좌석이 편해요" },
  ];

  const BAD_SEAT_KEYWORDS = [
    { id: 1, icon: "🚻", label: "화장실이 멀어요" },
    { id: 2, icon: "🌀", label: "경기 흐름이 안 보여요" },
    { id: 3, icon: "📏", label: "선수가 멀어요" },
    { id: 4, icon: "⚡", label: "시야 가림이 있어요" },
    { id: 5, icon: "📣", label: "응원해야 해요" },
    { id: 6, icon: "⚾️", label: "파울볼이 많이 와요" },
    { id: 7, icon: "🎆", label: "천장이 없어요" },
    { id: 8, icon: "🌞", label: "해가 늦게까지 들어와요" },
  ];

  const RECOMMENDED_MEDIA = [
    { id: 1, src: "/img/review-reco-1.png", alt: "추천 사진 1" },
    { id: 2, src: "/img/review-reco-2.png", alt: "추천 사진 2" },
    { id: 3, src: "/img/review-reco-3.png", alt: "추천 사진 3" },
    { id: 4, src: "/img/review-reco-4.png", alt: "추천 사진 4" },
    { id: 5, src: "/img/review-reco-5.png", alt: "추천 사진 5" },
    { id: 6, src: "/img/review-reco-6.png", alt: "추천 사진 6" },
    { id: 7, src: "/img/review-reco-7.png", alt: "추천 사진 7" },
    { id: 8, src: "/img/review-reco-8.png", alt: "추천 사진 8" },
  ];

  // ====== 키워드 선택 ======
  const [selected, setSelected] = useState({});
  const toggle = (id) => setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const [selectedBad, setSelectedBad] = useState({});
  const toggleBad = (id) => setSelectedBad((prev) => ({ ...prev, [id]: !prev[id] }));

  // ====== 추천 미디어 선택(순서 유지) ======
  const [picked, setPicked] = useState([]); // [id, id ...]

  // ✅ "추가하기" 누르면 위에 뜰 미디어들(그리드)
  const [addedItems, setAddedItems] = useState([]); // [{id, src, alt}, ...]

  // ✅ 대표(첫번째 자동, 클릭 시 변경)
  const [coverId, setCoverId] = useState(null);

  const togglePick = (id) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id); // 해제
      return [...prev, id]; // 선택(순서대로)
    });
  };

  // ✅ "N 추가하기" 눌렀을 때: picked 순서대로 addedItems에 넣기
  const handleAdd = () => {
    if (picked.length === 0) return;

    const pickedItems = picked
      .map((id) => RECOMMENDED_MEDIA.find((m) => m.id === id))
      .filter(Boolean);

    setAddedItems((prev) => {
      const existing = new Set(prev.map((x) => x.id));
      const next = [...prev];

      pickedItems.forEach((it) => {
        if (!existing.has(it.id)) next.push(it);
      });

      // 대표가 없으면 첫 번째를 대표로 자동 지정
      if (!coverId && next[0]) setCoverId(next[0].id);

      return next;
    });

    setPicked([]); // 선택 초기화
  };

  // ✅ (선택) 그리드에서 X 삭제할 때 쓰는 함수
  const removeAdded = (id) => {
    setAddedItems((prev) => {
      const next = prev.filter((x) => x.id !== id);
      if (coverId === id) setCoverId(next[0]?.id ?? null);
      return next;
    });
  };

  // ====== 리뷰 텍스트 ======
  const [reviewText, setReviewText] = useState("");

  const onChangeReview = (e) => {
    const next = e.target.value.slice(0, 400);
    setReviewText(next);
  };



  return (
    <div className="reviewPg">
      {/* ===== 상단 ===== */}
      <div className="review-head-spacer"></div>
      <section className={`review-head ${isCollapsed ? "is-collapsed" : ""}`}>
        <div className="inner">
          <div className="review-top">
            <div className="review-left">
              <div className="thumb">
                <img src="/img/review-top.png" alt="" />
              </div>
              <div className="reviewTop-txt">
                <p className="season">2026 시즌</p>
                <p className="count">벌써 12번째 직관이네요</p>
              </div>
            </div>

            <div className="review-close" onClick={() => navigate(-1)}>
              <img src="/img/lockerroom-x-close.svg" alt="닫기" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 매치 카드 ===== */}
      <section className="matchCard">
        <div className="inner">
          <div className="match-info">
            <div className="match-team">
              <p className="team-name">{match.homeTeam}</p>
              <p className="vs">vs</p>
              <p className="team-name">{match.awayTeam}</p>
            </div>

            <div className="overview">
              <div className="meta">
                <p className="place">{match.stadium}</p>
                <p className="match-time">{match.time}</p>
              </div>
              <div className="seat">
                <p className="zone">{match.seatZone}</p>
                <p className="number">{match.seatNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 좋은 키워드 ===== */}
      <section className="seatKeyword">
        <div className="inner">
          <div className="seatKeyword-box">
            <h3 className="seatKeyword-title">이 좌석, 어떤 점이 좋았나요?</h3>
            <p className="seatKeyword-sub">
              좌석에 어울리는 키워드를 골라 주세요.
            </p>

            <div className="seatKeyword-list">
              {SEAT_KEYWORDS.map((k) => (
                <span
                  key={k.id}
                  className={`seatKeyword-chip ${selected[k.id] ? "is-active" : ""}`}
                  onClick={() => toggle(k.id)}
                  role="button"
                  tabIndex={0}>
                  {k.id === 1 && <div className="guide-dot"></div>}
                  <span className={`seatKeyword-chip-ic ${k.id === 1 ? "lh-fix" : ""}`}>{k.icon}</span>
                  <span className="seatKeyword-chip-txt">{k.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 아쉬운 키워드 ===== */}
      <section className="seatKeyword">
        <div className="inner">
          <div className="seatKeyword-box">
            <h3 className="seatKeyword-title">이 좌석, 어떤 점이 아쉬웠나요?</h3>
            <p className="seatKeyword-sub">불편했던 부분을 선택해 주세요.</p>

            <div className="seatKeyword-list">
              {BAD_SEAT_KEYWORDS.map((k) => (
                <span
                  key={k.id}
                  className={`seatKeyword-chip ${selectedBad[k.id] ? "is-active" : ""}`}
                  onClick={() => toggleBad(k.id)}
                  role="button"
                  tabIndex={0}
                >
                  {k.id === 1 && <div className="guide-dot"></div>}
                  <span className="seatKeyword-chip-ic">{k.icon}</span>
                  <span className="seatKeyword-chip-txt">{k.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 미디어 섹션 ===== */}
      <section className="review-media">
        <div className="inner">
          <div className="notice">
            <p className="notice-img">
              <img src="/img/review-notice.svg" alt="" />
            </p>
            <p className="notice-txt">
              장소와 <em>무관한 내용, 타인의 얼굴이 나오지 않게</em> 유의해주세요.
            </p>
          </div>

          {/* ✅ 추가 전/후 UI */}
          {addedItems.length === 0 ? (
            <div className="upload-box">
              <p className="upload-txt">사진/영상을 추가해 주세요</p>
              <p className="plus">
                <img src="/img/review-plus.svg" alt="" />
              </p>
            </div>
          ) : (
            <div className="addedGrid">
              {addedItems.map((it) => (
                <div
                  key={it.id}
                  className="addedCard"
                  onClick={() => setCoverId(it.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={it.src} alt={it.alt} className="addedImg" />

                  {coverId === it.id && <span className="coverBadge">대표</span>}

                  <button
                    type="button"
                    className="removeBtn"
                    aria-label="삭제"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddedItems((prev) => {
                        const next = prev.filter((x) => x.id !== it.id);
                        if (coverId === it.id) setCoverId(next[0]?.id ?? null);
                        return next;
                      });
                    }}
                  >
                    <img src="/img/review-x-close.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ===== 추천 영역 ===== */}
          <div className="mediaRec-box">
            <div className="mediaReco-txt">
              <div className="top-txt-box">
                <p className="reco-txt">추천 사진/영상</p>
                <p className="reco-q">
                  <img src="/img/review-mediaReco-q.svg" alt="" />
                </p>
              </div>
              <div className="bottom-txt-box">
                <p className="reco-notice">
                  추가하지 않은 사진/영상은 서버에 저장되지 않습니다.
                </p>
              </div>
            </div>

            {/* ✅ Swiper */}
            <div className="mediaReco-swiperClip">
              <Swiper
                className="mediaReco-swiper"
                slidesPerView={"auto"}
                spaceBetween={8}
              >
                {RECOMMENDED_MEDIA.map((m) => {
                  const order = picked.indexOf(m.id) + 1;
                  const isPicked = order > 0;

                  return (
                    <SwiperSlide key={m.id} className="mediaReco-slide">
                      <div
                        className={`mediaReco-thumb ${isPicked ? "is-picked" : ""}`}
                        onClick={() => togglePick(m.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={m.src} alt={m.alt} />
                        <span className={`mediaReco-badge ${isPicked ? "is-picked" : ""}`}>
                          {isPicked ? order : ""}
                        </span>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* ✅ 선택된 게 있을 때만 "추가하기" */}
            {picked.length > 0 && (
              <div className="mediaReco-addBar">
                <button type="button" className="mediaReco-addBtn" onClick={handleAdd}>
                  <div className="guide-dot"></div>
                  {picked.length} 추가하기
                </button>
              </div>
            )}
          </div>
        </div>
      </section>


      <section className="reviewText">
        <div className="inner">
          <div className="reviewText-box">
            <div className="guide-dot"></div>
            <div className="reviewText-head">
              <p className="reviewText-title">
                <span className="reviewText-ic" aria-hidden="true">✏️</span>
                리뷰를 작성해 주세요.
              </p>
            </div>

            {/* ✅ textarea */}
            <div className="reviewText-area">
              <textarea
                className={`reviewText-input ${reviewText.length > 0 ? "has-text" : ""}`}
                value={reviewText}
                onChange={onChangeReview}
                maxLength={400}
                placeholder={
                  "리뷰 작성 시 유의사항 한 번 확인하기!\n욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
                }
              />

              {/* ✅ 우측하단 카운터 */}
              <div className="reviewText-count">
                <span className="now">{reviewText.length}</span>
                <span className="total"> / 400</span>
              </div>
            </div>
          </div>
          <div className="review-guidelines">
            <p className="guidelines">리뷰 작성 유의사항</p>
          </div>

          <Link
            to={`/lockerroom/review/complete/${id}`}
            className="reviewSubmit"
            onClick={() => {
              console.log("리뷰 저장:", reviewText);
            }}
          >
            <div className="guide-dot"></div>
            등록하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Review;
