import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
// Using the image path provided by the user
import profilePic from '../assests/images/profile picturee.jpg';

const INFO_ROWS = (theme) => [
    { label: 'user', value: 'siddharth@portfolio', color: theme.accent },
    { label: null, value: '──────────────────────────────────', color: theme.accent },
    { label: 'OS', value: 'SiddharthOS v1.0', color: '#e5e7eb' },
    { label: 'Host', value: 'Gyan Ganga College of Technology', color: '#e5e7eb' },
    { label: 'Kernel', value: 'React 19 + Node.js', color: '#e5e7eb' },
    { label: 'Role', value: 'Software Developer', color: '#a6e3a1' },
    { label: 'Location', value: 'Jabalpur, Madhya Pradesh', color: '#e5e7eb' },
    { label: 'Languages', value: 'C++, JavaScript, PHP, Python', color: '#89b4fa' },
    { label: 'Stack', value: 'React, Node, PHP, MySQL, MongoDB, WordPress', color: '#89b4fa' },
    { label: 'CGPA', value: '7.36  (B.Tech CSE)', color: '#e5e7eb' },
    { label: 'Email', value: 'siddharthsingh0259@gmail.com', color: '#e5e7eb' },
    { label: 'Status', value: '✅ OPEN TO OPPORTUNITIES', color: '#a6e3a1' },
    { label: null, value: '', color: null },
    { label: null, value: '████████  Color Palette', color: null, palette: true },
];


const Neofetch = () => {
    const { theme, switchTheme, THEMES } = useTheme();

    return (
        <motion.div
            className="flex flex-col md:flex-row gap-6 md:gap-10 pl-1 py-4 md:py-6 font-mono text-[12.5px] md:text-[13.5px] leading-6 md:leading-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Profile Image with Terminal Styling */}
            <div className="flex flex-col flex-shrink-0 items-center justify-start pt-2">
                <div className="relative group">
                    {/* Background Glow */}
                    <motion.div
                        className="absolute inset-0 blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
                        style={{ backgroundColor: theme.accent }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div
                        className="relative w-36 h-36 md:w-44 md:h-44 border overflow-hidden rounded-sm"
                        style={{ borderColor: `${theme.accent}77`, boxShadow: `0 0 20px ${theme.accent}22` }}
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 z-30" style={{ borderColor: theme.accent }} />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 z-30" style={{ borderColor: theme.accent }} />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 z-30" style={{ borderColor: theme.accent }} />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 z-30" style={{ borderColor: theme.accent }} />

                        {/* Tint Filter */}
                        <div
                            className="absolute inset-0 z-10 opacity-20 pointer-events-none"
                            style={{ backgroundColor: theme.accent, mixBlendMode: 'color' }}
                        />

                        <motion.img
                            src={profilePic}
                            alt="Siddharth Singh"
                            className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Animated Scanlines */}
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-40 overflow-hidden">
                            <motion.div
                                className="w-full h-[200%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%]"
                                animate={{ y: ["-50%", "0%"] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Screen Flicker Effect */}
                        <motion.div
                            className="absolute inset-0 z-25 bg-white opacity-0"
                            animate={{ opacity: [0, 0.03, 0, 0.05, 0] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                        />
                    </div>
                </div>

                <motion.div
                    className="mt-4 text-[9px] font-bold tracking-[0.35em] uppercase px-3 py-1 border rounded-full backdrop-blur-sm"
                    style={{ color: theme.accent, borderColor: `${theme.accent}33`, backgroundColor: `${theme.accent}0a` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    AUTHORIZED PERSONNEL
                </motion.div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col flex-grow w-full overflow-hidden">
                {INFO_ROWS(theme).map((row, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                        className="flex items-start gap-0 hover:bg-white/[0.02] transition-colors rounded-sm group/row w-full"
                    >
                        {row.palette ? (
                            <div className="flex items-center gap-1.5 mt-2 py-1 flex-wrap">
                                {Object.values(THEMES).map((t, ci) => (
                                    <motion.span
                                        key={t.key}
                                        whileHover={{ scale: 1.3, zIndex: 10, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => switchTheme(t.key)}
                                        className={`inline-block w-4 h-3 md:w-5 md:h-4 rounded-sm cursor-pointer shadow-sm border transition-all ${theme.key === t.key ? 'border-white scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: t.accent }}
                                        title={t.name}
                                    />
                                ))}
                                <span className="ml-2 text-[10px] md:text-[11px] opacity-40 italic">Interactive Palette</span>
                            </div>
                        ) : row.label ? (
                            <div className="flex flex-wrap sm:flex-nowrap w-full py-[1px]">
                                <span style={{ color: theme.accent }} className="font-bold min-w-[80px] md:min-w-[90px] group-hover/row:translate-x-1 transition-transform">{row.label}</span>
                                <span className="text-white/30 mr-2 hidden xs:inline">➜</span>
                                <span style={{ color: row.color }} className="flex-1 opacity-90 group-hover/row:opacity-100 transition-opacity break-all sm:break-normal">{row.value}</span>
                            </div>
                        ) : (
                            <div className="w-full h-[1px] my-2 md:my-3 overflow-hidden">
                                <motion.div
                                    className="h-full w-full"
                                    style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}33, transparent)` }}
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Neofetch;
