import { useRef, useState, useEffect } from "react";
import "./ChatbotWidget.css";

const QUICK = ["실시간 스코어", "경기 결과", "경기 일정", "선수 기록", "팀 순위"];

const QUICK_RESPONSE = {
    "실시간 스코어": `⚾️ 실시간 경기 상황! (LIVE)

🔥 KIA 6 : 3 삼성
현재 7회말 진행 중입니다!

우리가 3점 차로 리드하고 있어요!
이대로 승리까지 굳히기 들어갑시다! 👊`,

    "경기 결과": `📢 현재 경기가 한창 진행 중이에요!
(궁금하다면 '실시간 스코어'를 눌러보세요!)

대신 어제 경기 결과를 알려드릴게요.

🔙 어제 (vs 삼성)
KIA 5 : 4 삼성 (승리 🏆)

어제도 짜릿하게 이겼었죠?
오늘도 이 기세 이어서 연승 가봅시다! 🔥`,

    "경기 일정": `📅 경기 일정을 안내해드릴게요!

✅ 오늘 (LIVE)
🆚 KIA vs 삼성
🏟️ 광주 기아챔피언스필드
(현재 치열하게 경기 중입니다!)

🔜 내일 (18:30)
🆚 KIA vs 삼성
🏟️ 광주 기아챔피언스필드

이번 삼성과의 홈 3연전!
오늘 기세 몰아서 내일까지 싹쓸이 승리 가봅시다! 🔥`,

    "선수 기록": `📊 주요 선수 시즌 기록이에요!

🐯 김도영 (내야수)
타율 0.328 / 홈런 18 / 타점 62

🐯 양현종 (투수)
평균자책점 3.55 / 9승 / 탈삼진 85

🐯 오선우 (외야수)
타율 0.275 / 홈런 7 / 타점 35
`,

    "팀 순위": `🏆 현재 팀 순위입니다!

🐯 3위 KIA 타이거즈 (▲1)
🔥 파죽의 4연승 질주 중!

승무패: 29승 23패 2무
승률: 0.558

상승세가 무섭습니다! 
이대로 1위 탈환까지 가보자고~! 🏃💨`,
};

