const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

interface BrevoEmailPayload {
  sender: {
    name: string;
    email: string;
  };
  to: Array<{
    email: string;
    name: string;
  }>;
  subject: string;
  htmlContent: string;
  replyTo: {
    email: string;
    name: string;
  };
}

export async function sendBrevoEmail(apiKey: string, payload: BrevoEmailPayload): Promise<Response> {
  return fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
