import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Navigation, FileText, Briefcase, Award, Code } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const commands = [
        { id: 'personal', title: 'Personal Profile', icon: <Terminal size={16} />, target: 'module-1' },
        { id: 'academic', title: 'Academic History', icon: <Award size={16} />, target: 'module-2' },
        { id: 'projects', title: 'Work Samples', icon: <Code size={16} />, target: 'module-3' },
        { id: 'capstone', title: 'Capstone & Docs', icon: <FileText size={16} />, target: 'module-4' },
        { id: 'professional', title: 'Professional Info', icon: <Briefcase size={16} />, target: 'module-5' },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.title.toLowerCase().includes(input.toLowerCase()) ||
        cmd.id.toLowerCase().includes(input.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setInput('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Handle arrow keys navigation in palette
    useEffect(() => {
        const handlePaletteKeys = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    executeCommand(filteredCommands[selectedIndex]);
                }
            }
        };
        window.addEventListener('keydown', handlePaletteKeys);
        return () => window.removeEventListener('keydown', handlePaletteKeys);
    }, [isOpen, filteredCommands, selectedIndex]);

    const executeCommand = (cmd) => {
        const element = document.getElementById(cmd.target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden scale-100 opacity-100 transition-all">

                <div className="flex items-center px-4 py-3 border-b border-white/5">
                    <Search className="w-5 h-5 text-zinc-400 mr-3" />
                    <input
                        ref={inputRef}
                        className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 outline-none font-sans text-lg"
                        placeholder="Search commands..."
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setSelectedIndex(0); }}
                    />
                    <div className="text-[10px] font-medium text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap hidden sm:block">ESC</div>
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, i) => (
                            <button
                                key={cmd.id}
                                onMouseEnter={() => setSelectedIndex(i)}
                                onClick={() => executeCommand(cmd)}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors duration-200 outline-none
                   ${i === selectedIndex ? 'bg-primary/20 text-white border border-primary/20' : 'text-zinc-400 border border-transparent hover:bg-white/5'}
                 `}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`${i === selectedIndex ? 'text-primary-400' : 'text-zinc-500'}`}>{cmd.icon}</div>
                                    <span className="font-medium text-sm">{cmd.title}</span>
                                </div>
                                <Navigation className={`w-4 h-4 ${i === selectedIndex ? 'text-primary/70' : 'text-transparent'}`} />
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                            No commands found matching "{input}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
