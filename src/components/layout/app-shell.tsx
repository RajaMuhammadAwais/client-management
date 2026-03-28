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
    <div className="flex min-h-screen bg-[#fdfcfb] text-[#1a1a1a]" dir="ltr">
      <aside className="fixed inset-y-0 left-0 z-20 w-[56px] border-r border-[#efebe4] bg-white md:w-[64px]">
        {sidebar}
      </aside>
      <div className={cn("flex min-h-screen flex-1 flex-col pl-[56px] md:pl-[64px]", className)}>
        <header className="sticky top-0 z-20 flex min-h-[52px] border-b border-[#efebe4] bg-white">
          <div className="flex-1 px-4 md:px-6">{topbar}</div>
        </header>
        <main className="flex-1 overflow-x-hidden bg-[#fdfcfb] pb-[118px] md:pb-[132px]">{children}</main>
        {bottomBar ? (
          <div className="fixed bottom-6 left-1/2 z-20 w-full max-w-max -translate-x-1/2 px-4 md:bottom-10">
            {bottomBar}
          </div>
        ) : null}
      </div>
    </div>
  );
}
