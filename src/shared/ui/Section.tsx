"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
}

export default function Section({ id, title, children, className = "" }: SectionProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id={id}
            className={`min-h-screen py-20 md:py-32 ${className}`}
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
                        <span className="text-[var(--accent)]">/</span> {title}
                    </h2>
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
