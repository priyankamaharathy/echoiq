import { Command, Search } from "lucide-react";

export function WorkspaceHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">Workspace</span>
        <span className="text-border">/</span>
        <span className="text-foreground">Meetings</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden h-9 items-center gap-2 rounded-lg border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:flex">
          <Search className="size-3.5" />
          <span>Search</span>

          <span className="ml-2 flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px]">
            <Command className="size-2.5" />
            K
          </span>
        </button>

        <button className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          P
        </button>
      </div>
    </header>
  );
}