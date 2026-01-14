import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import MainPgHeader from "../components/MainPgHeader";

import "swiper/css";
import "swiper/css/effect-coverflow";

import "./Home.css";

const Home = () => {
  // 선수 카드 스와이프 시 데이터 변경
  const players = [
    {
      id: 1,
      role: "투수 | 에이스",
      name: "양현종",
      tags: ["#올스타", "#팀의상징", "#홈런 23"],
      img: "/img/card_yang.svg",
    },
    {
      id: 2,
      role: "내야수 | 슈퍼스타",
      name: "김도영",
      tags: ["#30-30", "#도니살", "#MVP"],
      img: "/img/card_park.svg",
    },
    {
      id: 3,
      role: "외야수 | 거포",
      name: "오선우",
      tags: ["#파워히터", "#한방있는", "#해결사"],
      img: "/img/card_oh.svg",
    },
    {
      id: 1,
      role: "투수 | 에이스",
      name: "양현종",
      tags: ["#올스타", "#팀의상징", "#홈런 23"],
      img: "/img/card_yang.svg",
    },
    {
      id: 2,
      role: "내야수 | 슈퍼스타",
      name: "김도영",
      tags: ["#30-30", "#도니살", "#MVP"],
      img: "/img/card_park.svg",
    },
    {
      id: 3,
      role: "외야수 | 거포",
      name: "오선우",
      tags: ["#파워히터", "#한방있는", "#해결사"],
      img: "/img/card_oh.svg",
    },
  ];
  // 응원 댓극 데이터
  const commentsTop = [
    { id: 1, text: "양현종 없으면 야구 안 봄", user: "/img/user_1.svg" },
    { id: 2, text: "타이거즈는 이름부터 다름", user: "/img/user_2.svg" },
    { id: 3, text: "V13 가자 제발", user: "/img/user_3.svg" },
    { id: 4, text: "레스고~", user: "/img/user_4.svg" },
    { id: 5, text: "이겨보자", user: "/img/user_5.svg" },
  ];

  const commentsBottom = [
    { id: 6, text: "가을야구 확정!", user: "/img/user_6.svg" },
    { id: 7, text: "니땜시살어야", user: "/img/user_7.svg" },
    { id: 8, text: "오선우 파이팅", user: "/img/user_8.svg" },
    {
      id: 9,
      text: "승리하라 최강기아 열광하라 타이거즈",
      user: "/img/user_9.svg",
    },
    { id: 10, text: "최강기아 타이거즈", user: "/img/user_10.svg" },
  ];
  const [activePlayer, setActivePlayer] = useState(players[0]);

  const highlights = [
    {
      id: 1,
      title: "이 순간, 팀이 하나가 된다",
      img: "/img/highlight-img_1.svg",
    },
    {
      id: 2,
      title: "마운드를 지배한 한 이닝",
      img: "/img/highlight-img_2.svg",
    },
    {
      id: 3,
      title: "비가 와도, 멈추지 않는다",
      img: "/img/highlight-img_3.svg",
    },
    {
      id: 4,
      title: "0.1초의 판단",
      img: "/img/highlight-img_4.svg",
    },
  ];

  const rankData = [
    {
      id: 1,
      rank: 1,
      name: "한화 이글스",
      enName: "Hanwha Eagles",
      logo: "/img/Hanwha_logo.svg",
      state: "-",
    },
    {
      id: 2,
      rank: 2,
      name: "엔씨 다이노스",
      enName: "NC Dinos",
      logo: "/img/NC_logo.svg",
      state: "up",
    },
    {
      id: 3,
      rank: 3,
      name: "기아 타이거즈",
      enName: "KIA TIGERS",
      logo: "/img/KIA_logo.svg",
      state: "up",
    },
  ];

  return (
    <div className="home-container">
      <MainPgHeader />
      {/* hero section */}
      <section className="hero">
        <div className="hero-info">
          <p className="team-name point">KIA TIGERS</p>
          {/* 스와이프 시 교체영역 */}
          <p className="player-role">{activePlayer.role}</p>
          <h2 className="player-name">{activePlayer.name}</h2>
          <div className="tags">
            {activePlayer.tags.map((tags, index) => (
              <span key={index}>{tags}</span>
            ))}
          </div>
        </div>
        {/* swpier 선수카드 */}
        <div className="hero-swiper-wrap">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={"70"}
            initialSlide={0}
            loop={true}
            observer={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: false,
              opacity: 0.5,
            }}
            onSlideChange={(swiper) => {
              setActivePlayer(players[swiper.realIndex]);
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
          >
            {players.map((player) => (
              <SwiperSlide key={player.id} className="hero-slide">
                {/* 카드 클릭 시 상세 페이지 이동 */}
                <Link to={`/player/${player.id}`} className="card-link">
                  <div className="img-box card-img">
                    <img src={player.img} alt={player.name} />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="comment">
        <div className="inner">
          <h3 className="section-title">응원 댓글</h3>
        </div>
        <div className="comment-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={"auto"}
            loop={true}
            speed={1000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="comment-swiper"
            allowTouchMove={true}
          >
            {commentsTop.map((comment, index) => (
              <SwiperSlide key={`top-${index}`} className="comment-slide">
                <div className="comment-bubble">
                  <div className="profile-circle">
                    <img src={comment.user} alt="user" />
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={"auto"}
            loop={true}
            speed={1000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="comment-swiper row-2"
            allowTouchMove={true}
          >
            {commentsBottom.map((comment) => (
              <SwiperSlide key={`row2-${comment.id}`} className="comment-slide">
                <div className="comment-bubble">
                  <div className="profile-circle">
                    <img src={comment.user} alt="user" />
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="today-match">
        <div className="inner">
          <h3 className="section-title">오늘의 경기</h3>
          <div className="match-card">
            <div className="img">
              <img src="/img/today-match_img.svg" alt="오늘의경기 이미지" />
            </div>
            <div className="live-badge">
              <span className="circle"></span>LIVE
            </div>
            <div className="match-content">
              <div className="score-board">
                <div className="team">
                  <div className="logo-circle samsung">
                    <img src="/img/samsung_logo.svg" alt="상성 라이온즈 로고" />
                  </div>
                  <span className="team-name">SAMSUNG</span>
                </div>
                <div className="score-info">
                  <h3 className="score">3 : 6</h3>
                  <div className="inning">7회말</div>
                </div>
                <div className="team">
                  <div className="logo-circle samsung">
                    <img src="/img/KIA_logo.svg" alt="상성 라이온즈 로고" />
                  </div>
                  <span className="team-name">KIA</span>
                </div>
              </div>
              <a
                href="https://www.tving.com/sports/kbo?n_media=27758&n_query=%ED%8B%B0%EB%B9%99%ED%94%84%EB%A1%9C%EC%95%BC%EA%B5%AC&n_rank=1&n_ad_group=grp-a001-01-000000040965984&n_ad=nad-a001-01-000000304649436&n_keyword_id=nkw-a001-01-000006209738999&n_keyword=%ED%8B%B0%EB%B9%99%ED%94%84%EB%A1%9C%EC%95%BC%EA%B5%AC&n_campaign_type=1&n_ad_group_type=1&n_match=1&NaPm=ct%3Dlxu4x8vk%7Cci%3D0yq0001stlDAQEDawuZ3%7Ctr%3Dsa%7Chk%3D042b634c63c901280f5dc010bed047eea6dd624b%7Cnacn%3DfCfnEwAeI5wuG&gad_source=1&gad_campaignid=23411707576&gbraid=0AAAAAC1p3XT_j6qAvWxWCs4XTOziQc-4Y&gclid=Cj0KCQiAyP3KBhD9ARIsAAJLnnaqqc3jVSwCRjGb7h5iBTQf-V_vdM7JO1I6ObWRBba35HR56mspBK0aAkzAEALw_wcB"
                target="blank"
                className="tving-btn btn"
              >
                TVING 바로가기
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="highlights">
        <div className="inner">
          <h3 className="section-title">하이라이트</h3>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <a
                href="https://www.youtube.com/shorts/CWDAbmIgfvA"
                target="blank"
              >
                <div key={item.id} className="highlight-card">
                  <div className="img-box box">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="play-icon">
                    <img src="/img/play-icon.svg" alt="" />
                  </div>
                  <div className="text-overlay">
                    <p>{item.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="team-rank">
        <div className="inner">
          <h3 className="section-title">구단 순위</h3>
          <div className="rank-card box">
            <div className="rank-hero">
              <img
                className="bg-img"
                src="/img/kia-rank-img.svg"
                alt="기아 타이거즈 대표 이미지"
              />
              <div className="hero-content">
                <img className="top-logo" src="/img/KIA_logo.svg" alt="로고" />
                <div className="big-rank-col">
                  <span className="num">3</span>
                  <span className="diff">
                    1<span className="arrow">▲</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ul className="rank-list">
            {rankData.map((team) => (
              <li
                key={team.id}
                className={`rank-item ${team.isMyTeam ? "my-team" : ""}`}
              >
                <div className="img-box logo-box">
                  <img src={team.logo} alt={team.name} />
                </div>
                <div className="rightBox">
                  <div className="rank-col">
                    <span className="num">{team.rank}</span>
                    <div className="diff">
                      {team.state === "up" && <span className="up">▲</span>}
                      {team.state === "-" && <span className="dash">-</span>}
                      {team.state === "down" && <span className="down">▼</span>}
                    </div>
                  </div>
                  <div className="name-col">
                    <p className="ko">{team.name}</p>
                    <p className="en">{team.enName}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="gradient-box"></div>
          <Link to={"/teamrank"} className="more btn">
            더보기
          </Link>
        </div>
      </section>
      <section className="TodayQuiz"></section>
    </div>
  );
};

export default Home;
