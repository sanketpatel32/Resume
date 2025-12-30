import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.BREVO_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL || "sanpatel323@gmail.com";

        if (!apiKey) {
            console.error("BREVO_API_KEY is not defined");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "Portfolio Contact Form", email: contactEmail }, // Must use your verified sender email
                to: [{ email: contactEmail, name: "Sanket Patel" }],
                subject: `New Contact Form Message from ${name}`,
                htmlContent: `
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
                                    <div class="value"><strong>${name}</strong></div>
                                </div>
                                <div class="field">
                                    <div class="label">Email</div>
                                    <div class="value"><a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a></div>
                                </div>
                                <div class="field">
                                    <div class="label">Message</div>
                                    <div class="value message">${message}</div>
                                </div>
                            </div>
                            <div class="footer">
                                <p>Sent from your portfolio website</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
                replyTo: { email, name }, // User's email to reply to
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Brevo API Error:", errorData);
            return NextResponse.json(
                { error: "Failed to send message" },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
