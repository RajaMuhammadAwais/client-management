import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { nationalities } from "@/features/clients/data";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface NationalitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function NationalitySelect({ value, onValueChange, placeholder }: NationalitySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex h-[32px] w-full items-center justify-between rounded-[7px] border border-[#efebe4] bg-white px-3 text-left outline-none transition-colors focus:border-black",
          !value ? "text-[#9c9c9c]" : "text-[#1a1a1a]",
          typography.body,
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate text-[13px]">{value || placeholder || "Select nationality"}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
        )}
      </button>

      {open ? (
        <div className="absolute top-full z-[100] mt-1 max-h-[168px] w-full overflow-y-auto rounded-[8px] border border-[#efebe4] bg-white p-1 shadow-lg">
          {nationalities.map((nationality) => {
            const isSelected = value === nationality;

            return (
              <button
                key={nationality}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[13px]",
                  isSelected
                    ? "bg-[#f3f3f3] font-medium text-[#1a1a1a]"
                    : "text-[#1a1a1a] hover:bg-neutral-50",
                )}
                onClick={() => {
                  onValueChange(nationality);
                  setOpen(false);
                }}
              >
                <span>{nationality}</span>
                {isSelected ? <Check className="h-4 w-4 text-[#1a1a1a] stroke-[2.2]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
