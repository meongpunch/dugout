import React, { useState, useEffect } from "react";
import "./Onboarding.css";
import "./GuideModal.css";
import "../../components/Guide.css";
import { useNavigate } from "react-router-dom";
import OnboardingTopBar from "../../components/OnboardingTopBar";
import { useGuide } from "../../contexts/GuideContext";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toggleGuide, setGuideOff } = useGuide();

  const [showGuideModal, setShowGuideModal] = useState(false);
  const [page, setPage] = useState(0);

  const [startX, setStartX] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const threshold = 60;

  // 모달 표시 (매번 표시 - 테스트용)
  useEffect(() => {
    // const hasSeenGuideModal = localStorage.getItem('hasSeenGuideModal');
    // if (!hasSeenGuideModal) {
    setShowGuideModal(true);
    // }
  }, []);

  // 확인 버튼: 가이드 ON + 모달 닫기
  const handleConfirmGuide = () => {
    toggleGuide(); // 가이드 ON
    localStorage.setItem('hasSeenGuideModal', 'true');
    setShowGuideModal(false);
  };

  // 괜찮아요 버튼: 가이드 OFF + 모달 닫기
  const handleSkipGuide = () => {
    setGuideOff(); // 가이드 OFF
    localStorage.setItem('hasSeenGuideModal', 'true');
    setShowGuideModal(false);
  };

  // ✅ 건너뛰기: login으로
  const handleSkip = () => {
    navigate("/login");
  };

  const goNext = () => {
    setPage((prev) => {
      if (prev >= 3) {
        navigate("/login");
        return prev;
      }
      return prev + 1;
    });
  };

  // ✅ 온보딩 내부 페이지 뒤로
  const goPrev = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));
  const goTo = (i) => setPage(i);

  const onStart = (x) => {
    setStartX(x);
    setIsDown(true);
  };

  const onEnd = (x) => {
    if (!isDown || startX === null) return;

    const diff = startX - x;

    if (diff > threshold) goNext();
    if (diff < -threshold) goPrev();

    setIsDown(false);
    setStartX(null);
  };

  const handleTouchStart = (e) => onStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => onEnd(e.changedTouches[0].clientX);

  const handleMouseDown = (e) => onStart(e.clientX);
  const handleMouseUp = (e) => onEnd(e.clientX);

  const commonProps = {
    page,
    goNext,
    goPrev,
    goTo,
    handleSkip,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };

  return (
    <>
      {/* 가이드 모달 */}
      {showGuideModal && (
        <div className="guide-modal-overlay">
          <div className="guide-modal">
            <div className="guide-modal-content">
              <p className="guide-modal-title">가이드를 사용하시겠습니까?</p>
              <p className="guide-modal-desc">
                포트폴리오 시연을 위한 가이드 기능입니다.<br />
                노란 점으로 주요 기능을 안내해드립니다.
              </p>
            </div>
            <div className="guide-modal-actions">
              <button className="guide-modal-btn skip" onClick={handleSkipGuide}>
                괜찮아요
              </button>
              <button className="guide-modal-btn ok" onClick={handleConfirmGuide}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 온보딩 페이지 렌더링 */}
      {page === 0 && <Onboarding1 {...commonProps} />}
      {page === 1 && <Onboarding2 {...commonProps} />}
      {page === 2 && <Onboarding3 {...commonProps} />}
      {page === 3 && <Onboarding4 {...commonProps} />}
    </>
  );
};

const Dots = ({ page, goTo }) => (
  <div className="dots">
    {[0, 1, 2, 3].map((i) => (
      <button
        key={i}
        type="button"
        className={`dot ${page === i ? "active" : ""}`}
        onClick={() => goTo(i)}
        aria-label={`${i + 1}번째 온보딩`}
      />
    ))}
  </div>
);

const Bottom = ({ page, goNext, goTo }) => (
  <div className="bottom">
    <Dots page={page} goTo={goTo} />
    <button className="next" type="button" onClick={goNext}>
      <div className="guide-dot"></div>
      다음
    </button>
  </div>
);

