import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumPgSeat.css";
import MainPgHeader from "../components/MainPgHeader";

const StadiumSeat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <section className="stadium-seat">
        <MainPgHeader btnType="ticket" />
        <div className="seat-content">
          <p>잘못된 접근입니다. 구역을 선택하고 들어와주세요.</p>
          <button type="button" onClick={() => navigate("/stadium")}>
            돌아가기
          </button>
        </div>
      </section>
    );
  }

  const { stadiumName, seatType, zone } = state;

  return (
    <section className="stadium-seat">
      <MainPgHeader btnType="ticket" />
      <div className="seat-content">
        <h2 className="title">좌석 정보</h2>
        <div className="summary">
          <p>구장: {stadiumName}</p>
          <p>구역: {seatType}</p>
          <p>좌석: {zone}</p>
        </div>
      </div>
    </section>
  );
};

export default StadiumSeat;
