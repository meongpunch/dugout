import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Swiper 관련 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import BackButton from "../../components/Backbutton";
import "./PlayerDetail.css"; // CSS 파일 임포트 확인!

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  // 1. 포토카드에 들어갈 데이터 (실제 데이터로 나중에 교체)
  const cards = [
    {
      id: 1,
      image: "/img/player-detail-photo1.png",
      name: "양현종 1",
    },
    {
      id: 2,
      image: "/img/player-detail-photo2.png",
      name: "양현종 2",
    },
    {
      id: 3,
      image: "/img/player-detail-photo3.png",
      name: "양현종 3",
    },
  ];

  const playersData = [
    {
      id: 1,
      role: "투수 | 에이스",
      name: "양현종",
      tags: ["#올스타", "#팀의상징", "#홈런 23"],
      img: "/img/card_yang.svg",
      desc: "타이거즈의 영원한 에이스, 대투수 양현종. 마운드 위에서의 존재감은 타의 추종을 불허한다.",
      stats: { era: "3.54", win: 12, so: 140 },
      graphData: [15, 25, 35, 45, 35, 55, 60],
      lastGraphValue: "66%",
      detailStats: [
        { title: "WINS", value: "186", bg: "/img/player-detail-statbg1.png" },
        { title: "GAMES", value: "543", bg: "/img/player-detail-statbg2.png" },
        { title: "ERA", value: "3.90", bg: "/img/player-detail-statbg3.png" },
        {
          title: "INNINGS",
          value: "2,500",
          bg: "/img/player-detail-statbg4.png",
        },
        {
          title: "KOREAN SERIES",
          value: "3",
          bg: "/img/player-detail-statbg5.png",
        },
        {
          title: "STRIKE OUTS",
          value: "2,185",
          bg: "/img/player-detail-statbg6.png",
        },
      ],
    },
    {
      id: 2,
      role: "내야수 | 슈퍼스타",
      name: "김도영",
      tags: ["#30-30", "#도니살", "#MVP"],
      img: "/img/card_park.svg",
      desc: "제2의 이종범, 호타준족의 상징. 30-30 클럽 가입과 함께 리그를 지배하는 슈퍼스타.",
      stats: { avg: "0.340", hr: 38, sb: 40 },
    },
    {
      id: 3,
      role: "외야수 | 거포",
      name: "오선우",
      tags: ["#파워히터", "#한방있는", "#해결사"],
      img: "/img/card_oh.svg",
      desc: "결정적인 순간에 터지는 한 방. 팀의 승리를 가져오는 강력한 파워 히터.",
      stats: { avg: "0.280", hr: 15, rbi: 55 },
    },
  ];

  useEffect(() => {
    const found = playersData.find((p) => p.id === parseInt(id));
    setPlayer(found);
  }, [id]);

  if (!player) {
    return <div className="loading">선수 정보를 찾을 수 없습니다...</div>;
  }

  return (
    <div className="detail-container">
      <header className="detail-header">
        <BackButton title="선수보기" />
      </header>

      {/* 메인 콘텐츠 */}
      <section className="player-hero">
        <div className="player-hero-box">
          <div className="player-hero-box-bg">
            <img src="/img/player-detail-bg.png" alt="기아타이거즈배경" />
          </div>
          <div className="player-hero-box-cont">
            <p className="player-hero-box-cont-txt point">
              YANG
              <br />
              HYEON
              <br />
              JONG
            </p>
            <div className="player-hero-box-cont-img">
              <img src="/img/player-detail-yang.png" alt="양현종선수" />
            </div>
          </div>
          <div className="player-hero-box-desc">
            <div className="player-hero-box-red">
              <img
                className="player-red-bg"
                src="/img/player-detail-red.svg"
                alt="글자배경"
              />
              <p className="player-detail-red-txt">투수ㅣ에이스</p>
            </div>
            <p className="player-hero-box-desc-txt">"기아를 지켜온 에이스"</p>
          </div>
        </div>
      </section>

      <section className="player-stat">
        <div className="stat-grid">
          {player.detailStats &&
            player.detailStats.map((stat, index) => (
              <div
                key={index}
                className="stat-box"
                style={{
                  backgroundImage: stat.bg ? `url('${stat.bg}')` : "none",
                }}
              >
                <span className="stat-box-title">{stat.title}</span>
                <span className="stat-box-value">{stat.value}</span>
              </div>
            ))}
        </div>
      </section>

      {/* LEGEND SCALE 그래프 섹션 */}
      {player.graphData && (
        <section className="legend-scale-section">
          <div className="scale-inner">
            <div className="text-group">
              <h2 className="section-title scale">LEGEND SCALE</h2>
              <p className="sub-description">오랜시간 쌓아온 레전드 스케일</p>
            </div>

            <div className="chart-container">
              {player.graphData.map((height, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{ "--h": `${height}%` }}
                ></div>
              ))}
              <div className="bar highlight" style={{ "--h": "80%" }}>
                <span className="percent-label">{player.lastGraphValue}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. 포토카드 Swiper 섹션 (CSS 클래스 적용됨) */}
      <section className="photo-card-section">
        <div className="inner">
          <h2 className="section-title card">PHOTO CARD</h2>
          <Swiper
            spaceBetween={12}
            slidesPerView={2.2}
            className="photo-card-swiper"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="photo-card-wrapper">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="photo-card-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default PlayerDetail;
