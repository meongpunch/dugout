import React, { useState } from "react";
import BackButton from "../components/Backbutton";
import "./TeamRank.css";

/* ================= utils ================= */

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const getStreakIcon = (type) => {
  if (type === "win") return "🔥";
  if (type === "lose") return "❄️";
  return "•";
};

/* ================= DateNavigator ================= */

const DateNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = formatDate(currentDate);

  const handlePrev = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

  return (
    <section className="date-navigator">
      <button className="nav-btn" onClick={handlePrev} aria-label="이전 날짜">
        <img src="/img/rank-chevron-left.svg" alt="" />
      </button>

      <span className="date-text">{formattedDate}</span>

      <button className="nav-btn" onClick={handleNext} aria-label="다음 날짜">
        <img src="/img/rank-chevron-right.svg" alt="" />
      </button>
    </section>
  );
};

/* ================= Top3Podium ================= */

const Top3Podium = () => {
  const top3 = [
    {
      rank: 2,
      teamNameKo: "엔씨 다이노스",
      teamNameEn: "NC Dinos",
      logo: "/img/rank_NC_logo.svg",
    },
    {
      rank: 1,
      teamNameKo: "한화 이글스",
      teamNameEn: "Hanwha Eagles",
      logo: "/img/rank_Hanwha_logo.svg",
    },
    {
      rank: 3,
      teamNameKo: "기아 타이거즈",
      teamNameEn: "KIA TIGERS",
      logo: "/img/rank_KIA_logo.svg",
    },
  ];

  const first = top3.find((t) => t.rank === 1);
  const second = top3.find((t) => t.rank === 2);
  const third = top3.find((t) => t.rank === 3);

  return (
    <section className="top3Podium">
      {second && (
        <article className="podiumCard second">
          <img className="podiumLogo" src={second.logo} alt="" />
          <div className="podiumKo">{second.teamNameKo}</div>
          <div className="podiumEn">{second.teamNameEn}</div>
        </article>
      )}

      {first && (
        <article className="podiumCard center">
          <img className="podiumLogo big" src={first.logo} alt="" />
          <div className="podiumKo">{first.teamNameKo}</div>
          <div className="podiumEn">{first.teamNameEn}</div>
        </article>
      )}

      {third && (
        <article className="podiumCard third">
          <img className="podiumLogo" src={third.logo} alt="" />
          <div className="podiumKo">{third.teamNameKo}</div>
          <div className="podiumEn">{third.teamNameEn}</div>
        </article>
      )}
    </section>
  );
};

/* ================= RankList ================= */

