import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BOOT_LINES = [
    { label: '  OK  ', text: 'Initializing system...' },
    { label: '  OK  ', text: 'Loading developer profile...' },
    { label: '  OK  ', text: 'Authenticating visitor...' },
    { label: 'ACCESS', text: 'Access granted.' },
];

const BootLoader = ({ onComplete }) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [done, setDone] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (visibleCount < BOOT_LINES.length) {
            const t = setTimeout(() => setVisibleCount(v => v + 1), 650);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => {
                setDone(true);
                setTimeout(onComplete, 600);
            }, 700);
            return () => clearTimeout(t);
        }
    }, [visibleCount, onComplete]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="boot"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start justify-center h-screen px-6 md:px-12 font-mono relative z-10"
                >
                    <div
                        className="mb-8 text-2xl md:text-4xl font-bold tracking-widest"
                        style={{ color: theme.accent }}
                    >
                        SIDDHARTH-OS <span className="text-white/30 text-sm md:text-lg font-normal">v1.0</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-3 text-sm md:text-base"
                                >
                                    <span
                                        className="px-2 py-0.5 rounded text-xs font-bold border"
                                        style={{
                                            borderColor: i === BOOT_LINES.length - 1 ? theme.accent : 'rgba(34, 197, 94, 0.6)',
                                            color: i === BOOT_LINES.length - 1 ? theme.accent : 'rgb(74, 222, 128)'
                                        }}
                                    >
                                        {line.label}
                                    </span>
                                    <span className="text-[#e5e7eb]">{line.text}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {visibleCount < BOOT_LINES.length && (
                        <div
                            className="mt-4 w-2.5 h-5 cursor-blink"
                            style={{ backgroundColor: theme.accent }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BootLoader;
