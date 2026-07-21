import type { CareerItem } from "@/features/resume/model/types";

export const career: CareerItem[] = [
  {
    company: "The Algorithm",
    role: "Software Developer",
    dates: "Sept 2025 - Present",
    location: "Remote",
    bullets: [
      "Designed and developed RESTful APIs using Node.js and Express.js for an AI interview platform, implementing JWT-based authentication, role-based access control, and modular middleware architecture.",
      "Built real-time communication features using Socket.io for live interview tracking and instant notifications, handling concurrent user sessions efficiently.",
      "Integrated AWS services (SES, S3) for email notifications and file storage, implementing secure API endpoints with proper error handling and validation.",
      "Optimized MongoDB queries and designed efficient database schemas, improving API response times and ensuring data integrity across the platform.",
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
];
