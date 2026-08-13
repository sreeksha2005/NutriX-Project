import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { Card, tint } from "@/components/ui-bits";
import { EMPTY_PROFILE, loadProfile, saveProfile, type Profile } from "@/lib/nutrix";

export const Route = createFileRoute("/edit-profile")({
  head: () => ({
    meta: [
      { title: "Edit Profile — NutriX" },
      {
        name: "description",
        content:
          "Update your NutriX name, age, gender, height, weight and health goal to personalize your diet plan.",
      },
      { property: "og:title", content: "Edit Profile — NutriX" },
      {
        property: "og:description",
        content: "Update your details so NutriX can personalize your diet plan.",
      },
    ],
  }),
  component: EditProfile,
});

const GOALS = ["Lose Weight", "Stay Fit", "Gain Muscle"];
const GENDERS = ["Male", "Female", "Other"];

function EditProfile() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Profile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(loadProfile()), []);

  const set = (k: keyof Profile, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("profileImage", String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(form);
    setSaved(true);
    setTimeout(() => navigate({ to: "/profile" }), 700);
  };

  return (
    <PhoneShell tabs={false}>
      <button
        onClick={() => navigate({ to: "/profile" })}
        className="press rise inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Back
      </button>

      <h1 className="rise mt-4 font-display text-2xl font-extrabold">Edit profile</h1>
      <p className="rise mt-1 text-sm text-muted-foreground">
        These values shape your calorie and macro targets.
      </p>

      <form onSubmit={submit}>
        <div className="rise mt-6 flex justify-center" style={{ animationDelay: "80ms" }}>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="press relative"
          >
            <span
              className="grid size-24 place-items-center overflow-hidden rounded-[2rem]"
              style={{ background: "var(--gradient-mint)" }}
            >
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" className="size-full object-cover" />
              ) : (
                <span className="font-display text-3xl font-extrabold text-primary-foreground">
                  {(form.name || "N").charAt(0).toUpperCase()}
                </span>
              )}
            </span>
            <span className="absolute -right-1 -bottom-1 grid size-9 place-items-center rounded-full border-4 border-background bg-secondary">
              <Camera className="size-3.5" />
            </span>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          </button>
        </div>

        <Card className="mt-6 space-y-3" delay={140}>
          <Input label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Sreeksha" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Age" value={form.age} onChange={(v) => set("age", v)} placeholder="21" />
            <Input
              label="Weight (kg)"
              value={form.weight}
              onChange={(v) => set("weight", v)}
              placeholder="58"
            />
          </div>
          <Input
            label="Height (cm)"
            value={form.height}
            onChange={(v) => set("height", v)}
            placeholder="165"
          />

          <Picker
            label="Gender"
            options={GENDERS}
            value={form.gender}
            onChange={(v) => set("gender", v)}
          />
          <Picker label="Goal" options={GOALS} value={form.goal} onChange={(v) => set("goal", v)} />
        </Card>

        <button
          type="submit"
          className="press mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-base font-bold text-primary-foreground"
          style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
        >
          {saved ? <Check className="size-4" /> : null}
          {saved ? "Saved!" : "Save changes"}
        </button>
      </form>
    </PhoneShell>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block rounded-2xl border border-border bg-secondary/60 px-4 py-3 transition-colors focus-within:border-primary/60">
      <span className="mb-1 block text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
      />
    </label>
  );
}

function Picker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className="press flex-1 rounded-2xl px-2 py-2.5 text-xs font-bold"
              style={{
                background: active
                  ? "color-mix(in oklab, var(--mint) 18%, transparent)"
                  : "var(--secondary)",
                color: active ? tint("mint") : "var(--muted-foreground)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
