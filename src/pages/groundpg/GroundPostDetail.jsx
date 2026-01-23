import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./GroundPostDetail.css";
import BackButton from "../../components/Backbutton";

/*
 * ✅ 요구사항 반영
 * 1) time 문자열 대신 createdAt(타임스탬프) 기반으로 "방금/1분 전/..." 자동 변경
 * 2) 브라우저(탭) 닫았다 다시 켜면 댓글/좋아요 초기화되게: localStorage → sessionStorage
 * 3) 삭제 버튼 누르면 확인 모달 + 확인 시 입력창 위 토스트 2초
 */

function formatRelativeTime(createdAt) {
  const diff = Date.now() - createdAt;
  const sec = Math.floor(diff / 1000);

  if (sec < 60) return "방금";

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;

  const day = Math.floor(hour / 24);
  if (day === 1) return "어제";
  return `${day}일 전`;
}

function getDisplayTime(obj) {
  if (typeof obj?.createdAt === "number") return formatRelativeTime(obj.createdAt);
  if (typeof obj?.time === "string") return obj.time; // 기존 더미 데이터 호환
  return "";
}

/*
 * Ground에서는 숫자 id만 전달
 * Detail에서 p{id} 형태로 매핑
 */

const POST_DETAIL_MAP = {
  p1: {
    author: { name: "신호두", avatar: "/img/stadium-profile-1.svg" },
    time: "방금",
    title: "호민아 잘 성장하고 있다!! 내년에는 꼭 선발 먹자",
    image: "/img/ground-post-detail-1.svg",
    likeCount: 12,
    comments: [
      {
        id: "c1",
        author: { name: "김가루", avatar: "/img/stadium-profile-2.svg" },
        time: "3시간 전",
        text: "진짜 많이 컸다...",
      },
    ],
  },
  p2: {
    author: { name: "홈런볼", avatar: "/img/stadium-profile-3.svg" },
    time: "10분 전",
    title: "이 자식 오늘 홈런 하나 칠 컨디션인 게 분명함",
    image: "/img/ground-post-detail-2.svg",
    likeCount: 25,
    comments: [],
  },
  p3: {
    author: { name: "끼끼사랑", avatar: "/img/groundtopic_Detpg_profile1.jpg" },
    time: "2시간 전",
    title: "난 진짜 우리집 끼끼가 자랑스러워",
    image: "/img/ground-post-detail-3.svg",
    likeCount: 8,
    comments: [],
  },
  p4: {
    author: { name: "황성빈", avatar: "/img/groundtopic_Detpg_profile2.jpg" },
    time: "방금",
    title: "쫓기는 것 같아 황성빈",
    image: "/img/ground-post-detail-4.svg",
    likeCount: 56,
    comments: [
      {
        id: "c1",
        author: {
          name: "김가루",
          avatar: "/img/groundtopic_Detpg_profile3.jpg",
        },
        time: "3시간 전",
        text: "쫓겨라쫓기지마라 왜저러냐~~~~~",
      },
      {
        id: "c2",
        author: {
          name: "정뚝딱",
          avatar: "/img/groundtopic_Detpg_profile4.png",
        },
        time: "1일 전",
        text: "4월부터 이렇게 더우면 어떡하자는 거지.. 그치만 야외구장 포기모대",
      },
    ],
  },
  p5: {
    author: { name: "이의리", avatar: "/img/groundtopic_Detpg_profile5.png" },
    time: "5시간 전",
    title: "ㅋㅋㅋ 이의리 아웃카운트 겨우 잡고 좋아하는 거 웃기고 귀여움",
    image: "/img/ground-post-detail-5.svg",
    likeCount: 102,
    comments: [],
  },
  p6: {
    author: { name: "김호령", avatar: "/img/groundtopic_Detpg_profile6.png" },
    time: "어제",
    title: "호령아 올해는 너 덕분에 웃고 울었다 진짜 멋있었다",
    image: "/img/ground-post-detail-6.svg",
    likeCount: 45,
    comments: [],
  },
  p7: {
    author: { name: "김원필", avatar: "/img/groundtopic_Detpg_profile7.png" },
    time: "2일 전",
    title: "원필 시구 본 사람.. 너 다 해라 김원필",
    image: "/img/ground-post-detail-7.svg",
    likeCount: 200,
    comments: [],
  },
};

const FALLBACK_POST = {
  author: { name: "익명", avatar: "/img/profile-default.jpg" },
  time: "",
  title: "게시글을 불러올 수 없어요.",
  image: null,
  likeCount: 0,
  comments: [],
};

