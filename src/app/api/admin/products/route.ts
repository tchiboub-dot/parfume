import { NextResponse } from "next/server";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(8),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative(),
  family: z.string().min(2),
  concentration: z.string().min(2),
  audience: z.string().min(2),
  brand: z.string().min(2),
  category: z.string().min(2),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

async function requireAdmin() {
  const session = await getAuthSession();
  return session?.user?.role === "ADMIN";
}

export async function GET() {
  if (!(await requireAdmin())) {
    return unauthorized();
  }

  const products = await prisma.perfume.findMany({
    include: {
      brand: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return unauthorized();
  }

  const json = await request.json();
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const data = parsed.data;

  const category =
    (await prisma.category.findFirst({ where: { name: data.category } })) ??
    (await prisma.category.create({ data: { name: data.category } }));

  const created = await prisma.perfume.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      oldPrice: data.oldPrice,
      stock: data.stock,
      family: data.family,
      concentration: data.concentration,
      audience: data.audience,
      brand: {
        connectOrCreate: {
          where: { name: data.brand },
          create: { name: data.brand },
        },
      },
      category: {
        connect: { id: category.id },
      },
    },
    include: {
      brand: true,
      category: true,
    },
  });

  return NextResponse.json({ product: created }, { status: 201 });
}
