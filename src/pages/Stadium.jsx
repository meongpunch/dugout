import { useEffect, useRef, useState } from "react";
import Gnb from "../components/Gnb";
import "./Stadium.css";

const Stadium = () => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev || "auto";
    };
  }, []);

  const [stadiumOpen, setStadiumOpen] = useState(false);
  const [stadiumName, setStadiumName] = useState("서울 잠실야구장");

  const stadiumOptions = [
    "서울 잠실야구장",
    "광주 챔피언스필드",
    "고척 스카이돔",
    "대구 라이온즈파크",
    "대전 한화생명 볼파크",
    "부산 사직야구장",
    "수원 KT위즈파크",
    "인천 랜더스필드",
    "창원 NC파크",
  ];

  const [sheetOpen, setSheetOpen] = useState(false);

  const [seatType, setSeatType] = useState(null);
  const [zone, setZone] = useState(null);

  const seatTypeOptions = [
    "프리미엄석",
    "테이블석",
    "오렌지석",
    "블루석",
    "레드석",
    "네이비석",
    "외야그린석",
    "익사이팅석",
    "휠체어석",
  ];

  const zoneOptions = ["1루", "3루", "중앙"];

  const toggle = () => {
    if (sheetOpen) {
      setSheetOpen(false); // 닫을 땐 바로 닫기
    } else {
      openSheetSmoothly(); // 🔥 열 땐 JS로 천천히
    }
  };

  // ===== Bottom sheet drag =====
  const startYRef = useRef(0);
  const draggingRef = useRef(false); // ✅ 추가

  const sheetRef = useRef(null);

  const targetYRef = useRef(0); // ✅ 추가
  const currentYRef = useRef(0);
  const rafRef = useRef(null);

  const DAMP = 0.15; // 손가락 대비 이동량 (무게감)
  const FOLLOW = 0.1; // 따라오는 속도 (부드러움)
  const THRESHOLD = 40;
  const CLOSED_PX = 260;

  const onDragStart = (e) => {
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = y;
    draggingRef.current = true;

    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };

  const onDragMove = (e) => {
    if (!draggingRef.current) return;

    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = y - startYRef.current;

    // 목표 위치만 업데이트
    targetYRef.current = delta * DAMP;
  };

  const onDragEnd = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const y = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    const delta = y - startYRef.current;

    if (delta < -THRESHOLD) setSheetOpen(true);
    else if (delta > THRESHOLD) setSheetOpen(false);

    // ✅ 드래그 끝나면 JS 제어 해제(중요)
    targetYRef.current = 0;
    currentYRef.current = 0;
    if (sheetRef.current) sheetRef.current.style.transform = "";
  };

  const openSheetSmoothly = () => {
    if (!sheetRef.current) return;

    const animate = () => {
      currentYRef.current += (0 - currentYRef.current) * 0.12;

      sheetRef.current.style.transform = `translateY(${currentYRef.current}px)`;

      if (Math.abs(currentYRef.current) > 0.5) {
        requestAnimationFrame(animate);
      } else {
        sheetRef.current.style.transform = "";
        currentYRef.current = 0;
        setSheetOpen(true);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const tick = () => {
      if (draggingRef.current && sheetRef.current) {
        currentYRef.current +=
          (targetYRef.current - currentYRef.current) * FOLLOW;

        sheetRef.current.style.transform = `translateY(${currentYRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleConfirm = () => {
    if (!seatType) return;
    setSheetOpen(false);
  };

  return (
    <section
      className="stadium-main"
      onClick={() => {
        if (stadiumOpen) setStadiumOpen(false);
      }}
    >
      <div className="stadium-bg">
        <div className="inner">
          <div className="top-bar">
            <a
              href="#"
              className={`topbar-location ${stadiumOpen ? "is-open" : ""}`}
              role="button"
              aria-expanded={stadiumOpen}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setStadiumOpen((v) => !v);
              }}
            >
              {stadiumName}
              <img
                src="/img/stadium-chevron-bottom.svg"
                alt="∨"
                className="chevron-icon"
              />
            </a>

            <a
              href="#"
              className="topbar-icon"
              aria-label="티켓인증"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <img src="/img/stadium-ticket-icon.svg" alt="티켓인증" />
            </a>
            {stadiumOpen && (
              <div
                className="stadium-dropdown"
                role="listbox"
                aria-label="구장 선택"
                onClick={(e) => e.stopPropagation()}
              >
                {stadiumOptions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`stadium-option ${
                      stadiumName === name ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStadiumName(name);
                      setStadiumOpen(false);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            ref={sheetRef}
            className={`bottom-box ${sheetOpen ? "open" : "closed"}`}
          >
            <div
              className="sheet-head"
              onClick={toggle}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={onDragStart}
              onTouchMove={onDragMove}
              onTouchEnd={onDragEnd}
            >
              <div className="handle" />
              <h2 className="title">구역찾기</h2>
              <p className="desc">원하는 필터를 선택하세요.</p>
            </div>

            {sheetOpen && (
              <div className="sheet-body">
                <h3 className="sheet-title">좌석</h3>
                <div className="sheet-grid">
                  {seatTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`chip ${seatType === opt ? "active" : ""}`}
                      onClick={() => setSeatType(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <h3 className="sheet-title">구역</h3>
                <div className="sheet-grid small">
                  {zoneOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`chip ${zone === opt ? "active" : ""}`}
                      onClick={() => setZone(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="confirm"
                  onClick={handleConfirm}
                  disabled={!seatType}
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stadium;
