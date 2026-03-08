"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, X, Clock3, Star, Trash2 } from "lucide-react";

type AdminReview = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName?: string | null;
  productSlug?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  featured: boolean;
  createdAt: string;
};

export default function AdminReviewsPage() {
  const params = useParams<{ locale: string }>();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load reviews");
      }
      const payload = await res.json();
      setReviews(payload.reviews ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(id: string, data: Partial<Pick<AdminReview, "status" | "featured">>) {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }
      const payload = await res.json();
      setReviews((prev) => prev.map((item) => (item.id === id ? payload.review : item)));
    } catch {
      alert("Failed to update review");
    }
  }

  async function removeReview(id: string) {
    if (!confirm("Delete this review?")) return;

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setReviews((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete review");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href={`/${params.locale}/admin`} className="btn-ghost inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.16em]">
            <ArrowLeft size={14} />
            Back
          </Link>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--text)]">Review Moderation</h1>
          <p className="mt-2 text-[color:var(--text-soft)]">Approve, reject, feature, or delete customer comments.</p>
        </div>
      </div>

      {loading ? <p className="text-[color:var(--text-soft)]">Loading...</p> : null}
      {error ? <p className="text-red-300">{error}</p> : null}

      <div className="grid gap-4">
        {reviews.map((review) => (
          <article key={review.id} className="section-shell rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl text-[color:var(--text)]">{review.customerName}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-soft)]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={13}
                      className={num <= review.rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-white/25"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="btn-ghost inline-flex items-center gap-1 px-3 py-2 text-xs"
                  onClick={() => updateReview(review.id, { status: "APPROVED" })}
                >
                  <Check size={14} /> Approve
                </button>
                <button
                  className="btn-ghost inline-flex items-center gap-1 px-3 py-2 text-xs"
                  onClick={() => updateReview(review.id, { status: "PENDING" })}
                >
                  <Clock3 size={14} /> Pending
                </button>
                <button
                  className="btn-ghost inline-flex items-center gap-1 px-3 py-2 text-xs"
                  onClick={() => updateReview(review.id, { status: "REJECTED" })}
                >
                  <X size={14} /> Reject
                </button>
                <button
                  className={`btn-ghost px-3 py-2 text-xs ${review.featured ? "border-[color:var(--gold)] text-[color:var(--gold)]" : ""}`}
                  onClick={() => updateReview(review.id, { featured: !review.featured })}
                >
                  {review.featured ? "Featured" : "Mark Featured"}
                </button>
                <button className="btn-ghost inline-flex items-center gap-1 px-3 py-2 text-xs text-red-300" onClick={() => removeReview(review.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>

            <p className="mt-4 text-[color:var(--text)]">{review.comment}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.13em] text-[color:var(--text-soft)]">
              <span className="chip-luxe">{review.status}</span>
              {review.productName || review.productSlug ? <span className="chip-luxe">{review.productName ?? review.productSlug}</span> : <span className="chip-luxe">Store Review</span>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
