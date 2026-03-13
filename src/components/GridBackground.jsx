import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const GridBackground = () => {
    const { theme } = useTheme();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hexCodes, setHexCodes] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Generate some static random hex codes for the background
        const codes = Array.from({ length: 40 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            code: Math.random().toString(16).slice(2, 6).toUpperCase(),
            delay: Math.random() * 5
        }));
        setHexCodes(codes);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">

            {/* Interactive Flashlight Glow */}
            <div
                className="absolute inset-0 z-[2] opacity-60 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.accent}15, transparent 40%)`
                }}
            />

            {/* Rotating Tech Rings in Center (Holographic HUD effect) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-[0.12] pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full border border-dashed"
                    style={{ borderColor: theme.accent, borderWidth: '1px' }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full border border-dotted"
                    style={{ borderColor: theme.accent, borderWidth: '2px' }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full border-t border-l"
                    style={{ borderColor: theme.accent, borderWidth: '1px' }}
                />
            </div>

            {/* Infinite Moving 3D Grid Floor (TRON style) */}
            <div
                className="absolute inset-x-0 bottom-0 h-[65vh] origin-bottom pointer-events-none opacity-[0.25] z-[1]"
                style={{
                    perspective: '1000px',
                }}
            >
                <motion.div
                    animate={{
                        backgroundPosition: ['0px 0px', '0px 80px'] // 80px is the backgroundSize
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                    }}
                    className="w-full h-[200%] origin-top"
                    style={{
                        transform: 'rotateX(75deg) translateY(0)',
                        backgroundImage: `
                            linear-gradient(to right, ${theme.accent} 1.5px, transparent 1.5px),
                            linear-gradient(to bottom, ${theme.accent} 1.5px, transparent 1.5px)
                        `,
                        backgroundSize: '80px 80px',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%, black 100%)'
                    }}
                />
            </div>

            {/* Corners HUD Elements */}
            <div className="absolute top-8 left-8 w-12 h-12 opacity-30 z-[2]" style={{ borderTop: `2px solid ${theme.accent}`, borderLeft: `2px solid ${theme.accent}` }} />
            <div className="absolute top-8 right-8 w-12 h-12 opacity-30 z-[2]" style={{ borderTop: `2px solid ${theme.accent}`, borderRight: `2px solid ${theme.accent}` }} />
            <div className="absolute bottom-8 left-8 w-12 h-12 opacity-30 z-[2]" style={{ borderBottom: `2px solid ${theme.accent}`, borderLeft: `2px solid ${theme.accent}` }} />
            <div className="absolute bottom-8 right-8 w-12 h-12 opacity-30 z-[2]" style={{ borderBottom: `2px solid ${theme.accent}`, borderRight: `2px solid ${theme.accent}` }} />

            {/* Random Blinking Hex Codes in Background */}
            {hexCodes.map((item, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute text-[9px] font-mono pointer-events-none z-[1]"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        color: theme.accent,
                        textShadow: `0 0 8px ${theme.accent}`
                    }}
                >
                    {item.code}
                </motion.div>
            ))}

            {/* Subtle Vertical Data Streams (Shooting Lasers) */}
            <div className="absolute inset-y-0 right-[15%] w-[1px] opacity-20 pointer-events-none z-[1]" style={{ background: theme.accent }}>
                <motion.div
                    animate={{ y: ['-100%', '1000%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-[15%] bg-white shadow-[0_0_12px_white]"
                />
            </div>
            <div className="absolute inset-y-0 left-[25%] w-[1px] opacity-15 pointer-events-none z-[1]" style={{ background: theme.accent }}>
                <motion.div
                    animate={{ y: ['-100%', '800%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    className="w-full h-[25%] bg-white shadow-[0_0_12px_white]"
                />
            </div>

            {/* Smart Technical Identity Block */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 pointer-events-none select-none flex flex-col items-end z-[5] max-w-full overflow-hidden">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] md:text-[10px] tracking-[4px] md:tracking-[6px] opacity-50 uppercase" style={{ color: theme.accent }}>
                            System_Core_v9.1
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0.85, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-sm md:text-base font-black tracking-[4px] md:tracking-[6px] uppercase mt-1 whitespace-nowrap"
                            style={{ color: '#ffffff', textShadow: `0 0 15px ${theme.accent}` }}
                        >
                            SIDDHARTH // OS
                        </motion.span>
                    </div>
                    <div className="w-[2px] h-10 md:h-12" style={{ backgroundColor: theme.accent, boxShadow: `0 0 12px ${theme.accent}` }} />
                </div>
                <div className="mt-3 flex gap-4 opacity-80 text-[8px] font-mono whitespace-nowrap uppercase tracking-widest text-[#e5e7eb]">
                    <span className="flex items-center gap-2">
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }}
                        />
                        SYS_OP: ONLINE
                    </span>
                    <span>NET://TRX_OK</span>
                </div>
            </div>

            {/* Ambient Deep Glow Orbs to give dimension to corners */}
            <motion.div
                animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.05] z-[0]"
                style={{ background: theme.accent }}
            />
            <motion.div
                animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.05] z-[0]"
                style={{ background: theme.accent }}
            />

            {/* Intense Vignette to keep focus center and hide rough edges */}
            <div
                className="absolute inset-0 pointer-events-none z-[4]"
                style={{
                    background: 'radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.98) 95%)',
                }}
            />

            {/* Noise Grain Texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen z-[5]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Extremely subtle global vertical scanning pulse */}
            <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.5 }}
                className="absolute left-0 right-0 h-[25vh] z-[3] pointer-events-none opacity-[0.03]"
                style={{ background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)` }}
            />
        </div>
    );
};

export default GridBackground;
