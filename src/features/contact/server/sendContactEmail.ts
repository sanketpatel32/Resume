import { contact } from "@/features/resume/content/contact";
import { profile } from "@/features/resume/content/profile";
import type { ContactFormInput, SendContactEmailResult } from "@/features/contact/model/types";
import { sendBrevoEmail } from "@/features/contact/server/brevoClient";
import { buildContactEmailHtml } from "@/features/contact/server/emailTemplate";

const SERVER_CONFIG_ERROR = "Server configuration error";
const SEND_FAILED_ERROR = "Failed to send message";

export async function sendContactEmail(input: ContactFormInput): Promise<SendContactEmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || contact.email;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not defined");
    return {
      ok: false,
      status: 500,
      error: SERVER_CONFIG_ERROR,
    };
  }

  const response = await sendBrevoEmail(apiKey, {
    sender: { name: "Portfolio Contact Form", email: contactEmail },
    to: [{ email: contactEmail, name: profile.name }],
    subject: `New Contact Form Message from ${input.name}`,
    htmlContent: buildContactEmailHtml(input),
    replyTo: { email: input.email, name: input.name },
  });

  if (!response.ok) {
    let errorData: unknown = null;
    try {
      errorData = await response.json();
    } catch (error) {
      errorData = error;
    }

    console.error("Brevo API Error:", errorData);
    return {
      ok: false,
      status: response.status,
      error: SEND_FAILED_ERROR,
    };
  }

  return {
    ok: true,
    status: 200,
  };
}
