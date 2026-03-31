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
    <div className="flex flex-col gap-1.25">
      <span className={cn("text-[12px] font-medium text-[#1a1a1a]", typography.body)}>{label}</span>
      <div className="flex h-[36px] w-[110px] items-center overflow-hidden rounded-[7px] border border-[#efebe4] bg-white transition-colors focus-within:border-[#cbcbcb]">
        <input
          className={cn(
            "flex h-full w-[40px] flex-1 border-none bg-transparent pl-2.5 pr-1 text-left text-[13.5px] text-[#1a1a1a] outline-none placeholder:text-[#ababab]",
            typography.body
          )}
          value={value || ""}
          placeholder="0"
          onChange={(e) => {
            const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
            setValue(isNaN(val) ? 0 : val);
          }}
          dir="ltr"
        />
        <div className="h-[20px] w-[1px] bg-[#efebe4]" />
        <button
          type="button"
          className="flex h-full w-[31px] shrink-0 items-center justify-center hover:bg-neutral-50 transition-colors"
          onClick={() => setValue(Math.max(0, value - 1))}
        >
          <Minus className="h-3.5 w-3.5 text-[#1a1a1a]" />
        </button>
        <div className="h-[20px] w-[1px] bg-[#efebe4]" />
        <button
          type="button"
          className="flex h-full w-[31px] shrink-0 items-center justify-center hover:bg-neutral-50 transition-colors"
          onClick={() => setValue(value + 1)}
        >
          <Plus className="h-3.5 w-3.5 text-[#1a1a1a]" />
        </button>
      </div>
    </div>
  );
}

export function NumericalRangeSelector() {
  return (
    <div className="flex items-center gap-2.5 [direction:ltr]">
      <NumericInput label="From" />
      <NumericInput label="To" />
    </div>
  );
}
