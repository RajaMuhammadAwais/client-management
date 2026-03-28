import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandIcon as BrandIcon, sidebarItems } from "@/features/clients/data";

export function ClientSidebar() {
  return (
    <div className="flex h-full w-full flex-col items-center py-[14px] md:py-[18px]">
      <div className="flex h-10 w-10 items-center justify-center">
        <BrandIcon className="h-[20px] w-[20px] stroke-[1.75] text-[#1c1c1c]" />
      </div>

      <div className="mt-3 flex flex-1 flex-col items-center gap-[8px] md:mt-4 md:gap-[10px]">
        {sidebarItems.map((Icon, index) => (
          <Button
            key={`${Icon.displayName ?? Icon.name}-${index}`}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-[10px] text-[#4a4a4a] hover:bg-neutral-100"
            type="button"
          >
            <Icon className="h-[18px] w-[18px] stroke-[1.85]" />
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="mb-1 h-9 w-9 rounded-[10px] text-[#4a4a4a] hover:bg-neutral-100"
        type="button"
      >
        <CircleUserRound className="h-[18px] w-[18px] stroke-[1.85]" />
      </Button>
    </div>
  );
}
