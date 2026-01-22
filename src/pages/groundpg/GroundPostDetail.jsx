import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./GroundPostDetail.css";
import BackButton from "../../components/Backbutton";

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

  useEffect(() => {
    setLikeCount(post.likeCount);
    setComments(post.comments);
    setCommentText("");
    setLiked(false);
    setBursts([]);
  }, [post]);

  const spawnHearts = useCallback(() => {
    const now = Date.now();

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${now}-${i}`,
      x: Math.random() * 16 - 8, // 가운데로 더 모이게 (-8~8)
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
      setLikeCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
      if (next) spawnHearts();
      return next;
    });
  }, [spawnHearts]);

  const onSubmitComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author: {
          name: "냉철한 야구분석가",
          avatar: "/img/lockerroom-profile.svg",
        },
        time: "방금",
        text: commentText,
      },
      ...prev,
    ]);

    setCommentText("");
    inputRef.current?.blur();

    // ✅ 댓글 등록 후 댓글 영역으로 이동 (여기 안에 있어야 함!)
    requestAnimationFrame(() => {
      commentsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section className="gpd">
      <header className="detail-header">
        <BackButton title="게시글" />
      </header>

      <main className="gpd-body">
        <div className="gpd-author">
          <img className="gpd-avatar" src={post.author.avatar} alt="" />
          <div>
            <p className="gpd-author-name">{post.author.name}</p>
            <p className="gpd-author-time">{post.time}</p>
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
            <img
              src={
                liked
                  ? "/img/ground-heart-icon-on.svg"
                  : "/img/ground-heart-icon.svg"
              }
              alt="좋아요"
              className="gpd-action-icon"
            />
            <span className="gpd-action-count">{likeCount}</span>

            {/* 슝슝 파티클 */}
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
              <img className="gpd-avatar sm" src={c.author.avatar} alt="" />
              <div>
                <p className="name">{c.author.name}</p>
                <div className="time">{c.time}</div>
                <p className="text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gpd-bottom-space" />
      </main>

      <div className="gpd-inputbar">
        <input
          ref={inputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력해 주세요."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmitComment();
            }
          }}
        />
        <button onClick={onSubmitComment} type="button">
          <img src="/img/chatbot-send.svg" alt="send" />
        </button>
      </div>
    </section>
  );
}
