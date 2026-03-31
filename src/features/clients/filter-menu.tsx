import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { serviceTypes } from "@/features/clients/data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { CalendarContent } from "./calendar-content";
import { DateRangePicker } from "./date-range-picker";
import { NumericalRangeSelector } from "./numerical-range-selector";

export function FilterMenu() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(["Meetings"]));
  const [requestRange, setRequestRange] = useState<{ start?: Date; end?: Date }>({});
  const [workingRange, setWorkingRange] = useState<{ start?: Date; end?: Date }>({});

  function toggleService(service: string) {
    const next = new Set(selectedServices);
    if (next.has(service)) {
      next.delete(service);
    } else {
      next.add(service);
    }
    setSelectedServices(next);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-[36px] min-w-[110px] gap-2.5 rounded-[8px] border-[#efebe4] px-4 font-medium text-[#1a1a1a] hover:bg-neutral-50",
            typography.body,
          )}
        >
          <span>Filter</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[170px] rounded-[10px] border-[#efebe4] p-1.5 shadow-panel"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn("min-h-[40px] cursor-pointer rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}
          >
            Request Date
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className="w-[326px] rounded-[10px] border-[#efebe4] p-3 shadow-xl"
            sideOffset={10}
          >
            <div className="flex flex-col gap-3" dir="rtl">
              <DateRangePicker startDate={requestRange.start} endDate={requestRange.end} />
              <CalendarContent
                startDate={requestRange.start}
                endDate={requestRange.end}
                onSelectRange={(range) => setRequestRange(range)}
              />
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn("min-h-[40px] cursor-pointer rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}
          >
            Number of services
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className="w-[212px] rounded-[10px] border-[#efebe4] p-3 shadow-xl"
            sideOffset={10}
          >
            <NumericalRangeSelector />
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn("min-h-[40px] cursor-pointer rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}
          >
            Type of service
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className="w-[212px] rounded-[10px] border-[#efebe4] p-1.5 shadow-xl"
            sideOffset={10}
          >
            {serviceTypes.map((service) => (
              <DropdownMenuItem
                key={service}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-[8px] px-3 py-2.5 outline-none focus:bg-[#f3f3f3]",
                  typography.body,
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  toggleService(service);
                }}
              >
                <span className="text-[13px]">{service}</span>
                <Checkbox
                  checked={selectedServices.has(service)}
                  className="h-[18px] w-[18px] rounded-[5px] border-[#efebe4] data-[state=checked]:border-black data-[state=checked]:bg-black"
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn("min-h-[40px] cursor-pointer rounded-[8px] px-3 outline-none focus:bg-[#f3f3f3]", typography.body)}
          >
            Working period
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className="w-[326px] rounded-[10px] border-[#efebe4] p-3 shadow-xl"
            sideOffset={10}
          >
            <div className="flex flex-col gap-3" dir="rtl">
              <DateRangePicker startDate={workingRange.start} endDate={workingRange.end} />
              <CalendarContent
                startDate={workingRange.start}
                endDate={workingRange.end}
                onSelectRange={(range) => setWorkingRange(range)}
              />
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <div className="my-1.5 border-t border-[#efebe4]" />

        <DropdownMenuItem
          className={cn(
            "flex min-h-[40px] cursor-pointer items-center justify-end rounded-[8px] px-3 font-medium text-[#ff1f1f] outline-none hover:bg-red-50/50",
            typography.secondary,
          )}
        >
          <span>Cancel all categories</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
