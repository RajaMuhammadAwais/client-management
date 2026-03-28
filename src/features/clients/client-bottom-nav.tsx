import { footerTabs } from "@/features/clients/data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ClientBottomNav() {
  return (
    <nav className="flex h-[60px] items-center gap-2 rounded-[16px] bg-white px-6 shadow-nav">
      {footerTabs.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          type="button"
          className={cn(
            "flex h-[44px] items-center gap-2.5 rounded-[12px] px-5 font-medium transition-colors",
            typography.emphasis,
            active ? "bg-black text-white" : "text-[#4a4a4a] hover:bg-neutral-50",
          )}
        >
          <span>{label}</span>
          <Icon className="h-[20px] w-[20px] stroke-[1.8]" />
        </button>
      ))}
    </nav>
  );
}
