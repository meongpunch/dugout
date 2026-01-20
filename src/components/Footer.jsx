import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname; // 현재 주소 (예: /player/1)

  // ⭐️ 여기가 핵심! 각 탭이 켜져야 하는 상황을 정해줍니다.
  const getActiveTab = () => {
    // 1. 스타디움 식구들 (/stadium, /stadium/seat 등)
    if (path.startsWith("/stadium")) return "stadium";

    // 2. 그라운드 식구들
    if (path.startsWith("/ground") ||
      path.startsWith("/topic")) return "ground";

    // 3. 라커룸 식구들
    if (path.startsWith("/lockerroom")) return "lockerroom";

    // 4. 홈 식구들 (나머지 전부 or 특정 페이지들)
    // 홈은 식구가 많아요: 메인, 선수디테일, 샵, 순위, 퀴즈, 알림 등등...
    if (
      path === "/" ||
      path === "/home" ||
      path.startsWith("/player") || // 선수 디테일
      path.startsWith("/shop") || // MD 샵
      path.startsWith("/teamrank") || // 구단 순위
      path.startsWith("/Quiz") // 퀴즈
    ) {
      return "home";
    }

    return ""; // 아무것도 해당 안 되면 끔
  };

  const activeTab = getActiveTab(); // 지금 켜져야 할 탭 이름 ('home', 'stadium' 등)

  const handleTabClick = (e, targetPath) => {
    // 현재 보고 있는 페이지(=path)가 누르려는 링크(=targetPath)와 같을 때만
    // 스크롤을 맨 위로 올리고, 이동은 막습니다.
    if (path === targetPath) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // 그 외(예: 서브 페이지에서 메인 아이콘 클릭)에는
    // 그냥 두면 Link가 알아서 해당 페이지로 이동시켜 줍니다.
    // 이동하면 ScrollToTop.jsx가 작동해서 맨 위로 가게 됩니다.
  };

  return (
    <nav className="gnb">
      {/* 1. 홈 */}
      <Link
        to="/"
        className={`gnb-item ${activeTab === "home" ? "active" : ""}`}
        onClick={(e) => handleTabClick(e, "/")}
      >
        <div className="icon-box">
          <img
            src={
              activeTab === "home"
                ? "/img/nav_home_on.svg"
                : "/img/nav_home_off.svg"
            }
            alt="홈"
          />
        </div>
        <span className="text">홈</span>
      </Link>

      {/* 2. 스타디움 */}
      <Link
        to="/stadium"
        className={`gnb-item ${activeTab === "stadium" ? "active" : ""}`}
        onClick={(e) => handleTabClick(e, "/stadium")}
      >
        <div className="icon-box">
          <img
            src={
              activeTab === "stadium"
                ? "/img/nav_stadium_on.svg"
                : "/img/nav_stadium_off.svg"
            }
            alt="스타디움"
          />
        </div>
        <span className="text">스타디움</span>
      </Link>

      {/* 3. 그라운드 */}
      <Link
        to="/ground"
        className={`gnb-item ${activeTab === "ground" ? "active" : ""}`}
        onClick={(e) => handleTabClick(e, "/ground")}
      >
        <div className="icon-box">
          <img
            src={
              activeTab === "ground"
                ? "/img/nav_ground_on.svg"
                : "/img/nav_ground_off.svg"
            }
            alt="그라운드"
          />
        </div>
        <span className="text">그라운드</span>
      </Link>

      {/* 4. 라커룸 */}
      <Link
        to="/lockerroom"
        className={`gnb-item ${activeTab === "lockerroom" ? "active" : ""}`}
        onClick={(e) => handleTabClick(e, "/lockerroom")}
      >
        <div className="icon-box">
          <img
            src={
              activeTab === "lockerroom"
                ? "/img/nav_locker_on.svg"
                : "/img/nav_locker_off.svg"
            }
            alt="라커룸"
          />
        </div>
        <span className="text">라커룸</span>
      </Link>
    </nav>
  );
};

export default Footer;
