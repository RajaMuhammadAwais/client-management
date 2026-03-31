import { footerTabs } from "@/features/clients/data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ClientBottomNav() {
  return (
    <nav className="scrollbar-hide flex w-full max-w-[min(100vw-24px,648px)] items-center gap-1.5 overflow-x-auto rounded-[16px] bg-white px-2 py-2.5 shadow-nav sm:max-w-[min(100vw-32px,648px)] sm:px-3 sm:py-3">
      {footerTabs.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className={cn(
            "flex h-[42px] shrink-0 items-center gap-2 rounded-[11px] px-3.5 font-medium transition-colors md:px-5",
            typography.emphasis,
            active ? "bg-black text-white" : "text-[#4a4a4a] hover:bg-neutral-50",
          )}
        >
          <span className="text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">{label}</span>
          <Icon className="h-[18px] w-[18px] stroke-[1.8]" />
        </button>
      ))}
    </nav>
  );
}
