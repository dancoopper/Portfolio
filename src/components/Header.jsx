import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
        <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-white/5 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
            <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="bg-gradient-to-tr from-primary to-accent p-1.5 rounded-lg shadow-lg group-hover:shadow-primary/25 transition-all">
                        <Layers className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-zinc-100 tracking-tight">DEV.STUDIO</span>
                    <div className="hidden sm:flex items-center ml-2 px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                        <span className="text-[10px] text-zinc-400 font-medium">Available</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-1">
                    {['Personal', 'Academic', 'Projects', 'Capstone', 'Professional'].map((item, idx) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(`module-${idx + 1}`)}
                            className="text-sm font-medium text-zinc-400 hover:text-zinc-100 px-4 py-2 rounded-full hover:bg-white/5 transition-all outline-none focus-ring"
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
