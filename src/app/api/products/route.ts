import { NextResponse } from "next/server";

import { perfumes } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.perfume.findMany({
      include: {
        brand: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (products.length) {
      return NextResponse.json({ products });
    }
  } catch {
    // Fallback to static showcase catalog when DB is not ready.
  }

  return NextResponse.json({ products: perfumes });
}
