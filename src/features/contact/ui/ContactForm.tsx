"use client";

import { useReducer } from "react";
import { m, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
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
        className="p-8 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-dim)] text-center"
      >
        <div className="text-4xl mb-4">{"\u2713"}</div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
        <p className="text-[var(--text-muted)] text-sm">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => dispatch({ type: "reset_submission" })}
          className="mt-6 text-[var(--accent)] hover:underline text-sm"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
            state.errors.name ? "border-red-500" : "border-white/10"
          }`}
          placeholder="Your name"
          disabled={state.isSubmitting}
        />
        {state.errors.name && <p className="mt-1 text-xs text-red-400">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
            state.errors.email ? "border-red-500" : "border-white/10"
          }`}
          placeholder="your@email.com"
          disabled={state.isSubmitting}
        />
        {state.errors.email && <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={state.formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none ${
            state.errors.message ? "border-red-500" : "border-white/10"
          }`}
          placeholder="Your message..."
          disabled={state.isSubmitting}
        />
        {state.errors.message && <p className="mt-1 text-xs text-red-400">{state.errors.message}</p>}
      </div>

      {state.submitError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {state.submitError}
        </div>
      )}

      <m.button
        type="submit"
        disabled={state.isSubmitting}
        whileHover={shouldReduceMotion || state.isSubmitting ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion || state.isSubmitting ? {} : { scale: 0.98 }}
        className="w-full py-3 px-6 bg-[var(--accent)] text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {state.isSubmitting ? "Sending..." : "Send Message"}
      </m.button>
    </form>
  );
}