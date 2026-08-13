import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Lightbulb, Plus } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, Chip, Progress, Ring, Section, tint } from "@/components/ui-bits";
import { DETECTION_RESULT as R } from "@/lib/nutrix";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Analysis Result — NutriX nutrition breakdown" },
      {
        name: "description",
        content:
          "NutriX detection result with calories, protein, carbs, fat, fiber and personalized improvement tips.",
      },
      { property: "og:title", content: "Analysis Result — NutriX nutrition breakdown" },
      {
        property: "og:description",
        content: "Calories, macros and personalized tips for your scanned meal.",
      },
    ],
  }),
  component: Result,
});

function Result() {
  return (
    <PhoneShell tabs={false}>
      <Link
        to="/detect"
        className="press rise inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Back
      </Link>

      <div className="rise mt-5 flex items-center gap-2" style={{ animationDelay: "60ms" }}>
        <CheckCircle2 className="size-5" style={{ color: tint("mint") }} />
        <Chip>{R.confidence}% confidence</Chip>
      </div>

      <h1 className="rise mt-3 font-display text-2xl font-extrabold" style={{ animationDelay: "100ms" }}>
        {R.name}
      </h1>
      <p className="rise mt-1 text-xs text-muted-foreground" style={{ animationDelay: "120ms" }}>
        {R.serving}
      </p>

      <Card className="mt-6 flex items-center gap-5" delay={160}>
        <Ring value={R.confidence} label={`${R.kcal}`} sub="kcal" />
        <div className="min-w-0">
          <p className="text-sm font-bold">Energy estimate</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{R.verdict}</p>
          <button
            className="press mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-primary-foreground"
            style={{ background: "var(--gradient-mint)" }}
          >
            <Plus className="size-3.5" /> Add to diary
          </button>
        </div>
      </Card>

      <Section title="Macro breakdown" delay={240}>
        <Card className="space-y-4">
          {R.macros.map((m, i) => (
            <div key={m.key} className="rise" style={{ animationDelay: `${280 + i * 80}ms` }}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold">{m.key}</span>
                <span className="font-display font-extrabold" style={{ color: tint(m.color) }}>
                  {m.value}
                  {m.unit}
                </span>
              </div>
              <Progress value={m.pct} color={m.color} />
            </div>
          ))}
        </Card>
      </Section>

      <Section title="How to make it better" delay={520}>
        <div className="space-y-3">
          {R.tips.map((t, i) => (
            <Card key={t} className="flex gap-3 !py-3" delay={560 + i * 80}>
              <Lightbulb className="size-4 shrink-0" style={{ color: tint("amber") }} />
              <p className="text-xs leading-relaxed text-muted-foreground">{t}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Link
        to="/diet"
        className="press mt-6 flex w-full items-center justify-center rounded-2xl py-4 font-display text-base font-bold text-primary-foreground"
        style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
      >
        View today's diet plan
      </Link>
    </PhoneShell>
  );
}
