"use client";

import { useReducer } from "react";
import { m } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

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

interface ContactFormState {
  formData: FormData;
  errors: FormErrors;
  isSubmitted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
}

type ContactFormAction =
  | { type: "update_field"; field: keyof FormData; value: string }
  | { type: "set_errors"; errors: FormErrors }
  | { type: "set_submitting"; value: boolean }
  | { type: "submit_success" }
  | { type: "submit_error"; error: string }
  | { type: "reset_submission" };

const initialState: ContactFormState = {
  formData: {
    name: "",
    email: "",
    message: "",
  },
  errors: {},
  isSubmitted: false,
  isSubmitting: false,
  submitError: null,
};

function contactFormReducer(state: ContactFormState, action: ContactFormAction): ContactFormState {
  switch (action.type) {
    case "update_field": {
      const nextErrors = state.errors[action.field]
        ? { ...state.errors, [action.field]: undefined }
        : state.errors;

      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: nextErrors,
        submitError: null,
      };
    }
    case "set_errors":
      return {
        ...state,
        errors: action.errors,
      };
    case "set_submitting":
      return {
        ...state,
        isSubmitting: action.value,
      };
    case "submit_success":
      return {
        ...state,
        isSubmitted: true,
        formData: {
          name: "",
          email: "",
          message: "",
        },
        errors: {},
        submitError: null,
      };
    case "submit_error":
      return {
        ...state,
        submitError: action.error,
      };
    case "reset_submission":
      return {
        ...state,
        isSubmitted: false,
      };
    default:
      return state;
  }
}

function validateForm(formData: FormData): FormErrors {
  const nextErrors: FormErrors = {};

  if (!formData.name.trim()) {
    nextErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    nextErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    nextErrors.email = "Please enter a valid email";
  }

  if (!formData.message.trim()) {
    nextErrors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    nextErrors.message = "Message must be at least 10 characters";
  }

  return nextErrors;
}

export default function ContactForm() {
  const shouldReduceMotion = useHydratedReducedMotion();
  const [state, dispatch] = useReducer(contactFormReducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForm(state.formData);
    dispatch({ type: "set_errors", errors: nextErrors });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    dispatch({ type: "set_submitting", value: true });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      dispatch({ type: "submit_success" });
    } catch (error) {
      console.error("Submission error:", error);
      dispatch({
        type: "submit_error",
        error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      dispatch({ type: "set_submitting", value: false });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "update_field",
      field: e.target.name as keyof FormData,
      value: e.target.value,
    });
  };

  if (state.isSubmitted) {
    return (
      <m.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4"
      >
        <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
        <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. I&apos;ve received your note and will reply promptly.
        </p>
        <button
          onClick={() => dispatch({ type: "reset_submission" })}
          className="mt-4 px-4 py-2 text-xs font-mono text-emerald-400 underline hover:text-emerald-300 transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white/[0.05] transition-all ${
            state.errors.name ? "border-red-500/70" : "border-white/10"
          }`}
          placeholder="Sanket Patel"
          disabled={state.isSubmitting}
        />
        {state.errors.name && <p className="mt-1 text-xs text-red-400 font-mono">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white/[0.05] transition-all ${
            state.errors.email ? "border-red-500/70" : "border-white/10"
          }`}
          placeholder="name@domain.com"
          disabled={state.isSubmitting}
        />
        {state.errors.email && <p className="mt-1 text-xs text-red-400 font-mono">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={state.formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white/[0.05] transition-all resize-none ${
            state.errors.message ? "border-red-500/70" : "border-white/10"
          }`}
          placeholder="Hi Sanket, I'd like to discuss a project..."
          disabled={state.isSubmitting}
        />
        {state.errors.message && <p className="mt-1 text-xs text-red-400 font-mono">{state.errors.message}</p>}
      </div>

      {state.submitError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono">
          {state.submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={state.isSubmitting}
        className="w-full py-3.5 px-6 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 text-sm group"
      >
        {state.isSubmitting ? (
          "Sending Message..."
        ) : (
          <>
            <span>Send Message</span>
            <FiSend className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}