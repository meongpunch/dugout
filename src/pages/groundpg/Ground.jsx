import React, { useState } from "react";
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

// 인기 vs 토픽 데이터
const popularTopics = [
  {
    id: 1,
    coverImg: "/img/ground_topic_main.jpg",
    profileImg: "/img/ground_topic_profile.jpg", // 원형 프로필
    nickname: "남양주일찐 김의성🌶️",
    title: "내가 먹어본 야구장 최고 야푸는!?",
    timeAgo: "15시간 전",
    reactions: [
      { icon: "🍗", count: 1528 },
      { icon: "🌭", count: 1020 },
      { icon: "☕", count: 985 },
      { icon: "🥡", count: 852 },
      { icon: "🍱", count: 521 },
      { icon: "🍟", count: 57 },
    ],
  },
];

const Ground = () => {
  const [activeReactions, setActiveReactions] = useState([]);
  const [reactionCounts, setReactionCounts] = useState(
    popularTopics[0].reactions.map((r) => r.count)
  );
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
      {/* ground_topic */}
      <section className="ground-topic">
        <div className="inner">
          <div className="ground-topic-head">
            <h3 className="section-title">인기 vs 토픽</h3>
            <a href="#" className="ground-topic-more">
              더보기
            </a>
          </div>

          <div className="ground-topic-list">
            {popularTopics.map((item) => (
              <article key={item.id} className="topic-card">
                <a href="#" className="topic-card-link">
                  {/* 배경이미지 */}
                  <div className="topic-card-bg">
                    <img src={item.coverImg} alt="" />
                  </div>

                  {/* 오버레이 */}
                  <div className="topic-card-overlay">
                    {/* 상단: 프로필 + 닉네임 */}
                    <div className="topic-card-top">
                      <div className="topic-profile">
                        <img src={item.profileImg} alt={item.nickname} />
                      </div>
                      <p className="topic-nickname">{item.nickname}</p>
                    </div>

                    {/* 하단: 제목 + 시간 + 반응칩 */}
                    <div className="topic-card-bottom">
                      <h4 className="topic-title">{item.title}</h4>
                      <p className="topic-time">{item.timeAgo}</p>

                      <div className="topic-reactions">
                        {item.reactions.map((r, idx) => {
                          const isActive = activeReactions.includes(idx);

                          return (
                            <span
                              key={idx}
                              className={`topic-chip ${
                                isActive ? "is-active" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveReactions((prev) => {
                                  const isActive = prev.includes(idx);

                                  // 숫자 증가/감소
                                  setReactionCounts((counts) =>
                                    counts.map((c, i) =>
                                      i === idx ? (isActive ? c - 1 : c + 1) : c
                                    )
                                  );

                                  // 토글 처리
                                  return isActive
                                    ? prev.filter((i) => i !== idx)
                                    : [...prev, idx];
                                });
                              }}
                            >
                              <span className="topic-chip-ic">{r.icon}</span>
                              <span className="topic-chip-count">
                                {reactionCounts[idx].toLocaleString()}
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* ground-banner */}
      <section className="ground-banner">
        <a
          href="#"
          className="ground-banner_link"
          onClick={(e) => e.preventDefault()}
        >
          {/* 배경 이미지 */}
          <div className="ground-banner_bg">
            <img src="/img/ground_banner.jpg" alt="" />
          </div>
          <div className="ground-banner__content">
            <p className="ground-banner__title">2025 KBO 리그 올스타전</p>
            <p className="ground-banner__sub">티빙 단독 생중계</p>

            <p className="ground-banner__meta">
              <span className="ground-banner__date">7/18(토)</span>
              <span className="ground-banner__time">6 PM</span>
              <span className="ground-banner__live">LIVE</span>
            </p>
          </div>
        </a>
      </section>
    </div>
  );
};

export default Ground;
