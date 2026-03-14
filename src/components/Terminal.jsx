import React, { useState, useRef, useEffect } from 'react';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import { parseCommand } from '../utils/commandParser';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
// Import resume file to get its URL for the download command
import resumeFile from '../assests/docs/siddharth_cv.pdf';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*_';

const GlitchHeader = ({ text, color }) => {
    const [displayed, setDisplayed] = useState(text);

    useEffect(() => {
        const rng = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        const interval = setInterval(() => {
            if (Math.random() < 0.6) return;
            const arr = text.split('');
            const numGlitches = Math.floor(Math.random() * 5) + 2;
            for (let i = 0; i < numGlitches; i++) {
                const pos = Math.floor(Math.random() * arr.length);
                if (arr[pos] !== '\n' && arr[pos] !== ' ') arr[pos] = rng();
            }
            setDisplayed(arr.join(''));
            setTimeout(() => setDisplayed(text), 100);
        }, 2500);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <pre
            className="whitespace-pre font-mono leading-[1.1] select-none text-[6px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm mb-6 mx-auto w-fit"
            style={{ color: color }}
        >
            {displayed}
        </pre>
    );
};

const ASCII_HEADER_TEXT = ` _    _  _____  _      _____  _____  ___ _____ 
| |  | ||  ___|| |    /  __ \\|  _  ||  \\/  ||  ___|
| |  | || |__  | |    | /  \\/| | | || .  . || |__  
| |/\\| ||  __| | |    | |    | | | || |\\/| ||  __| 
\\  /\\  /| |___ | |____| \\__/\\\\ \\_/ /| |  | || |___ 
 \\/  \\/ \\____/ \\_____/ \\____/ \\___/ \\_|  |_/\\____/ `;

const INITIAL_HISTORY = [
    {
        type: 'system',
        component: 'header',
        content: '\nSystem initialized. Ready for commands.\nLast updated: November 24, 2025\n',
        command: null,
    },
];

const Terminal = () => {
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [interactionState, setInteractionState] = useState(null);
    const [formData, setFormData] = useState({});
    const [currentPath, setCurrentPath] = useState('');
    const bottomRef = useRef(null);
    const { theme, switchTheme, THEMES } = useTheme();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = async (input) => {
        const trimmed = input.trim();
        const mainCommand = trimmed.split(' ')[0].toLowerCase();

        // Handle Interactive Sessions
        if (interactionState) {
            const lowerInput = trimmed.toLowerCase();

            // Handle Exit during interaction
            if (lowerInput === 'exit' || lowerInput === 'quit') {
                setInteractionState(null);
                setFormData({});
                setCurrentPath('');
                setHistory(prev => [...prev, { command: trimmed, content: 'Interactive session terminated.', path: 'contact/message' }]);
                return;
            }

            setHistory(prev => [...prev, { command: trimmed, content: null, path: currentPath }]);

            if (interactionState === 'AWAITING_NAME') {
                setFormData(prev => ({ ...prev, fullName: trimmed }));
                setInteractionState('AWAITING_MOBILE');
                setHistory(prev => [...prev, { type: 'prompt', content: '📞 Enter your Mobile No (or type "exit" to cancel):', path: currentPath }]);
                return;
            }

            if (interactionState === 'AWAITING_MOBILE') {
                setFormData(prev => ({ ...prev, mobileNumber: trimmed }));
                setInteractionState('AWAITING_EMAIL');
                setHistory(prev => [...prev, { type: 'prompt', content: '📧 Enter your Email (or type "exit" to cancel):', path: currentPath }]);
                return;
            }

            if (interactionState === 'AWAITING_EMAIL') {
                setFormData(prev => ({ ...prev, workEmail: trimmed }));
                setInteractionState('AWAITING_MESSAGE');
                setHistory(prev => [...prev, { type: 'prompt', content: '📝 Enter your Message / Purpose (or type "exit" to cancel):', path: currentPath }]);
                return;
            }

            if (interactionState === 'AWAITING_MESSAGE') {
                const finalData = { ...formData, subject: 'Inquiry', message: trimmed };
                setInteractionState(null);
                setHistory(prev => [...prev, { type: 'status', content: '📤 Sending message to Siddharth...', path: currentPath }]);

                try {
                    const API_URL = process.env.NODE_ENV === 'production' 
                        ? '/api/contact' 
                        : 'http://localhost:5000/api/contact';
                        
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(finalData)
                    });

                    if (response.ok) {
                        setHistory(prev => [...prev, {
                            type: 'success',
                            command: null,
                            content: '✨ Success: Message sent successfully! Expect a reply soon.',
                            path: currentPath
                        }]);
                        // Return to root after success
                        setCurrentPath('');
                    } else {
                        const data = await response.json();
                        throw new Error(data.error || 'Failed to send message');
                    }
                } catch (err) {
                    setHistory(prev => [...prev, {
                        type: 'error',
                        command: null,
                        content: `❌ Error: ${err.message}. Make sure the backend server is running.`,
                        path: currentPath
                    }]);
                }
                return;
            }
        }

        // Check path requirement for "cd message"
        if (trimmed.toLowerCase() === 'cd message' && currentPath !== 'contact') {
            setHistory(prev => [...prev, {
                type: 'error',
                command: trimmed,
                content: "Error: To send a message, you must first enter the contact section. Type 'contact' and then 'cd message'.",
                path: currentPath
            }]);
            return;
        }

        const result = parseCommand(
            input,
            // Clear
            () => {
                setHistory([...INITIAL_HISTORY]);
                setCurrentPath('');
                setInteractionState(null);
            },
            // Theme
            (themeName) => {
                if (THEMES[themeName]) { switchTheme(themeName); return true; }
                return false;
            },
            // Download
            () => {
                const link = document.createElement('a');
                link.href = resumeFile;
                link.download = 'Siddharth_Singh_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        );

        if (result === null) return;
        if (result.type === 'empty') return;

        // Add current path to result for history
        const resultWithHistory = { ...result, path: currentPath };
        setHistory(prev => [...prev, resultWithHistory]);

        // Path logic: Only show path for 'contact' and its sub-commands
        if (mainCommand === 'contact') {
            setCurrentPath('contact');
        } else if (trimmed.toLowerCase() === 'cd message' && currentPath === 'contact') {
            setCurrentPath('contact/message');
            setInteractionState('AWAITING_NAME');
            setHistory(prev => [...prev, { type: 'prompt', content: '👤 Enter your Name (or type "exit" to cancel):', path: 'contact/message' }]);
        } else if (mainCommand === 'clear') {
            // Handled by clearCallback
        } else {
            // For other commands (about, projects, help, etc.), return to root path
            setCurrentPath('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-4xl h-full max-h-[85dvh] sm:max-h-[80dvh] bg-[#0d0d0f] border rounded-xl overflow-hidden flex flex-col mx-auto shadow-2xl"
            style={{
                borderColor: `${theme.accent}33`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px ${theme.border}, 0 0 30px ${theme.glow1}`
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl border-2"
                initial={false}
                animate={{
                    borderColor: [theme.border, `${theme.accent}77`, theme.border],
                    boxShadow: [
                        `inset 0 0 10px ${theme.glow1}`,
                        `inset 0 0 30px ${theme.glow2}`,
                        `inset 0 0 10px ${theme.glow1}`
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="flex-shrink-0 bg-[#1a1a1e] px-4 py-3 flex items-center justify-between border-b border-white/[0.06] select-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 transition-all cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-125 transition-all cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-125 transition-all cursor-pointer" />
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] md:text-sm font-mono truncate px-2">
                    <span style={{ color: theme.accent }}>{'>'}_</span>
                    <span>SIDDHARTH'S TERMINAL</span>
                </div>
                <div className="w-8 md:w-16" />
            </div>

            <div className="flex-grow overflow-y-auto overflow-x-hidden scrollbar-hide p-3 sm:p-4 md:p-6 text-[13px] sm:text-[13.5px] md:text-[14.5px] leading-6 sm:leading-7 font-mono relative pb-8 md:pb-6">
                <GlitchHeader text={ASCII_HEADER_TEXT} color={theme.accent} />
                <TerminalOutput history={history} />
                <TerminalInput onSubmit={handleCommand} history={history} currentPath={currentPath} />
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
};

export default Terminal;
