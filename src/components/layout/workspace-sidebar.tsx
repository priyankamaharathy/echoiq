"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Plus,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    label: "Meetings",
    href: "/meetings",
    icon: CalendarDays,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center px-5">
        <Link href="/meetings" className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background">
            <Sparkles className="size-3.5" />
          </div>

          <span className="text-sm font-semibold tracking-tight">
            EchoIQ
          </span>
        </Link>
      </div>

      <div className="px-3">
        <Link
          href="/meetings/new"
          className="flex h-10 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New meeting
        </Link>
      </div>

      <nav className="mt-6 px-3">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto px-3 pb-4">
        <Separator className="mb-3" />

        <Link
          href="/settings"
          className="flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <Settings className="size-4" />
          Settings
        </Link>

        <div className="mt-3 flex items-center gap-3 rounded-lg px-2.5 py-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
            P
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium">Priyanka</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Personal workspace
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}