const Container = ({
  children,
  page,
  goPrev,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => {
  return (
    <div
      className="onboarding-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <OnboardingTopBar
        iconType={page === 0 ? "none" : "back"}   // ✅ 핵심
        skipType="skip"                           // ✅ 항상 있음
        onBack={goPrev}
        onSkip={handleSkip}
        outerClassName="onboardingHeader"
        innerClassName="onboardingInnerHeader"
      />

      {children}
    </div>
  );
};
// Onboarding 1
const Onboarding1 = ({
  page,
  goNext,
  goTo,
  goPrev,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev} // ✅ 추가
    handleSkip={handleSkip}
    handleTouchStart={handleTouchStart}
    handleTouchEnd={handleTouchEnd}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
  >
    <img className="bg" src="/img/onboarding-1.jpg" alt="" />

    <div className="content">
      <h2>
        당신은 관중이 아닙니다
        <br />
        10번째 선수입니다
      </h2>
      <h3>
        그저 지켜보는 것이 아니라 <br />
        함성과 기록으로 경기의 흐름을 만드세요
      </h3>
    </div>

    <Bottom page={page} goNext={goNext} goTo={goTo} />
  </Container>
);

// Onboarding 2
const Onboarding2 = ({
  page,
  goNext,
  goTo,
  goPrev,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev} // ✅ 추가
    handleSkip={handleSkip}
    handleTouchStart={handleTouchStart}
    handleTouchEnd={handleTouchEnd}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
  >
    <img className="bg" src="/img/onboarding-2.jpg" alt="" />

    <div className="content">
      <h2>
        스타디움
        <br />
        완벽한 승리를 위한 시야
      </h2>
      <h3>
        티켓을 스캔하여 내 자리를 미리 확인하고 <br />
        가장 전략적인 직관을 준비하세요.
      </h3>
    </div>

    <Bottom page={page} goNext={goNext} goTo={goTo} />
  </Container>
);

// Onboarding 3
const Onboarding3 = ({
  page,
  goNext,
  goTo,
  goPrev,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev} // ✅ 추가
    handleSkip={handleSkip}
    handleTouchStart={handleTouchStart}
    handleTouchEnd={handleTouchEnd}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
  >
    <img className="bg" src="/img/onboarding-3.jpg" alt="" />

    <div className="content">
      <h2>
        그라운드
        <br />
        팬들의 플레이가 시작되는 곳
      </h2>
      <h3>팬들의 응원과 의견이 모여 경기의 분위기를 만든다</h3>
    </div>

    <div className="bubbles">
      <div className="bubble bubble-right">
        <span className="bubble-avatar">
          <img src="/img/onboarding-bubble-1.jpg" alt="" />
        </span>
        김호령 때문에 야구 보기 시작함
      </div>

      <div className="bubble bubble-left">
        <span className="bubble-avatar">
          <img src="/img/onboarding-bubble-2.jpg" alt="" />
        </span>
        김도영 폼 미쳤다
      </div>
    </div>

    <Bottom page={page} goNext={goNext} goTo={goTo} />
  </Container>
);

// Onboarding 4
const Onboarding4 = ({
  page,
  goNext,
  goTo,
  goPrev,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev} // ✅ 추가
    handleSkip={handleSkip}
    handleTouchStart={handleTouchStart}
    handleTouchEnd={handleTouchEnd}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
  >
    <img className="bg" src="/img/onboarding-4.jpg" alt="" />

    <div className="content">
      <h2>
        락커룸
        <br />
        나만의 팬 기록이 쌓이는 공간
      </h2>
      <h3>
        직관 승률부터 티켓북까지 <br />
        추억을 넘어 당신의 시즌 기록이 됩니다.
      </h3>
    </div>

    <Bottom page={page} goNext={goNext} goTo={goTo} />
  </Container>
);

export default Onboarding;
