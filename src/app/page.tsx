"use client";

import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import TimelineItem from "@/components/TimelineItem";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import SkillIcon, { CategoryIcon } from "@/components/SkillIcon";
import { resume } from "@/data/resume";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiInstagram, FiLinkedin, FiYoutube, FiGlobe, FiArrowUp, FiDownload } from "react-icons/fi";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <main className="bg-black">
        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center pt-20"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <motion.p
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[var(--accent)] font-medium mb-4"
              >
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
              >
                {resume.name}
              </motion.h1>

              <motion.h2
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-[var(--text-muted)] font-medium mb-8"
              >
                {resume.title}
              </motion.h2>

              <motion.p
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[var(--text-muted)] leading-relaxed mb-10 max-w-2xl"
              >
                {resume.summary}
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {resume.highlights.map((highlight, index) => (
                  <motion.span
                    key={highlight}
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(110,231,183,0.1)] transition-all duration-300 cursor-default"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-16 flex items-center gap-6"
              >
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                </button>
                <a
                  href="/resume.pdf"
                  download="Sanket_Patel_Resume.pdf"
                  className="px-6 py-3 border border-white/10 rounded-lg font-semibold text-white hover:bg-white/5 hover:border-[var(--accent)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <FiDownload className="group-hover:text-[var(--accent)] transition-colors" />
                  Download CV
                </a>
                {resume.contact.github && (
                  <a
                    href={resume.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white/10 rounded-lg hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Career Section */}
        <Section id="career" title="Career">
          <div className="max-w-3xl">
            {resume.career.map((job, index) => (
              <TimelineItem
                key={`${job.company}-${job.role}`}
                company={job.company}
                role={job.role}
                dates={job.dates}
                location={job.location}
                bullets={job.bullets}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title="Education">
          <div className="max-w-3xl">
            {resume.education.map((edu, index) => (
              <TimelineItem
                key={edu.school}
                company={edu.school}
                role={edu.degree}
                dates={edu.dates}
                location=""
                bullets={edu.details}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resume.skills.categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-white">
                    <CategoryIcon category={category.name} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {category.items.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                    >
                      <span className="text-white/70 shrink-0">
                        <SkillIcon name={skill} />
                      </span>
                      <span className="text-sm text-white truncate">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid gap-6 md:grid-cols-2">
            {resume.projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tech={project.tech}
                links={project.links}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact Me">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Feel free to reach
                out!
              </p>

              <div className="space-y-6">
                <motion.a
                  href={`mailto:${resume.contact.email}`}
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                >
                  <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                    <FiMail size={20} />
                  </span>
                  <span>{resume.contact.email}</span>
                </motion.a>

                <motion.a
                  href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                >
                  <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                    <FiPhone size={20} />
                  </span>
                  <span>{resume.contact.phone}</span>
                </motion.a>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  className="flex items-center gap-4 text-[var(--text-muted)] group"
                >
                  <span className="p-3 border border-white/10 rounded-lg">
                    <FiMapPin size={20} />
                  </span>
                  <span>{resume.contact.location}</span>
                </motion.div>

                {resume.contact.github && (
                  <motion.a
                    href={resume.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                      <FiGithub size={20} />
                    </span>
                    <span>github.com/sanketpatel32</span>
                  </motion.a>
                )}

                {resume.contact.instagram && (
                  <motion.a
                    href={resume.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                      <FiInstagram size={20} />
                    </span>
                    <span>@sanket_patel32</span>
                  </motion.a>
                )}

                {resume.contact.linkedin && (
                  <motion.a
                    href={resume.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                      <FiLinkedin size={20} />
                    </span>
                    <span>linkedin.com/in/sanketpatel32</span>
                  </motion.a>
                )}

                {resume.contact.youtube && (
                  <motion.a
                    href={resume.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                      <FiYoutube size={20} />
                    </span>
                    <span>@camouflage32p</span>
                  </motion.a>
                )}

                {resume.contact.website && (
                  <motion.a
                    href={resume.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                    className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                      <FiGlobe size={20} />
                    </span>
                    <span>sanketpatel.online</span>
                  </motion.a>
                )}
              </div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Send me a message
              </h3>
              <ContactForm />
            </motion.div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} {resume.name}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
            >
              Back to top
              <span className="p-1.5 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                <FiArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
