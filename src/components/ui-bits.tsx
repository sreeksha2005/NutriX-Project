import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TINTS = {
  mint: "var(--mint)",
  amber: "var(--amber)",
  berry: "var(--berry)",
  sky: "var(--sky)",
} as const;

export type Tint = keyof typeof TINTS;

export function tint(t: Tint) {
  return TINTS[t];
}

export function Section({
  title,
  action,
  children,
  delay = 0,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <section className="rise mt-7" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("glass-card rise rounded-3xl p-4", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Progress({ value, color = "mint" }: { value: number; color?: Tint }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full transition-[width] duration-1000 ease-out"
        style={{ width: `${Math.min(100, value)}%`, background: tint(color) }}
      />
    </div>
  );
}

export function Ring({
  value,
  size = 132,
  label,
  sub,
}: {
  value: number;
  size?: number;
  label: string;
  sub: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--mint)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (Math.min(100, value) / 100) * c}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-2xl font-extrabold">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

export function Chip({ children, color = "mint" }: { children: ReactNode; color?: Tint }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] font-bold"
      style={{
        color: tint(color),
        background: `color-mix(in oklab, ${tint(color)} 16%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}
