import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Cursor = () => {
    const { theme } = useTheme();
    const [isPointer, setIsPointer] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState(0);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configurations for different parts to create a layered lag effect
    const fastSpring = { damping: 25, stiffness: 250, mass: 0.5 };
    const mediumSpring = { damping: 20, stiffness: 150, mass: 0.8 };
    const slowSpring = { damping: 15, stiffness: 80, mass: 1.2 };

    const smoothX = useSpring(mouseX, fastSpring);
    const smoothY = useSpring(mouseY, fastSpring);

    const outerX = useSpring(mouseX, mediumSpring);
    const outerY = useSpring(mouseY, mediumSpring);

    const glowX = useSpring(mouseX, slowSpring);
    const glowY = useSpring(mouseY, slowSpring);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let lastTime = Date.now();

        const handleMouseMove = (e) => {
            const currentTime = Date.now();
            const dt = currentTime - lastTime;
            if (dt > 0) {
                const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
                setVelocity(Math.min(distance / dt, 5)); // Cap velocity
            }

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setCoords({ x: e.clientX, y: e.clientY });

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = currentTime;

            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden lg:block">
            {/* 1. Ambient Background Glow - Follows with lag */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0 opacity-10"
                style={{
                    x: glowX,
                    y: glowY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: `radial-gradient(circle, ${theme.accent}33 0%, ${theme.accent}00 70%)`
                }}
            />

            {/* 2. Outer Orbital Ring - Complex HUD element */}
            <motion.div
                className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[10002] flex items-center justify-center"
                style={{ x: outerX, y: outerY, translateX: '-50%', translateY: '-50%' }}
            >
                {/* Main Dashed Ring */}
                <motion.div
                    className="absolute inset-0 border-2 border-dashed rounded-full opacity-20"
                    style={{ borderColor: theme.accent }}
                    animate={{
                        rotate: 360,
                        scale: isPointer ? 1.4 : 1,
                        borderStyle: isPointer ? 'solid' : 'dashed'
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.4, ease: "backOut" }
                    }}
                />

                {/* Geometric Brackets */}
                {[0, 90, 180, 270].map((rot) => (
                    <motion.div
                        key={`bracket-${rot}`}
                        className="absolute w-4 h-4"
                        style={{
                            rotate: rot,
                            top: '-10%',
                            left: '-10%',
                        }}
                        animate={{
                            scale: isPointer ? 1.2 : 0.8,
                            opacity: isPointer ? 0.8 : 0.3,
                            x: isPointer ? -10 : 0,
                            y: isPointer ? -10 : 0,
                        }}
                    >
                        <div className="w-full h-[1px]" style={{ backgroundColor: theme.accent }} />
                        <div className="w-[1px] h-full" style={{ backgroundColor: theme.accent }} />
                    </motion.div>
                ))}
            </motion.div>

            {/* 3. Inner Rotating Segments */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10003] flex items-center justify-center"
                style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
            >
                {/* Fast inner spinner */}
                <motion.div
                    className="absolute inset-0 border-t-2 border-b-2 rounded-full opacity-40"
                    style={{ borderColor: theme.accent }}
                    animate={{
                        rotate: -360,
                        scale: isMouseDown ? 0.8 : 1
                    }}
                    transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.2 }
                    }}
                />

                {/* Vertical/Horizontal Crosshair */}
                <motion.div
                    className="absolute w-[200%] h-[1px] opacity-10"
                    style={{ backgroundColor: theme.accent }}
                    animate={{ scaleX: isPointer ? 1.5 : 1 }}
                />
                <motion.div
                    className="absolute h-[200%] w-[1px] opacity-10"
                    style={{ backgroundColor: theme.accent }}
                    animate={{ scaleY: isPointer ? 1.5 : 1 }}
                />
            </motion.div>

            {/* 4. Core Node & Data HUD */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10005]"
                style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            >
                {/* Central Diamond Node */}
                <motion.div
                    className="w-2.5 h-2.5 rotate-45"
                    style={{
                        backgroundColor: theme.accent,
                        boxShadow: `0 0 15px ${theme.accent}, 0 0 30px ${theme.accent}44`
                    }}
                    animate={{
                        scale: isMouseDown ? 0.5 : isPointer ? 1.2 : 1,
                        rotate: isPointer ? 225 : 45
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />

                {/* HUD Data Labels */}
                <div className="absolute top-6 left-6 flex flex-col gap-0.5">
                    <motion.div
                        className="flex items-center gap-2 overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: 'auto' }}
                    >
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: theme.accent }}>
                            POS
                        </span>
                        <span className="text-[9px] font-mono opacity-60" style={{ color: theme.accent }}>
                            [{Math.round(coords.x)}, {Math.round(coords.y)}]
                        </span>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-2"
                        animate={{ opacity: isPointer ? 1 : 0.4 }}
                    >
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: theme.accent }}>
                            SYS
                        </span>
                        <span className="text-[9px] font-mono" style={{ color: theme.accent }}>
                            {isPointer ? 'LINK_ACTIVE' : 'IDLE_SCAN'}
                        </span>
                    </motion.div>

                    {/* Velocity bar */}
                    <div className="w-16 h-[2px] bg-white/5 mt-1 overflow-hidden">
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: theme.accent }}
                            animate={{ width: `${velocity * 20}%` }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* 5. Click Ripple Effect */}
            <AnimatePresence>
                {isMouseDown && (
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[10001]"
                        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
                    >
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded-full border"
                                style={{ borderColor: theme.accent, width: 20, height: 20 }}
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 4 + i, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. Trailing Ghost Nodes (Speed dependent) */}
            {[0.1, 0.2, 0.3].map((delay, i) => (
                <TrailingNode
                    key={i}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    delay={delay}
                    color={theme.accent}
                    opacity={0.3 - i * 0.1}
                />
            ))}
        </div>
    );
};

const TrailingNode = ({ mouseX, mouseY, delay, color, opacity }) => {
    const x = useSpring(mouseX, { damping: 20 + delay * 100, stiffness: 200 - delay * 200, mass: 1 });
    const y = useSpring(mouseY, { damping: 20 + delay * 100, stiffness: 200 - delay * 200, mass: 1 });

    return (
        <motion.div
            className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[10000]"
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
                backgroundColor: color,
                opacity: opacity
            }}
        />
    );
};

export default Cursor;

