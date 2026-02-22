export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  data?: ContactFormInput;
  error?: string;
}

export interface SendContactEmailResult {
  ok: boolean;
  status: number;
  error?: string;
}
