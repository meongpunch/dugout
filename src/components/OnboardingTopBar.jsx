import React from 'react';
import './OnboardingTopBar.css';
import '../components/Guide.css';
import { useNavigate } from 'react-router-dom';

const OnboardingTopBar = ({
  iconType = 'none',        // 'back' | 'none'
  skipType = 'none',        // 'skip' | 'none'
  onBack,
  onSkip,
  hideBack = false,
  skipLabel = '건너뛰기',
  outerClassName = '',
  innerClassName = '',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // ✅ onBack이 있으면 무조건 그걸 실행 (navigate(-1)로 안 떨어지게)
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    navigate(-1);
  };

  const handleSkip = () => {
    if (typeof onSkip === 'function') {
      onSkip();
      return;
    }
  };

  return (
    <div className={`TeamchoiceHeader ${outerClassName}`}>
      <div className={`innerHeader ${innerClassName}`}>
        {/* LEFT 영역: back 없을 때도 공간 유지 */}
        <div className="TopBar-left">
          {iconType === 'back' ? (

            <button
              className="back-btn"
              type="button"
              onClick={handleBack}
              aria-label="뒤로가기"
              style={{ visibility: hideBack ? 'hidden' : 'visible' }}
            >
              <img src="/img/onboarding-back-icon.svg" alt="" />
            </button>
          ) : (
            <span className="TopBar-spacer" aria-hidden="true" />
          )}
        </div>

        {/* RIGHT 영역: skip 없을 때도 공간 유지 */}
        <div className="TopBar-right">
          {skipType === 'skip' ? (
            <button className="skip-btn" type="button" onClick={handleSkip}>
              <div className="guide-dot"></div>
              {skipLabel}
            </button>
          ) : (
            <span className="TopBar-spacer" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingTopBar;
