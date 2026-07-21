"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface SectionProps {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function Section({ id, title, children, className = "" }: SectionProps) {
    const shouldReduceMotion = useHydratedReducedMotion();

    return (
        <section
            id={id}
            className={`min-h-screen py-20 md:py-32 relative ${className}`}
        >
            {/* Section background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
                <m.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px", amount: 0.2 }}
                >
                    <m.h2 
                        variants={titleVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 flex items-center gap-3"
                    >
                        <span className="text-[var(--accent)] text-4xl md:text-5xl animate-pulse">/</span> 
                        <span className="gradient-text">{title}</span>
                    </m.h2>
                    
                    {/* Animated divider line */}
                    <m.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "100%", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent mb-12"
                    />
                    
                    {children}
                </m.div>
            </div>
        </section>
    );
}
