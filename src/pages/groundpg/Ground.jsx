import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Ground.css";
import "../../components/Guide.css";
import MainPgHeader from "../../components/MainPgHeader";

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
    linkUrl:
      "https://x.com/kiatigers/status/2008369049512915061?s=46&t=OEx_hEu0TAZ_fq8bxjWzmA",
  },
  {
    id: 2,
    img: "/img/ground_sns_2.jpg",
    badge: "⚾️ 오프 더 가코드",
    title: "선수들은 내일을 향해 달리는 중",
    desc: "In Okinawa ⭐",
    profileImg: "/img/ground_sns_logo.svg",
    profileName: "Always_Kia_Tigers",
    extraIcon: "/img/ground_sns_logo2.svg",
    linkUrl: "https://www.instagram.com/p/DRYxa92EjUs/?igsh=cjd4dG9wenQ2bGp0",
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
    linkUrl:
      "https://x.com/kiatigers/status/1976925628403535935?s=46&t=OEx_hEu0TAZ_fq8bxjWzmA",
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
    linkUrl: "https://www.instagram.com/p/DRYxa92EjUs/?igsh=cjd4dG9wenQ2bGp0",
  },
];

// 인기 vs 토픽 데이터
const popularTopics = [
  {
    id: 1,
    coverImg: "/img/ground_topic_main.jpg",
    profileImg: "/img/ground_topic_profile.jpg", // 원형 프로필
    nickname: "남양주일찐김의성",
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

//  인기 게시글
const popularPosts = [
  {
    id: 1,
    img: "/img/ground_post_1.jpg",
    title: "호민아 잘 성장하고 있다!! 내...",
    size: "sm",
  },
  {
    id: 2,
    img: "/img/ground_post_5.jpg",
    title: "이 자식 오늘 홈런 하나 칠 컨디션인 게 분명함",
    size: "md",
  },
  {
    id: 3,
    img: "/img/ground_post_2.jpg",
    title: "나 진짜 우리집 끼기가 자랑...",
    size: "md",
  },
  {
    id: 4,
    img: "/img/ground_post_6.jpg",
    title: "쫓기는것같아황성빈",
    size: "xs",
  },
  {
    id: 5,
    img: "/img/ground_post_3.jpg",
    title: "ㅋㅋㅋ 이의리 아웃카운트 겨우 잡고 좋아하는 거 웃기고 귀여움",
    size: "sm",
  },
  {
    id: 6,
    img: "/img/ground_post_7.jpg",
    title: "호령아 올해는 너 덕분에 웃고 울었다 진짜 멋있었다",
    size: "md",
  },
  {
    id: 7,
    img: "/img/ground_post_4.jpg",
    title: "원필 시구 본 사람.. 너 다 해라 김원필",
    size: "sm",
  },
];

//굿즈존 데이터
const mdZonItems = [
  {
    id: 1,
    img: "/img/ground_mdzon_1.jpg",
    type: "나눔",
    title: "22일 경기 오후 5시",
    price: "무료",
    to: "/mdzon/1",
  },
  {
    id: 2,
    img: "/img/ground_mdzon_2.jpg",
    type: "판매",
    title: "오픈 : 23일 오후 12시",
    price: "500원",
    to: "/mdzon/2",
  },
  {
    id: 3,
    img: "/img/ground_mdzon_3.jpg",
    type: "판매",
    title: "오픈 : 23일 오후 12시",
    price: "18,000원",
    to: "/mdzon/3",
  },
  {
    id: 4,
    img: "/img/ground_mdzon_4.jpg",
    type: "나눔",
    title: "24일 경기 오후 1시",
    price: "무료",
    to: "/mdzon/3",
  },
  {
    id: 5,
    img: "/img/ground_mdzon_5.jpg",
    type: "판매",
    title: "오픈 : 23일 오후 6시",
    price: "25,000원",
    to: "/mdzon/3",
  },
];

const Ground = () => {
  const navigate = useNavigate();
  const [activeReactions, setActiveReactions] = useState([]);
  const [reactionCounts, setReactionCounts] = useState(
    popularTopics[0].reactions.map((r) => r.count),
  );

  return (
    <div className="ground-container">
      {/* ★ 중요 변경점: [상단 인트로 영역] 생성 
        헤더 + 첫 번째 섹션(Ground) + 비디오를 이 div 안에 가뒀습니다.
      */}
      <div className="ground-intro">
        {/* 1. 배경 비디오 (이 영역 안에서만 꽉 참) */}
        <video className="ground-video-bg" autoPlay loop muted playsInline>
          <source src="/img/groundvideo.mp4" type="video/mp4" />
        </video>

        {/* 2. 비디오 위 콘텐츠 래퍼 (헤더 + 타이틀) */}
        <div className="ground-intro-content">
          <MainPgHeader logoType="logo" btnType="alarm" />

          <section className="Ground">
            <div className="inner">
              <div className="ground_content">
                <h1 className="ground_title point">KIA TIGERS</h1>

                {/* sns버튼 */}
                <div className="ground_actions">
                  <a
                    href="https://www.youtube.com/channel/UCKp8knO8a6tSI1oaLjfd9XA/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="guide-dot"></div>
                    <img src="/img/ground_sns_icon1.svg" alt="sns유튜브" />
                  </a>
                  <a
                    href="https://x.com/Kiatigers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="guide-dot"></div>
                    <img src="/img/ground_sns_icon2.svg" alt="snsX" />
                  </a>
                  <a
                    href="https://www.instagram.com/always_kia_tigers/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="guide-dot"></div>
                    <img src="/img/ground_sns_icon3.svg" alt="sns인스타그램" />
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
        </div>
      </div>
      {/* ▲▲▲ 상단 인트로 끝 (여기서 비디오가 잘림) ▲▲▲ */}

      {/* ▼▼▼ 여기서부터는 검은 배경 (영상 없음) ▼▼▼ */}

      {/* ground-sns */}
      <section className="ground-sns">
        <div className="inner">
          <h3 className="section-title">구단 SNS</h3>
          <div
            className="guide-swiper"
            style={{
              top: "20%",
              left: "70%",
              marginLeft: "-30px",
              marginTop: "20px",
            }}
          ></div>
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
                <a
                  href={card.linkUrl}
                  className="sns-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <article className="sns-card">
                    <div className="sns-thumb">
                      <div className="guide-dot"></div>
                      <img src={card.img} alt={card.title} />
                    </div>
                    <div className="sns-body">
                      <span className="sns-badge">{card.badge}</span>
                      <p className="sns-title">{card.title}</p>
                      <p className="sns-desc">{card.desc}</p>
                    </div>
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
            <Link to={"/topic"} className="ground-topic-more">
              더보기
            </Link>
          </div>

          <div className="ground-topic-list">
            {popularTopics.map((item) => (
              <article key={item.id} className="topic-card">
                <Link to={"/topic"} className="topic-card-link">
                  <div className="guide-dot"></div>
                  <div className="topic-card-bg">
                    <img src={item.coverImg} alt="" />
                  </div>
                  <div className="topic-card-overlay">
                    <div className="topic-card-top">
                      <div className="topic-profile">
                        <img src={item.profileImg} alt={item.nickname} />
                      </div>
                      <p className="topic-nickname">{item.nickname}</p>
                    </div>

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
                                  setReactionCounts((counts) =>
                                    counts.map((c, i) =>
                                      i === idx
                                        ? isActive
                                          ? c - 1
                                          : c + 1
                                        : c,
                                    ),
                                  );
                                  return isActive
                                    ? prev.filter((i) => i !== idx)
                                    : [...prev, idx];
                                });
                              }}
                            >
                              {idx === 0 && <div className="guide-dot"></div>}
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ground-banner */}
      <section className="ground-banner">
        <a
          href="https://www.tving.com/sports/kbo?n_media=27758&n_query=%ED%8B%B0%EB%B9%99%ED%94%84%EB%A1%9C%EC%95%BC%EA%B5%AC&n_rank=1&n_ad_group=grp-a001-01-000000040965984&n_ad=nad-a001-01-000000304649436&n_keyword_id=nkw-a001-01-000006209738999&n_keyword=%ED%8B%B0%EB%B9%99%ED%94%84%EB%A1%9C%EC%95%BC%EA%B5%AC&n_campaign_type=1&n_ad_group_type=1&n_match=1&NaPm=ct%3Dlxu4x8vk%7Cci%3D0yq0001stlDAQEDawuZ3%7Ctr%3Dsa%7Chk%3D042b634c63c901280f5dc010bed047eea6dd624b%7Cnacn%3DfCfnEwAeI5wuG&gad_source=1&gad_campaignid=23411707576&gbraid=0AAAAAC1p3XT_j6qAvWxWCs4XTOziQc-4Y&gclid=Cj0KCQiAyP3KBhD9ARIsAAJLnnaqqc3jVSwCRjGb7h5iBTQf-V_vdM7JO1I6ObWRBba35HR56mspBK0aAkzAEALw_wcB"
          className="ground-banner_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="guide-dot"></div>
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

      {/* ground-moment */}
      <section className="ground-moment">
        <div className="inner">
          <h3 className="section-title">플레이 모먼트</h3>
          <Swiper
            className="moment-swiper"
            spaceBetween={14}
            slidesPerView="auto"
            slidesOffsetBefore={0}
            slidesOffsetAfter={14}
          >
            <SwiperSlide>
              <a
                href="#"
                className="moment-card-link"
                onClick={(e) => e.preventDefault()}
              >
                <article className="moment-card">
                  <div className="moment-thumb">
                    <img src="/img/ground_moment.jpg" alt="" />
                  </div>
                  <p className="moment-title">
                    최연소 30-30 달성 기아 타이거즈 김도영
                  </p>
                </article>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                href="#"
                className="moment-card-link"
                onClick={(e) => e.preventDefault()}
              >
                <article className="moment-card">
                  <div className="moment-thumb">
                    <img src="/img/ground_moment2.jpg" alt="" />
                  </div>
                  <p className="moment-title">
                    펜스를 넘어 그라운드로 나간 고양이
                  </p>
                </article>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* ground-post */}
      <section className="ground-post">
        <div className="inner">
          <div className="ground-post-head">
            <h3 className="section-title">인기 게시글</h3>
            <a
              href="#"
              className="ground-post-more"
              onClick={(e) => e.preventDefault()}
            >
              더보기
            </a>
          </div>
          <div className="ground-post-cols">
            <ul className="ground-post-col">
              {popularPosts
                .filter((_, idx) => idx % 2 === 0)
                .map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="post-card"
                      onClick={() =>
                        navigate("/ground/post", { state: { postId: item.id } })
                      }
                    >
                      <div className={`post-thumb is-${item.size}`}>
                        <div className="guide-dot" />
                        <img src={item.img} alt={item.title} />
                        <div className="post-dim" />
                        <p className="post-title">{item.title}</p>
                      </div>
                    </button>
                  </li>
                ))}
            </ul>

            <ul className="ground-post-col">
              {popularPosts
                .filter((_, idx) => idx % 2 === 1)
                .map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="post-card"
                      onClick={() =>
                        navigate("/ground/post", {
                          state: { postId: `p${item.id}` },
                        })
                      }
                    >
                      <div className={`post-thumb is-${item.size}`}>
                        <div className="guide-dot" />
                        <img src={item.img} alt={item.title} />
                        <div className="post-dim" />
                        <p className="post-title">{item.title}</p>
                      </div>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ground-mdzon */}
      <section className="ground-mdzon">
        <div className="inner">
          <div className="ground-mdzon-head">
            <h3 className="section-title">굿즈존</h3>
            <a
              href="#"
              className="ground-mdzon-more"
              onClick={(e) => e.preventDefault()}
            >
              더보기
            </a>
          </div>
          <Swiper
            className="mdzon-swiper"
            spaceBetween={16}
            slidesPerView="auto"
            slidesOffsetBefore={0}
            slidesOffsetAfter={16}
            centeredSlides={false}
          >
            {mdZonItems.map((item) => (
              <SwiperSlide key={item.id} className="mdzon-slide">
                <a
                  href="#"
                  className="mdzon-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="mdzon-thumb">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="mdzon-body">
                    <span className="mdzon-type">{item.type}</span>
                    <p className="mdzon-title">{item.title}</p>
                    <p className="mdzon-price">{item.price}</p>
                  </div>
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
