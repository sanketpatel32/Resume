import { NextResponse } from "next/server";
import { sendContactEmail, validateContactInput } from "@/features/contact";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const validation = validateContactInput(payload);

    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        { error: validation.error ?? "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const result = await sendContactEmail(validation.data);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? "Failed to send message" },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}