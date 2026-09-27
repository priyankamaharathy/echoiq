"use client";

import Link from "next/link";
import { CalendarDays, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
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
  {
    label: "New meeting",
    href: "/meetings/new",
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex min-w-16 flex-col items-center gap-1 rounded-lg px-3 py-2 text-[10px] transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {item.icon && <item.icon className="size-4" />}

              <span>{item.label}</span>
            </Link>
          );
        })}

        <Link
          href="/meetings/new"
          className="flex size-10 items-center justify-center rounded-full bg-foreground text-background"
          aria-label="New meeting"
        >
          <Plus className="size-4" />
        </Link>
      </div>
    </nav>
  );
}