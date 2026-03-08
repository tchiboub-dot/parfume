import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(8),
});

export async function POST(request: Request) {
  const data = await request.json();
  const validated = contactSchema.safeParse(data);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid message data" }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        message: validated.data.message,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }

  return NextResponse.json({ message: "Message received. We will contact you shortly." });
}