const RankListItem = ({ item }) => {
  const icon = getStreakIcon(item.streakType);

  return (
    <article className="rankItem">
      {/* ===== Top ===== */}
      <div className="rankTop">
        <div className="rankTopLeft">
          <img className="rankLogo" src={item.logo} alt="" />

          <div className="rankTitleBlock">
            <div className="rankTitle">{item.teamNameKo}</div>

            <div className="rankSub">
              <span className="streakIcon">{icon}</span>
              <span className="streakText">{item.streak}</span>
            </div>
          </div>
        </div>

        <div className="rankTopRight">
          <span className="rankDelta">{item.delta}</span>
          <span className="rankNum">{item.rank}</span>
          <span className="rankUnit">위</span>
        </div>
      </div>

      {/* ===== Bottom ===== */}
      <div className="rankBottom">
        <div className="statCol">
          <div className="statRow">
            <span className="statKey">경기</span>
            <span className="statSep" />
            <span className="statVal">{item.games}</span>
          </div>

          <div className="statRow">
            <span className="statKey">승률</span>
            <span className="statSep" />
            <span className="statVal">{item.rate}</span>
          </div>
        </div>

        <div className="statCol">
          <div className="statRow">
            <span className="statKey">승패무</span>
            <span className="statSep" />
            <span className="statVal">
              <span className="statNum">{item.win}</span>
              <span className="statPipe" />
              <span className="statNum">{item.lose}</span>
              <span className="statPipe" />
              <span className="statNum">{item.draw}</span>
            </span>
          </div>

          <div className="statRow">
            <span className="statKey">승차</span>
            <span className="statSep" />
            <span className="statVal">{item.gb}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const RankList = ({ standings }) => (
  <section className="rankList">
    {standings.map((item) => (
      <RankListItem key={item.rank} item={item} />
    ))}
  </section>
);

/* ================= Page ================= */

const TeamRank = () => {
  const dummyStandings = [
    {
      rank: 1,
      teamNameKo: "한화 이글스",
      logo: "/img/rank_Hanwha_logo.svg",
      streakType: "win",
      streak: "2승",
      delta: "—",
      games: 52,
      rate: "0.608",
      win: 31,
      lose: 20,
      draw: 1,
      gb: "-",
    },
    {
      rank: 2,
      teamNameKo: "NC 다이노스",
      logo: "/img/rank_NC_logo.svg",
      streakType: "lose",
      streak: "2패",
      delta: "▲",
      games: 55,
      rate: "0.566",
      win: 30,
      lose: 23,
      draw: 2,
      gb: "2",
    },
    {
      rank: 3,
      teamNameKo: "기아 타이거즈",
      logo: "/img/rank_KIA_logo.svg",
      streakType: "win",
      streak: "4승",
      delta: "▲",
      games: 54,
      rate: "0.558",
      win: 29,
      lose: 23,
      draw: 2,
      gb: "2.5",
    },
    {
      rank: 4,
      teamNameKo: "두산 베어스",
      logo: "/img/rank_Doosan_logo.svg",
      streakType: "win",
      streak: "2승",
      delta: "▲",
      games: 50,
      rate: "0.420",
      win: 20,
      lose: 28,
      draw: 2,
      gb: "9.5",
    },
    {
      rank: 5,
      teamNameKo: "LG 트윈스",
      logo: "/img/rank_LG_logo.svg",
      streakType: "lose",
      streak: "2패",
      delta: "▼",
      games: 52,
      rate: "0.549",
      win: 28,
      lose: 23,
      draw: 1,
      gb: "3",
    },
    {
      rank: 6,
      teamNameKo: "롯데 자이언츠",
      logo: "/img/rank_Lotte_logo.svg",
      streakType: "lose",
      streak: "6패",
      delta: "▲",
      games: 52,
      rate: "0.529",
      win: 27,
      lose: 24,
      draw: 1,
      gb: "6",
    },
    {
      rank: 7,
      teamNameKo: "삼성 라이온즈",
      logo: "/img/rank_Samsung_logo.svg",
      streakType: "win",
      streak: "3승",
      delta: "▲",
      games: 52,
      rate: "0.490",
      win: 25,
      lose: 26,
      draw: 1,
      gb: "8",
    },
    {
      rank: 8,
      teamNameKo: "KT Wiz",
      logo: "/img/rank_KT_logo.svg",
      streakType: "win",
      streak: "2승",
      delta: "—",
      games: 52,
      rate: "0.451",
      win: 23,
      lose: 28,
      draw: 1,
      gb: "9.5",
    },
    {
      rank: 9,
      teamNameKo: "SSG 랜더스",
      logo: "/img/rank_SSG_logo.svg",
      streakType: "win",
      streak: "2승",
      delta: "—",
      games: 50,
      rate: "0.420",
      win: 20,
      lose: 28,
      draw: 2,
      gb: "9.5",
    },
    {
      rank: 10,
      teamNameKo: "키움 히어로즈",
      logo: "/img/rank_Kiwoom_logo.svg",
      streakType: "lose",
      streak: "2패",
      delta: "▼",
      games: 50,
      rate: "0.400",
      win: 20,
      lose: 30,
      draw: 0,
      gb: "10.5",
    },
  ];

  return (
    <div className="teamRank-container">
      <header className="detail-header">
        <BackButton title="구단순위" />
      </header>

      <DateNavigator />
      <Top3Podium />
      <RankList standings={dummyStandings} />
    </div>
  );
};

export default TeamRank;
