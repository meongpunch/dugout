import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Stadium.css";
import MainPgHeader from "../../components/MainPgHeader";
import Footer from "../../components/Footer";

const Stadium = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev || "auto";
    };
  }, []);

  const [stadiumOpen, setStadiumOpen] = useState(false);
  const [stadiumName, setStadiumName] = useState("광주 챔피언스필드");

  // 맵을 먼저 선언 (stadiumBg가 이걸 쓰기 때문)
  const stadiumBgMap = {
    "광주 챔피언스필드": "/img/stadium-main-image-gwangju.jpg",
    "서울 잠실야구장": "/img/stadium-main-image-seoul.jpg",
    "고척 스카이돔": "/img/stadium-main-image-gocheock.jpg",
    "대구 라이온즈파크": "/img/stadium-main-image-deagu.jpg",
    "대전 한화생명 볼파크": "/img/stadium-main-image-deajeon.jpg",
    "부산 사직야구장": "/img/stadium-main-image-busan.jpg",
    "수원 KT위즈파크": "/img/stadium-main-image-suwon.jpg",
    "인천 랜더스필드": "/img/stadium-main-image-incheon.jpg",
    "창원 NC파크": "/img/stadium-main-image-changwon.jpg",
  };

  const stadiumTagMap = {
    "서울 잠실야구장": [
      {
        icon: "🤸‍♀",
        text: "온가족이 함께",
        preset: { seatType: "테이블석", zone: "1루" },
      },
      {
        icon: "🌭",
        text: "야푸 푸짐하게 즐기기",
        preset: { seatType: "오렌지석", zone: "3루" },
      },
      {
        icon: "🤩",
        text: "뉴비추천",
        preset: { seatType: "프리미엄석", zone: "중앙" },
      },
    ],

    "광주 챔피언스필드": [
      {
        icon: "🔥",
        text: "응원열기 최고",
        preset: { seatType: "레드석", zone: "3루" },
      },
      {
        icon: "👨‍👩‍👧‍👦",
        text: "가족 추천",
        preset: { seatType: "테이블석", zone: "1루" },
      },
      {
        icon: "🎉",
        text: "직관 입문",
        preset: { seatType: "블루석", zone: "중앙" },
      },
    ],

    "고척 스카이돔": [
      {
        icon: "☔️",
        text: "비와도 OK",
        preset: { seatType: "프리미엄석", zone: "중앙" },
      },
      {
        icon: "❄️",
        text: "사계절 쾌적",
        preset: { seatType: "블루석", zone: "1루" },
      },
      {
        icon: "👶",
        text: "아이동반 추천",
        preset: { seatType: "테이블석", zone: "3루" },
      },
    ],

    "대구 라이온즈파크": [
      {
        icon: "💥",
        text: "홈런 맛집",
        preset: { seatType: "익사이팅석", zone: "3루" },
      },
      {
        icon: "📣",
        text: "응원 분위기",
        preset: { seatType: "레드석", zone: "1루" },
      },
      {
        icon: "🌙",
        text: "야경 감성",
        preset: { seatType: "블루석", zone: "중앙" },
      },
    ],

    "대전 한화생명 볼파크": [
      {
        icon: "💸",
        text: "가성비 좌석",
        preset: { seatType: "네이비석", zone: "1루" },
      },
      {
        icon: "🍗",
        text: "먹거리 추천",
        preset: { seatType: "오렌지석", zone: "3루" },
      },
      {
        icon: "🙂",
        text: "뉴비 친화",
        preset: { seatType: "블루석", zone: "중앙" },
      },
    ],

    "부산 사직야구장": [
      {
        icon: "🔥",
        text: "응원 레전드",
        preset: { seatType: "레드석", zone: "3루" },
      },
      {
        icon: "🎶",
        text: "분위기 최고",
        preset: { seatType: "익사이팅석", zone: "1루" },
      },
      {
        icon: "🏟️",
        text: "직관 필수",
        preset: { seatType: "블루석", zone: "중앙" },
      },
    ],

    "수원 KT위즈파크": [
      {
        icon: "👨‍👩‍👧",
        text: "가족 관람",
        preset: { seatType: "테이블석", zone: "1루" },
      },
      {
        icon: "🪑",
        text: "좌석 편안",
        preset: { seatType: "프리미엄석", zone: "중앙" },
      },
      {
        icon: "👀",
        text: "시야 좋음",
        preset: { seatType: "블루석", zone: "3루" },
      },
    ],

    "인천 랜더스필드": [
      {
        icon: "🌅",
        text: "석양 명소",
        preset: { seatType: "블루석", zone: "중앙" },
      },
      {
        icon: "💑",
        text: "커플 추천",
        preset: { seatType: "프리미엄석", zone: "3루" },
      },
      {
        icon: "🌬️",
        text: "바닷바람",
        preset: { seatType: "외야그린석", zone: "1루" },
      },
    ],

    "창원 NC파크": [
      {
        icon: "👁️",
        text: "시야 깔끔",
        preset: { seatType: "블루석", zone: "중앙" },
      },
      {
        icon: "🚶‍♂️",
        text: "동선 편리",
        preset: { seatType: "네이비석", zone: "1루" },
      },
      {
        icon: "✨",
        text: "뉴비 추천",
        preset: { seatType: "프리미엄석", zone: "3루" },
      },
    ],
  };

  const tags = stadiumTagMap[stadiumName] ?? [];
  // 배경 계산
  const stadiumBg =
    stadiumBgMap[stadiumName] ?? "/img/stadium-main-image-gwangju.jpg";

  const stadiumOptions = [
    "광주 챔피언스필드",
    "서울 잠실야구장",
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
      setSheetOpen(false);
    } else {
      openSheetSmoothly();
    }
  };

  useEffect(() => {
    if (!sheetOpen) {
      setSeatType(null);
      setZone(null);
    }
  }, [sheetOpen, setSeatType, setZone]);

  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  const sheetRef = useRef(null);

  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const rafRef = useRef(null);

  const DAMP = 0.15; // 손가락 대비 이동량 (무게감)
  const FOLLOW = 0.1; // 따라오는 속도 (부드러움)
  const THRESHOLD = 40;

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

    targetYRef.current = delta * DAMP;
  };

  const onDragEnd = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const y = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    const delta = y - startYRef.current;

    if (delta < -THRESHOLD) setSheetOpen(true);
    else if (delta > THRESHOLD) setSheetOpen(false);

    targetYRef.current = 0;
    currentYRef.current = 0;
    if (sheetRef.current) sheetRef.current.style.transform = "";
  };

  const openSheetSmoothly = () => {
    if (!sheetRef.current) return;

    // ✅ 드래그 잔여 transition 제거 (중요)
    sheetRef.current.style.transition = "none";

    const animate = () => {
      // ✅ 숫자만으로 속도 조절 (0.05 → 0.07 정도 추천)
      currentYRef.current += (0 - currentYRef.current) * 0.07;

      sheetRef.current.style.transform = `translateY(${currentYRef.current}px)`;

      if (Math.abs(currentYRef.current) > 0.5) {
        requestAnimationFrame(animate);
      } else {
        sheetRef.current.style.transform = "";
        currentYRef.current = 0;

        // ✅ 여기서 open 상태 확정
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
    if (!seatType || !zone) return;
    setSheetOpen(false);
    navigate("/stadium/seat", {
      state: {
        stadiumName,
        seatType,
        zone,
      },
    });
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current) return;
      onDragMove(e);
    };

    const handleEnd = (e) => {
      if (!draggingRef.current) return;
      onDragEnd(e); // ✅ 여기서 false로 바꾸지 말기 (onDragEnd가 처리함)
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <>
      <section
        className="stadium-main"
        onClick={() => {
          if (stadiumOpen) setStadiumOpen(false);
        }}
      >
        {/* 헤더를 이미지 위로 올리는 래퍼 */}
        <div
          className="stadium-headerOverlay"
          onClick={(e) => e.stopPropagation()}
        >
          <MainPgHeader logoType="logo" btnType="ticket" />
        </div>

        {/* 배경은 여기에서만! (CSS에 background 고정값 있으면 제거) */}
        <div
          className="stadium-bg"
          style={{ backgroundImage: `url(${stadiumBg})` }}
        >
          <div className="inner">
            <div
              className="stadium-titlebar"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="#"
                className={`stadium-title ${stadiumOpen ? "is-open" : ""}`}
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

              <div
                className="stadium-tags"
                onClick={(e) => e.stopPropagation()}
              >
                {tags.map((t) => (
                  <button
                    key={t.text}
                    type="button"
                    className="info-tag"
                    onClick={() => {
                      // ✅ 태그에 설정된 추천값 자동 선택
                      if (t.preset) {
                        setSeatType(t.preset.seatType);
                        setZone(t.preset.zone);
                      }

                      // ✅ 바텀시트 열기
                      setSheetOpen(true); // openSheet() 쓰고 있으면 그걸로 바꿔도 됨
                    }}
                  >
                    {t.icon} {t.text}
                  </button>
                ))}
              </div>

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

                        setSeatType(null);
                        setZone(null);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bottom-fixed">
              {sheetOpen && (
                <div
                  className="sheet-backdrop"
                  onClick={() => setSheetOpen(false)}
                />
              )}

              <div
                ref={sheetRef}
                className={`bottom-box ${sheetOpen ? "open" : "closed"}`}
              >
                <div
                  className="sheet-head"
                  onClick={toggle}
                  onMouseDown={onDragStart}
                  onTouchStart={onDragStart}
                >
                  <div className="handle" />
                  <h2 className="title">구역찾기</h2>
                  <p className="desc">원하는 필터를 선택하세요.</p>
                </div>

                {sheetOpen && (
                  <div
                    className="sheet-body"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="sheet-title">구역별</h3>
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

                    <h3 className="sheet-title">좌석별</h3>
                    <div className="sheet-grid small">
                      {zoneOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`chip ${zone === opt ? "active" : ""}`}
                          onClick={() =>
                            setZone((prev) => (prev === opt ? null : opt))
                          }
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="confirm"
                      onClick={handleConfirm}
                      disabled={!seatType || !zone}
                    >
                      확인
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Stadium;
