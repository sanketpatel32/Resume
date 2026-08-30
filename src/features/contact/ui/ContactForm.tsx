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
        error: error instanceof Error ? error.message : "Message could not be sent. Please try again.",
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
        className="form-success"
      >
        <FiCheckCircle className="form-success-icon" />
        <h3>Message sent.</h3>
        <p>
          Thank you for reaching out. I&apos;ve received your note and will reply promptly.
        </p>
        <button
          onClick={() => dispatch({ type: "reset_submission" })}
          className="text-link"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="name">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.formData.name}
          onChange={handleChange}
          className={`form-input ${state.errors.name ? "has-error" : ""}`}
          aria-invalid={Boolean(state.errors.name)}
          aria-describedby="name-error"
          placeholder="Sanket Patel"
          disabled={state.isSubmitting}
        />
        <p id="name-error" className="form-error" aria-live="polite">{state.errors.name ?? ""}</p>
      </div>

      <div>
        <label htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.formData.email}
          onChange={handleChange}
          className={`form-input ${state.errors.email ? "has-error" : ""}`}
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby="email-error"
          placeholder="name@domain.com"
          disabled={state.isSubmitting}
        />
        <p id="email-error" className="form-error" aria-live="polite">{state.errors.email ?? ""}</p>
      </div>

      <div>
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={state.formData.message}
          onChange={handleChange}
          rows={4}
          className={`form-input form-textarea ${state.errors.message ? "has-error" : ""}`}
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby="message-error"
          placeholder="Hi Sanket, I’d like to discuss a project…"
          disabled={state.isSubmitting}
        />
        <p id="message-error" className="form-error" aria-live="polite">{state.errors.message ?? ""}</p>
      </div>

      {state.submitError && (
        <div className="form-submit-error" role="alert">
          {state.submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={state.isSubmitting}
        className="button button-primary form-submit"
      >
        {state.isSubmitting ? (
          "Sending message…"
        ) : (
          <>
            <span>Send message</span>
            <FiSend aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
