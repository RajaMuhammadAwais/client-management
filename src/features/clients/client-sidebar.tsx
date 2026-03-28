import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandIcon as BrandIcon, sidebarItems } from "@/features/clients/data";

export function ClientSidebar() {
  return (
    <div className="flex h-screen w-full flex-col items-center py-[18px]">
      <div className="flex h-11 w-11 items-center justify-center">
        {/* Logo area */}
        <BrandIcon className="h-[22px] w-[22px] stroke-[1.75] text-[#1c1c1c]" />
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center gap-[10px]">
        {sidebarItems.map((Icon, index) => (
          <Button
            key={`${Icon.displayName ?? Icon.name}-${index}`}
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-[#4a4a4a] hover:bg-neutral-100"
            type="button"
          >
            <Icon className="h-[20px] w-[20px] stroke-[1.8]" />
          </Button>
        ))}
      </div>

      <Button variant="ghost" size="icon" className="mb-2 h-10 w-10 text-[#4a4a4a]" type="button">
        <CircleUserRound className="h-[20px] w-[20px] stroke-[1.8]" />
      </Button>
    </div>
  );
}
