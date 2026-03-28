import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface DateInputProps {
  label: string;
}

function DateInput({ label }: DateInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className={cn("text-[11px] text-[#6f6f6f]", typography.secondary)}>{label}</span>
      <div className="flex h-[38px] w-[124px] items-center justify-between rounded-[8px] border border-[#efebe4] bg-white px-3">
        <ChevronDown className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
        <span className="text-[12px] text-[#9c9c9c]">--/--/----</span>
      </div>
    </div>
  );
}

export function DateRangePicker() {
  return (
    <div className="flex items-center gap-3 [direction:ltr]">
      <DateInput label="From" />
      <DateInput label="To" />
    </div>
  );
}
