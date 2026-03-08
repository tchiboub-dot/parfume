import { NextResponse } from "next/server";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(8).optional(),
  price: z.number().positive().optional(),
  oldPrice: z.number().positive().nullable().optional(),
  stock: z.number().int().nonnegative().optional(),
  family: z.string().min(2).optional(),
  concentration: z.string().min(2).optional(),
  audience: z.string().min(2).optional(),
});

async function requireAdmin() {
  const session = await getAuthSession();
  return session?.user?.role === "ADMIN";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const json = await request.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const product = await prisma.perfume.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.perfume.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
