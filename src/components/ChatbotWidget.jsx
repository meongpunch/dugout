import { useRef, useState, useEffect } from "react";
import "./ChatbotWidget.css";

const QUICK = ["실시간 스코어", "경기 결과", "경기 일정", "선수 기록", "팀 순위"];

const QUICK_RESPONSE = {
    "실시간 스코어": `⚾ 지금 경기 상황이에요!

5회말
기아 3 : 2 삼성
`,

    "경기 결과": `⚾ 경기 결과에요!

9회말 (경기 종료)
기아 6 : 4 삼성
`,

    "경기 일정": `📅 오늘의 경기 일정이에요!

18:30
기아 vs 삼성
(광주 기아챔피언스필드)
`,

    "선수 기록": `📊 주요 선수 기록이에요!

김도영
타율 0.328 / 홈런 18 / 타점 62
`,

    "팀 순위": `🏆 현재 팀 순위에요!

1위 기아 타이거즈
승률 0.612
`,
};

const FAQ_RULES = [
    {
        test: /(기아|KIA|기아타이거즈).*(색|색깔|컬러)|(?:색|색깔|컬러).*(기아|KIA|기아타이거즈)/i,
        reply:
            `기아 타이거즈의 상징색은 빨간색이에요!\n\n` +
            `이 빨간색은 팀과 팬의 뜨거운 열정을 상징하고,\n` +
            `과거 해태 타이거즈 시절부터 이어진 정통성과 아이덴티티를 계승하는 의미로\n` +
            `오랫동안 팀의 대표 컬러로 사용돼 왔어요.`,
    },

    // 예시로 한두 개 더 추가해둘 수도 있어
    {
        test: /(기아|KIA).*(연고지|홈|구장)|홈구장/i,
        reply: `🏟️ 기아 타이거즈의 홈구장은 **광주 기아챔피언스필드**예요!`,
    },

    {
        test: /(기아|KIA).*(양현종|현종)|양현종선수/i,
        reply: `기아타이거즈 양현종 선수는 1988년 3월 1일 생으로 광주광역시에서 태어난 선수에요! \n` +
            `2007년에 프로에 입단하여 2020년까지 기아타이거즈의 유명한 에이스 선발투수로 자리잡고 있었고\n` +
            `2021년 MLB 텍사스 레인저스에 입단했다가 1년 후에 2022년 기아타이거즈로 돌아온\n` +
            `기아타이거즈의 자부심이자 에이스인 선수 입니다!`,
    },
];

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showNotice, setShowNotice] = useState(true);
    const [view, setView] = useState("chat"); // 'chat' | 'recent'
    const [showEmoji, setShowEmoji] = useState(false);

    // 이모지 리스트 (간단한 데모용)
    const EMOJIS = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇", "🥳", "🥴", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "💩"];

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setOpen(false);
            setClosing(false);
            setView("chat"); // 닫을 때 채팅 뷰로 리셋
            setShowEmoji(false);
        }, 300);
    };
    const [input, setInput] = useState("");
    const INITIAL_MESSAGES = [{ role: "bot", text: "제가 도와드릴게 있나요? 편하게 말씀해주시면 답변해드릴게요." }];
    const [messages, setMessages] = useState(INITIAL_MESSAGES);

    const resetChat = () => {
        setMessages(INITIAL_MESSAGES);
        setShowMenu(false);
        setShowNotice(true);
        setView("chat");
    };

    const handleRecentChats = () => {
        setView("recent");
        setShowMenu(false);
    };

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji);
        setShowEmoji(false);
    };

    const bodyRef = useRef(null);

    useEffect(() => {
        if (!open || view !== "chat") return;
        requestAnimationFrame(() => {
            bodyRef.current?.scrollTo({
                top: bodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        });
    }, [open, messages, view]);

    const getReply = (text) => {
        if (QUICK_RESPONSE[text]) return QUICK_RESPONSE[text];
        for (const rule of FAQ_RULES) {
            if (rule.test.test(text)) return rule.reply;
        }
        return `🤖 아직은 데모라서 일부 질문만 답변할 수 있어요.\n\n예) "기아타이거즈 상징색", "홈구장", "경기 일정" 처럼 물어봐 주세요!`;
    };

    const send = (text) => {
        const t = (text ?? input).trim();
        if (!t) return;
        setInput("");
        setShowEmoji(false);
        setMessages((prev) => [...prev, { role: "user", text: t }]);
        const reply = getReply(t);
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: "bot", text: reply }]);
        }, 400);
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = days[today.getDay()];
        return `${year}.${month}.${day} (${dayName})`;
    };

    return (
        <div className="wrap">
            {!open && (
                <button className="cb-fab" onClick={() => setOpen(true)} aria-label="챗봇 열기">
                    <img src="/img/ai.svg" alt="" />
                </button>
            )}

            {open && <div className={`cb-overlay ${closing ? "is-closing" : ""}`} onClick={handleClose} />}

            {open && (
                <div className={`cb-panel ${closing ? "is-closing" : ""}`} role="dialog" aria-label="챗봇">
                    {/* === View: CHAT === */}
                    {view === "chat" && (
                        <>
                            <div className="cb-head">
                                <button className="cb-back" onClick={handleClose}>
                                    <span className="cb-back-icon"><img src="/img/chatbot-back.svg" alt="" /></span>Chat
                                </button>
                                <div style={{ position: "relative" }}>
                                    <button className="cb-more" onClick={() => setShowMenu(!showMenu)}>
                                        <img src="/img/chatbot-more.svg" alt="" />
                                    </button>
                                    {showMenu && (
                                        <div className="cb-menu">
                                            <button onClick={resetChat}>
                                                <span className="cb-menu-icon" ><img src="/img/chatbot-plus.svg" alt="" /></span> 새 채팅 시작하기
                                            </button>
                                            <button onClick={handleRecentChats}>
                                                <span className="cb-menu-icon"><img src="/img/chatbot-clock.svg" alt="" /></span> 최근 대화한 채팅
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="cb-body" ref={bodyRef}>
                                <div className="cb-date">{getTodayDate()}</div>
                                {messages.map((m, idx) => (
                                    <div key={idx} className={`cb-msg ${m.role === "user" ? "is-user" : "is-bot"}`}>
                                        <div className="cb-bubble">
                                            {m.role === "bot" && <div className="cb-bot-name">Dugout</div>}
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cb-quick">
                                {QUICK.map((q) => (
                                    <button key={q} className="cb-chip" onClick={() => send(q)}>
                                        {q}
                                    </button>
                                ))}
                            </div>

                            <div className="cb-footer-container">
                                {showNotice && (
                                    <div className="cb-notice">
                                        <span>언제든 이야기 걸어주세요 ⚾</span>
                                        <button className="cb-notice-close" onClick={() => setShowNotice(false)}>✕</button>
                                    </div>
                                )}

                                {/* Emoji Picker */}
                                {showEmoji && (
                                    <div className="cb-emoji-picker">
                                        <div className="cb-emoji-list">
                                            {EMOJIS.map((em) => (
                                                <button key={em} onClick={() => addEmoji(em)}>{em}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="cb-input">
                                    <button className="cb-icon-btn" onClick={() => setShowEmoji(!showEmoji)}>
                                        <img src="/img/chatbot-smiley.svg" alt="Emoji" style={{ width: "22px", height: "22px" }} />
                                    </button>
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="무엇이든 물어보세요"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") send();
                                        }}
                                    />
                                    <button className="cb-send-btn" onClick={() => send(input)}>
                                        <img src="/img/chatbot-send.svg" alt="전송" onError={(e) => e.target.style.display = 'none'} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* === View: RECENT === */}
                    {view === "recent" && (
                        <>
                            <div className="cb-head">
                                <button className="cb-back" onClick={() => setView("chat")}>
                                    <span className="cb-back-icon"><img src="/img/chatbot-back.svg" alt="" /></span>Chat
                                </button>
                                {/* Hidden "More" button to ensure exact same height/padding as the main header */}
                                <button className="cb-more" style={{ visibility: "hidden" }}>
                                    <img src="/img/chatbot-more.svg" alt="" />
                                </button>
                            </div>

                            <div className="cb-recent-body">
                                {/* Mock Data: Empty State */}
                                <div className="cb-no-recent">
                                    <p>최근 대화 내역이 없습니다.</p>
                                    <p className="cb-sub-text">챗봇은 실시간 상담이 아닌 정보 안내용 입니다.</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}