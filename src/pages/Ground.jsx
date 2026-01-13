import React from "react";
import "./Ground.css";

const Ground = () => {
  return (
    <section className="Ground">
      <img
        className="ground_bg"
        src="/img/ground_main_img.jpg"
        alt="그라운드 배경"
      />
      <div className="inner">
        <div className="ground_content">
          <h1 className="ground_title">KIA TIGERS</h1>

          {/* sns버튼 */}
          <div className="ground_actions">
            <a href="#">
              <img src="" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ground;
