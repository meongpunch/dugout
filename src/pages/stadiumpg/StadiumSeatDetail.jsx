import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumSeatDetail.css";
import MainPgHeader from "../../components/MainPgHeader";

const StadiumSeatDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ 미니맵 동기화용 ref
  const viewportRef = useRef(null);
  const minimapRef = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    if (!state) navigate("/stadium", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { stadiumName, seatType, zone, section } = state;

  const syncMini = () => {
    const viewport = viewportRef.current;
    const minimap = minimapRef.current;
    const rect = rectRef.current;
    if (!viewport || !minimap || !rect) return;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    // 스크롤 가능한 전체 크기(콘텐츠 크기)
    const cw = viewport.scrollWidth;
    const ch = viewport.scrollHeight;

    const miniW = minimap.clientWidth;
    const miniH = minimap.clientHeight;

    // rect 크기
    const rectW = Math.max(10, miniW * (vw / cw));
    const rectH = Math.max(10, miniH * (vh / ch));

    const maxScrollX = Math.max(1, cw - vw);
    const maxScrollY = Math.max(1, ch - vh);

    const left = (viewport.scrollLeft / maxScrollX) * (miniW - rectW);
    const top = (viewport.scrollTop / maxScrollY) * (miniH - rectH);

    rect.style.width = `${rectW}px`;
    rect.style.height = `${rectH}px`;
    rect.style.transform = `translate(${left}px, ${top}px)`;
  };

  useEffect(() => {
    // 최초/리사이즈 시 동기화
    syncMini();
    window.addEventListener("resize", syncMini);
    return () => window.removeEventListener("resize", syncMini);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="seat-detail">
      <header>
        <MainPgHeader logoType="back" btnType="ticket" />
      </header>

      {/* ✅ 상단 타이틀 */}
      <div className="detail-title">
        <p className="stadium-name">{stadiumName}</p>
      </div>

      {/* ✅ 메인 좌석도 (스크롤/드래그 이동) */}
      <div className="detail-map-wrap">
        <div className="mapViewport" ref={viewportRef} onScroll={syncMini}>
          {/* 큰 이미지 */}
          <img
            className="mapContent"
            src="/img/stadium-seating-detail.jpg"
            alt={`${section} 구역 좌석 배치도`}
            onLoad={syncMini}
          />
        </div>

        {/* ✅ 미니맵 */}
        <div className="minimap" ref={minimapRef} aria-hidden="true">
          <img
            className="minimapImg"
            src="/img/stadium-seating-detail.jpg"
            alt=""
          />
          <div className="minimapRect" ref={rectRef} />
        </div>
      </div>

      {/* ✅ 하단 정보 (이미지처럼) */}
      <div className="detail-bottom">
        <p className="seat-info">
          {seatType} {section}구역
        </p>
        <p className="price">금액 주중: 18,000원 / 주말 : 20,000원</p>

        <div className="tag-row">
          <button type="button" className="tag">
            #경기장1열
          </button>
          <button type="button" className="tag">
            #스타디움모드
          </button>
          <button type="button" className="tag">
            #비추천함
          </button>
        </div>

        <h3 className="info-title">구역 정보</h3>

        <div className="info-grid">
          <div className="info-card">
            <div className="ico">⬇️</div>
            <div>
              <p className="card-title">1열 단차</p>
              <p className="card-desc">단차 높이 · 시야 정보</p>
            </div>
          </div>

          <div className="info-card">
            <div className="ico">📐</div>
            <div>
              <p className="card-title">2~21열 단차</p>
              <p className="card-desc">단차 높이 · 시야 정보</p>
            </div>
          </div>

          <div className="info-card">
            <div className="ico">👀</div>
            <div>
              <p className="card-title">시야</p>
              <p className="card-desc">난간/펜스/각도 정보</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StadiumSeatDetail;
