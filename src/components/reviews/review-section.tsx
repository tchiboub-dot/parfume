"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Locale } from "@/lib/i18n";

type ReviewItem = {
  id: string;
  customerName: string;
  avatarUrl?: string | null;
  rating: number;
  comment: string;
  locale: string;
  productSlug?: string | null;
  productName?: string | null;
  isStoreReview: boolean;
  featured: boolean;
  createdAt: string;
};

type ReviewSectionProps = {
  locale: Locale;
  productSlug?: string;
  productName?: string;
  featuredOnly?: boolean;
  className?: string;
};

type UiCopy = {
  title: string;
  subtitle: string;
  name: string;
  avatar: string;
  rating: string;
  comment: string;
  submit: string;
  submitting: string;
  successLive: string;
  successPending: string;
  sortNewest: string;
  sortHighest: string;
  waiting: string;
  empty: string;
  writeReview: string;
};

const copyByLocale: Record<Locale, UiCopy> = {
  en: {
    title: "Client Reviews",
    subtitle: "Authentic feedback from fragrance lovers and collectors.",
    name: "Your Name",
    avatar: "Avatar URL (optional)",
    rating: "Rating",
    comment: "Your review",
    submit: "Publish Review",
    submitting: "Submitting...",
    successLive: "Thank you. Your review is now live.",
    successPending: "Thank you. Your review is waiting for approval.",
    sortNewest: "Newest",
    sortHighest: "Highest Rated",
    waiting: "Waiting for approval",
    empty: "No reviews yet. Be the first to share your impression.",
    writeReview: "Write a Review",
  },
  fr: {
    title: "Avis Clients",
    subtitle: "Retours authentiques de passionnes et collectionneurs de parfum.",
    name: "Votre nom",
    avatar: "URL avatar (optionnel)",
    rating: "Note",
    comment: "Votre avis",
    submit: "Publier l'avis",
    submitting: "Envoi...",
    successLive: "Merci. Votre avis est en ligne.",
    successPending: "Merci. Votre avis attend validation.",
    sortNewest: "Plus recents",
    sortHighest: "Mieux notes",
    waiting: "En attente de validation",
    empty: "Aucun avis pour le moment. Soyez le premier a partager votre experience.",
    writeReview: "Laisser un avis",
  },
  ar: {
    title: "تقييمات العملاء",
    subtitle: "آراء حقيقية من محبي العطور والباحثين عن التميز.",
    name: "الاسم",
    avatar: "رابط الصورة (اختياري)",
    rating: "التقييم",
    comment: "اكتب رأيك",
    submit: "ارسال التقييم",
    submitting: "جاري الارسال...",
    successLive: "شكرا لك. تم نشر تقييمك.",
    successPending: "شكرا لك. تقييمك بانتظار الموافقة.",
    sortNewest: "الاحدث",
    sortHighest: "الاعلى تقييما",
    waiting: "بانتظار الموافقة",
    empty: "لا توجد تقييمات بعد. كن اول من يشارك تجربته.",
    writeReview: "اكتب تقييما",
  },
};

function StarRating({ value, onChange }: { value: number; onChange?: (value: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onChange?.(num)}
          className="transition hover:scale-105"
          aria-label={`rate-${num}`}
        >
          <Star
            size={18}
            className={num <= value ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-white/30"}
          />
        </button>
      ))}
    </div>
  );
}

