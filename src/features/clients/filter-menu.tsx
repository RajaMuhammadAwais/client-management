import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { CalendarContent } from "./calendar-content";
import { NumericalRangeSelector } from "./numerical-range-selector";
import { DateRangePicker } from "./date-range-picker";

export function FilterMenu() {
  const serviceTypes = [
    "Negotiations",
    "contracts",
    "Meetings",
    "invoice",
    "Power of Attorney",
    "Contract review",
  ];

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(["Meetings", "Power of Attorney"]));

  const toggleService = (service: string) => {
    const next = new Set(selectedServices);
    if (next.has(service)) next.delete(service);
    else next.add(service);
    setSelectedServices(next);
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-[44px] min-w-[110px] flex-row-reverse gap-4 rounded-[12px] border-[#efebe4] px-4 font-medium text-[#1a1a1a] hover:bg-neutral-50",
            typography.body,
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-[16px]">Filter</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[210px] rounded-[12px] border-[#efebe4] p-1.5 shadow-panel"
      >
        {/* Request Date */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={cn("flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}>
            Request Date
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[330px] rounded-[12px] border-[#efebe4] p-4 shadow-xl" sideOffset={12}>
            <div className="flex flex-col gap-6">
              <DateRangePicker />
              <div className="flex justify-center border-t border-[#efebe4] pt-5">
                <CalendarContent />
              </div>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Number of services */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={cn("flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}>
            Number of services
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[330px] rounded-[12px] border-[#efebe4] p-4 shadow-xl" sideOffset={12}>
             <NumericalRangeSelector />
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Type of service */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={cn("flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}>
            Type of service
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[220px] rounded-[12px] border-[#efebe4] p-1 shadow-xl" sideOffset={12}>
            {serviceTypes.map((service) => (
              <DropdownMenuItem
                key={service}
                className={cn("flex cursor-pointer items-center justify-between rounded-[8px] px-3 py-3 outline-none focus:bg-[#f3f3f3]", typography.body)}
                onSelect={(e) => {
                  e.preventDefault();
                  toggleService(service);
                }}
              >
                <Checkbox checked={selectedServices.has(service)} className="h-[20px] w-[20px] rounded-[6px] border-[#efebe4] data-[state=checked]:bg-black data-[state=checked]:border-black" />
                <span className="text-right">{service}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Working period */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className={cn("flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}>
            Working period
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[330px] rounded-[12px] border-[#efebe4] p-4 shadow-xl" sideOffset={12}>
            <div className="flex flex-col gap-6">
              <DateRangePicker />
              <div className="flex justify-center border-t border-[#efebe4] pt-5">
                <CalendarContent />
              </div>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <div className="border-t border-[#efebe4] my-2" />

        <DropdownMenuItem
          className={cn("flex min-h-[44px] cursor-pointer items-center justify-end rounded-[8px] px-3 text-[#ff1f1f] outline-none hover:bg-red-50/50 font-medium", typography.secondary)}
        >
          <span>Cancel all categories</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
