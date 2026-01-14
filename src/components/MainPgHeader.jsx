import React from "react";
import "./MainPgHeader.css";
const MainPgHeader = () => {
  return (
    <header>
      <div className="innerHeader">
        <h1 className="logo">
          <img src="/img/header-logo.svg" alt="" />
        </h1>
        <div className="icon-box noti-icon">
          <img src="/img/noti-icon.svg" alt="" />
        </div>
      </div>
    </header>
  );
};

export default MainPgHeader;
