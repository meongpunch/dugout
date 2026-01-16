import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumSeatDetail.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

/** ✅ 좌석 더미 (원본 이미지 px 기준 좌표) */
const SEATS = [
  { no: 194, x: 520, y: 640, w: 52, h: 52 },
  { no: 193, x: 580, y: 640, w: 52, h: 52 },
  { no: 195, x: 460, y: 640, w: 52, h: 52 },
];

const StadiumSeatDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ 좌석 선택 상태
  const [selectedSeat, setSelectedSeat] = useState(null);

  // refs
  const baseScaleRef = useRef(1);

  const viewportRef = useRef(null);
  const stageRef = useRef(null); // ✅ 누락되어 있던 ref
  const minimapRef = useRef(null);
  const rectRef = useRef(null);

  const posRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const movedRef = useRef(false);
  const infoSwiperRef = useRef(null);

  useEffect(() => {
    if (!state) navigate("/stadium", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { stadiumName, seatType, section } = state;

  const getImgSize = () => {
    const viewport = viewportRef.current;
    const img = viewport?.querySelector(".mapContent");
    if (!img) return null;

    const iw = img.naturalWidth || img.clientWidth;
    const ih = img.naturalHeight || img.clientHeight;
    return { iw, ih, img };
  };

  const clampToBounds = (x, y) => {
    const viewport = viewportRef.current;
    const size = getImgSize();
    if (!viewport || !size) return { x, y };

    const { iw, ih } = size;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const s = scaleRef.current;
    const cw = iw * s;
    const ch = ih * s;

    if (cw <= vw) x = (vw - cw) / 2;
    else {
      const minX = vw - cw;
      x = Math.min(0, Math.max(minX, x));
    }

    if (ch <= vh) y = (vh - ch) / 2;
    else {
      const minY = vh - ch;
      y = Math.min(0, Math.max(minY, y));
    }

    return { x, y };
  };

  const syncMini = () => {
    const viewport = viewportRef.current;
    const minimap = minimapRef.current;
    const rect = rectRef.current;
    const size = getImgSize();
    if (!viewport || !minimap || !rect || !size) return;

    const { iw, ih } = size;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const miniW = minimap.clientWidth;
    const miniH = minimap.clientHeight;

    const s = scaleRef.current;
    const cw = iw * s;
    const ch = ih * s;

    const rectW = Math.max(12, miniW * (vw / cw));
    const rectH = Math.max(12, miniH * (vh / ch));

    const maxMoveX = Math.max(1, cw - vw);
    const maxMoveY = Math.max(1, ch - vh);

    const { x, y } = posRef.current;
    const left = (-x / maxMoveX) * (miniW - rectW);
    const top = (-y / maxMoveY) * (miniH - rectH);

    rect.style.width = `${rectW}px`;
    rect.style.height = `${rectH}px`;
    rect.style.transform = `translate(${left}px, ${top}px)`;
  };

  const applyTransform = (x, y) => {
    const stage = stageRef.current;
    if (!stage) return;

    const s = scaleRef.current;
    stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    posRef.current = { x, y };
    syncMini();
  };

  const fitToViewport = () => {
    const viewport = viewportRef.current;
    const size = getImgSize();
    if (!viewport || !size) return;

    const { iw, ih } = size;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const cover = Math.max(vw / iw, vh / ih);
    const cropFactor = 1.35;
    const s = cover * cropFactor;

    scaleRef.current = s;
    baseScaleRef.current = s;

    const anchorX = 0.25;
    const anchorY = 0.65;

    let x = vw / 2 - iw * anchorX * s;
    let y = vh / 2 - ih * anchorY * s;

    const clamped = clampToBounds(x, y);
    applyTransform(clamped.x, clamped.y);

    setSelectedSeat(null);
  };

  const zoomToClientPoint = (clientX, clientY) => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

    // ✅ transition은 transform 대상(stage)에 걸어야 함
    stage.classList.add("zooming");

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const { x, y } = posRef.current;
    const currentScale = scaleRef.current;

    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const worldX = (px - x) / currentScale;
    const worldY = (py - y) / currentScale;

    const base = baseScaleRef.current;
    const zoomed = base * 2.2;

    const targetScale = currentScale > base + 0.01 ? base : zoomed;
    scaleRef.current = targetScale;

    let nextX = vw / 2 - worldX * targetScale;
    let nextY = vh / 2 - worldY * targetScale;

    const clamped = clampToBounds(nextX, nextY);
    applyTransform(clamped.x, clamped.y);

    // ✅ 줌이 풀리면 선택 초기화(원하면 제거 가능)
    if (targetScale <= base + 0.01) setSelectedSeat(null);

    window.setTimeout(() => {
      stage.classList.remove("zooming");
    }, 260);
  };

  // ✅ 좌석 선택
  const onSeatClick = (seat, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSeat(seat);
  };

  // ✅ Drag + click zoom (PC 마우스 포함 동일 동작)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;

    const isSeatPointer = (e) => !!e.target.closest?.(".seatHit");

    const onDown = (e) => {
      // ✅ 좌석 위에서 시작한 포인터는 지도 로직이 먹지 않게
      if (isSeatPointer(e)) return;

      isDown = true;
      movedRef.current = false;

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

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;

      const next = clampToBounds(baseX + dx, baseY + dy);
      applyTransform(next.x, next.y);

      e.preventDefault();
    };

    const onUp = (e) => {
      // ✅ 좌석 위에서 끝난 건 줌 토글도 막기
      if (isSeatPointer(e)) {
        isDown = false;
        viewport.classList.remove("dragging");
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch {}
        return;
      }

      if (!movedRef.current) zoomToClientPoint(e.clientX, e.clientY);

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

    // 최초 1회
    syncMini();

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ info swiper 관성(네가 원래 쓰던 그대로 유지)
  useEffect(() => {
    const el = infoSwiperRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let rafId = 0;

    const stopInertia = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const runInertia = () => {
      const friction = 0.92;

      const step = () => {
        velocity *= friction;

        if (Math.abs(velocity) < 0.02) {
          stopInertia();
          el.style.scrollSnapType = el.dataset.snap || "";
          return;
        }

        el.scrollLeft -= velocity * 16;
        rafId = requestAnimationFrame(step);
      };

      rafId = requestAnimationFrame(step);
    };

    const onDown = (e) => {
      // ✅ 마우스/펜만(모바일은 기본 스크롤이 제일 자연스러움)
      if (e.pointerType === "touch") return;

      isDown = true;
      el.classList.add("dragging");

      stopInertia();
      el.setPointerCapture?.(e.pointerId);

      startX = e.clientX;
      startScrollLeft = el.scrollLeft;

      lastX = e.clientX;
      lastT = performance.now();
      velocity = 0;

      el.dataset.snap = el.style.scrollSnapType || "";
      el.style.scrollSnapType = "none";
    };

    const onMove = (e) => {
      if (!isDown) return;

      const x = e.clientX;
      const now = performance.now();

      const dx = x - startX;
      el.scrollLeft = startScrollLeft - dx;

      const dt = Math.max(1, now - lastT);
      velocity = (x - lastX) / dt;

      lastX = x;
      lastT = now;

      e.preventDefault();
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;

      el.classList.remove("dragging");
      velocity = velocity * 1.8;
      runInertia();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      stopInertia();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <>
      <section className="seat-detail">
        <header>
          <MainPgHeader logoType="back" btnType="ticket" />
        </header>

        <div className="detail-title">
          <p className="stadium-name">{stadiumName}</p>
        </div>

        <div className="detail-map-wrap">
          <div className="mapViewport" ref={viewportRef}>
            <div className="mapStage" ref={stageRef}>
              <img
                className="mapContent"
                src="/img/stadium-seating-detail.svg"
                alt={`${section} 구역 좌석 배치도`}
                onLoad={fitToViewport}
                draggable={false}
              />

              <div className="seatLayer">
                {SEATS.map((seat) => (
                  <button
                    key={seat.no}
                    type="button"
                    className={`seatHit ${
                      selectedSeat?.no === seat.no ? "active" : ""
                    }`}
                    style={{
                      left: seat.x,
                      top: seat.y,
                      width: seat.w,
                      height: seat.h,
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => onSeatClick(seat, e)}
                    aria-label={`${seat.no}번 좌석 선택`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ✅ 미니맵은 map-wrap 내부에 있어야 absolute가 정상 */}
          <div className="minimap" ref={minimapRef} aria-hidden="true">
            <img
              className="minimapImg"
              src="/img/stadium-seating-detail.svg"
              alt=""
              draggable={false}
            />
            <div className="minimapRect" ref={rectRef} />
          </div>
        </div>

        <div className="detail-bottom">
          <p className="seat-info">
            {seatType} {section}구역
          </p>
          <p className="price">금액 주중: 18,000원 / 주말 : 20,000원</p>

          <div className="tag-row">
            <button type="button" className="tag">
              #온가족이 함께
            </button>
            <button type="button" className="tag">
              #스탠딩모드
            </button>
            <button type="button" className="tag">
              #뉴비환영
            </button>
          </div>

          <h3 className="info-title">구역 정보</h3>

          <ul className="info-swiper" ref={infoSwiperRef} role="list">
            <li className="info-slide">
              <div className="info-card">
                <div className="ico">📏</div>
                <div>
                  <p className="card-title">1열 단차</p>
                  <p className="card-desc-1">
                    단차 높이 <br />
                    51cm로 꽤 높아요
                  </p>
                  <p className="card-desc-2">무릎 공간은 여유 있어요</p>
                </div>
              </div>
            </li>

            <li className="info-slide">
              <div className="info-card">
                <div className="ico">📐</div>
                <div>
                  <p className="card-title">2~21열 단차</p>
                  <p className="card-desc-1">단차 높이 33~39cm</p>
                  <p className="card-desc-2">
                    무릎 공간은 <br />
                    조금 좁아요 (약 30cm)
                  </p>
                </div>
              </div>
            </li>

            <li className="info-slide">
              <div className="info-card">
                <div className="ico">👀</div>
                <div>
                  <p className="card-title">시야 참고</p>
                  <p className="card-desc-1">
                    단차 높이 <br />
                    51cm로 꽤 높아요
                  </p>
                  <p className="card-desc-2">무릎 공간은 여유 있어요</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StadiumSeatDetail;
