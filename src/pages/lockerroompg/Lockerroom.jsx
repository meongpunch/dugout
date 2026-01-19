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
    { id: 2, img: "/img/lockerroom-calendar-2.png", name: "game2" },
    { id: 3, img: "/img/lockerroom-calendar-3.png", name: "game3" },
    { id: 4, img: "/img/lockerroom-calendar-4.png", name: "game4" },
    { id: 5, img: "/img/lockerroom-calendar-5.png", name: "game5" },
    { id: 6, img: "/img/lockerroom-calendar-6.png", name: "game6" },
  ];

  const quickMenus = [
  { label: "구단 순위", icon: "/img/lockerroom-club-ranking.svg", to: "null" },
  { label: "내가 쓴 글", icon: "/img/lockerroom-my-post.svg", to: "null" },
  { label: "하이라이트", icon: "/img/lockerroom-highlight.svg", to: "null" },
  ];

  const serviceMenus = [
  { label: "스타디움", icon: "/img/lockerroom-stadium.svg"},
  { label: "그라운드", icon: "/img/lockerroom-ground.svg"},
  { label: "경기 일정", icon: "/img/lockerroom-Schedule.svg" },
  { label: "기록 & 스탯 분석", icon: "/img/lockerroom-stats.svg" },
  { label: "구매 내역", icon: "/img/lockerroom-orders.svg" },
  { label: "하이라이트 모아보기", icon: "/img/lockerroom-highlight.svg" },
  ];

  const orderMenus = [
  { label: "구매 내역", icon: "/img/lockerroom-orders.svg", to: "" },
  { label: "찜 목록", icon: "/img/lockerroom-wishlist.svg", to: "" },
  { label: "주소 관리", icon: "/img/lockerroom-pin.svg", to: "" },
  { label: "이벤트", icon: "/img/lockerroom-event.svg", to: "" },
  ];

const myContentMenus = [
  { label: "내가 작성한 게시글", icon: "/img/lockerroom-my-post.svg", to: "" },
  { label: "좋아요한 게시글", icon: "/img/lockerroom-liked.svg", to: "" },
  { label: "직관 기록", icon: "/img/lockerroom-attendance.svg", to: "" },
  { label: "퀴즈 · 참여 기록", icon: "/img/lockerroom-quizhistory.svg", to: "" },
  ];

const csMenus = [
  { label: "공지사항", icon: "/img/lockerroom-notices.svg", to: "" },
  { label: "고객센터", icon: "/img/lockerroom-support.svg", to: "" },
  { label: "문의하기", icon: "/img/lockerroom-contact.svg", to: "" },
  { label: "약관 및 정책", icon: "/img/lockerroom-Legal.svg", to: "" },
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
              <Link to={"/lockerroom/edit"} >
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
      
      {/* 직관 캘린더 */}
      <section className="calendar">
        <h2 className="section-title">직관 캘린더</h2>
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
              <Link to="/lockerroom/calendar">
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

      {/* 메뉴 */}
      <section className="locker-menu">
        <div className="inner">

          {/* 상단 퀵메뉴 카드 */}
          <div className="menu-card quick-menu">
            {quickMenus.map((m, idx) => (
              <Link key={m.label} to={""} className="quick-item">
                <img className="menu-icon" src={m.icon} alt="" />
                <span className="menu-text">{m.label}</span>
              </Link>
            ))}
          </div>

          {/* 서비스 카드 */}
          <div className="menu-card service-card">
            <div className="card-header">
              <h3 className="card-title">서비스</h3>
              <img className="chevron" src="/img/lockerroom-meun-chevron.svg" alt="" />
            </div>

            <div className="service-grid">
              {serviceMenus.map((m) => (
                <Link key={m.label} to={""} className="service-item">
                  <img className="menu-icon" src={m.icon} alt="" />
                  <span className="menu-text">{m.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 주문·배송 관리 카드 */}
          <div className="menu-card list-card">
            <h3 className="card-title">주문·배송 관리</h3>

            <ul className="list-menu">
              {orderMenus.map((m) => (
                <li key={m.label}>
                  <Link to={m.to || ""} className="list-item" onClick={(e)=>e.preventDefault()}>
                    <img className="menu-icon" src={m.icon} alt="" />
                    <span className="menu-text">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 나의 콘텐츠 카드 */}
          <div className="menu-card list-card">
            <h3 className="card-title">나의 콘텐츠</h3>

            <ul className="list-menu">
              {myContentMenus.map((m) => (
                <li key={m.label}>
                  <Link to={m.to || ""} className="list-item" onClick={(e)=>e.preventDefault()}>
                    <img className="menu-icon" src={m.icon} alt="" />
                    <span className="menu-text">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객지원 카드 */}
          <div className="menu-card list-card">
            <h3 className="card-title">고객지원</h3>

            <ul className="list-menu">
              {csMenus.map((m) => (
                <li key={m.label}>
                  <Link to={m.to || ""} className="list-item" onClick={(e)=>e.preventDefault()}>
                    <img className="menu-icon" src={m.icon} alt="" />
                    <span className="menu-text">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>



        </div>
      </section>
    </div>
  );
};

export default Lockerroom;
