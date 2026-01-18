import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumSeatDetail.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

const StadiumSeatDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [selectedSeat, setSelectedSeat] = useState(null);

  const baseScaleRef = useRef(1);
  const svgRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const minimapRef = useRef(null);
  const rectRef = useRef(null);

  const posRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const movedRef = useRef(false);
  const infoSwiperRef = useRef(null);

  const getImgSize = useCallback(() => {
    const viewport = viewportRef.current;
    const svg = viewport?.querySelector("svg");
    if (!svg) return null;

    const iw = svg.viewBox?.baseVal?.width || 430;
    const ih = svg.viewBox?.baseVal?.height || 574;
    return { iw, ih, img: svg };
  }, []);

  const clampToBounds = useCallback((x, y) => {
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
  }, [getImgSize]);

  const syncMini = useCallback(() => {
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
  }, [getImgSize]);

  const applyTransform = useCallback((x, y) => {
    const stage = stageRef.current;
    if (!stage) return;

    const s = scaleRef.current;
    stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    posRef.current = { x, y };
    syncMini();
  }, [syncMini]);

  const fitToViewport = useCallback(() => {
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
  }, [getImgSize, clampToBounds, applyTransform]);

  const zoomToClientPoint = useCallback((clientX, clientY) => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

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

    // 줌이 풀리면 선택 초기화
    if (targetScale <= base + 0.01) setSelectedSeat(null);

    window.setTimeout(() => {
      stage.classList.remove("zooming");
    }, 260);
  }, [clampToBounds, applyTransform]);

  // 좌석 선택
  const onSeatClick = useCallback((seatNo) => {
    console.log("seat", seatNo);
    setSelectedSeat(seatNo);
  }, []);

  useEffect(() => {
    if (!state) navigate("/stadium", { replace: true });
  }, [state, navigate]);

  // SVG 로드 및 삽입
  useEffect(() => {
    const container = svgRef.current;
    if (!container) return;

    // SVG 파일을 fetch로 로드
    fetch('/img/stadium-seating-detail-interactive.svg')
      .then((response) => response.text())
      .then((svgText) => {
        container.innerHTML = svgText;

        // SVG 로드 완료 후 fitToViewport 호출
        const svg = container.querySelector('svg');
        if (svg) {
          console.log('SVG 로드 완료');

          // SVG 내의 모든 좌석 그룹 찾기
          const seatGroups = svg.querySelectorAll('[id^="seat-"]');

          const handleSeatClick = (e) => {
            // 줌 상태 확인 - 줌 인 상태에서만 좌석 선택 가능
            const currentScale = scaleRef.current;
            const baseScale = baseScaleRef.current;

            if (currentScale <= baseScale + 0.01) {
              // 줌 아웃 상태 - 클릭 이벤트 무시
              return;
            }

            // 줌 인 상태 - 좌석 선택
            e.stopPropagation();
            const seatGroup = e.currentTarget;
            const seatId = seatGroup.id.replace('seat-', '');
            console.log('좌석 클릭:', seatId);
            onSeatClick(parseInt(seatId));
          };

          // 각 좌석에 클릭 이벤트 및 스타일 추가
          seatGroups.forEach((group) => {
            group.addEventListener('click', handleSeatClick);

            // 호버 효과 - 줌 인 상태에서만 표시
            group.addEventListener('mouseenter', () => {
              const currentScale = scaleRef.current;
              const baseScale = baseScaleRef.current;

              if (currentScale > baseScale + 0.01 && !group.classList.contains('selected')) {
                group.style.cursor = 'pointer';
              }
            });
            group.addEventListener('mouseleave', () => {
              group.style.cursor = '';
              group.style.opacity = '1';
            });
          });

          fitToViewport();
        }
      })
      .catch((error) => {
        console.error('SVG 로드 실패:', error);
      });
  }, [fitToViewport, onSeatClick]);

  // 선택된 좌석 스타일 업데이트
  useEffect(() => {
    const container = svgRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    const seatGroups = svg.querySelectorAll('[id^="seat-"]');
    if (seatGroups.length === 0) return;

    seatGroups.forEach((group) => {
      const seatId = parseInt(group.id.replace('seat-', ''));

      if (seatId === selectedSeat) {
        group.classList.add('selected');
        // 선택된 좌석 스타일
        const paths = group.querySelectorAll('path');
        paths.forEach((path, index) => {
          if (index === 0) {
            // 첫 번째 path는 좌석 배경 - 색상 변경
            const originalFill = path.getAttribute('fill');
            if (originalFill && !path.hasAttribute('data-original-fill')) {
              path.setAttribute('data-original-fill', originalFill);
            }
            path.style.fill = '#aa0000'; // 선택 시 빨간색
          }
        });
      } else {
        group.classList.remove('selected');
        const paths = group.querySelectorAll('path');
        paths.forEach((path, index) => {
          if (index === 0) {
            // 원래 색상으로 복원
            const originalFill = path.getAttribute('data-original-fill');
            if (originalFill) {
              path.style.fill = originalFill;
            } else {
              path.style.fill = '';
            }
          }
          path.style.stroke = '';
          path.style.strokeWidth = '';
          path.style.filter = '';
        });
      }
    });
  }, [selectedSeat]);

  // Drag + click zoom (PC 마우스 포함 동일 동작)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;

    const isSeatPointer = (e) => {
      // 줌 인 상태에서만 좌석 감지
      const currentScale = scaleRef.current;
      const baseScale = baseScaleRef.current;

      if (currentScale <= baseScale + 0.01) {
        // 줌 아웃 상태 - 좌석 무시
        return false;
      }

      // 줌 인 상태 - SVG 좌석 그룹이나 그 안의 요소인지 확인
      const target = e.target;
      const seatGroup = target.closest('[id^="seat-"]');
      return !!seatGroup;
    };

    const onDown = (e) => {
      // 줌 인 상태에서 좌석 위에서 시작한 포인터는 지도 로직이 먹지 않게
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
      // 좌석 위에서 끝난 건 줌 토글도 막기
      if (isSeatPointer(e)) {
        isDown = false;
        viewport.classList.remove("dragging");
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (error) {
          // Ignore errors
        }
        return;
      }

      if (!movedRef.current) zoomToClientPoint(e.clientX, e.clientY);

      isDown = false;
      viewport.classList.remove("dragging");
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (error) {
        // Ignore errors
      }
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

  // info swiper 관성
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
      // 마우스/펜만(모바일은 기본 스크롤로 제일 자연스럽게)
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

  if (!state) return null;

  const { stadiumName, seatType, section } = state;

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
            <div
              className="mapStage"
              ref={stageRef}
              style={{ transformOrigin: '0 0' }}
            >
              <div
                ref={svgRef}
                className="mapContent svg-container"
                style={{ pointerEvents: 'auto', display: 'inline-block' }}
              />
            </div>
          </div>

          {/* 미니맵은 map-wrap 내부에 있어야 absolute가 정상 */}
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
            {selectedSeat && ` ${selectedSeat}번 좌석`}
          </p>
          <p className="price">금액 주중: 18,000원 / 주말 : 20,000원</p>
          {selectedSeat ? (
            <>
            <button
              type="button"
              className="confirm"
              onClick={() => navigate('/stadium/seat/review', {
                state: {
                  stadiumName,
                  seatType,
                  section,
                  seatNumber: selectedSeat
                }
              })}
            >
              선택하기
            </button>
            </>
          ) :  (
            <>
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
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StadiumSeatDetail;