function formatDate(value: string, locale: Locale) {
  return new Date(value).toLocaleDateString(locale === "ar" ? "ar-MA" : locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ReviewSection({
  locale,
  productSlug,
  productName,
  featuredOnly = false,
  className,
}: ReviewSectionProps) {
  const t = copyByLocale[locale];
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<"newest" | "highest">("newest");

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("limit", featuredOnly ? "3" : "12");

    if (featuredOnly) {
      params.set("scope", "featured");
    } else if (productSlug) {
      params.set("scope", "product");
      params.set("slug", productSlug);
    } else {
      params.set("scope", "store");
    }

    return `/api/reviews?${params.toString()}`;
  }, [sort, featuredOnly, productSlug]);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(fetchUrl, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }
        const payload = await res.json();
        if (isMounted) {
          setReviews(payload.reviews ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load reviews");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      isMounted = false;
    };
  }, [fetchUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setError("");

    if (!name.trim() || !comment.trim()) {
      setError("Please complete name and review.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name,
          avatarUrl,
          rating,
          comment,
          locale,
          productSlug,
          productName,
          isStoreReview: !productSlug,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Failed to submit review");
        return;
      }

      setSuccessMessage(payload.moderation === "auto-approved" ? t.successLive : t.successPending);
      setName("");
      setAvatarUrl("");
      setRating(5);
      setComment("");

      if (payload.moderation === "auto-approved") {
        setReviews((prev) => [
          {
            id: payload.review.id,
            customerName: name,
            avatarUrl,
            rating,
            comment,
            locale,
            productSlug: productSlug ?? null,
            productName: productName ?? null,
            isStoreReview: !productSlug,
            featured: false,
            createdAt: payload.review.createdAt,
          },
          ...prev,
        ]);
      }
    } catch {
      setError("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={className}>
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        <h3 className="section-title text-3xl sm:text-4xl md:text-5xl">{t.title}</h3>
        <p className="section-intro text-xs sm:text-sm md:text-base">{t.subtitle}</p>
      </div>

      <div className="mt-6 sm:mt-7 md:mt-8 grid gap-6 sm:gap-7 md:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="section-shell rounded-2xl p-4 sm:p-5 md:p-6">
          <h4 className="font-display text-lg sm:text-xl md:text-2xl text-[color:var(--text)]">{t.writeReview}</h4>

          <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
            <input
              className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"
              placeholder={t.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
            />
            <input
              className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"
              placeholder={t.avatar}
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              maxLength={240}
            />
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-xs sm:text-sm text-[color:var(--text-soft)]">{t.rating}</p>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <textarea
              className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5 min-h-20 sm:min-h-28 resize-y"
              placeholder={t.comment}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={1200}
            />

            <button disabled={isSubmitting} className="btn-premium-gold w-full text-xs sm:text-sm disabled:opacity-70" type="submit">
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>

          {successMessage ? <p className="mt-3 text-xs sm:text-sm text-green-300">{successMessage}</p> : null}
          {error ? <p className="mt-3 text-xs sm:text-sm text-red-300">{error}</p> : null}
        </div>

        <div>
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--text-soft)]">{t.title}</p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSort("newest")}
                className={`btn-ghost px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs whitespace-nowrap flex-1 sm:flex-none ${sort === "newest" ? "border-[color:var(--gold)] text-[color:var(--gold)]" : ""}`}
              >
                {t.sortNewest}
              </button>
              <button
                type="button"
                onClick={() => setSort("highest")}
                className={`btn-ghost px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs whitespace-nowrap flex-1 sm:flex-none ${sort === "highest" ? "border-[color:var(--gold)] text-[color:var(--gold)]" : ""}`}
              >
                {t.sortHighest}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="section-shell rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-[color:var(--text-soft)]">Loading...</div>
          ) : reviews.length === 0 ? (
            <div className="section-shell rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-[color:var(--text-soft)]">{t.empty}</div>
          ) : (
            <div className="grid gap-3 sm:gap-4">\n              {reviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="testimonial-card"
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                      {review.avatarUrl ? (
                        <img
                          src={review.avatarUrl}
                          alt={review.customerName}
                          className="h-9 sm:h-11 w-9 sm:w-11 rounded-full object-cover border border-white/20 flex-shrink-0"
                        />
                      ) : (
                        <div className="flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-xs sm:text-sm font-semibold text-[color:var(--gold)] flex-shrink-0">
                          {review.customerName.slice(0, 1).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm sm:text-lg text-[color:var(--text)] truncate">{review.customerName}</p>
                        <p className="text-[9px] sm:text-xs uppercase tracking-[0.12em] text-[color:var(--text-soft)]">
                          {formatDate(review.createdAt, locale)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Star
                          key={num}
                          size={12}
                          className={`sm:w-[14px] sm:h-[14px] ${num <= review.rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-white/25"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm text-[color:var(--text)] leading-relaxed">{review.comment}</p>

                  {review.productName || review.productSlug ? (
                    <p className="mt-2 sm:mt-3 text-[8px] sm:text-xs uppercase tracking-[0.13em] text-[color:var(--text-soft)]">
                      {review.productName ?? review.productSlug}
                    </p>
                  ) : null}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
