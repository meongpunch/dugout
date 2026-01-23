import React from 'react'
import './Background.css'
const Background = () => {
    return (
        <>
            {/* 왼쪽 영역 */}
            <div className="bg-container bg-left">
                <div className="bg-logo"><img src="img/dugout-logo.png" alt="덕아웃 로고" /></div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="bg-container bg-right">
                <div className="bg-title point">DUGOUT</div>
                <div className="bg-text-box">
                    <div className="bg-subtit">The 10th Player </div>

                </div>
            </div>
        </>
    )
}

export default Background