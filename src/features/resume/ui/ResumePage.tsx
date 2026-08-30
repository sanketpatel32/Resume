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

        <main id="main-content" className="hallmark-shell">
          <AboutSection profile={resumeContent.profile} contact={resumeContent.contact} />
          <ProjectsSection projects={resumeContent.projects} />
          <CareerSection career={resumeContent.career} />
          <SkillsSection skills={resumeContent.skills} />
          <CertificationsSection certifications={resumeContent.certifications} />
          <EducationSection education={resumeContent.education} />
          <ContactSection contact={resumeContent.contact} />
        </main>

        <Footer profile={resumeContent.profile} />
      </MotionConfig>
    </LazyMotion>
  );
}
