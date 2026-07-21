"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { resumeContent } from "@/features/resume/content";
import Footer from "@/features/resume/ui/Footer";
import Navbar from "@/features/resume/ui/Navbar";
import AboutSection from "@/features/resume/ui/sections/AboutSection";
import CareerSection from "@/features/resume/ui/sections/CareerSection";
import CertificationsSection from "@/features/resume/ui/sections/CertificationsSection";
import ContactSection from "@/features/resume/ui/sections/ContactSection";
import EducationSection from "@/features/resume/ui/sections/EducationSection";
import ProjectsSection from "@/features/resume/ui/sections/ProjectsSection";
import SkillsSection from "@/features/resume/ui/sections/SkillsSection";

export default function ResumePage() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Navbar />

        <main className="bg-black">
          <AboutSection profile={resumeContent.profile} contact={resumeContent.contact} />
          <CareerSection career={resumeContent.career} />
          <EducationSection education={resumeContent.education} />
          <CertificationsSection certifications={resumeContent.certifications} />
          <SkillsSection skills={resumeContent.skills} />
          <ProjectsSection projects={resumeContent.projects} />
          <ContactSection contact={resumeContent.contact} />
        </main>

        <Footer profile={resumeContent.profile} />
      </MotionConfig>
    </LazyMotion>
  );
}
