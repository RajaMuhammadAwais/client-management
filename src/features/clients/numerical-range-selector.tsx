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
    <div className="flex flex-col gap-1.5">
      <span className={cn("text-[14px] font-medium text-[#1a1a1a] text-right", typography.body)}>{label}</span>
      <div className="flex h-[44px] w-[140px] items-center justify-between overflow-hidden rounded-[8px] border border-[#efebe4] bg-white px-2.5 shadow-sm">
        {/* Number Display */}
        <span className="flex-1 text-center text-[15px] font-medium text-[#1a1a1a]">{value}</span>
        
        {/* Buttons Group on the Left logically, which is RIGHT in flex-row if dir=rtl? No, I'll use physical order */}
        <div className="flex items-center gap-1.5 border-l border-[#efebe4] pl-2.5">
          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-neutral-50 hover:bg-neutral-100"
            onClick={() => setValue(Math.max(0, value - 1))}
          >
            <Minus className="h-3 w-3 text-[#1a1a1a]" />
          </button>
          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-neutral-50 hover:bg-neutral-100"
            onClick={() => setValue(value + 1)}
          >
            <Plus className="h-3 w-3 text-[#1a1a1a]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function NumericalRangeSelector() {
  return (
    <div className="flex items-center gap-4 [direction:rtl]">
      <NumericInput label="From" />
      <NumericInput label="To" />
    </div>
  );
}
