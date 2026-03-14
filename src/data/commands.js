export const COMMANDS = {
   help: {
      description: "list all commands",
      content: `Available commands:

📁 Navigation:
  about         - Show about section
  education     - Show education
  experience    - Show work experience
  projects      - List key projects
  skills        - Animated skill bars
  achievements  - View achievements
  certifications- Professional certs
  contact       - Contact information

🔗 Links:
  social        - Social media profiles (Interactive)
  resume        - View curriculum vitae (Interactive)
  download      - Download resume PDF

🛠️ System:
  neofetch      - System info (pretty)
  theme         - Change terminal color
  clear         - Clear terminal
  whoami        - Session information
  date          - Show current date
  time          - Show current time
  ls            - List available sections
  echo [text]   - Print text to terminal`,
   },
   date: {
      description: "show current date",
      content: null,
   },
   time: {
      description: "show current time",
      content: null,
   },
   ls: {
      description: "list sections",
      content: null,
   },
   echo: {
      description: "print text",
      content: null,
   },
   theme: {
      description: "change terminal color",
      content: `Available Themes:
- coral (default)
- matrix
- cyber
- purple
- amber

Usage: theme [theme_name]
Example: theme matrix`,
   },
   about: {
      description: "about Siddharth",
      content: `Name: Siddharth Singh
Role: Software Developer
Bio: Software developer with experience in developing web and mobile solutions using modern frameworks and clean coding practices.
Passionate about problem-solving and exploring new technologies. Comfortable working with APIs, databases, and system workflows.
Seeking opportunities to apply and grow these skills in real-world projects.`,
   },
   skills: {
      description: "technical skills",
      content: null,
      visualType: 'skills',
   },
   projects: {
      description: "portfolio projects",
      content: `1. AI Powered Chronic Disease Management System
   Tech: PHP, MySQL, Gemini API
   Telehealth system for health tracking and AI-generated insights.
   Presented at Yukti Innovation Challenge 2025.

2. Vocational Education Integration Platform (VEIP)
   Tech: HTML, CSS, JavaScript, WordPress
   LMS platform for remote skill development and mentorship.
   Smart India Hackathon 2024 Finalist.

3. JARVIS Voice Assistant
   Tech: HTML, CSS, JavaScript, Gemini API
   Browser-based voice assistant with speech recognition and NLP processing.

4. E-Commerce Website
   Tech: React, Firebase, Stripe
   Responsive site with authentication, shopping cart, and payments.`,
      links: [
         { label: "1. AI Disease Management (Demo) →", url: "https://chronicpulse.wuaze.com/public/" },
         { label: "2. VEIP Platform (Demo) →", url: "https://vission-landing-page.vercel.app/" },
         { label: "3. JARVIS Voice Assistant (Demo) →", url: "https://sidhu212.github.io/virtual-assistant/" },
         { label: "4. E-Commerce Site (GitHub) →", url: "https://github.com/sidhu212/e-commerce-website" },
      ],
   },
   experience: {
      description: "work experience",
      content: `🏢 TOSS Consultancy Services
   Role: Software Developer Intern (2025)
   - Built real-time emergency ambulance response platform with GPS tracking.
   - Used PHP (CodeIgniter) for dispatch automation and case management.

🌐 Google Developer Student Clubs (GDSC)
   Role: Operational Head @ GGCT
   - Spearheaded technical workshops and community engagement initiatives.`,

   },
   education: {
      description: "educational background",
      content: `🎓 B.Tech in CSE — Gyan Ganga College of Technology
   CGPA: 7.36 | Expected June 2026
   Location: Jabalpur, Madhya Pradesh

🏫 Little Kingdom Sr. Sec. School
   Class XII (PCM) | 2022 | Percentage: 62.8%

🏫 Little Kingdom Sr. Sec. School
   Class X | 2020 | Percentage: 61%`,
   },
   achievements: {
      description: "awards & competitions",
      content: `🏆 SMART INDIA HACKATHON (SIH) 2024 - Finalist
   Project: Chronic Disease AI Management

🎖️ YUKTI: National Innovation Repository
   Ranked under top 100 students nationally.

💎 GDSC Gyan Ganga
   Contributor & Core Team Member`,
   },
   certifications: {
      description: "professional certs",
      content: `🏆 CCNA: Enterprise Networking, Security, and Automation
   Cisco Networking Academy | May 31, 2025

🏆 CCNA: Switching, Routing, and Wireless Essentials
   Cisco Networking Academy | May 31, 2025

🏆 CCNA: Introduction to Networks
   Cisco Networking Academy | May 31, 2025

🏆 Introduction to Cybersecurity
   Gyan Ganga College of Technology / Cisco | May 31, 2025

🏆 Python Essentials 2
   Cisco Networking Academy | May 30, 2025

🏆 Python Essentials 1
   Cisco Networking Academy | March 24, 2025

🏆 AI for Beginners
   HP LIFE - HP Foundation | February 21, 2025

🏆 Software Engineering Job Simulation
   Accenture | February 15, 2025

🏆 AI-ML Virtual Internship
   AWS Academy | April 2025

🏆 Cybersecurity Essentials
   Cisco Networking Academy | August 2024

🏆 Introduction to Packet Tracer
   Cisco Networking Academy | August 2024

🏆 AI/ML Specialization
   Google For Developers | September 2024

🏆 C++ Programming Essentials
   Cisco Networking Academy | January 2024

🏆 C Programming Essentials
   Cisco Networking Academy | April 2023

🏆 Salesforce AI Agent Developer
   SmartBridge | October 18, 2025`,
   },
   contact: {
      description: "contact details",
      content: `📞 Phone: +91 7898140799
📧 Email: siddharthsingh0259@gmail.com
📍 Location: Jabalpur, MP

To send a direct message:
Type 'cd message' to start the interactive message wizard.`,
   },
   social: {
      description: "social media profiles",
      content: null,
      visualType: 'social',
   },
   resume: {
      description: "view curriculum vitae",
      content: null,
      visualType: 'resume',
   },
   download: {
      description: "download resume PDF",
      content: "Initiating resume download sequence...",
   },
   neofetch: {
      description: "system info (neofetch style)",
      content: null,
      visualType: 'neofetch',
   },
   whoami: {
      description: "session status",
      content: `User: visitor@siddharth
Status: ACTIVE
Role: PORTFOLIO_GUEST
Uptime: ${Math.floor(Math.random() * 500) + 10}m`,
   },
   matrix: {
      description: "hidden: enter the matrix",
      content: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit.
Knock, knock, Neo.`,
   },
   hack: {
      description: "hidden: system override",
      content: `[SYSTEM OVERRIDE INITIATED]
Accessing kernel memory... OK
Bypassing firewall... OK
Decrypting files... OK
Gaining root access... [ACCESS GRANTED]
Welcome, Admin.`,
   },
   'hire-me': {
      description: "hidden command",
      content: `🎉 Thank you for considering me!
I am ready to bring my energy and skills to your team.
Let's build something amazing together.
Email: siddharthsingh0259@gmail.com`,
   }
};
