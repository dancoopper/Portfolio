import React from 'react';

const ModuleSection = ({ id, title, children }) => {
    return (
        <section id={id} className="min-h-screen py-24 flex flex-col justify-center border-b border-hacker-green/20 relative relative -mx-4 px-4 overflow-hidden">
            <div className="absolute top-8 left-4 md:left-12 text-hacker-green/10 font-bold text-6xl md:text-9xl select-none z-0 pointer-events-none whitespace-nowrap overflow-hidden tracking-tighter mix-blend-screen">
                {title}
            </div>
            <div className="relative z-10 w-full max-w-5xl mx-auto backdrop-blur-sm bg-terminal-black/40 p-6 md:p-8 rounded-sm border border-transparent hover:border-hacker-green/30 transition-all duration-500">
                {children}
            </div>
        </section>
    );
};

export default ModuleSection;
