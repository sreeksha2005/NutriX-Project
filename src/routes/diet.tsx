import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Droplets, Minus, Plus } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, Chip, Progress, Section, tint } from "@/components/ui-bits";
import { MEALS } from "@/lib/nutrix";

export const Route = createFileRoute("/diet")({
  head: () => ({
    meta: [
      { title: "Diet Plan — NutriX personalized daily meals" },
      {
        name: "description",
        content:
          "Your personalized NutriX meal plan: breakfast, lunch, snack and dinner with calories, macros and water tracking.",
      },
      { property: "og:title", content: "Diet Plan — NutriX personalized daily meals" },
      {
        property: "og:description",
        content: "Four balanced meals with calories, macros and hydration tracking.",
      },
    ],
  }),
  component: Diet,
});

function Diet() {
  const [water, setWater] = useState(2.5);
  const [done, setDone] = useState<string[]>(["breakfast"]);

  const total = MEALS.reduce((s, m) => s + m.kcal, 0);
  const eaten = MEALS.filter((m) => done.includes(m.id)).reduce((s, m) => s + m.kcal, 0);

  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <PhoneShell>
      <header className="rise">
        <h1 className="font-display text-2xl font-extrabold">Today's nutrition</h1>
        <p className="mt-1 text-sm text-muted-foreground">Personalized healthy meal plan</p>
      </header>

      <Card className="mt-6" delay={60}>
        <div className="flex items-end justify-between">
          <div>
            <Chip color="amber">Daily goal</Chip>
            <p className="mt-2 font-display text-3xl font-extrabold">
              {eaten}
              <span className="text-base font-bold text-muted-foreground"> / {total} kcal</span>
            </p>
          </div>
          <p className="font-display text-lg font-extrabold" style={{ color: tint("mint") }}>
            {Math.round((eaten / total) * 100)}%
          </p>
        </div>
        <div className="mt-3">
          <Progress value={(eaten / total) * 100} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { k: "Protein", v: "58 g", c: "mint" as const },
            { k: "Carbs", v: "188 g", c: "amber" as const },
            { k: "Fat", v: "43 g", c: "berry" as const },
          ].map((m) => (
            <div key={m.k} className="rounded-2xl bg-secondary/60 p-3 text-center">
              <p className="font-display text-sm font-extrabold" style={{ color: tint(m.c) }}>
                {m.v}
              </p>
              <p className="text-[10px] text-muted-foreground">{m.k}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-4 flex items-center gap-4" delay={140}>
        <span
          className="grid size-12 shrink-0 place-items-center rounded-2xl"
          style={{ background: "color-mix(in oklab, var(--sky) 18%, transparent)" }}
        >
          <Droplets className="size-5" style={{ color: tint("sky") }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Water intake</p>
          <p className="mb-2 text-xs text-muted-foreground">{water.toFixed(1)} / 3.0 L</p>
          <Progress value={(water / 3) * 100} color="sky" />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setWater((w) => Math.max(0, +(w - 0.25).toFixed(2)))}
            className="press grid size-8 place-items-center rounded-full bg-secondary"
          >
            <Minus className="size-4" />
          </button>
          <button
            onClick={() => setWater((w) => Math.min(3, +(w + 0.25).toFixed(2)))}
            className="press grid size-8 place-items-center rounded-full"
            style={{ background: "color-mix(in oklab, var(--sky) 25%, transparent)" }}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </Card>

      <Section title="Meal plan" delay={220}>
        <div className="space-y-3">
          {MEALS.map((m, i) => {
            const isDone = done.includes(m.id);
            return (
              <Card key={m.id} delay={260 + i * 70} className="!p-0 overflow-hidden">
                <button
                  onClick={() => toggle(m.id)}
                  className="press flex w-full items-center gap-3 p-4 text-left"
                >
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-2xl text-2xl"
                    style={{ background: `color-mix(in oklab, ${tint(m.tint)} 16%, transparent)` }}
                  >
                    {m.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold">{m.title}</p>
                      <span className="text-[10px] text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{m.food}</p>
                    <div className="mt-2 flex gap-2 text-[10px] text-muted-foreground">
                      <span>P {m.macros.p}g</span>
                      <span>C {m.macros.c}g</span>
                      <span>F {m.macros.f}g</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-sm font-extrabold">{m.kcal}</p>
                    <p className="text-[10px] text-muted-foreground">kcal</p>
                    <span
                      className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold"
                      style={{
                        color: isDone ? tint("mint") : "var(--muted-foreground)",
                        background: isDone
                          ? "color-mix(in oklab, var(--mint) 18%, transparent)"
                          : "var(--secondary)",
                      }}
                    >
                      {isDone ? "Eaten" : "Mark"}
                    </span>
                  </div>
                </button>
              </Card>
            );
          })}
        </div>
      </Section>
    </PhoneShell>
  );
}
