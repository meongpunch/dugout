import React from "react";
import { Link } from "react-router-dom";
import "./MainPgHeader.css";

const MainPgHeader = ({ btnType }) => {
  return (
    <header>
      <div className="innerHeader">
        <h1 className="logo">
          <Link to="/home">
            <img src="/img/header-logo.svg" alt="DUGOUT" />
          </Link>
        </h1>

        <div className="icon-box">
          {btnType === "alarm" && <img src="/img/noti-icon.svg" alt="알림" />}
          {btnType === "ticket" && (
            <img src="/img/ticket-icon.svg" alt="티켓" />
          )}
          {btnType === "setting" && (
            <img src="/img/Setting-icon.svg" alt="설정" />
          )}
        </div>
      </div>
    </header>
  );
};

export default MainPgHeader;
