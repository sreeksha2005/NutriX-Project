import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { Field } from "./index";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your NutriX account" },
      {
        name: "description",
        content: "Join NutriX and start tracking nutrition with AI food detection and diet plans.",
      },
      { property: "og:title", content: "Create your NutriX account" },
      {
        property: "og:description",
        content: "Join NutriX and start tracking nutrition with AI food detection.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in every field.");
      return;
    }
    navigate({ to: "/" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[oklch(0.14_0.01_250)] px-5 py-10">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -top-24 right-0 size-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-mint)" }}
      />
      <div className="relative w-full max-w-[400px]">
        <Link
          to="/"
          className="press mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Back to login
        </Link>

        <h1 className="rise font-display text-3xl font-extrabold">Create account</h1>
        <p className="rise mt-2 text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
          A few details and your AI nutrition coach is ready.
        </p>

        <form
          onSubmit={submit}
          className="glass-card rise mt-6 space-y-3 rounded-[2rem] p-6"
          style={{ animationDelay: "140ms" }}
        >
          <Field icon={<User className="size-4" />} label="Full name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Sreeksha"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </Field>
          <Field icon={<Mail className="size-4" />} label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@nutrix.app"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </Field>
          <Field icon={<Lock className="size-4" />} label="Password">
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </Field>

          {error && <p className="pop text-xs font-semibold text-destructive">{error}</p>}

          <button
            type="submit"
            className="press !mt-6 w-full rounded-2xl py-4 font-display text-base font-bold text-primary-foreground"
            style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
