import React, { useState } from "react";
import BackButton from "../../components/Backbutton";
import { Link } from "react-router-dom";
import "./GroundTopic.css";



const voteTopics = [
  {
    id: 1,
    coverImg: "/img/ground_topic_main.jpg",
    profileImg: "/img/groundtopic_Detpg_profile1.jpg",
    nickname: "울산일진김혜원",
    title: "원태인 메이저 보내줄 수 있다 없다 ㅠㅠ ",
    timeAgo: "4시간 전",
    reactions: [
      { icon: "🍺", count: 1528 },
      { icon: "🥨", count: 1020 },
      { icon: "🍗", count: 985 },
      { icon: "🧺", count: 852 },
      { icon: "🍟", count: 521 },
      { icon: "🔥", count: 57 },
    ],
  },
  {
    id: 2,
    coverImg: "/img/groundtopic_Detpg_2.jpg",
    profileImg: "/img/groundtopic_Detpg_profile2.jpg",
    nickname: "익산일찐뚝딱이",
    title: "잠실구장 돔구장, 어떻게 생각하세요?",
    timeAgo: "10시간 전",
    reactions: [
      { icon: "❌", count: 1528 },
      { icon: "🍗", count: 845 },
      { icon: "🍺", count: 167 },
      { icon: "👋", count: 1200 },
      { icon: "❤️", count: 600 },
      { icon: "💬", count: 50 },
    ],
  },
  {
    id: 3,
    coverImg: "/img/groundtopic_Detpg_3.jpg",
    profileImg: "/img/groundtopic_Detpg_profile3.jpg",
    nickname: "하남시일찐백진우",
    title: "다 이긴 경기 패배하기.. 역전패가 특기야?🤢",
    timeAgo: "12시간 전",
    reactions: [
      { icon: "❌", count: 1528 },
      { icon: "🍗", count: 845 },
      { icon: "🍺", count: 167 },
      { icon: "👋", count: 1200 },
      { icon: "❤️", count: 600 },
      { icon: "💬", count: 50 },
    ],
  },
];



const GroundTopic = () => {
const [reactionState, setReactionState] = useState({});

  return (
    <div className="groundTopic-container">
      <header className="detail-header">
        <BackButton title="팬투표" />
      </header>
      <section className="groundTopic">
        <div className="inner">
            <div className="ground-topic-list">
            {voteTopics.map((item) => (
              <article key={item.id} className="topic-card">
                <Link to={"/topic"} className="topic-card-link">
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
                        // 현재 표시할 카운트 (state에 있으면 state 값, 없으면 원래 데이터)
                        const currentCount = reactionState[item.id]?.[idx] ?? r.count;

                        // 한번이라도 눌린 버튼이면 active 처리
                        const isActive = reactionState[item.id]?.[idx] !== undefined;

                        return (
                          <span
                            key={idx}
                            className={`topic-chip ${isActive ? "is-active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();   // Link 이동 막기
                              e.stopPropagation();  // 카드 클릭 전파 막기

                              // 클릭할 때마다 +1
                            setReactionState((prev) => {
                            const topic = prev[item.id] ?? {};
                            const isActiveNow = topic[idx] !== undefined;

                            // 이미 눌린 상태면: 원상복구(해당 idx 제거)
                            if (isActiveNow) {
                              const { [idx]: _, ...rest } = topic;
                              return { ...prev, [item.id]: rest };
                            }

                            // 처음 누르는 거면: +1 저장
                            return {
                              ...prev,
                              [item.id]: {
                                ...topic,
                                [idx]: r.count + 1,
                              },
                            };
                          });
                          }} 
                          >
                            <span className="topic-chip-ic">{r.icon}</span>
                            <span className="topic-chip-count">
                              {currentCount.toLocaleString()}
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
    </div>
  );
};

export default GroundTopic;
