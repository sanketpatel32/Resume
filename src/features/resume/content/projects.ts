import type { ProjectItem } from "@/features/resume/model/types";

export const projects: ProjectItem[] = [
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
];
