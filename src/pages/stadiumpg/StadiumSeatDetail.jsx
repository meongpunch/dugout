import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumSeatDetail.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

const StadiumSeatDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 미니맵 동기화용 ref
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
    const content = viewport?.querySelector(".mapContent");
    if (!viewport || !minimap || !rect || !content) return;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    // 이미지 실제 크기 (원본 기준)
    const cw = content.naturalWidth || content.clientWidth;
    const ch = content.naturalHeight || content.clientHeight;

    const miniW = minimap.clientWidth;
    const miniH = minimap.clientHeight;

    // rect 크기 (뷰포트 비율)
    const rectW = Math.max(12, miniW * (vw / cw));
    const rectH = Math.max(12, miniH * (vh / ch));

    const maxMoveX = Math.max(1, cw - vw);
    const maxMoveY = Math.max(1, ch - vh);

    // 현재 transform 이동값 (x,y는 음수로 움직임)
    const { x, y } = posRef.current;

    const left = (-x / maxMoveX) * (miniW - rectW);
    const top = (-y / maxMoveY) * (miniH - rectH);

    rect.style.width = `${rectW}px`;
    rect.style.height = `${rectH}px`;
    rect.style.transform = `translate(${left}px, ${top}px)`;
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = viewport?.querySelector(".mapContent");
    if (!viewport || !content) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const clampToBounds = (x, y) => {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;

      const cw = content.naturalWidth || content.clientWidth;
      const ch = content.naturalHeight || content.clientHeight;

      const minX = Math.min(0, vw - cw);
      const minY = Math.min(0, vh - ch);

      return {
        x: clamp(x, minX, 0),
        y: clamp(y, minY, 0),
      };
    };

    const apply = (x, y) => {
      content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      posRef.current = { x, y };
      syncMini();
    };

    const onDown = (e) => {
      isDown = true;
      viewport.classList.add("dragging");
      viewport.setPointerCapture(e.pointerId);

      startX = e.clientX;
      startY = e.clientY;
      baseX = posRef.current.x;
      baseY = posRef.current.y;
    };

    const onMove = (e) => {
      if (!isDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const next = clampToBounds(baseX + dx, baseY + dy);
      apply(next.x, next.y);

      e.preventDefault();
    };

    const onUp = (e) => {
      isDown = false;
      viewport.classList.remove("dragging");
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {}
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove, { passive: false });
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    // 이미지 로드 후 경계/미니맵 맞추기
    const onImgLoad = () => {
      const next = clampToBounds(posRef.current.x, posRef.current.y);
      apply(next.x, next.y);
    };
    content.addEventListener("load", onImgLoad);

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      content.removeEventListener("load", onImgLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 최초/리사이즈 시 동기화
    syncMini();
    window.addEventListener("resize", syncMini);
    return () => window.removeEventListener("resize", syncMini);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="seat-detail">
        <header>
          <MainPgHeader logoType="back" btnType="ticket" />
        </header>

        {/* 상단 타이틀 */}
        <div className="detail-title">
          <p className="stadium-name">{stadiumName}</p>
        </div>

        <div className="detail-map-wrap">
          <div className="mapViewport" ref={viewportRef}>
            <img
              className="mapContent"
              src="/img/stadium-seating-detail.jpg"
              alt={`${section} 구역 좌석 배치도`}
              onLoad={() => syncMini?.()}
              draggable={false}
            />
          </div>

          <div className="minimap" ref={minimapRef} aria-hidden="true">
            <img
              className="minimapImg"
              src="/img/stadium-seating-detail.jpg"
              alt=""
              draggable={false}
            />
            <div className="minimapRect" ref={rectRef} />
          </div>
        </div>
        {/* 하단 정보 (이미지처럼) */}
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
      <Footer />
    </>
  );
};

export default StadiumSeatDetail;
