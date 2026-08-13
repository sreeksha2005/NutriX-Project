import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Camera, Utensils, Leaf, Flame, Footprints, Droplets, ArrowRight } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, Chip, Progress, Ring, Section, tint } from "@/components/ui-bits";
import { loadProfile, MEALS } from "@/lib/nutrix";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "NutriX Home — Your daily nutrition at a glance" },
      {
        name: "description",
        content:
          "See today's calories, macros, water and steps, plus quick access to AI food detection and your diet plan.",
      },
      { property: "og:title", content: "NutriX Home — Your daily nutrition at a glance" },
      {
        property: "og:description",
        content: "Today's calories, macros, water and steps in one dashboard.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [name, setName] = useState("");
  useEffect(() => setName(loadProfile().name), []);

  const consumed = 1460;
  const goal = 1800;
  const pct = Math.round((consumed / goal) * 100);

  return (
    <PhoneShell>
      <header className="rise grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground">👋 Good morning</p>
          <h1 className="truncate font-display text-2xl font-extrabold">
            {name ? name.split(" ")[0] : "Welcome back"}
          </h1>
        </div>
        <Link
          to="/profile"
          className="press grid size-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold text-primary-foreground"
          style={{ background: "var(--gradient-mint)" }}
        >
          {(name || "N").charAt(0).toUpperCase()}
        </Link>
      </header>

      <Card className="rise mt-6 overflow-hidden !p-0" delay={60}>
        <div className="relative p-5" style={{ background: "var(--gradient-hero)" }}>
          <div className="flex items-center gap-5">
            <Ring value={pct} label={`${pct}%`} sub={`${consumed} kcal`} />
            <div className="min-w-0">
              <Chip>Daily goal</Chip>
              <p className="mt-2 font-display text-xl font-extrabold">{goal} kcal</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {goal - consumed} kcal left · on track
              </p>
              <Link
                to="/detect"
                className="press mt-4 inline-flex items-center gap-2 rounded-full bg-background/60 px-4 py-2 text-xs font-bold"
              >
                Start analysis <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: Flame, label: "Burned", value: "410", unit: "kcal", c: "amber" as const, p: 62 },
          { icon: Droplets, label: "Water", value: "2.5", unit: "L", c: "sky" as const, p: 83 },
          { icon: Footprints, label: "Steps", value: "6.2", unit: "k", c: "berry" as const, p: 54 },
        ].map((s, i) => (
          <Card key={s.label} className="!p-3" delay={120 + i * 70}>
            <s.icon className="size-4" style={{ color: tint(s.c) }} />
            <p className="mt-2 font-display text-lg leading-none font-extrabold">
              {s.value}
              <span className="ml-0.5 text-[10px] font-bold text-muted-foreground">{s.unit}</span>
            </p>
            <p className="mt-1 mb-2 text-[10px] text-muted-foreground">{s.label}</p>
            <Progress value={s.p} color={s.c} />
          </Card>
        ))}
      </div>

      <Section title="Quick actions" delay={320}>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/detect"
            className="press glass-card flex flex-col gap-3 rounded-3xl p-4"
            style={{ borderColor: "color-mix(in oklab, var(--mint) 30%, transparent)" }}
          >
            <span
              className="grid size-11 place-items-center rounded-2xl"
              style={{ background: "color-mix(in oklab, var(--mint) 18%, transparent)" }}
            >
              <Camera className="size-5" style={{ color: tint("mint") }} />
            </span>
            <span className="text-sm font-bold">Detect food</span>
            <span className="-mt-2 text-[11px] text-muted-foreground">Snap & analyze instantly</span>
          </Link>
          <Link
            to="/diet"
            className="press glass-card flex flex-col gap-3 rounded-3xl p-4"
            style={{ borderColor: "color-mix(in oklab, var(--amber) 30%, transparent)" }}
          >
            <span
              className="grid size-11 place-items-center rounded-2xl"
              style={{ background: "color-mix(in oklab, var(--amber) 18%, transparent)" }}
            >
              <Utensils className="size-5" style={{ color: tint("amber") }} />
            </span>
            <span className="text-sm font-bold">Diet plan</span>
            <span className="-mt-2 text-[11px] text-muted-foreground">Today's 4 balanced meals</span>
          </Link>
        </div>
      </Section>

      <Section title="Up next" delay={400}>
        <div className="space-y-3">
          {MEALS.slice(1, 3).map((m, i) => (
            <Card key={m.id} className="flex items-center gap-3 !py-3" delay={440 + i * 70}>
              <span
                className="grid size-11 shrink-0 place-items-center rounded-2xl text-xl"
                style={{ background: `color-mix(in oklab, ${tint(m.tint)} 16%, transparent)` }}
              >
                {m.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{m.title}</p>
                <p className="truncate text-xs text-muted-foreground">{m.food}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-sm font-extrabold">{m.kcal}</p>
                <p className="text-[10px] text-muted-foreground">{m.time}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Today's tip" delay={560}>
        <Card className="flex gap-3">
          <Leaf className="size-5 shrink-0" style={{ color: tint("mint") }} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Fill half your plate with vegetables at lunch and dinner — it raises fiber intake and
            keeps your blood sugar steady through the afternoon.
          </p>
        </Card>
      </Section>
    </PhoneShell>
  );
}
