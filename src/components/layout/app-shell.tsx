import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  bottomBar?: ReactNode;
  className?: string;
}

export function AppShell({ sidebar, topbar, children, bottomBar, className }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#fdfcfb]">
      <aside className="fixed bottom-0 left-0 top-0 w-[64px] border-r border-[#efebe4] bg-white">
        {sidebar}
      </aside>
      <div className={cn("flex min-h-screen flex-1 flex-col pl-[64px]", className)}>
        <header className="sticky top-0 z-10 flex h-[54px] border-b border-[#efebe4] bg-white">
          <div className="flex-1 px-6">{topbar}</div>
        </header>
        <main className="flex-1 overflow-x-hidden bg-[#fdfcfb]">{children}</main>
        {bottomBar ? <div className="fixed bottom-10 left-1/2 -translate-x-1/2">{bottomBar}</div> : null}
      </div>
    </div>
  );
}
