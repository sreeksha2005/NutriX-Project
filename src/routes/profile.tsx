import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, LogOut, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, Chip, Progress, Section, tint } from "@/components/ui-bits";
import { bmi, EMPTY_PROFILE, loadProfile, type Profile as P } from "@/lib/nutrix";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — NutriX health stats & BMI" },
      {
        name: "description",
        content:
          "Manage your NutriX profile: height, weight, BMI status, hydration and daily nutrition goals.",
      },
      { property: "og:title", content: "Your Profile — NutriX health stats & BMI" },
      {
        property: "og:description",
        content: "Manage your height, weight, BMI status and nutrition goals.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [p, setP] = useState<P>(EMPTY_PROFILE);
  useEffect(() => setP(loadProfile()), []);
  const b = bmi(p);

  return (
    <PhoneShell>
      <header className="rise flex flex-col items-center pt-2 text-center">
        <div className="relative">
          <div
            className="grid size-24 place-items-center overflow-hidden rounded-[2rem]"
            style={{ background: "var(--gradient-mint)" }}
          >
            {p.profileImage ? (
              <img src={p.profileImage} alt="Profile" className="size-full object-cover" />
            ) : (
              <span className="font-display text-3xl font-extrabold text-primary-foreground">
                {(p.name || "N").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <Link
            to="/edit-profile"
            className="press absolute -right-1 -bottom-1 grid size-9 place-items-center rounded-full border-4 border-background bg-secondary"
          >
            <Pencil className="size-3.5" />
          </Link>
        </div>
        <h1 className="mt-4 font-display text-xl font-extrabold">{p.name || "Your profile"}</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {p.gender ? `${p.gender} · ${p.age} years` : "Add your details to personalize NutriX"}
        </p>
        <div className="mt-3 flex gap-2">
          <Chip>{p.goal || "Stay Fit"}</Chip>
          {b && <Chip color="amber">BMI {b.value}</Chip>}
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Card className="!p-4" delay={80}>
          <p className="text-[11px] text-muted-foreground">Weight</p>
          <p className="mt-1 font-display text-2xl font-extrabold">
            {p.weight || "--"}
            <span className="text-xs font-bold text-muted-foreground"> kg</span>
          </p>
        </Card>
        <Card className="!p-4" delay={140}>
          <p className="text-[11px] text-muted-foreground">Height</p>
          <p className="mt-1 font-display text-2xl font-extrabold">
            {p.height || "--"}
            <span className="text-xs font-bold text-muted-foreground"> cm</span>
          </p>
        </Card>
      </div>

      <Card className="mt-3" delay={200}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">BMI status</p>
          <span className="font-display text-sm font-extrabold" style={{ color: tint("mint") }}>
            {b ? b.label : "Add height & weight"}
          </span>
        </div>
        <div className="mt-3">
          <Progress value={b ? Math.min(100, (b.value / 40) * 100) : 0} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Under</span>
          <span>Normal</span>
          <span>Over</span>
          <span>Obese</span>
        </div>
      </Card>

      <Section title="Weekly activity" delay={260}>
        <Card className="flex h-32 items-end justify-between gap-2">
          {[62, 48, 80, 55, 92, 70, 40].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-full transition-[height] duration-700"
                style={{
                  height: `${h}%`,
                  background: i === 4 ? "var(--gradient-mint)" : "var(--secondary)",
                }}
              />
              <span className="text-[9px] text-muted-foreground">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Settings" delay={340}>
        <Card className="!p-0">
          {[
            { icon: Pencil, label: "Edit profile", to: "/edit-profile" as const },
            { icon: Bell, label: "Reminders" },
            { icon: Shield, label: "Privacy" },
            { icon: HelpCircle, label: "Help & support" },
          ].map((row) => {
            const inner = (
              <>
                <row.icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 text-sm font-semibold">{row.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </>
            );
            return row.to ? (
              <Link
                key={row.label}
                to={row.to}
                className="press flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-0"
              >
                {inner}
              </Link>
            ) : (
              <button
                key={row.label}
                className="press flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left last:border-0"
              >
                {inner}
              </button>
            );
          })}
        </Card>

        <Link
          to="/"
          className="press mt-3 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-destructive"
          style={{ background: "color-mix(in oklab, var(--destructive) 14%, transparent)" }}
        >
          <LogOut className="size-4" /> Log out
        </Link>
      </Section>
    </PhoneShell>
  );
}
