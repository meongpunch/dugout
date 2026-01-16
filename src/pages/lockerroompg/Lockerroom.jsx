import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainPgHeader from "../../components/MainPgHeader";
import "./Lockerroom.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const Lockerroom = () => {
  const profileStats = [
  {
    id: 'prediction-rate',
    label: '나의 직관 승률',
    value: '12전 8승 4패 66.7%',
  },
  {
    id: 'followers',
    label: '팔로워',
    value: 18,
  },
  {
    id: 'following',
    label: '팔로우',
    value: 8,
  },
  ];
  
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = [
    { id: 1, img: "/img/lockerroom-calendar.png", name: "game1" },
    { id: 2, img: "/img/lockerroom-calendar.png", name: "game2" },
    { id: 3, img: "/img/lockerroom-calendar.png", name: "game3" },
    { id: 4, img: "/img/lockerroom-calendar.png", name: "game4" },
    { id: 5, img: "/img/lockerroom-calendar.png", name: "game5" },
    { id: 6, img: "/img/lockerroom-calendar.png", name: "game6" },
  ];

  return (
    <div className="locker-room-container">
      <MainPgHeader logoType="logo" btnType="setting" />

      {/* 프로필 카드 */}
      <section className="profile">
        <div className="inner">

          <div className="profile-top-text">
            <div className="user-profile">
              <div className="profile-img">
                <img src="/img/lockerroom-profile.svg" alt="프로필 사진" />
              </div>
              <p className="user-name">냉철한 야구분석가</p>
            </div>
            <div className="edit">
              <Link to={``} >
                <img src="/img/lockerroom-edit.svg" alt="" />
              </Link>
            </div>
          </div>
          <div className="profile-bottom-text">
            <ul className="data">
              {profileStats.map((item) => (
                <li key={item.id} id={item.id}>
                  <p className="label">{item.label}</p>
                  <p className="value">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="calendar">
        <h2 className="title">직관 캘린더</h2>
        <div className="hero-swiper-wrap">
          <Swiper
            onSwiper={(s) => {
              swiperRef.current = s;

              // ✅ 첫 렌더 계산 꼬임 방지
              requestAnimationFrame(() => {
                s.update();
                s.loopFix();      // loop 쓸 때 중요
                s.slideToLoop(0, 0); // 첫 슬라이드로 정확히
              });
            }}
            onActiveIndexChange={(s) => setActive(s.realIndex)}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={0}
            loop
            grabCursor
            observer
            observeParents
            className="mySwiper tiltSwiper"
          >
          {slides.map((s) => (
            <SwiperSlide key={s.id} className="hero-slide">
              <Link to="">
                <div className="img-box">
                  <img src={s.img} alt={s.name} />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

          {/* 페이지네이션 */}
          <div className="cal-pagination">
            <button
              type="button"
              className="cal-arrow prev"
              aria-label="prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img src="/img/lockerroom-chevron.svg" alt="" />
            </button>

            <div className="cal-page">
              <span className="now">{active + 1}</span>
              <span className="divider">|</span> 
              <span className="total">{slides.length}</span>
            </div>

            <button
              type="button"
              className="cal-arrow next"
              aria-label="next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img src="/img/lockerroom-chevron.svg" alt="" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lockerroom;
