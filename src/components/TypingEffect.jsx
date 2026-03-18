import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 40, className = "" }) => {
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
        <div className={`${className} font-mono flex items-center`}>
            <span className="text-primary mr-3 opacity-50 select-none">~</span>
            {displayedText}
            <span className="animate-blink-cursor ml-1 inline-block w-1.5 h-6 bg-zinc-300"></span>
        </div>
    );
};

export default TypingEffect;
