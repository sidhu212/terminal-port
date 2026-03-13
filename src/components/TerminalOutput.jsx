import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillBars from './SkillBars';
import Neofetch from './Neofetch';
import SocialLinks from './SocialLinks';
import ResumeView from './ResumeView';
import { useTheme } from '../context/ThemeContext';

const TypingText = ({ text, speed = 6 }) => {
    const [displayed, setDisplayed] = useState(speed === 0 ? text : '');

    useEffect(() => {
        if (speed === 0) { setDisplayed(text); return; }
        let i = 0;
        setDisplayed('');
        const id = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(id);
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);

    return <pre className="whitespace-pre-wrap font-mono">{displayed}</pre>;
};

const Prompt = ({ path }) => {
    const { theme } = useTheme();
    return (
        <div className="flex items-center gap-1 flex-shrink-0">
            <span style={{ color: theme.accent }} className="font-bold">
                <span className="hidden sm:inline">siddharth@portfolio</span>
                <span className="sm:hidden">sid</span>
            </span>
            <span className="text-white/40">:</span>
            <span style={{ color: theme.path }}>~</span>
            {path && <span style={{ color: theme.path }}>/{path}</span>}
            <span className="text-white/60">$</span>
        </div>
    );
};

const VisualRenderer = ({ visualType }) => {
    if (visualType === 'skills') return <SkillBars />;
    if (visualType === 'neofetch') return <Neofetch />;
    if (visualType === 'social') return <SocialLinks />;
    if (visualType === 'resume') return <ResumeView />;
    return null;
};

const TerminalOutput = ({ history }) => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-3 mb-3">
            {history.map((entry, index) => (
                <motion.div
                    key={index}
                    className="flex flex-col gap-0.5"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {entry.command != null && entry.command !== '' && (
                        <div className="flex items-center gap-2">
                            <Prompt path={entry.path} />
                            <span className="text-white">{entry.command}</span>
                        </div>
                    )}

                    {entry.visualType && (
                        <div className="mt-1">
                            <VisualRenderer visualType={entry.visualType} />
                        </div>
                    )}

                    {entry.content != null && entry.content !== '' && !entry.visualType && (
                        <div
                            className={`pl-1 ${entry.type === 'error'
                                ? 'text-red-400'
                                : entry.type === 'success'
                                    ? 'text-green-400'
                                    : entry.type === 'prompt'
                                        ? 'text-yellow-400'
                                        : entry.type === 'status'
                                            ? 'text-blue-400'
                                            : 'text-[#e5e7eb]'
                                }`}
                            style={entry.type === 'system' ? { color: theme.accent } : {}}
                        >
                            <TypingText
                                text={entry.content}
                                speed={entry.type === 'system' || entry.type === 'prompt' ? 0 : 6}
                            />
                        </div>
                    )}

                    {entry.content != null && entry.content !== '' && entry.visualType === 'neofetch' && (
                        <div className="pl-1 text-[#e5e7eb]">
                            <TypingText text={entry.content} speed={0} />
                        </div>
                    )}

                    {entry.links && entry.links.length > 0 && (
                        <div className="flex flex-col gap-1 pl-1 mt-1">
                            {entry.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:underline transition-colors duration-150 w-fit text-sm group"
                                    style={{ color: theme.path }}
                                >
                                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                                    <span className="group-hover:opacity-80">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default TerminalOutput;
