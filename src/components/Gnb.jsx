import React from "react";
import { Link, useLocation } from "react-router-dom"; // Link랑 useLocation 사용
import "./Gnb.css";

const Gnb = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="gnb">
      <Link to="/" className={`gnb-item ${isActive("/") ? "active" : ""}`}>
        <div className="icon-box">
          {/* 주소가 '/' 이면 채워진 아이콘, 아니면 빈 아이콘 */}
          <img
            src={
              isActive("/") ? "/img/nav_home_on.svg" : "/img/nav_home_off.svg"
            }
            alt="홈"
          />
        </div>
        <span className="text">홈</span>
      </Link>

      {/* 2. 스타디움 (Stadium) */}
      <Link
        to="/stadium"
        className={`gnb-item ${isActive("/stadium") ? "active" : ""}`}
      >
        <div className="icon-box">
          <img
            src={
              isActive("/stadium")
                ? "/img/nav_stadium_on.svg"
                : "/img/nav_stadium_off.svg"
            }
            alt="스타디움"
          />
        </div>
        <span className="text">스타디움</span>
      </Link>

      {/* 3. 그라운드 (Ground) */}
      <Link
        to="/ground"
        className={`gnb-item ${isActive("/ground") ? "active" : ""}`}
      >
        <div className="icon-box">
          <img
            src={
              isActive("/ground")
                ? "/img/nav_ground_on.svg"
                : "/img/nav_ground_off.svg"
            }
            alt="그라운드"
          />
        </div>
        <span className="text">그라운드</span>
      </Link>

      {/* 4. 라커룸 (Lockerroom) */}
      <Link
        to="/lockerroom"
        className={`gnb-item ${isActive("/lockerroom") ? "active" : ""}`}
      >
        <div className="icon-box">
          <img
            src={
              isActive("/lockerroom")
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

export default Gnb;
