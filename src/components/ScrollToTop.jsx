import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 주소 감지

  useEffect(() => {
    // 주소가 바뀔 때마다 스크롤을 (0, 0) 즉, 맨 위로 보냄
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에는 아무것도 안 그림
}
