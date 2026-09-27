"use client";

import Link from "next/link";
import { Menu, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4 md:hidden">
      <Link href="/meetings" className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background">
          <Sparkles className="size-3.5" />
        </div>

        <span className="text-sm font-semibold tracking-tight">EchoIQ</span>
      </Link>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </Button>
      </div>
    </header>
  );
}