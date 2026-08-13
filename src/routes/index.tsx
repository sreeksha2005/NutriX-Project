import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Lock, Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriX — AI Nutrition Analysis & Diet Coach" },
      {
        name: "description",
        content:
          "Sign in to NutriX to detect food from a photo, track calories and macros, and get a personalized daily diet plan.",
      },
      { property: "og:title", content: "NutriX — AI Nutrition Analysis & Diet Coach" },
      {
        property: "og:description",
        content: "Detect food from a photo, track macros, and follow a personalized diet plan.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    navigate({ to: "/home" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[oklch(0.14_0.01_250)] px-5">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -top-28 -left-16 size-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-mint)" }}
      />
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--amber)", animationDelay: "1.2s" }}
      />

      <div className="relative w-full max-w-[400px]">
        <div className="rise mb-9 text-center">
          <div
            className="pulse-ring mx-auto grid size-20 place-items-center rounded-[1.75rem]"
            style={{ background: "var(--gradient-mint)" }}
          >
            <Leaf className="size-9 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold">NutriX</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Eat smart · Stay healthy · Live better
          </p>
        </div>

        <form onSubmit={submit} className="glass-card rise rounded-[2rem] p-6" style={{ animationDelay: "120ms" }}>
          <Field icon={<Mail className="size-4" />} label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@nutrix.app"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </Field>

          <div className="h-3" />

          <Field icon={<Lock className="size-4" />} label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </Field>

          {error && <p className="pop mt-3 text-xs font-semibold text-destructive">{error}</p>}

          <button
            type="submit"
            className="press mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-base font-bold text-primary-foreground"
            style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
          >
            Login <ArrowRight className="size-4" />
          </button>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            New to NutriX?{" "}
            <Link to="/register" className="font-bold text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-border bg-secondary/60 px-4 py-3 transition-colors focus-within:border-primary/60">
      <span className="mb-1 flex items-center gap-2 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
