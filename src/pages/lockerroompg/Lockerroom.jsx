import React from "react";
import MainPgHeader from "../../components/MainPgHeader";
import "./Lockerroom.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const calendarCard = [
  { id: 1, img: "/img/lockerroom-calendar.png" },
  { id: 2, img: "/img/lockerroom-calendar.png" },
  { id: 3, img: "/img/lockerroom-calendar.png" },
  { id: 4, img: "/img/lockerroom-calendar.png" },
];

const Lockerroom = () => {
  return (
    <div className="locker-room-container">
      <MainPgHeader logoType="logo" btnType="setting" />

      {/* 프로필 카드 */}
      <section className="profile">
        <div className="inner">
          <img className="profile-bg" src="/img/lockerroom-bg.png" alt="" />
          <div className="profile-top-text">
            <div className="user-profile">
              <div className="profile-img">
                <img src="/img/lockerroom-profile.svg" alt="프로필 사진" />
              </div>
              <p className="user-name">냉철한 야구분석가</p>
            </div>
            <div className="edit">
              <img src="/img/lockerroom-edit.svg" alt="" />
            </div>
          </div>
          <div className="profile-bottom-text">
            <ul className="data">
              <li>
                <p className="label">나의 직관 승률</p>
                <p className="value">12전 8승 4패 66.7%</p>
              </li>

              <li>
                <p className="label">팔로워</p>
                <p className="value">18</p>
              </li>

              <li>
                <p className="label">팔로우</p>
                <p className="value">8</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lockerroom;
