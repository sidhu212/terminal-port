import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SKILL_DATA = (theme) => [
    {
        category: 'Languages',
        color: theme.accent,
        skills: [
            { name: 'JavaScript', level: 88 },
            { name: 'C++', level: 72 },
            { name: 'PHP', level: 68 },
            { name: 'Python', level: 65 },
        ],
    },
    {
        category: 'Web & Frameworks',
        color: theme.path,
        skills: [
            { name: 'React.js', level: 90 },
            { name: 'Tailwind', level: 85 },
            { name: 'Node.js', level: 74 },
            { name: 'Bootstrap', level: 78 },
            { name: 'CodeIgniter', level: 69 },
            { name: 'WordPress', level: 65 },
        ],
    },
    {
        category: 'Tools & Concepts',
        color: '#a6e3a1',
        skills: [
            { name: 'Git/GitHub', level: 85 },
            { name: 'MySQL/Mongo', level: 78 },
            { name: 'SDLC/Agile', level: 82 },
            { name: 'DSA & OOP', level: 76 },
            { name: 'Figma', level: 60 },
        ],
    },
];




const AnimatedBar = ({ level, color, delay = 0, total = 22 }) => {
    const [filled, setFilled] = useState(0);
    const target = Math.round((level / 100) * total);

    useEffect(() => {
        let count = 0;
        const timeout = setTimeout(() => {
            const id = setInterval(() => {
                count++;
                setFilled(count);
                if (count >= target) clearInterval(id);
            }, 18);
            return () => clearInterval(id);
        }, delay);
        return () => clearTimeout(timeout);
    }, [target, delay]);

    return (
        <span style={{ color }} className="font-mono">
            {'█'.repeat(filled)}
            <span className="opacity-20">{'░'.repeat(total - filled)}</span>
        </span>
    );
};

const SkillBars = () => {
    const { theme } = useTheme();
    const data = SKILL_DATA(theme);

    return (
        <div className="flex flex-col gap-4 md:gap-5 pl-1 py-1 font-mono text-[12px] md:text-sm">
            {data.map(({ category, color, skills }, ci) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ci * 0.15 }}
                >
                    <div className="flex items-center gap-2 mb-2" style={{ color }}>
                        <span>┌─</span>
                        <span className="font-bold">{category}</span>
                    </div>

                    <div className="flex flex-col gap-1.5 pl-4">
                        {skills.map((skill, si) => (
                            <motion.div
                                key={skill.name}
                                className="flex items-center gap-2 md:gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: ci * 0.15 + si * 0.07 }}
                            >
                                <span className="text-[#e5e7eb]/80 w-[8ch] md:w-[9ch] text-right flex-shrink-0 truncate">
                                    {skill.name}
                                </span>
                                <span className="text-white/30">[</span>
                                <div className="hidden xs:block">
                                    <AnimatedBar
                                        level={skill.level}
                                        color={color}
                                        delay={(ci * 5 + si) * 60}
                                        total={20}
                                    />
                                </div>
                                <div className="xs:hidden">
                                    <AnimatedBar
                                        level={skill.level}
                                        color={color}
                                        delay={(ci * 5 + si) * 60}
                                        total={10}
                                    />
                                </div>
                                <span className="text-white/30">]</span>
                                <span className="text-white/50 w-7 md:w-8 text-right flex-shrink-0">
                                    {skill.level}%
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SkillBars;
