import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Camera, Utensils, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/detect", label: "Detect", icon: Camera },
  { to: "/diet", label: "Diet", icon: Utensils },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
      <div className="glass-card flex items-center justify-between rounded-3xl px-2 py-2">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "press relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold",
                active ? "text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {active && (
                <span
                  className="pop absolute inset-0 rounded-2xl"
                  style={{ background: "var(--gradient-mint)", boxShadow: "var(--shadow-glow)" }}
                />
              )}
              <Icon className="relative z-10 size-5" strokeWidth={active ? 2.6 : 2} />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PhoneShell({
  children,
  tabs = true,
}: {
  children: ReactNode;
  tabs?: boolean;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[oklch(0.14_0.01_250)] p-0 sm:p-8">
      <div className="relative w-full max-w-[420px] overflow-hidden bg-background sm:rounded-[2.75rem] sm:border-[10px] sm:border-[oklch(0.24_0.01_250)] sm:shadow-[0_50px_90px_-40px_rgba(0,0,0,0.9)]">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-mint)" }}
        />
        <div className="relative h-[100dvh] sm:h-[820px]">
          <div
            className={cn(
              "no-scrollbar relative h-full overflow-y-auto px-5 pt-8",
              tabs ? "pb-32" : "pb-10",
            )}
          >
            {children}
          </div>
          {tabs && <TabBar />}
        </div>
      </div>
    </div>
  );
}
