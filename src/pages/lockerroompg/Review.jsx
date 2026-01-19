import React from 'react'
import "./Review.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Review = () => {
    const navigate = useNavigate();

    const SEAT_KEYWORDS = [
        { id: 1, icon: "👀", label: "시야가 좋아요" },
        { id: 2, icon: "⚾", label: "경기 흐름이 잘 보여요" },
        { id: 3, icon: "🔍", label: "선수가 가까워요" },
        { id: 4, icon: "🎯", label: "타구가 잘 보여요" },
        { id: 5, icon: "🔥", label: "현장감이 좋아요" },
        { id: 6, icon: "🎺", label: "응원 분위기가 좋아요" },
        { id: 7, icon: "🧍", label: "혼자 보기 좋아요" },
        { id: 8, icon: "💺", label: "좌석이 편해요" },
    ];

    const BAD_SEAT_KEYWORDS = [
        { id: 1, icon: "🚻", label: "화장실이 멀어요" },
        { id: 2, icon: "🌀", label: "경기 흐름이 안 보여요" },
        { id: 3, icon: "📏", label: "선수가 멀어요" },
        { id: 4, icon: "⚡", label: "시야 가림이 있어요" },
        { id: 5, icon: "📣", label: "응원해야 해요" },
        { id: 6, icon: "⚾", label: "파울볼이 많이 와요" },
        { id: 7, icon: "🎆", label: "천장이 없어요" },
        { id: 8, icon: "🌞", label: "해가 늦게까지 들어와요" },
    ];



    const [selected, setSelected] = useState({}); // { 1:true, 3:true ... }

    const toggle = (id) => {
        setSelected((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [selectedBad, setSelectedBad] = useState({}); // { [id]: true }

    const toggleBad = (id) => {
        setSelectedBad((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className='reviewPg'>
            <section className="review-head">
                <div className="inner">
                    <div className="review-top">
                        <div className="review-left">
                            <div className="thumb">
                                <img src="/img/review-top.png" alt="" />
                            </div>
                            <div className="reviewTop-txt">
                                <p className="season">2026 시즌</p>
                                <p className="count">벌써 12번째 직관이네요</p>
                            </div>
                        </div>
                        <div className="review-close" onClick={() => navigate(-1)}>
                            <img src="/img/lockerroom-x-close.svg" alt="닫기" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="matchCard">
                <div className="inner">
                    <div className="match-info">
                        <div className="match-team">
                            <p className="team-name">기아 타이거즈</p>
                            <p className="vs">vs</p>
                            <p className="team-name">삼성 라이온즈</p>
                        </div>
                        <div className="overview">
                            <div className="meta">
                                <p className="place">서울 잠실 야구장</p>
                                <p className="match-time">14:00</p>
                            </div>
                            <div className="seat">
                                <p className="zone">3루 블루석 116블록</p>
                                <p className="number">4열 40번</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="seatKeyword">
                <div className="inner">
                    <div className="seatKeyword-box">
                        <h3 className="seatKeyword-title">이 좌석, 어떤 점이 좋았나요?</h3>
                        <p className="seatKeyword-sub">좌석에 어울리는 키워드를 골라 주세요.</p>

                        <div className="seatKeyword-list">
                            {SEAT_KEYWORDS.map((k) => (
                                <span
                                    key={k.id}
                                    className={`seatKeyword-chip ${selected[k.id] ? "is-active" : ""}`}
                                    onClick={() => toggle(k.id)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <span className="seatKeyword-chip-ic">{k.icon}</span>
                                    <span className="seatKeyword-chip-txt">{k.label}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="seatKeyword">
                <div className="inner">
                    <div className="seatKeyword-box">
                        <h3 className="seatKeyword-title">이 좌석, 어떤 점이 아쉬웠나요?</h3>
                        <p className="seatKeyword-sub">불편했던 부분을 선택해 주세요.</p>

                        <div className="seatKeyword-list">
                            {BAD_SEAT_KEYWORDS.map((k) => (
                                <span
                                    key={k.id}
                                    className={`seatKeyword-chip ${selectedBad[k.id] ? "is-active" : ""}`}
                                    onClick={() => toggleBad(k.id)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <span className="seatKeyword-chip-ic">{k.icon}</span>
                                    <span className="seatKeyword-chip-txt">{k.label}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Review