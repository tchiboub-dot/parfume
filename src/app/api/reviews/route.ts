import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const allowedLocales = new Set(["en", "fr", "ar"]);

const createReviewSchema = z.object({
  customerName: z.string().min(2).max(80),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(12).max(1200),
  locale: z.string().optional(),
  productSlug: z.string().min(2).max(120).optional(),
  productName: z.string().min(2).max(120).optional(),
  isStoreReview: z.boolean().optional(),
});

function sanitizeText(value: string) {
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeOptionalText(value?: string) {
  if (!value) return undefined;
  const cleaned = sanitizeText(value);
  return cleaned.length > 0 ? cleaned : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") ?? "all";
  const productSlug = searchParams.get("slug") ?? undefined;
  const sort = searchParams.get("sort") === "highest" ? "highest" : "newest";
  const limitRaw = Number(searchParams.get("limit") ?? 12);
  const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(40, limitRaw)) : 12;

  const where: {
    status: "APPROVED";
    featured?: boolean;
    productSlug?: string;
    isStoreReview?: boolean;
  } = {
    status: "APPROVED",
  };

  if (scope === "featured") {
    where.featured = true;
  } else if (scope === "product" && productSlug) {
    where.productSlug = productSlug;
  } else if (scope === "store") {
    where.isStoreReview = true;
  }

  const orderBy =
    sort === "highest"
      ? [{ rating: "desc" as const }, { createdAt: "desc" as const }]
      : [{ createdAt: "desc" as const }];

  try {
    const reviews = await prisma.customerReview.findMany({
      where,
      orderBy,
      take: limit,
      select: {
        id: true,
        customerName: true,
        avatarUrl: true,
        rating: true,
        comment: true,
        locale: true,
        productSlug: true,
        productName: true,
        isStoreReview: true,
        featured: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createReviewSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid review payload" }, { status: 400 });
  }

  const safeLocale = allowedLocales.has(parsed.data.locale ?? "") ? parsed.data.locale! : "en";
  const customerName = sanitizeText(parsed.data.customerName);
  const comment = sanitizeText(parsed.data.comment);

  if (!customerName || !comment) {
    return NextResponse.json({ error: "Name and comment are required" }, { status: 400 });
  }

  const productSlug = sanitizeOptionalText(parsed.data.productSlug);
  const productName = sanitizeOptionalText(parsed.data.productName);
  const isStoreReview = parsed.data.isStoreReview ?? !productSlug;
  const autoApprove = process.env.REVIEWS_AUTO_APPROVE === "true";

  try {
    const created = await prisma.customerReview.create({
      data: {
        customerName,
        avatarUrl: parsed.data.avatarUrl || undefined,
        rating: parsed.data.rating,
        comment,
        locale: safeLocale,
        productSlug,
        productName,
        isStoreReview,
        status: autoApprove ? "APPROVED" : "PENDING",
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        review: created,
        moderation: autoApprove ? "auto-approved" : "pending",
        message: autoApprove
          ? "Thank you. Your review is now live."
          : "Thank you. Your review is waiting for approval.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}
