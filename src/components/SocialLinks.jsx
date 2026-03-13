import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram, Globe, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SOCIALS = [
    {
        name: 'GitHub',
        url: 'https://github.com/sidhu212',
        icon: Github,
        color: '#e5e7eb',
        handle: '@siddharth-singh'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/siddharth-singh-4b8416262/',
        icon: Linkedin,
        color: '#0077b5',
        handle: 'Siddharth Singh'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/_sid.21?igsh=eTZqc3oyeHA0YnJ0',
        icon: Instagram,
        color: '#e4405f',
        handle: '@siddharth.singh'
    },
    
    // {
    //     name: 'Instagram',
    //     url: 'https://instagram.com/siddharth.singh',
    //     icon: Instagram,
    //     color: '#e4405f',
    //     handle: '@siddharth.singh'
    // },
    // {
    //     name: 'Twitter/X',
    //     url: 'https://twitter.com/siddharth_singh',
    //     icon: Twitter,
    //     color: '#1da1f2',
    //     handle: '@siddharth_singh'
    // },
    {
        name: 'Portfolio',
        url: 'https://siddharth.dev',
        icon: Globe,
        color: '#89b4fa',
        handle: 'siddharth.dev'
    },
    {
        name: 'WhatsApp',
        url: 'https://wa.me/917898140799?text=hello%2C%20came%20from%20your%20portfolio.',
        icon: MessageCircle,
        color: '#25D366',
        handle: '+91 78981 40799'
    },
    {
        name: 'Email',
        url: 'mailto:siddharthsingh0259@gmail.com',
        icon: Mail,
        color: '#f27b7d',
        handle: 'siddharthsingh0259@gmail.com'
    }
    
];

const SocialLinks = () => {
    const { theme } = useTheme();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-1 py-4 font-mono">
            {SOCIALS.map((social, i) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                    style={{ borderColor: `${theme.accent}22` }}
                >
                    <div
                        className="p-2 rounded-md bg-[#0d0d0f] border group-hover:scale-110 transition-transform"
                        style={{
                            borderColor: `${theme.accent}44`,
                            color: theme.accent
                        }}
                    >
                        <social.icon size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider opacity-40">{social.name}</span>
                        <span className="text-sm font-bold group-hover:underline" style={{ color: '#e5e7eb' }}>
                            {social.handle}
                        </span>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <span style={{ color: theme.accent }}>→</span>
                    </div>
                </motion.a>
            ))}
        </div>
    );
};

export default SocialLinks;
