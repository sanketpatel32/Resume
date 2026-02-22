"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm() {
    const shouldReduceMotion = useReducedMotion();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to send message");
                }

                setIsSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
            } catch (error) {
                console.error("Submission error:", error);
                setSubmitError(
                    error instanceof Error ? error.message : "Something went wrong. Please try again."
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
        if (submitError) {
            setSubmitError(null);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-dim)] text-center"
            >
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                </h3>
                <p className="text-[var(--text-muted)] text-sm">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-[var(--accent)] hover:underline text-sm"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${errors.name ? "border-red-500" : "border-white/10"
                        }`}
                    placeholder="Your name"
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${errors.email ? "border-red-500" : "border-white/10"
                        }`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-2"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none ${errors.message ? "border-red-500" : "border-white/10"
                        }`}
                    placeholder="Your message..."
                    disabled={isSubmitting}
                />
                {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
            </div>

            {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {submitError}
                </div>
            )}

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={shouldReduceMotion || isSubmitting ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.98 }}
                className={`w-full py-3 px-6 bg-[var(--accent)] text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
        </form>
    );
}
