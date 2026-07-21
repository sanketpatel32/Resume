"use client";

import { m } from "framer-motion";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface SkillIconProps {
    name: string;
}

const iconVariants = {
    hover: {
        scale: 1.2,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
    },
};

export default function SkillIcon({ name }: SkillIconProps) {
    const shouldReduceMotion = useHydratedReducedMotion();
    
    // Return null or a placeholder since we're not rendering actual icons here
    return (
        <m.span
            variants={iconVariants}
            whileHover={!shouldReduceMotion ? "hover" : undefined}
            className="inline-block w-4 h-4 text-[var(--accent)]"
        >
            •
        </m.span>
    );
}

export function CategoryIcon({ category }: { category: string }) {
    const shouldReduceMotion = useHydratedReducedMotion();
    
    return (
        <m.span
            variants={iconVariants}
            whileHover={!shouldReduceMotion ? "hover" : undefined}
            className="inline-block text-[var(--accent)]"
        >
            ✦
        </m.span>
    );
}
