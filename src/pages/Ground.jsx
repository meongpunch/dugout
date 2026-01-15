import React from "react";
import "./Ground.css";
import MainPgHeader from "../components/MainPgHeader";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const snsCards = [
  {
    id: 1,
    img: "/img/ground_sns_1.jpg",
    badge: "📍 RT Event",
    title: "내 맘속 유망주 자랑~ 5분 선정 선수 ",
    desc: "폴라로이드 선물 증정! (랜덤)🎁",
    profileImg: "/img/ground_sns_logo.svg",
    profileName: "Always_Kia_Tigers",
    extraIcon: "/img/ground_sns_logo2.svg",
  },
  {
    id: 2,
    img: "/img/ground_sns_2.jpg",
    badge: "⚾ 오프 더 가코드",
    title: "선수들은 내일을 향해 달리는 중",
    desc: "In Okinawa ⭐",
    profileImg: "/img/ground_sns_logo.svg",
    profileName: "Always_Kia_Tigers",
    extraIcon: "/img/ground_sns_logo2.svg",
  },
  {
    id: 3,
    img: "/img/ground_sns_3.jpg",
    badge: "🎥 오프 더 갸코드",
    title: "지금은 준비의 시간,",
    desc: "팬들이 뽑은 베스트 장면 TOP5",
    profileImg: "/img/ground_sns_logo.svg",
    profileName: "Always_Kia_Tigers",
    extraIcon: "/img/ground_sns_logo2.svg",
  },
  {
    id: 4,
    img: "/img/ground_sns_4.jpg",
    badge: "🐯 Tigers",
    title: "선수들은 내일을 향해 달리는 중 ",
    desc: "In Okinawa ⭐",
    profileImg: "/img/ground_sns_logo.svg",
    profileName: "Always_Kia_Tigers",
    extraIcon: "/img/ground_sns_logo2.svg",
  },
];

const Ground = () => {
  return (
    <div className="ground-container">
      <MainPgHeader />
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

          <Swiper
            className="sns-swiper"
            spaceBetween={16}
            slidesPerView="auto"
            slidesOffsetBefore={0}
            slidesOffsetAfter={16}
            centeredSlides={false}
            breakpoints={{
              430: { slidesPerView: "auto" },
            }}
          >
            {snsCards.map((card) => (
              <SwiperSlide key={card.id}>
                <a href="#" className="sns-card-link">
                  <article className="sns-card">
                    {/* 이미지 */}
                    <div className="sns-thumb">
                      <img src={card.img} alt={card.title} />
                    </div>

                    {/* 텍스트 */}
                    <div className="sns-body">
                      <span className="sns-badge">{card.badge}</span>
                      <p className="sns-title">{card.title}</p>
                      <p className="sns-desc">{card.desc}</p>
                    </div>

                    {/* 하단 */}
                    <div className="sns-footer">
                      <div className="sns-profile">
                        <img src={card.profileImg} alt={card.profileName} />
                        <span className="sns-profile-name">
                          {card.profileName}
                        </span>
                      </div>
                      <img className="sns-img" src={card.extraIcon} alt="" />
                    </div>
                  </article>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Ground;
