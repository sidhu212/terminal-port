import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const MatrixRain = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    // Use a ref for color so the draw loop always sees the latest value
    const colorRef = useRef(theme.matrixColor);
    useEffect(() => {
        colorRef.current = theme.matrixColor;
    }, [theme.matrixColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const FONT_SIZE = 14;
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let columns = Math.floor(width / FONT_SIZE);
        let drops = new Array(columns).fill(1);

        const draw = () => {
            // Darken background with trail effect
            ctx.fillStyle = 'rgba(13,13,15, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.font = `${FONT_SIZE}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                
                // Varied colors for depth
                const randomVal = Math.random();
                if (randomVal > 0.98) {
                    ctx.fillStyle = '#fff'; // Bright flashing lead
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = colorRef.current;
                } else {
                    ctx.fillStyle = colorRef.current;
                    ctx.shadowBlur = 0;
                    // Apply varied opacity for depth feel
                    const columnOpacity = (i % 3 === 0) ? '0.8' : (i % 2 === 0) ? '0.4' : '0.2';
                    ctx.globalAlpha = parseFloat(columnOpacity);
                }

                ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
                ctx.globalAlpha = 1.0;
                ctx.shadowBlur = 0;

                if (drops[i] * FONT_SIZE > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Vary speed for depth
                const speed = (i % 3 === 0) ? 1.5 : (i % 2 === 0) ? 1 : 0.7;
                drops[i] += speed;
            }
        };

        const interval = setInterval(draw, 40);

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / FONT_SIZE);
            drops = new Array(columns).fill(1);
        };

        window.addEventListener('resize', onResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', onResize);
        };
    }, []); // only mount once — color changes via ref

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: 0, opacity: 0.18, pointerEvents: 'none',
            }}
        />
    );
};

export default MatrixRain;
