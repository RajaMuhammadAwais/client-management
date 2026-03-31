import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface NumericInputProps {
  label: string;
}

function NumericInput({ label }: NumericInputProps) {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-1">
      <span className={cn("text-[11px] text-[#6f6f6f]", typography.secondary)}>{label}</span>
      <div className="flex h-[38px] w-full min-w-0 items-center overflow-hidden rounded-[8px] border border-[#efebe4] bg-white sm:w-[124px]">
        <div className="flex items-center gap-1 border-r border-[#efebe4] px-2.5">
          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-neutral-50 hover:bg-neutral-100"
            onClick={() => setValue(Math.max(0, value - 1))}
            aria-label={`Decrease ${label.toLowerCase()} value`}
          >
            <Minus className="h-3 w-3 text-[#1a1a1a]" />
          </button>
          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-neutral-50 hover:bg-neutral-100"
            onClick={() => setValue(value + 1)}
            aria-label={`Increase ${label.toLowerCase()} value`}
          >
            <Plus className="h-3 w-3 text-[#1a1a1a]" />
          </button>
        </div>
        <span className="flex-1 text-center text-[13px] font-medium text-[#1a1a1a]">{value}</span>
      </div>
    </div>
  );
}

export function NumericalRangeSelector() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [direction:ltr]">
      <NumericInput label="From" />
      <NumericInput label="To" />
    </div>
  );
}
