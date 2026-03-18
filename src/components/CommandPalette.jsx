import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const inputRef = useRef(null);

    const commandMap = {
        '/help': 'Available commands: /personal, /academic, /projects, /capstone, /professional, /clear',
        '/personal': 'module-1',
        '/academic': 'module-2',
        '/projects': 'module-3',
        '/capstone': 'module-4',
        '/professional': 'module-5',
        '/resume': 'Downloading resume... (Placeholder)',
    };

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
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (cmd === '/clear') {
            setOutput([]);
            setInput('');
            return;
        }

        let response = `> ${cmd}\n`;

        if (commandMap[cmd]) {
            const target = commandMap[cmd];
            if (target.startsWith('module-')) {
                response += `Navigating to ${cmd.replace('/', '')}...`;
                const element = document.getElementById(target);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setTimeout(() => setIsOpen(false), 500);
                }
            } else {
                response += target;
            }
        } else {
            response += `Command not found: ${cmd}. Type /help for available commands.`;
        }

        setOutput(prev => [...prev, response]);
        setInput('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-terminal-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-terminal-black border border-hacker-green shadow-[0_0_30px_rgba(0,255,65,0.2)] w-full max-w-2xl rounded-sm overflow-hidden flex flex-col max-h-[80vh]">
                <div className="bg-hacker-green/10 border-b border-hacker-green p-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-hacker-green">
                        <TerminalIcon size={16} />
                        <span className="text-sm font-bold tracking-wider">TERMINAL // COMMAND_PALETTE (ESC to close)</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-hacker-green hover:text-white transition-colors text-sm font-bold px-2.5 py-0.5 border border-transparent hover:border-hacker-green">X</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
                    <div className="text-hacker-green/70 mb-4">
                        Type /help for a list of commands. Select a section to navigate.
                    </div>
                    {output.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap text-hacker-green/90">{line}</div>
                    ))}
                    <form onSubmit={handleSubmit} className="flex items-center mt-2 group">
                        <span className="text-hacker-green mr-2">&gt;</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="terminal-input"
                            placeholder="Enter command..."
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
