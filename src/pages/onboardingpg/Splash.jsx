import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000); // 3초 뒤 이동
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="img-box">
        <img src="/img/splash-img.jpg" alt="" />
      </div>
      <div className="text-box">
        <p className="spalsh-txt">The 10th Player</p>
        <h1 className="splash-title point">DUGOUT</h1>
      </div>
    </div>
  );
};

export default Splash;
