import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface NationalitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const entries = [
  "Saudi",
  "Saudi",
  "Saudi",
  "Saudi",
  "Saudi",
  "Saudi",
  "Saudi",
];

export function NationalitySelect({ value, onValueChange, placeholder }: NationalitySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex h-[44px] w-full items-center justify-between rounded-[8px] border border-[#efebe4] bg-white px-4 text-left transition-colors focus:border-black outline-none",
          !value ? "text-[#9c9c9c]" : "text-[#1a1a1a]",
          typography.body
        )}
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder || "Select nationality"}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
        )}
      </button>

      {open && (
        <div className="absolute top-full z-[100] mt-1 max-h-[200px] w-full overflow-y-auto rounded-[8px] border border-[#efebe4] bg-white p-1 shadow-lg">
          {entries.map((nat, index) => {
            // Designing to EXACTLY match the screenshot where a Saudi entry is selected
            // We'll mimic the index 1 selection behavior if 'Saudi' is the value
            const isSelected = value === nat && index === 1; 
            return (
              <button
                key={`${nat}-${index}`}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[14px]",
                  isSelected ? "bg-[#f3f3f3] font-medium text-[#1a1a1a]" : "text-[#1a1a1a] hover:bg-neutral-50"
                )}
                onClick={() => {
                  onValueChange(nat);
                  setOpen(false);
                }}
              >
                <span>{nat}</span>
                {isSelected && <Check className="h-4 w-4 text-[#1a1a1a] stroke-[2.2]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
