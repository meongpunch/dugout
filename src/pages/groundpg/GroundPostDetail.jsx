import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./GroundPostDetail.css";
import BackButton from "../../components/Backbutton";

/**
 * ✅ Ground에서는 숫자 id만 전달
 * ✅ Detail에서 p{id} 형태로 매핑
 */

const POST_DETAIL_MAP = {
  p1: {
    author: { name: "신호두", avatar: "/img/profile-default.jpg" },
    time: "방금",
    title: "쫓기는 것 같아 황성빈",
    image: "/img/ground-post-sample.jpg",
    likeCount: 0,
    comments: [
      {
        id: "c1",
        author: { name: "김가루", avatar: "/img/profile-default.jpg" },
        time: "3시간 전",
        text: "쫓거라쫓기지마라 왜저러냐~~~~~",
      },
      {
        id: "c2",
        author: { name: "QUEEN GGARU", avatar: "/img/profile-default.jpg" },
        time: "1일 전",
        text: "4월부터 이렇게 다우면 어떡하자는 거지..",
      },
    ],
  },

  p2: {
    author: { name: "호랑이그림자", avatar: "/img/profile-default.jpg" },
    time: "2시간 전",
    title: "나 진짜 우리직 까까가 자랑...",
    image: "/img/ground-post-2.jpg",
    likeCount: 12,
    comments: [],
  },

  p3: {
    author: { name: "직관러", avatar: "/img/profile-default.jpg" },
    time: "어제",
    title: "호미야 잘 성장하고 있네!!",
    image: "/img/ground-post-3.jpg",
    likeCount: 33,
    comments: [
      {
        id: "c1",
        author: { name: "홈런왕", avatar: "/img/profile-default.jpg" },
        time: "1시간 전",
        text: "요즘 타격감 미쳤음 ㄹㅇ",
      },
    ],
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
  const num = String(raw ?? "").match(/\d+/)?.[0]; // 숫자만 뽑기
  const postKey = num ? `p${num}` : ""; // p1 형태로 고정

  const post = useMemo(() => {
    if (!postKey) return FALLBACK_POST;
    return POST_DETAIL_MAP[postKey] ?? FALLBACK_POST;
  }, [postKey]);

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    setLikeCount(post.likeCount);
    setComments(post.comments);
    setCommentText("");
  }, [post]);

  const onSubmitComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author: { name: "나", avatar: "/img/profile-default.jpg" },
        time: "방금",
        text: commentText,
      },
      ...prev,
    ]);

    setCommentText("");
    inputRef.current?.blur();
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
          <button onClick={() => setLikeCount((v) => v + 1)}>
            ♡ {likeCount}
          </button>
          <button onClick={() => inputRef.current?.focus()}>
            □ {comments.length}
          </button>
        </div>

        <div className="gpd-comments">
          {comments.map((c) => (
            <div key={c.id} className="gpd-comment">
              <p className="name">{c.author.name}</p>
              <p className="text">{c.text}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="gpd-inputbar">
        <input
          ref={inputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력해 주세요."
        />
        <button onClick={onSubmitComment}>➤</button>
      </div>
    </section>
  );
}
