import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="fixed top-0 w-full bg-terminal-black/90 backdrop-blur-md border-b border-hacker-green/30 z-40">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Terminal className="text-hacker-green w-6 h-6 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight glow-text text-hacker-green">SYS.ADMIN</span>
                        <span className="text-xs text-hacker-green/60">Status: <span className="text-hacker-green animate-pulse">Online</span></span>
                    </div>
                </div>

                <nav className="hidden md:flex space-x-6 text-sm">
                    {['Personal', 'Academic', 'Projects', 'Capstone', 'Professional'].map((item, idx) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(`module-${idx + 1}`)}
                            className="text-hacker-green/70 hover:text-hacker-green hover:glow-text transition-all uppercase tracking-wider relative group"
                        >
                            [ {item} ]
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-hacker-green transition-all group-hover:w-1/2 group-hover:-translate-x-1/2"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-hacker-green transition-all group-hover:w-1/2 group-hover:translate-x-1/2"></span>
                        </button>
                    ))}
                </nav>

                <div className="text-xs text-hacker-green/50 font-mono hidden sm:block">
                    {time.toLocaleTimeString('en-US', { hour12: false })} <span className="text-cyber-blue">UTC{time.getTimezoneOffset() / -60 >= 0 ? '+' : ''}{time.getTimezoneOffset() / -60}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
