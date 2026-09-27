import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <WorkspaceSidebar />

        <div className="min-w-0 flex-1">
          <MobileHeader />

          {children}

          <MobileNav />
        </div>
      </div>
    </div>
  );
}