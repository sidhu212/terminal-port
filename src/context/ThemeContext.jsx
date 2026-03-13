import React, { createContext, useContext, useState } from 'react';

export const THEMES = {
    coral: {
        key: 'coral',
        name: 'Coral',
        label: 'Coral — default warm pink',
        accent: '#f27b7d',
        path: '#89b4fa',
        matrixColor: 'rgba(242, 123, 125, 0.55)',
        border: 'rgba(242, 123, 125, 0.20)',
        glow1: 'rgba(242, 123, 125, 0.15)',
        glow2: 'rgba(242, 123, 125, 0.40)',
    },
    matrix: {
        key: 'matrix',
        name: 'Matrix',
        label: 'Matrix — classic hacker green',
        accent: '#00ff41',
        path: '#00cc33',
        matrixColor: 'rgba(0, 255, 65, 0.55)',
        border: 'rgba(0, 255, 65, 0.20)',
        glow1: 'rgba(0, 255, 65, 0.10)',
        glow2: 'rgba(0, 255, 65, 0.35)',
    },
    cyber: {
        key: 'cyber',
        name: 'Cyber',
        label: 'Cyber — neon cyan blue',
        accent: '#00d9ff',
        path: '#89dceb',
        matrixColor: 'rgba(0, 217, 255, 0.55)',
        border: 'rgba(0, 217, 255, 0.20)',
        glow1: 'rgba(0, 217, 255, 0.10)',
        glow2: 'rgba(0, 217, 255, 0.35)',
    },
    purple: {
        key: 'purple',
        name: 'Synthwave',
        label: 'Synthwave — retro purple',
        accent: '#cba6f7',
        path: '#f5c2e7',
        matrixColor: 'rgba(203, 166, 247, 0.55)',
        border: 'rgba(203, 166, 247, 0.20)',
        glow1: 'rgba(203, 166, 247, 0.10)',
        glow2: 'rgba(203, 166, 247, 0.35)',
    },
    amber: {
        key: 'amber',
        name: 'Amber',
        label: 'Amber — warm golden',
        accent: '#f9c74f',
        path: '#fab387',
        matrixColor: 'rgba(249, 199, 79, 0.55)',
        border: 'rgba(249, 199, 79, 0.20)',
        glow1: 'rgba(249, 199, 79, 0.10)',
        glow2: 'rgba(249, 199, 79, 0.35)',
    },
};

const ThemeContext = createContext({ theme: THEMES.coral, switchTheme: () => { } });

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('terminal-theme');
        return THEMES[saved] || THEMES.coral;
    });

    const switchTheme = (name) => {
        const t = THEMES[name.toLowerCase()];
        if (t) {
            setTheme(t);
            localStorage.setItem('terminal-theme', t.key);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, switchTheme, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
