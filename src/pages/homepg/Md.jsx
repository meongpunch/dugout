import "../homepg/Md.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/img/sub_md_harang_1.png",
  "/img/sub_md_harang_2.png",
  "/img/sub_md_harang_3.png",
];

export default function Md() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);

  // 장바구니 카운트 + 토스트
  const [cartCount, setCartCount] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setToastOpen(true);
  };

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 1600);
    return () => clearTimeout(t);
  }, [toastOpen]);

  return (
    <div className="sub-md">
      {/* ===== 헤더 ===== */}
      <header className="sub-md-header">
        <button
          className="header-btn"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <img src="/img/chevron-left.svg" alt="" />
        </button>

        <h2 className="header-title">MD</h2>

        <button
          className="header-btn basket-btn"
          type="button"
          aria-label="장바구니"
        >
          <img src="/img/sub-md-basket-icon.svg" alt="" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </header>

      {/* ===== 이미지 캐러셀 ===== */}
      <div className="image-area">
        <button className="nav left" onClick={prev} aria-label="이전 이미지">
          <img src="/img/sub-md-arrow-left.svg" alt="" />
        </button>

        <img
          className="main-image"
          src={images[current]}
          alt="하랑이 봉제 인형"
        />

        {/* 왼쪽 버튼 */}
        <button className="nav left" onClick={prev} aria-label="이전 이미지">
          <img src="/img/sub-md-arrow-left.svg" alt="" />
        </button>

        {/* 오른쪽 버튼 */}
        <button className="nav right" onClick={next} aria-label="다음 이미지">
          <img src="/img/sub-md-arrow-right.svg" alt="" />
        </button>
      </div>

      {/* ===== 상품 정보 ===== */}
      <div className="info-area">
        <div className="title-row">
          <h1 className="title">하랑이 봉제 인형</h1>

          <button
            className="like title-like"
            onClick={() => setLiked(!liked)}
            aria-label="찜하기"
          >
            <div className="guide-dot"></div>
            <img
              src={
                liked
                  ? "/img/sub-md-heart-fill.svg"
                  : "/img/sub-md-heart-outline.svg"
              }
              alt=""
            />
          </button>
        </div>

        <div className="rating">
          <span className="rating-text">응원 만족도</span>
          <img className="stars" src="/img/sub-md-stars-5.svg" alt="별점 5점" />
        </div>

        <div className="price">
          27,000 <span>원</span>
        </div>

        <div className="desc">
          <p className="size-text">사이즈: 23cm(높이)</p>
          <p className="notice-text">* 하랑이 가방걸이 인형은 출시 예정입니다.</p>
        </div>
      </div>

      {/* ===== 하단 고정 버튼 ===== */}
      <div className="bottom-bar">
        <button className="cart-btn btn" onClick={addToCart}>
          <div className="guide-dot"></div>
          장바구니
        </button>
      </div>

      {/* ===== 토스트 ===== */}
      {toastOpen && (
        <div className="toast" role="status" aria-live="polite">
          장바구니에 추가되었습니다.
        </div>
      )}
    </div>
  );
}