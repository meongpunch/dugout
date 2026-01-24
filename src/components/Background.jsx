import React from 'react'
import './Background.css'
const Background = () => {
    return (
        <>
            {/* 왼쪽 영역 */}
            <div className="bg-container bg-left">
                <div className="bg-logo"><img src="img/dugout-logo.png" alt="덕아웃 로고" /></div>
                <div className="bg-text-box">
                    <div className="bg-title point">DUGOUT</div>
                    <div className="bg-subtit">The 10th Player</div>
                </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="bg-container bg-right">
                <div className="bg-title">MOBILE FANDOM APP</div>
                <div className="bg-text-box">
                    <p className="bg-date">20260102 - 20260126</p>
                    <p className="bg-subtit">2026 UX / UI DESIDN TEAM PROJECT</p>
                    <p className="bg-team-name">권채운 김의성 김혜원 백진우 신명진 유수진 정주리</p>
                    <p className="copyright">덕아웃의 이미지는 기아타이거즈와 생성형AI에서 발췌되었습니다.</p>
                </div>
            </div>
        </>
    )
}

export default Background