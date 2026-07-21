import type { ContactFormInput, ContactValidationResult } from "@/features/contact/model/types";

const REQUIRED_FIELDS_ERROR = "Name, email, and message are required";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateContactInput(payload: unknown): ContactValidationResult {
  if (!payload || typeof payload !== "object") {
    return { isValid: false, error: REQUIRED_FIELDS_ERROR };
  }

  const { name, email, message } = payload as Record<string, unknown>;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return { isValid: false, error: REQUIRED_FIELDS_ERROR };
  }

  const data: ContactFormInput = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  return { isValid: true, data };
}
