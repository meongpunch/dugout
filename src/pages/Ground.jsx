import React from "react";
import "./Ground.css";
import MainPgHeader from "../components/MainPgHeader";
const Ground = () => {
  return (
    <div className="ground-container">
      <MainPgHeader logoType="logo" btnType="alarm" />
      <section className="Ground">
        <div className="inner">
          <div className="ground_content">
            <h1 className="ground_title point">KIA TIGERS</h1>

            {/* sns버튼 */}
            <div className="ground_actions">
              <a href="#">
                <img src="/img/ground_sns_icon1.svg" alt="sns아이콘" />
              </a>
              <a href="#">
                <img src="/img/ground_sns_icon2.svg" alt="sns아이콘2" />
              </a>
              <a href="#">
                <img src="/img/ground_sns_icon3.svg" alt="sns아이콘3" />
              </a>
            </div>

            {/* 하단 안내 문구 */}
            <p className="ground__info">
              <span className="ground_infobar"></span>
              <span className="ground_infoLabel">멤버십</span>
              <span className="ground_infoText">
                (월) 12:00 2026년 시즌권 오픈
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* ground-sns */}
      <section className="ground-sns">
        <div className="inner">
          <h3 className="section-title">구단 SNS</h3>
        </div>
      </section>
    </div>
  );
};

export default Ground;
