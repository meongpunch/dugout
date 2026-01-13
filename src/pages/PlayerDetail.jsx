import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useNavigate는 BackButton 내부에 있다면 여기서 제거 가능
import BackButton from "../components/Backbutton"; // 1. BackButton 컴포넌트 불러오기
import "./PlayerDetail.css";

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  // 데이터 (기존과 동일)
  const playersData = [
    {
      id: 1,
      role: "투수 | 에이스",
      name: "양현종",
      tags: ["#올스타", "#팀의상징", "#홈런 23"],
      img: "/img/card_yang.svg",
      desc: "타이거즈의 영원한 에이스, 대투수 양현종. 마운드 위에서의 존재감은 타의 추종을 불허한다.",
      stats: { era: "3.54", win: 12, so: 140 },
    },
    {
      id: 2,
      role: "내야수 | 슈퍼스타",
      name: "김도영",
      tags: ["#30-30", "#도니살", "#MVP"],
      img: "/img/card_park.svg",
      desc: "제2의 이종범, 호타준족의 상징. 30-30 클럽 가입과 함께 리그를 지배하는 슈퍼스타.",
      stats: { avg: "0.340", hr: 38, sb: 40 },
    },
    {
      id: 3,
      role: "외야수 | 거포",
      name: "오선우",
      tags: ["#파워히터", "#한방있는", "#해결사"],
      img: "/img/card_oh.svg",
      desc: "결정적인 순간에 터지는 한 방. 팀의 승리를 가져오는 강력한 파워 히터.",
      stats: { avg: "0.280", hr: 15, rbi: 55 },
    },
  ];

  useEffect(() => {
    const found = playersData.find((p) => p.id === parseInt(id));
    setPlayer(found);
  }, [id]);

  if (!player) {
    return <div className="loading">선수 정보를 찾을 수 없습니다...</div>;
  }

  return (
    <div className="detail-container">
      {/* 2. 뒤로가기 헤더 수정: 기존 button 태그를 BackButton 컴포넌트로 교체 */}
      <header className="detail-header">
        <BackButton title="선수보기" />
      </header>

      {/* 메인 콘텐츠 */}
      <section className="player-hero">
        <div className="player-hero-box">
          <div className="player-hero-box-bg">
            <img src="/img/player-detail-bg.png" alt="" />
          </div>
          <div className="player-hero-box-cont">
            <p className="player-hero-box-cont-txt point">
              YANG
              <br />
              HYEON
              <br />
              JONG
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayerDetail;
