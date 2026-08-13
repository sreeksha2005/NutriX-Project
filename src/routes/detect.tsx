import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ImagePlus, Sparkles, X } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, Section, tint } from "@/components/ui-bits";
import { DETECTABLE } from "@/lib/nutrix";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Detect Food — NutriX AI food scanner" },
      {
        name: "description",
        content:
          "Upload a food photo and let NutriX identify the dish and estimate calories, protein, carbs and fat.",
      },
      { property: "og:title", content: "Detect Food — NutriX AI food scanner" },
      {
        property: "og:description",
        content: "Upload a food photo and get instant calorie and macro estimates.",
      },
    ],
  }),
  component: Detect,
});

function Detect() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const analyze = () => {
    setScanning(true);
    setTimeout(() => navigate({ to: "/result" }), 1600);
  };

  return (
    <PhoneShell>
      <header className="rise">
        <h1 className="font-display text-2xl font-extrabold">Food detection</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a photo and NutriX analyzes its nutrition.
        </p>
      </header>

      <button
        type="button"
        onClick={() => !image && inputRef.current?.click()}
        className="press rise glass-card relative mt-6 grid h-64 w-full place-items-center overflow-hidden rounded-[2rem] border-dashed"
        style={{ animationDelay: "80ms", borderColor: "color-mix(in oklab, var(--mint) 35%, transparent)" }}
      >
        {image ? (
          <>
            <img src={image} alt="Selected food" className="size-full object-cover" />
            {scanning && (
              <>
                <span className="shimmer absolute inset-0" />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-2 text-xs font-bold">
                  Analyzing…
                </span>
              </>
            )}
            <span
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
              }}
              className="press absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/80"
            >
              <X className="size-4" />
            </span>
          </>
        ) : (
          <div className="px-8 text-center">
            <span
              className="pulse-ring mx-auto grid size-16 place-items-center rounded-3xl"
              style={{ background: "color-mix(in oklab, var(--mint) 18%, transparent)" }}
            >
              <ImagePlus className="size-7" style={{ color: tint("mint") }} />
            </span>
            <p className="mt-4 font-display text-base font-bold">Upload food image</p>
            <p className="mt-1 text-xs text-muted-foreground">JPG or PNG · from camera or gallery</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
      </button>

      <button
        type="button"
        disabled={!image || scanning}
        onClick={analyze}
        className="press mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-base font-bold text-primary-foreground disabled:opacity-40"
        style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
      >
        <Sparkles className="size-4" />
        {scanning ? "Analyzing…" : "Analyze nutrition"}
      </button>

      <Section title="What NutriX can detect" delay={200}>
        <div className="grid grid-cols-3 gap-3">
          {DETECTABLE.map((f, i) => (
            <Card key={f.label} className="!p-3 text-center" delay={240 + i * 60}>
              <p className="text-2xl">{f.emoji}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{f.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Tips for a better scan" delay={620}>
        <Card className="space-y-2">
          {[
            "Shoot from directly above the plate.",
            "Use natural light — avoid heavy shadows.",
            "Keep one dish per photo for best accuracy.",
          ].map((t) => (
            <p key={t} className="flex gap-2 text-xs text-muted-foreground">
              <span style={{ color: tint("mint") }}>•</span>
              {t}
            </p>
          ))}
        </Card>
      </Section>
    </PhoneShell>
  );
}