export default function GroundPostDetail() {
  const { state } = useLocation();


  const raw = state?.postId;
  const num = String(raw ?? "").match(/\d+/)?.[0];
  const postKey = num ? `p${num}` : "";

  // 🔑 sessionStorage key (탭/브라우저 닫으면 초기화됨)
  const commentsStorageKey = postKey ? `ground_comments_${postKey}` : "";
  const likeStorageKey = postKey ? `ground_like_${postKey}` : "";

  // 🔑 내 댓글 식별자
  const MY_AUTHOR_ID = "me";

  const post = useMemo(() => {
    if (!postKey) return FALLBACK_POST;
    return POST_DETAIL_MAP[postKey] ?? FALLBACK_POST;
  }, [postKey]);

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState([]);

  const inputRef = useRef(null);
  const commentsRef = useRef(null);

  // ✅ 삭제 모달/토스트 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const modalRef = useRef(null);
  useEffect(() => {
  if (showDeleteModal) {
    modalRef.current?.focus();
  }
}, [showDeleteModal]);

  // ✅ 1분마다 리렌더해서 "방금/1분 전..." 자동 업데이트
  const [, forceTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => forceTick((x) => x + 1), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  /* =====================
     게시글 진입 시 로드
     ===================== */
  useEffect(() => {
    setCommentText("");
    setBursts([]);

    // 댓글 로드 (sessionStorage 우선)
    let loadedComments = false;
    if (commentsStorageKey) {
      try {
        const saved = sessionStorage.getItem(commentsStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setComments(parsed);
            loadedComments = true;
          }
        }
      } catch (e) {}
    }
    if (!loadedComments) setComments(post.comments);

    // 좋아요 로드 (sessionStorage 우선)
    let loadedLike = false;
    if (likeStorageKey) {
      try {
        const savedLike = sessionStorage.getItem(likeStorageKey);
        if (savedLike) {
          const parsed = JSON.parse(savedLike);
          if (
            typeof parsed?.liked === "boolean" &&
            typeof parsed?.likeCount === "number"
          ) {
            setLiked(parsed.liked);
            setLikeCount(parsed.likeCount);
            loadedLike = true;
          }
        }
      } catch (e) {}
    }
    if (!loadedLike) {
      setLiked(false);
      setLikeCount(post.likeCount);
    }
  }, [post, commentsStorageKey, likeStorageKey]);

  /* =====================
     좋아요 파티클
     ===================== */
  const spawnHearts = useCallback(() => {
    const now = Date.now();

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${now}-${i}`,
      x: Math.random() * 16 - 8,
      s: 0.85 + Math.random() * 0.6,
      d: 700 + Math.random() * 350,
    }));

    setBursts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setBursts((prev) =>
        prev.filter((h) => !newHearts.some((n) => n.id === h.id)),
      );
    }, 1200);
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;

      setLikeCount((c) => {
        const nextCount = next ? c + 1 : Math.max(0, c - 1);

        // ✅ sessionStorage 저장 (탭 닫으면 초기화)
        if (likeStorageKey) {
          try {
            sessionStorage.setItem(
              likeStorageKey,
              JSON.stringify({
                liked: next,
                likeCount: nextCount,
              }),
            );
          } catch (e) {}
        }

        return nextCount;
      });

      // ✅ 좋아요 켤 때만 슝슝
      if (next) spawnHearts();

      return next;
    });
  }, [spawnHearts, likeStorageKey]);

  const onSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorId: MY_AUTHOR_ID,
      author: {
        name: "냉철한 야구분석가",
        avatar: "/img/lockerroom-profile.svg",
      },
      createdAt: Date.now(), // ✅ 진짜 시간 저장
      text: commentText,
    };

    setComments((prev) => {
      const next = [newComment, ...prev];

      // sessionStorage 저장
      if (commentsStorageKey) {
        try {
          sessionStorage.setItem(commentsStorageKey, JSON.stringify(next));
        } catch (e) {}
      }

      return next;
    });

    setCommentText("");
    inputRef.current?.blur();

    requestAnimationFrame(() => {
      commentsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const deleteMyComment = (commentId) => {
    setComments((prev) => {
      const next = prev.filter((c) => String(c.id) !== String(commentId));

      // sessionStorage도 같이 갱신
      if (commentsStorageKey) {
        try {
          sessionStorage.setItem(commentsStorageKey, JSON.stringify(next));
        } catch (e) {}
      }

      return next;
    });
  };

  // ✅ 모달에서 "삭제하기" 눌렀을 때 실행
  const confirmDeleteComment = () => {
    if (!pendingDeleteId) return;

    deleteMyComment(pendingDeleteId);

    setShowDeleteModal(false);
    setPendingDeleteId(null);

    setToastMsg("댓글이 삭제되었습니다.");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <section className="gpd">
      <header className="detail-header">
        <BackButton title="게시글" />
      </header>

      <main className="gpd-body">
        <div className="gpd-author">
          <img className="gpd-avatar" src={post.author.avatar} alt="" />
          <div className="gpd-author-profile">
            <p className="gpd-author-name">{post.author.name}</p>
            <p className="gpd-author-time">{getDisplayTime(post)}</p>
          </div>
        </div>

        <h2 className="gpd-title">{post.title}</h2>

        {post.image && (
          <div className="gpd-hero">
            <img src={post.image} alt="" />
          </div>
        )}

        <div className="gpd-actions">
          {/* 좋아요 */}
          <button
            className={`gpd-action-btn ${liked ? "is-liked" : ""}`}
            onClick={onToggleLike}
            type="button"
          >
            <div className="heart">
              <div className="guide-dot"></div>
              <img
                src={
                  liked
                    ? "/img/ground-heart-icon-on.svg"
                    : "/img/ground-heart-icon.svg"
                }
                alt="좋아요"
                className="gpd-action-icon"
              />
            </div>
            <span className="gpd-action-count">{likeCount}</span>

            <span className="gpd-burst-layer" aria-hidden="true">
              {bursts.map((h) => (
                <span
                  key={h.id}
                  className="gpd-burst-heart"
                  style={{
                    transform: `translateX(${h.x}px) scale(${h.s})`,
                    animationDuration: `${h.d}ms`,
                  }}
                />
              ))}
            </span>
          </button>

          {/* 댓글 */}
          <button
            className="gpd-action-btn"
            onClick={() => inputRef.current?.focus()}
            type="button"
          >
            <img
              src="/img/ground-comment-icon.png"
              alt="댓글"
              className="gpd-action-icon"
            />
            <span className="gpd-action-count">{comments.length}</span>
          </button>
        </div>

        <div ref={commentsRef} className="gpd-comments-head">
          댓글 {comments.length}개
        </div>

        <div className="gpd-comments">
          {comments.map((c) => (
            <div key={c.id} className="gpd-comment">
              <div className="gpd-comment-head">
                <div className="gpd-profile">
                  <img className="gpd-avatar sm" src={c.author.avatar} alt="" />
                  <div className="gpd-meta">
                    <p className="name">{c.author.name}</p>
                    <p className="time">{getDisplayTime(c)}</p>
                  </div>
                </div>

                <div className="gpd-comment-top">
                  {c.authorId === MY_AUTHOR_ID && (
                    <button
                      type="button"
                      className="gpd-comment-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingDeleteId(c.id);
                        setShowDeleteModal(true);
                      }}
                      aria-label="댓글 삭제"
                    >
                      <div className="guide-dot"></div>
                      <img
                        src="/img/lockerroom-x-close.svg"
                        alt="댓글 삭제"
                        className="gpd-comment-delete-icon"
                      />
                    </button>
                  )}
                </div>
              </div>

              <div className="gpd-comment-body">
                <p className="text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gpd-bottom-space" />
      </main>

      {/* ✅ 토스트: 입력창 위에 */}
      {showToast && <div className="gpd-delete-toast">{toastMsg}</div>}

    <div className="gpd-inputbar">
      <div
        className="guide-click"
        style={{ bottom: "-3%", left: "10%" }}
      ></div>

      <input
        ref={inputRef}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력해 주세요."
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.nativeEvent.isComposing
          ) {
            e.preventDefault();
            onSubmitComment();
          }
        }}
      />

  <button onClick={onSubmitComment} type="button">
    <img src="/img/chatbot-send.svg" alt="send" />
  </button>
</div>

        {/* ✅ 삭제 확인 모달 */}
        {showDeleteModal && (
          <div
            className="gpd-modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="gpd-modal"
              ref={modalRef}
              tabIndex={-1}                 // ✅ 포커스 가능하게
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {    // ✅ Enter = 삭제
                  e.preventDefault();
                  confirmDeleteComment();
                }
                if (e.key === "Escape") {   // ✅ ESC = 닫기 (옵션)
                  e.preventDefault();
                  setShowDeleteModal(false);
                }
              }}
            >
              <h3>댓글을 삭제하시겠습니까?</h3>
              <p>삭제하면 복구할 수 없습니다.</p>

              <div className="gpd-modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                  type="button"
                >
                  취소
                </button>
                <button
                  className="btn-danger"
                  onClick={confirmDeleteComment}
                  type="button"
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
