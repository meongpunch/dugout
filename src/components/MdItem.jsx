// src/components/MdItem.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MdItem = ({ item }) => {
  // 🩷 하트 상태 관리 (false: 빈 하트, true: 채워진 하트)
  const [isLiked, setIsLiked] = useState(false);

  // 하트 클릭 함수
  const toggleLike = (e) => {
    e.preventDefault(); // ⭐️ 중요! 하트를 눌렀을 땐 상세페이지로 이동하지 않게 막음
    setIsLiked(!isLiked); // 상태 반전 (켜기/끄기)
  };

  return (
    <Link to="/shop" className="product">
      {/* 왼쪽 상품 이미지 */}
      <div className="left box">
        <img src={item.img} alt={item.title} />
      </div>

      {/* 오른쪽 정보 영역 */}
      <div className="right">
        <div className="top">
          <div className="title-box">
            <p className="title">{item.title}</p>

            {/* 🩷 하트 아이콘 (클릭 이벤트 연결) */}
            <div
              className="heart-btn"
              onClick={toggleLike}
              style={{ cursor: "pointer", width: "24px", height: "24px" }}
            >
              <img
                // isLiked가 true면 '클릭된 하트', false면 '빈 하트'
                src={
                  isLiked
                    ? "/img/heart-icon-onclick.svg"
                    : "/img/heart-icon.svg"
                }
                alt="좋아요"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
          <p className="subtit">{item.subTitle}</p>
        </div>

        <div className="bottom">
          <p className="price">{item.price}</p>
          <p className="txt">
            응원 만족도
            <span>
              <img src="/img/star-img.svg" alt="별" /> {item.rating}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MdItem;
