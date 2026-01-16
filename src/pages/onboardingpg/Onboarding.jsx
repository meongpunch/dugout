import React, { useState } from "react";
import "./Onboarding.css";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [startX, setStartX] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const threshold = 60;


  const handleSkip = () => {
    navigate("/Login");
  };


  const goNext = () => {
    setPage((prev) => {
      if (prev >= 3) {
        navigate("/Login");
        return prev;
      }
      return prev + 1;
    });
  };

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

  if (page === 0) return <Onboarding1 {...commonProps} />;
  if (page === 1) return <Onboarding2 {...commonProps} />;
  if (page === 2) return <Onboarding3 {...commonProps} />;
  return <Onboarding4 {...commonProps} />;
};

const OnboardingHeader = ({ page, goPrev, onSkip }) => (
  <div className="TeamchoiceHeader onboardingHeader">
    <div className="innerHeader onboardingInnerHeader">
      <button
        className="back-btn"
        type="button"
        onClick={goPrev}
        aria-label="뒤로가기"
        style={{ visibility: page === 0 ? "hidden" : "visible" }}
      >
        <img src="/img/onboarding-back-icon.svg" alt="" />
      </button>

      <button className="skip-btn" type="button" onClick={onSkip}>
        건너뛰기
      </button>
    </div>
  </div>
);

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
      다음
    </button>
  </div>
);

const Container = ({
  children,
  page,
  goPrev,
  onSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <div
    className="onboarding-container"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
  >
    <OnboardingHeader page={page} goPrev={goPrev} onSkip={onSkip} />
    {children}
  </div>
);

// Onboarding 1
const Onboarding1 = ({
  page,
  goNext,
  goPrev,
  goTo,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev}
    onSkip={handleSkip}
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
  goPrev,
  goTo,
  handleSkip,
  handleTouchStart,
  handleTouchEnd,
  handleMouseDown,
  handleMouseUp,
}) => (
  <Container
    page={page}
    goPrev={goPrev}
    onSkip={handleSkip}
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
    goPrev={goPrev}
    onSkip={handleSkip}
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
        이 선수 때문에 야구 보기 시작함
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
    goPrev={goPrev}
    onSkip={handleSkip}
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
