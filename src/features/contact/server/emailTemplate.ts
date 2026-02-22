import type { ContactFormInput } from "@/features/contact/model/types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmailHtml(input: ContactFormInput): string {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message);

  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9fafb; }
              .header { background-color: #000; color: #fff; padding: 15px 20px; border-radius: 8px 8px 0 0; }
              .header h2 { margin: 0; font-size: 18px; }
              .content { padding: 20px; background-color: #fff; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold; margin-bottom: 5px; }
              .value { font-size: 16px; color: #000; }
              .message { background-color: #f4f4f4; padding: 15px; border-radius: 6px; margin-top: 5px; white-space: pre-wrap; }
              .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>New Portfolio Contact</h2>
              </div>
              <div class="content">
                  <div class="field">
                      <div class="label">Name</div>
                      <div class="value"><strong>${safeName}</strong></div>
                  </div>
                  <div class="field">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${safeEmail}" style="color: #000; text-decoration: none;">${safeEmail}</a></div>
                  </div>
                  <div class="field">
                      <div class="label">Message</div>
                      <div class="value message">${safeMessage}</div>
                  </div>
              </div>
              <div class="footer">
                  <p>Sent from your portfolio website</p>
              </div>
          </div>
      </body>
      </html>
  `;
}