const FAQ_RULES = [
    {
        test: /(김도영|도영).*(응원가|노래)/i,
        reply: `🎵 김도영 선수 응원가 🎵\n\n` +
            `(빰빰 빰빰빰) 기~아의 김도영!\n` +
            `힘차게 날려라~ (안타!)\n` +
            `기~아의 김도영~ 승리를 위하여~ (안타!)\n` +
            `오오오~ 오오오~ (김! 도! 영!) 🐯`
    },
    {
        test: /(양현종|현종|대투수).*(응원가|노래)/i,
        reply: `🎵 양현종 선수 응원가 🎵\n\n` +
            `오오오오오~ 양현종! (양현종!)\n` +
            `오오오오오~ 양현종! (양현종!)\n` +
            `최강기아 양현종~ 승리를 위하여~ ⚾️\n` +
            `*(사랑한다 기아타이거즈~ 떼창 준비!)*`
    },
    {
        test: /(오선우|선우).*(응원가|노래)/i,
        reply: `🎵 오선우 선수 응원가 🎵\n\n` +
            `오오~ KIA 오선우~ 🎵\n` +
            `나나나나나 나나~ (오! 선! 우!)\n` +
            `안타 날려라~ 홈런 날려라~\n` +
            `승리를 위해~ 오오 KIA 오선우! 💪`
    },
    {
        test: /(나성범|성범).*(응원가|노래)/i,
        reply: `🎵 나성범 선수 응원가 🎵\n\n` +
            `기아의 나성범~ (헤이!) 🐯\n` +
            `기아의 나성범~ (헤이!) 🐯\n` +
            `너와 나의 가슴 속에~ (으랏차차!)\n` +
            `우리의 나성범~ (화이팅!) 💪`
    },
    {
        test: /(최강|기아|팀).*(응원가|노래)|라인업송/i,
        reply: `🎵 라인업 송 (영원하라)🎵\n\n` +
            `워어어~ 최강기아 타이거즈~\n` +
            `워어어~ 미치도록 사랑해요~\n` +
            `최~강~기~아~ 타이거즈! 오오오~\n` +
            `영원하라~ 기아~ 타이거즈~! ❤️🖤`
    },
    {

        test: /(기아|KIA|타이거즈).*(응원가|노래|가사)|응원가/i,

        get reply() {
            const cheerSongs = [
                // 1. 김도영 응원가 (가장 핫함)
                `🎵 김도영 선수 응원가 🎵\n\n` +
                `(빰빰 빰빰빰) 기~아의 김도영!\n` +
                `힘차게 날려라~\n` +
                `기~아의 승리를 위하여 오오오~ 오오오~ \n` +
                `달려라~ (김! 도! 영!) 🐯`,

                // 2. 오선우 응원가 (중독성 甲)
                `🎵 오선우 선수 응원가 🎵\n\n` +
                `오오~ KIA 오선우~ 🎵\n` +
                `나나나나나 나나~ (오! 선! 우!)\n` +
                `안타 날려라~ 홈런 날려라~\n` +
                `승리를 위해~ 오오 KIA 오선우! 💪`,

                // 3. 양현종 응원가 (근본)
                `🎵 양현종 선수 응원가 🎵\n\n` +
                `오오오오오~ 양현종! (양현종!)\n` +
                `오오오오오~ 양현종! (양현종!)\n` +
                `최강기아 양현종~ 승리를 위하여~ ⚾️\n` +
                `(사랑한다 기아타이거즈~ 떼창 준비!)`,

                // 4. 나성범 응원가
                `🎵 나성범 선수 응원가 🎵\n\n` +
                `타이거즈~ 나성범 안타~ 🐯\n` +
                `안타 날려라 날려라 나성범 🐯\n` +
                `타이거즈 나성범 안타~\n` +
                `오오오~ 오오오~ 💪`,

                // 5. 팀 응원가 (남행열차 느낌)
                `🎵 라인업 송 (영원하라) 🎵\n\n` +
                `최강기아 타이거즈~ 워어어~\n` +
                `최강기아 타이거즈~ 워어어~\n` +
                `최~강~기~아~ 타이거즈! 원투원투!~\n` +
                `미치도록 사랑해요~ ❤️🖤`
            ];

            return cheerSongs[Math.floor(Math.random() * cheerSongs.length)];
        }
    },
    {
        // "기아 선수", "기아 선수들", "선수 추천" 등을 물어봤을 때
        test: /(기아|KIA).*(선수|라인업|명단|추천)|라인업|선수/i,

        get reply() {
            const randomPlayers = [
                `기아의 미래!
         슈퍼스타 김도영 선수를 말씀하시는군요? 🤩\n\n` +
                `호타준족의 상징이자 타이거즈의 보물! 💎\n` +
                `벌써부터 기록을 갈아치우는 우리 도영이, 
            니땜시살어야 🏃💨`,

                `대투수 양현종(The Great Doctor) 선수를
         찾으시는군요! 👓\n\n` +
                `타이거즈의 영원한 에이스이자 살아있는 전설이죠.\n` +
                `마운드에 서 있는 것만으로도 든든한 우리의 대투수! 오늘도 호투를 기원합니다 🙏`,

                `한방이 있는 거포! 오선우 선수는 못 참죠! 💪\n\n` +
                `타석에 들어서면 늘 기대하게 만드는 파워 히터!\n` +
                `답답한 속을 뻥 뚫어줄 시원한 홈런 한 방 부탁해요! ⚾️🚀`
            ];

            // 배열(3개) 중에서 랜덤으로 하나(Index)를 뽑아서 리턴!
            return randomPlayers[Math.floor(Math.random() * randomPlayers.length)];
        }
    },
    {
        test: /(기아|KIA|기아타이거즈).*(색|색깔|컬러)|(?:색|색깔|컬러).*(기아|KIA|기아타이거즈)|컬러|색깔|색/i,
        reply:
            `❤️🖤 검빨(검정+빨강)은 
            타이거즈의 심장 아니겠습니까!\n\n` +
            `해태 시절부터 이어진 공포의 검빨의 기운을 받아,\n` +
            `상대 팀을 압도하는 강렬한 승리의 컬러랍니다! 🔥`,
    },
    {
        test: /(기아|KIA).*(연고지|홈|구장)|홈구장|홈/i,
        reply: `🏟️ 우리의 홈구장은 광주 기아챔피언스필드예요!\n\n맛있는 것도 많고 시설도 최고예요. 
        꼭 한번 놀러 오세요! 🌭⚾️`,
    },
    {
        test: /(기아|KIA|기아타이거즈|KIA타이거즈|KIATIGERZES|기아TIGERZES|최강|최강기아|최강타이거즈)/i,
        reply: `🏆 KBO 최다 우승에 빛나는 명문 구단! \n\n` +
            `우리는 '검빨(검정+빨강)' 유니폼의 공포를 보여주는 호랑이 군단, KIA TIGERS입니다! 🐯\n` +
            `광주의 자부심이자 한국 프로야구의 심장!\n` +
            `올해도 V13을 향해 거침없이 질주합니다! 어흥~! 🔥`,
    },
    {
        test: /(권채운|김의성|김혜원|백진우|신명진|유수진|정주리)/i,
        reply: `🏆 DUGOUT을 탄생시킨 대단한 분이죠! 😎\n\n` +
            `🛠️ 기획부터 디자인, 프론트엔드 개발까지 
            열정을 쏟아부었답니다. 
            덕분에 우리가 이렇게 대화할 수 있는 거죠!⚾\n` +
            `사용자 경험을 위해 밤낮으로 고민한 제작자입니다.\n\n` +
            `올라운더 UXUI 디자이너니까 믿고 쓰셔도 됩니다! 🔥`,
    },
    // 1. 김도영 기록 질문
    {
        test: /(김도영|도영).*(기록|성적|타율|홈런|스탯)/i,
        reply: `📊 김도영 선수(내야수) 기록
        
🔥 타율: 0.328
🔥 홈런: 18개
🔥 타점: 62점
🔥 도루: 20개

"제 2의 이종범? 아니, 제 1의 김도영!"
호타준족의 상징, 미친 퍼포먼스를 보여주고 있어요! 🏃💨`,
    },
    // 2. 양현종 기록 질문
    {
        test: /(양현종|현종|대투수).*(기록|성적|승수|방어율|평자|삼진|스탯)/i,
        reply: `📊 양현종 선수(투수) 기록
        
⚾️ 평균자책점: 3.55
⚾️ 승리: 9승 (다승 공동 선두!)
⚾️ 탈삼진: 85개

대투수의 위엄은 기록으로 증명하죠. 
오늘도 묵묵히 마운드를 지키는 든든한 에이스! 🎩`,
    },

    // 3. 오선우 기록 질문
    {
        test: /(오선우|선우).*(기록|성적|타율|홈런|스탯)/i,
        reply: `📊 오선우 선수(외야수) 기록
        
💪 타율: 0.275
💪 홈런: 7개 (장타율 0.510!)
💪 타점: 35점

일발 장타가 있는 거포! 
결정적인 순간에 한 방을 터뜨려줄 해결사입니다! 🚀`,
    },
    {
        test: /(양현종|현종|양현종선수|기아 양현종|기아양현종)/i,
        reply: `대투수 양현종(The Great Doctor) 선수를
         찾으시는군요! 👓\n\n` +
            `타이거즈의 영원한 에이스이자 살아있는 전설이죠.\n` +
            `마운드에 서 있는 것만으로도 든든한 우리의 대투수! 오늘도 호투를 기원합니다 🙏`,
    },
    {
        test: /(김도영|도영|김도영선수|기아 김도영|기아김도영)/i,
        reply: `기아의 미래!
         슈퍼스타 김도영 선수를 말씀하시는군요? 🤩\n\n` +
            `호타준족의 상징이자 타이거즈의 보물! 💎\n` +
            `벌써부터 기록을 갈아치우는 우리 도영이, 
            니땜시살어야 🏃💨`,
    },
    {
        test: /(오선우|선우|오선우선수|기아 오선우|기아오선우)/i,
        reply: `한방이 있는 거포! 오선우 선수는 못 참죠! 💪\n\n` +
            `타석에 들어서면 늘 기대하게 만드는 파워 히터!\n` +
            `답답한 속을 뻥 뚫어줄 시원한 홈런 한 방 부탁해요! ⚾️🚀`,
    },
    {
        test: /(덕아웃|Dugout|더그아웃)/i,
        reply: `🏟️ 왜 이름이 '덕아웃(Dugout)'이냐면요?\n\n` +
            `🐯 "우리는 관중이 아닙니다. 10번째 선수입니다."\n\n` +
            `그라운드의 선수들에게 쉼터이자 작전 본부가 있듯이,\n` +
            `경기를 함께 뛰는 우리 팬들에게도\n` +
            `마음껏 소통하고 기록할 '우리만의 공간'이 필요하니까요! ⚾️\n\n` +
            `경기 전의 설렘부터 승리의 환호, 패배의 아쉬움까지...\n` +
            `팬들의 모든 감정과 기록이 모이는 곳,
            바로 여기가 <덕아웃>입니다! ❤️`
    },
    {
        test: /(이젠|이젠아카데미)/i,
        reply: `🐯 이스터에그 발견!\n\n` +
            `덕아웃팀의 UXUI 프로젝트는 이젠아카데미의 지원을 받아 탄생할 수 있었습니다! ⚾️\n` +
            `감사합니다! ❤️`
    },
    {
        test: /(임자영|선생님|임자영선생님|임자영강사님|강사님)/i,
        reply: `🐯 이스터에그 발견!\n\n` +
            `덕아웃팀의 감독을 맡아주신 임자영 선생님! ⚾️\n` +
            `감사합니다! ❤️\n\n` +
            `유튜브 주소 바로가기 https://www.youtube.com/@j.youngweb`
    },
    // 1. [날씨] 경기장 날씨 질문
    {
        test: /(날씨|비|우천|취소|직관.*날씨|광주.*날씨|직관날씨|직관)/i,
        reply: `☀️ 오늘 광주-기아 챔피언스필드 날씨요?\n\n` +
            `저도 하늘만 보고 있어요! 비 오면 안 되는데... 🥺\n` +
            `일단 우리 팬들의 열기 때문에 경기장은 항상 '맑음'입니다! ☀️🔥\n` +
            `(정확한 기상청 예보도 꼭 확인해주세요!)`
    },

    // 2. [감정 공감] 떨림, 긴장, 승리 기원
    {
        test: /(떨려|긴장|불안|무서워|이겼으면|승리|제발)/i,
        reply: `😭 저도 지금 손 떨려서 타자가 잘 안 쳐져요...\n\n` +
            `진짜 오늘 경기는 꼭 이겨야 하는데 그쵸? ㅜㅜ\n` +
            `그래도 우리 선수들 믿으니까! 끝까지 같이 응원해요! 파이팅! 🙏🏆`
    },

    // 3. [인사] 안녕, 하이
    {
        test: /(안녕|하이|반가|ㅎㅇ|hello|hi)/i,
        reply: `🐯 어흥! 안녕하세요!\n\n` +
            `오늘도 승리 요정이 오셨군요! ✨\n` +
            `저랑 같이 목 터져라 응원할 준비 되셨나요? 
            레스고~! 🔥`
    },

    // 4. [일상] 뭐해?
    {
        test: /(뭐해|머해|머하니|뭐하고)/i,
        reply: `🤔 상대 팀 전력 분석 중이에요... \n\n` +
            `사실은 언제 야구 시작하나 시계만 보고 있어요 ⏰\n` +
            `선수님은 뭐해요? 직관 갈 준비? 아님 치킨 주문? 🍗`
    },

    // 5. [정체성 1] 너 누구야? (챗봇 정체)
    {
        test: /(너.*누구|넌.*누구|자기소개|너)/i,
        reply: `🤖 저는 '더그아웃'의 마스코트이자 AI 전력분석관입니다! 🐯\n\n` +
            `야구 지식은 기본! 팬심은 덤!\n` +
            `궁금한 게 있거나 심심할 때 언제든 말 걸어주세요! ⚾️`
    },

    // 6. [정체성 2] 나 누구야? (사용자 정체 - 감동 포인트)
    {
        test: /(나.*누구|내가.*누구|나)/i,
        reply: `💎 가장 중요한 질문이네요!\n\n` +
            `당신은 관중이 아닙니다.\n` +
            `경기의 흐름을 바꾸는 '10번째 선수'이자,\n` +
            `'덕아웃'의 진정한 주인입니다! ❤️🖤`
    }

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
            setShowMenu(false); // 메뉴도 닫기
            setShowEndChatModal(false); // 종료 모달도 닫기
        }, 300);
    };
    const [input, setInput] = useState("");
    const INITIAL_MESSAGES = [{ role: "bot", text: "어서오세요! 🐯 \n최강기아의 승리를 위해 무엇을 도와드릴까요?\n오늘도 승리하러 가봅시다! 🔥" }];
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
        return `😅 어이쿠, 방금 사인은 제가 놓쳤네요!⚾️\n
                제가 아직 배우고 있는 중이라 \n어려운 공은 못 받을 수도 있어요.
                대신 이런 건 기가 막히게 대답해요!

                👉 
                "기아타이거즈 홈구장", "오늘 경기", "김도영 기록"`;
    };

    const send = (text) => {
        const t = (text ?? input).trim();
        if (!t) return;
        setInput("");
        setShowEmoji(false);
        setShowMenu(false); // 메시지 전송 시 메뉴 닫기
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

    const [showEndChatModal, setShowEndChatModal] = useState(false);

    const askEndChat = () => {
        setShowMenu(false);
        setShowEndChatModal(true);
    };

    const confirmEndChat = () => {
        // 대화 내용을 초기화하고 메뉴/모달 닫고, 위젯 자체도 닫음
        setMessages(INITIAL_MESSAGES);
        setShowEndChatModal(false);
        setShowMenu(false);
        setOpen(false);
        setView("chat");
    };

    const cancelEndChat = () => {
        setShowEndChatModal(false);
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
                                            <button onClick={askEndChat}>
                                                <span className="cb-menu-icon"><img src="/img/chatbot-close.svg" alt="" /></span> 채팅 종료하기
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
                                        <span>언제든 이야기 걸어주세요 ⚾️</span>
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
                                    <span className="cb-back-icon"><img src="/img/chatbot-back.svg" alt="back" /></span>Chat
                                </button>
                                <button className="cb-more" style={{ visibility: "hidden" }}>
                                    <img src="/img/chatbot-more.svg" alt="more" />
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

                    {/* === End Chat Modal === */}
                    {showEndChatModal && (
                        <div className="cb-modal-overlay">
                            <div className="cb-modal">
                                <div className="cb-modal-content">
                                    <p className="cb-modal-title">대화를 종료하시겠습니까?</p>
                                    <p className="cb-modal-desc">종료 시 모든 대화 내용이 삭제됩니다.</p>
                                </div>
                                <div className="cb-modal-actions">
                                    <button className="cb-modal-btn cancel" onClick={cancelEndChat}>취소</button>
                                    <button className="cb-modal-btn confirm" onClick={confirmEndChat}>종료하기</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}