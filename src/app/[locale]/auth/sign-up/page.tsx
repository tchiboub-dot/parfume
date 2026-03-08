"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams<{ locale: string }>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const register = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!register.ok) {
      const payload = (await register.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? "Registration failed");
      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);
    router.push(`/${params.locale ?? "en"}/account`);
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl">Create Account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
        <input className="input-luxe" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="input-luxe" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input-luxe" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button className="btn-gold" type="submit" disabled={isLoading}>{isLoading ? "Creating Account..." : "Create Account"}</button>
      </form>
    </main>
  );
}
