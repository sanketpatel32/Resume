"use client";

import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { WorkFocus } from "@/features/resume/model/work";
import { resumeContent } from "@/features/resume/content";
import { ExperienceProvider, useExperienceState } from "@/features/resume/experience/context";
import { startSignals } from "@/features/resume/experience/signals";
import Footer from "@/features/resume/ui/Footer";
import Navbar from "@/features/resume/ui/Navbar";
import SmoothScroll from "@/features/resume/ui/SmoothScroll";
import Cursor from "@/features/resume/ui/descent/Cursor";
import DepthGauge from "@/features/resume/ui/descent/DepthGauge";
import Intro from "@/features/resume/ui/descent/Intro";
import AboutSection from "@/features/resume/ui/sections/AboutSection";
import CareerSection from "@/features/resume/ui/sections/CareerSection";
import CertificationsSection from "@/features/resume/ui/sections/CertificationsSection";
import ContactSection from "@/features/resume/ui/sections/ContactSection";
import ManifestoSection from "@/features/resume/ui/sections/ManifestoSection";
import ProjectsSection from "@/features/resume/ui/sections/ProjectsSection";
import SkillsSection from "@/features/resume/ui/sections/SkillsSection";
import { LazyGLStage as GLStage } from "@/features/resume/gl/lazy";

export default function ResumePage() {
  const [focus, setFocus] = useState<WorkFocus>("all");
  const experience = useExperienceState();

  useEffect(() => startSignals(), []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ExperienceProvider value={experience}>
          <Intro />
          {experience.gl && <GLStage />}
          {experience.motion && <SmoothScroll />}
          {experience.finePointer && <Cursor />}
          <Navbar />
          {experience.motion && <DepthGauge />}

          <main id="main-content" className="descent">
            <AboutSection
              profile={resumeContent.profile}
              contact={resumeContent.contact}
              focus={focus}
              onFocusChange={setFocus}
            />
            <ManifestoSection />
            <ProjectsSection projects={resumeContent.projects} focus={focus} onFocusChange={setFocus} />
            <CareerSection career={resumeContent.career} education={resumeContent.education} />
            <SkillsSection skills={resumeContent.skills} />
            <CertificationsSection certifications={resumeContent.certifications} />
            <ContactSection contact={resumeContent.contact} />
          </main>

          <Footer profile={resumeContent.profile} />
        </ExperienceProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
