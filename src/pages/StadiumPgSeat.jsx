import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StadiumPgSeat.css";
import MainPgHeader from "../components/MainPgHeader";
import BackButton from "../components/Backbutton";

const stadiumOptions = [
  "서울 잠실야구장",
  "광주 챔피언스필드",
  "고척 스카이돔",
  "대구 라이온즈파크",
  "대전 한화생명 볼파크",
  "부산 사직야구장",
  "수원 KT위즈파크",
  "인천 랜더스필드",
  "창원 NC파크",
];

const StadiumSeat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [stadiumOpen, setStadiumOpen] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState(
    state?.stadiumName ?? "서울 잠실야구장"
  );

  useEffect(() => {
    if (!state) navigate("/stadium", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { seatType, zone } = state;

  return (
    <section className="stadium-seat">
      <header>
        <MainPgHeader logoType="back" btnType="ticket" />
      </header>

      <div className="stadium-topbar" onClick={(e) => e.stopPropagation()}>
        <a
          href="#"
          className={`topbar-location ${stadiumOpen ? "is-open" : ""}`}
          role="button"
          aria-expanded={stadiumOpen}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setStadiumOpen((v) => !v);
          }}
        >
          {selectedStadium}
          <img
            src="/img/stadium-chevron-bottom.svg"
            alt="∨"
            className="chevron-icon"
          />
        </a>

        {stadiumOpen && (
          <div
            className="stadium-dropdown"
            role="listbox"
            aria-label="구장 선택"
            onClick={(e) => e.stopPropagation()}
          >
            {stadiumOptions.map((name) => (
              <button
                key={name}
                type="button"
                className={`stadium-option ${
                  selectedStadium === name ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStadium(name);
                  setStadiumOpen(false);
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="seat-content">
        <div className="summary">
          <p>구장: {selectedStadium}</p>
          <p>구역: {seatType}</p>
          <p>좌석: {zone}</p>
        </div>
      </div>
    </section>
  );
};

export default StadiumSeat;
