export const resume = {
    name: "Sanket Patel",
    title: "Full-Stack Developer",
    summary:
        "I build scalable web apps that solve real problems. My focus is on writing clean code, creating smooth user experiences, and turning complex ideas into working products.",
    highlights: [
        "Full-Stack Development",
        "AI/ML & NLP",
        "Real-Time Systems",
        "Cloud Computing",
        "Database Design",
        "API Development",
    ],
    career: [
        {
            company: "The Algorithm",
            role: "Software Developer",
            dates: "Sept 2025 - Present",
            location: "Remote",
            bullets: [
                "Built a full-stack AI interview platform using React, Node.js, Express, and FastAPI with WebSockets for real-time tracking, JWT-based authentication, role-based access control, and AWS SES email notifications.",
                "Developed an NLP-based automated interview scoring system using PyTorch and Sentence Transformers, applying semantic similarity, spaCy, and fuzzy matching techniques to evaluate candidate responses and reduce manual recruiter review time.",
            ],
        },
        {
            company: "Axis Bank",
            role: "Data Science Intern",
            dates: "May 2023 - July 2023",
            location: "Mumbai",
            bullets: [
                "Developed and deployed a customer churn prediction model for credit card services, achieving high predictive performance through effective data analysis and modeling.",
            ],
        },
    ],
    education: [
        {
            school: "Sharpner Tech",
            degree: "MERN Stack Web Development",
            dates: "Sept 2024 - Sept 2025",
            details: ["Full-Stack Web Development Certification"],
        },
        {
            school: "Birla Institute of Technology, Ranchi",
            degree: "Bachelor of Technology - Mechanical Engineering",
            dates: "2020 - 2024",
            details: ["Cumulative GPA: 8.2/10", "JEE Mains: 97.84 Percentile"],
        },
        {
            school: "Higher Secondary (12th)",
            degree: "Maharashtra State Board",
            dates: "2020",
            details: ["Percentage: 84.2%"],
        },
    ],
    skills: {
        categories: [
            {
                name: "Programming Languages",
                items: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
            },
            {
                name: "Frontend",
                items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Vite"],
            },
            {
                name: "Backend",
                items: ["Node.js", "Express.js", "FastAPI", "Socket.io"],
            },
            {
                name: "Databases",
                items: ["MongoDB", "SQL", "PostgreSQL"],
            },
            {
                name: "AI/ML & NLP",
                items: ["PyTorch", "Transformers", "Sentence Transformers", "spaCy", "NLTK"],
            },
            {
                name: "Cloud & DevOps",
                items: ["AWS", "Azure", "Git", "GitHub"],
            },
        ],
    },
    projects: [
        {
            name: "Salon Management Web App",
            description:
                "Full-stack salon appointment platform with secure JWT-based authentication, service and staff management, real-time booking, and payment integration (CashFree). Features automated email/SMS reminders, rescheduling, customer reviews, and admin dashboard.",
            tech: ["Node.js", "Express.js", "SQL", "React.js", "Socket.io", "Cron"],
            links: {
                github: "https://github.com/sanketpatel32/fresha-salon-app",
            },
        },
        {
            name: "Group Chat Web App",
            description:
                "Real-time web-based chat application with secure user authentication, scalable one-to-one and group messaging, SQL-based relational data modeling, and cron jobs for automated message cleanup to optimize database performance.",
            tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Socket.io", "SQL"],
            links: {
                github: "https://github.com/sanketpatel32/Group-Chat-App",
            },
        },
        {
            name: "Boring App",
            description:
                "A general-purpose productivity app designed to streamline daily tasks and save time. Features a clean interface for managing everyday activities efficiently.",
            tech: ["React", "Next.js", "Algo"],
            links: {
                live: "https://boring-app-theta.vercel.app/",
            },
        },
    ],
    contact: {
        email: "sanpatel323@gmail.com",
        phone: "+91 9503125836",
        location: "Jamnagar, Gujarat, India",
        linkedin: "",
        github: "https://github.com/sanketpatel32",
        instagram: "https://www.instagram.com/sanket_patel32/",
        website: "",
        otherLinks: [],
    },
};

export type Resume = typeof resume;
