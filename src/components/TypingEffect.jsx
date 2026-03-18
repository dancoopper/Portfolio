import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 30, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <div className={className}>
            {displayedText}
            <span className="animate-blink-cursor ml-1 inline-block w-2 bg-hacker-green h-4 align-middle"></span>
        </div>
    );
};

export default TypingEffect;
