import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const TerminalInput = ({ onSubmit, history, currentPath }) => {
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const { theme, THEMES } = useTheme();

    const commandHistory = history
        .filter(e => e.command && e.command !== '')
        .map(e => e.command);

    useEffect(() => {
        const refocus = () => inputRef.current?.focus();
        window.addEventListener('click', refocus);
        inputRef.current?.focus();
        return () => window.removeEventListener('click', refocus);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(input);
            setInput('');
            setHistoryIndex(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIndex = historyIndex + 1;
            if (nextIndex < commandHistory.length) {
                setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
                setHistoryIndex(nextIndex);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
                setHistoryIndex(nextIndex);
            } else {
                setInput('');
                setHistoryIndex(-1);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (input.trim() !== '') {
                const { COMMANDS } = require('../data/commands');
                const commandsList = [...Object.keys(COMMANDS), 'clear', 'theme', ...Object.keys(THEMES)];
                const match = commandsList.find(cmd => cmd.startsWith(input.toLowerCase()));
                if (match) setInput(match);
            }
        }
    };

    return (
        <div className="flex items-center gap-2 w-full mt-1">
            <div className="flex items-center gap-1 flex-shrink-0">
                <span style={{ color: theme.accent }} className="font-bold">
                    <span className="hidden xs:inline">siddharth@portfolio</span>
                    <span className="xs:hidden">sid</span>
                </span>
                <span className="text-white/40">:</span>
                <span style={{ color: theme.path }}>~</span>
                {currentPath && <span style={{ color: theme.path }}>/{currentPath}</span>}
                <span className="text-white/60">$</span>
            </div>

            <div className="relative flex-grow flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type 'help' for commands..."
                    className="bg-transparent border-none outline-none text-white w-full font-mono caret-transparent text-[14.5px] placeholder:text-white/20 placeholder:italic"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                />
                <span
                    className="absolute top-1/2 -translate-y-1/2 h-[1.1em] w-[0.6ch] opacity-80 cursor-blink pointer-events-none"
                    style={{ left: `${input.length}ch`, backgroundColor: theme.accent }}
                />
            </div>
        </div>
    );
};

export default TerminalInput;
