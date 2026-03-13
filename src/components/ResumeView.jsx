import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import resumeFile from '../assests/docs/siddharth_cv.pdf';

const ResumeView = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-6 pl-1 py-4 font-mono">
            {/* Visual Header */}
            <motion.div
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 p-4 md:p-6 rounded-xl border-dashed border-2 bg-white/[0.02]"
                style={{ borderColor: `${theme.accent}33` }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div
                    className="w-14 h-16 md:w-16 md:h-20 rounded-lg flex items-center justify-center border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0"
                    style={{ borderColor: theme.accent, color: theme.accent }}
                >
                    <FileText className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="flex flex-col gap-1 items-center sm:items-start">
                    <span className="text-base md:text-xl font-bold tracking-tight uppercase break-all sm:break-normal" style={{ color: '#e5e7eb' }}>
                        Siddharth_Singh_CV.pdf
                    </span>
                    <span className="text-[10px] md:text-xs opacity-50 tracking-widest mb-3">VERSION 2.4 | LAST UPDATED JAN 2025</span>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href={resumeFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 text-[12px] md:text-sm font-bold rounded-lg transition-all border outline-none cursor-pointer"
                            style={{
                                backgroundColor: `${theme.accent}11`,
                                borderColor: theme.accent,
                                color: theme.accent
                            }}
                        >
                            <ExternalLink size={14} /> VIEW PDF
                        </a>
                        <a
                            href={resumeFile}
                            download="Siddharth_Singh_CV.pdf"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 text-[12px] md:text-sm font-bold rounded-lg transition-all border outline-none cursor-pointer"
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: '#e5e7eb33',
                                color: '#e5e7eb'
                            }}
                        >
                            <Download size={14} /> DOWNLOAD
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Resume Synopsis */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2" style={{ color: theme.accent }}>
                    <span className="hidden xs:inline">┌──</span>
                    <span className="font-bold text-base md:text-lg uppercase tracking-widest">RESUME SYNOPSIS</span>
                    <span className="hidden sm:inline">────────</span>
                </div>

                <div className="flex flex-col gap-6 pl-4 border-l-2 ml-1" style={{ borderColor: `${theme.accent}33` }}>
                    <div>
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-wider opacity-60">Objective</h3>
                        <p className="text-sm leading-relaxed opacity-90 max-w-2xl">
                            Software developer with experience in developing web and mobile solutions using modern frameworks and clean coding practices. Seeking opportunities to apply and grow these skills in real-world projects.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-wider opacity-60">Experience</h3>
                        <ul className="text-sm flex flex-col gap-1.5 opacity-90">
                            <li>• Software Developer Intern @ TOSS Consultancy Services</li>
                            <li>• Operational Head @ GDSC GGCT</li>
                            <li>• AWS AI-ML Virtual Intern @ SmartBridge</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-wider opacity-60">Key Projects</h3>
                        <ul className="text-sm flex flex-col gap-1.5 opacity-90">
                            <li>• AI Powered Chronic Disease Management System</li>
                            <li>• Vocational Education Integration Platform (VEIP)</li>
                            <li>• JARVIS Voice Assistant (Gemini API Integrated)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-wider opacity-60">Education</h3>
                        <p className="text-sm opacity-90">
                            B.Tech in CSE — GGCT (7.36 CGPA) | Class XII (62.8%) | Class X (61%)
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-[10px] opacity-20 uppercase tracking-[0.3em] mt-4">
                [ COMMAND 'DOWNLOAD' TO TRIGGER SYSTEM DOWNLOAD ]
            </p>
        </div>
    );
};

export default ResumeView;
