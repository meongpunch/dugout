import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const goTeamChoice = () => {
    navigate("/teamchoice"); // ✅ TeamChoice 라우트 경로로 바꿔도 됨
  };

  return (
    <div className="login-container">
      <div className="login">
        <img className="login-bg" src="/img/Login-1.jpg" alt="" />
      </div>

      <div className="login-logoBox">
        <img className="login__logo" src="/img/Login-logo.svg" alt="DUGOUT" />
        <h2 className="login-tit point"> DUGOUT </h2>
      </div>

      <div className="login-bottom">
        <button className="login-btn kakao" type="button" onClick={goTeamChoice}>
          <img className="login-icon" src="/img/Login-kakao.svg" alt="" />
          카카오로 로그인
        </button>

        <button className="login-btn google" type="button" onClick={goTeamChoice}>
          <img className="login-icon" src="/img/Login-google.svg" alt="" />
          구글로 로그인
        </button>

        <button className="login-btn apple" type="button" onClick={goTeamChoice}>
          <img className="login-icon" src="/img/Login-apple.svg" alt="" />
          애플로 로그인
        </button>

        <div className="login-links">
          <Link>다른 방법으로 로그인</Link>
          <span className="bar">|</span>
          <Link>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
