import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const GridBackground = () => {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* 3D Perspective Grid */}
            <div 
                className="absolute inset-0 w-full h-[200%] origin-center" 
                style={{ 
                    perspective: '1000px',
                    transform: 'rotateX(60deg) translateY(-25%)',
                }}
            >
                <div 
                    className="w-full h-full opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${theme.accent} 1px, transparent 1px),
                            linear-gradient(to bottom, ${theme.accent} 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                    }}
                />
            </div>

            {/* Ambient Glowing Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
                style={{ background: theme.accent }}
            />

            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.05]"
                style={{ background: theme.accent }}
            />

            {/* Large Subtle Vertical Name Watermark */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none select-none origin-left -rotate-90">
                <span 
                    className="text-[120px] font-black tracking-[0.3em] uppercase opacity-[0.03] whitespace-nowrap"
                    style={{ color: theme.accent }}
                >
                    Siddharth
                </span>
            </div>

            {/* Smart Technical Identity Block */}
            <div className="absolute top-10 right-10 pointer-events-none select-none flex flex-col items-end">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] tracking-[3px] opacity-20 uppercase">Core Identity</span>
                        <span className="text-xs font-bold tracking-[5px] uppercase" style={{ color: theme.accent }}>
                            SIDDHARTH // OS
                        </span>
                    </div>
                    <div className="w-[2px] h-8" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />
                </div>
                <div className="mt-2 flex gap-4 opacity-10 text-[7px] font-mono whitespace-nowrap uppercase tracking-widest">
                    <span>USR: ADMIN_SID</span>
                    <span>SRV: PROD_TOSS</span>
                </div>
            </div>

            {/* Moving Tracking Lines */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.05]">
                <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white flex flex-col justify-around py-20 text-[6px]">
                    {[...Array(10)].map((_, i) => <span key={i}>{Math.random().toString(16).slice(2, 6)}</span>)}
                </div>
                <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-white flex flex-col justify-around py-20 text-[6px] text-right">
                    {[...Array(10)].map((_, i) => <span key={i}>{Math.random().toString(16).slice(2, 6)}</span>)}
                </div>
            </div>

            {/* Vignette Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(13,13,15,0.8) 100%)'
                }}
            />

            {/* Noise grain effect */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Scanning Beam pulse */}
            <motion.div
                animate={{
                    top: ['-10%', '110%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
                className="absolute left-0 right-0 h-[2px] z-[1] pointer-events-none opacity-[0.15]"
                style={{
                    background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)`,
                    boxShadow: `0 0 20px ${theme.accent}`
                }}
            />
        </div>
    );
};

export default GridBackground;
