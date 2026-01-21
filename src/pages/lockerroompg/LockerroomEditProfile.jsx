import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainPgHeader from "../../components/MainPgHeader";
import "./LockerroomEditProfile.css";


const LockerroomEditProfile = () => {

    const settingsGroups = [
  {
    id: "profile",
    title: "닉네임",
    items: [
      {
        id: "nickname",
        label: "냉철한 야구분석가",
        icon: "/img/editProfile-close.svg"   // ← X 이미지
      },
    ],
  },
  {
    id: "password",
    title: "비밀번호",
    items: [
      {
        id: "pw",
        label: "비밀번호 변경",
        icon: "/img/editProfile-arrow.svg" // ← >
      },
    ],
  },
  {
    id: "alarm",
    title: "알람",
    items: [
      {
        id: "alarm",
        label: "알람설정",
        icon: "/img/editProfile-arrow.svg",
      },
    ],
  },
  {
    id: "sns",
    title: "SNS",
    items: [
      {
        id: "sns",
        label: "SNS 연결관리",
        icon: "/img/editProfile-arrow.svg",
      },
    ],
  },
  {
    id: "member",
    title: "회원",
    items: [
      {
        id: "leave",
        label: "회원탈퇴",
        icon: "/img/editProfile-arrow.svg",
      },
    ],
  },
];
    
  return (
    <div className="editProfile">
        {/* ✅ 커버 섹션 */}
        <section className="editCover">
            <div className="inner">
                <div className="editCover-top">
                    <Link to="/lockerroom" className="back">
                        <img src="/img/lockerroom-back.svg" alt="뒤로가기" />
                    </Link>
                    <div className="editCover-btn">
                        <img src="/img/lockerroom-edit.svg" alt="수정 아이콘" />
                    </div>
                </div>
            </div>
        </section>

        <section className="edit-info">
            <div className="inner">
                {/* 프로필 아바타 */}
                <div className="avatar">
                    <div className="avatar-img">
                    <img src="/img/editProfile-profile.svg" alt="프로필" />
                    </div>

                    {/* 프로필 사진 변경 */}
                    <div className="edit-photo">
                    <img src="/img/editProfile-editphoto.svg" alt="프로필 사진 변경" />
                    </div>
                </div>

                {/* 닉네임 */}
                {settingsGroups
                .filter((g) => g.id === "profile")
                .map((group) => (
                    <div className="settingGroup nickname" key={group.id}>
                    <p className="settingTitle">{group.title}</p>

                    <div className="settingCard">
                        {group.items.map((item) => (
                        <div className="settingRow" key={item.id}>
                            <span className="settingLabel">{item.label}</span>
                            <Link to="#">
                                <img className="settingIcon" src={item.icon} alt="" />
                            </Link>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}

                {/* 팀/선수 변경 */}
                <div className="change-team">
                    <div className="top-box">
                        <div className="logo-img">
                            <img src="/img/editProfile-kialogo.svg" alt="" />
                        </div>
                        <p className="player-name">양현종</p>
                    </div>
                    <div className="change-box">
                        <Link to="/TeamChoice" className="club">
                            구단 변경
                        </Link>
                        <Link to="#" className="palyer">
                            선수 변경
                        </Link>
                    </div>
                </div>

                {settingsGroups
                .filter((g) => g.id !== "profile")
                .map((group) => (
                    <div className="settingGroup" key={group.id}>
                    <p className="settingTitle">{group.title}</p>

                    <div className="settingCard">
                        {group.items.map((item) => (
                        <div className="settingRow" key={item.id}>
                            <span className="settingLabel">{item.label}</span>
                            <Link to="#">
                                <img className="settingIcon" src={item.icon} alt="" />
                            </Link>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}

export default LockerroomEditProfile