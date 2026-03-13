import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from '../components/Terminal';
import BootLoader from '../components/BootLoader';
import MatrixRain from '../components/MatrixRain';
import GridBackground from '../components/GridBackground';
import Cursor from '../components/Cursor';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const [booting, setBooting] = useState(true);
    const { theme } = useTheme();

    return (
        <div className="relative min-h-screen bg-[#0d0d0f] font-mono overflow-hidden flex flex-col items-center justify-center cursor-none">
            {/* Dynamic Cursor */}
            <Cursor />

            {/* Subtle scanline overlay */}
            <div className="scanline pointer-events-none" />

            {/* Themed Background Elements */}
            <GridBackground />
            <MatrixRain />

            <AnimatePresence mode="wait">
                {booting ? (
                    <BootLoader key="boot" onComplete={() => setBooting(false)} />
                ) : (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="w-full flex items-center justify-center px-4 py-8 relative z-10"
                    >
                        {/* Parallax Float Background effect for terminal */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-full max-w-4xl"
                        >
                            <Terminal />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status bar shown after boot */}
            <AnimatePresence>
                {!booting && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="fixed bottom-0 left-0 w-full px-4 py-1.5 bg-[#0d0d0f]/80 backdrop-blur-sm border-t border-white/[0.06] flex justify-between items-center text-[10px] md:text-xs text-white/30 font-mono z-20 pointer-events-none"
                    >
                        <div className="flex gap-4 md:gap-6">
                            <span>SIDDHARTH-OS v1.0</span>
                            <span style={{ color: `${theme.accent}cc` }}>●</span>
                            <span className="hidden xs:inline">UPTIME: 00:00:42</span>
                        </div>
                        <div className="flex gap-4 md:gap-6">
                            <span className="hidden sm:inline">STATUS: ONLINE</span>
                            <span style={{ color: `${theme.accent}cc` }}>●</span>
                            <span>127.0.0.1</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
