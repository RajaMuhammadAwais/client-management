import { footerTabs } from "@/features/clients/data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ClientBottomNav() {
  return (
    <nav className="flex max-w-[min(100vw-32px,648px)] items-center gap-1.5 overflow-x-auto rounded-[16px] bg-white px-3 py-3 shadow-nav">
      {footerTabs.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          type="button"
          className={cn(
            "flex h-[42px] shrink-0 items-center gap-2 rounded-[11px] px-4 font-medium transition-colors md:px-5",
            typography.emphasis,
            active ? "bg-black text-white" : "text-[#4a4a4a] hover:bg-neutral-50",
          )}
        >
          <Icon className="h-[18px] w-[18px] stroke-[1.8]" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
