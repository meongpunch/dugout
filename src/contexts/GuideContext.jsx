import React, { createContext, useContext, useState, useEffect } from 'react';

const GuideContext = createContext();

export const useGuide = () => {
    const context = useContext(GuideContext);
    if (!context) {
        throw new Error('useGuide must be used within GuideProvider');
    }
    return context;
};

export const GuideProvider = ({ children }) => {
    const [isGuideOn, setIsGuideOn] = useState(false); // 기본값: OFF

    const toggleGuide = () => {
        setIsGuideOn(prev => !prev);
    };

    const setGuideOff = () => {
        setIsGuideOn(false);
    };

    // body 클래스 토글
    useEffect(() => {
        if (isGuideOn) {
            document.body.classList.add('guide-on');
        } else {
            document.body.classList.remove('guide-on');
        }
    }, [isGuideOn]);

    return (
        <GuideContext.Provider value={{ isGuideOn, toggleGuide, setGuideOff }}>
            {children}
        </GuideContext.Provider>
    );
};
