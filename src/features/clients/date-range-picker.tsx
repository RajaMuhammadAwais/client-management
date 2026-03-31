import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
}

export function DateRangePicker({ startDate, endDate }: DateRangePickerProps) {
  const formatDate = (date?: Date) => {
    if (!date) return "--/--/----";
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [direction:ltr]">
      <DateInput label="From" value={formatDate(startDate)} />
      <DateInput label="To" value={formatDate(endDate)} />
    </div>
  );
}

function DateInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={cn("text-[11px] text-[#6f6f6f]", typography.secondary)}>{label}</span>
      <div className="flex h-[38px] w-full min-w-0 items-center justify-between rounded-[8px] border border-[#efebe4] bg-white px-3 sm:w-[124px]">
        <span className={cn("text-[12px]", value === "--/--/----" ? "text-[#9c9c9c]" : "text-[#1a1a1a]")}>
          {value}
        </span>
        <ChevronDown className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
      </div>
    </div>
  );
}
