import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumPgSeat.css";
import MainPgHeader from "../../components/MainPgHeader";

const StadiumSeat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedStadium = state?.stadiumName ?? "서울 잠실야구장";

  useEffect(() => {
    if (!state) navigate("/stadium", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { seatType, zone } = state;

  const goSection = (section) => {
    navigate("/stadium/seat/section", {
      state: {
        stadiumName: selectedStadium,
        seatType,
        zone,
        section, // ✅ 클릭한 219~222
      },
    });
  };

  return (
    <section className="stadium-seat">
      <header>
        <MainPgHeader logoType="back" btnType="ticket" />
      </header>

      <div className="stadium-title">
        {selectedStadium}
        <p className="caption">구역을 선택해주세요.</p>
      </div>

      <div className="seat-map">
        <img src="/img/stadium-seating-chart.jpg" alt="좌석 배치도" />

        {[222, 221, 220, 219].map((sec) => (
          <button
            key={sec}
            type="button"
            className={`section-hit hit-${sec}`}
            onClick={() => goSection(sec)}
            aria-label={`${sec} 구역 선택`}
          />
        ))}
      </div>

      <div className="seat-content">
        <div className="summary">
          <p className="seat-info">
            {zone} {seatType}
          </p>
          <p className="price">금액 주중: 18,000 / 주말 : 20,000원</p>
        </div>
      </div>
    </section>
  );
};

export default StadiumSeat;
