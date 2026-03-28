import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface CalendarProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  mode?: "gregorian" | "hijri";
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function CalendarContent({ selectedDate, onSelect }: CalendarProps) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date(2025, 3, 1)); // Default to April 2025 as per screenshot

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const startDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();
  const prevMonthDays = (y: number, m: number) => new Date(y, m, 0).getDate();

  const navigateMonth = (step: number) => {
    setViewDate(new Date(viewYear, viewMonth + step, 1));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(viewYear, viewMonth);
    const firstDayStdIndex = startDayOfMonth(viewYear, viewMonth);
    const prevTotal = prevMonthDays(viewYear, viewMonth);

    // Grayed out days from previous month
    for (let i = firstDayStdIndex - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="flex h-10 w-10 items-center justify-center text-[13px] text-[#9c9c9c]">
          {prevTotal - i}
        </div>
      );
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const isSelected = selectedDate?.toDateString() === dateObj.toDateString();

      days.push(
        <button
          key={d}
          type="button"
          onClick={() => onSelect?.(dateObj)}
          className={cn(
            "flex h-10 w-10 items-center justify-center text-[13px] transition-colors rounded-[8px]",
            isSelected ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-neutral-50"
          )}
        >
          {d}
        </button>
      );
    }

    // Grayed out days from next month
    const remaining = 42 - days.length; // 6 rows
    for (let d = 1; d <= remaining; d++) {
      days.push(
        <div key={`next-${d}`} className="flex h-10 w-10 items-center justify-center text-[13px] text-[#9c9c9c]">
          {d}
        </div>
      );
    }

    return days;
  };

  const labels = ["on", "Fr", "Th", "We", "You", "For", "Are"];

  return (
    <div className="w-[310px] select-none rounded-[12px] border border-[#efebe4] bg-white p-4 shadow-panel [direction:ltr]">
      <div className="mb-6 flex items-center justify-between">
        <button type="button" onClick={() => navigateMonth(-1)} className="p-1 hover:bg-neutral-50 rounded-md">
          <ChevronLeft className="h-4 w-4 text-[#1a1a1a]" />
        </button>
        
        <div className="flex gap-2">
           <div className="flex items-center gap-1 rounded-[8px] border border-[#efebe4] px-3 py-1.5 text-[14px] font-medium text-[#1a1a1a]">
             <ChevronDown className="h-3.5 w-3.5 text-[#1a1a1a]" />
             {viewYear}
           </div>
           <div className="flex items-center gap-1 rounded-[8px] border border-[#efebe4] px-3 py-1.5 text-[14px] font-medium text-[#1a1a1a]">
             <ChevronDown className="h-3.5 w-3.5 text-[#1a1a1a]" />
             {MONTHS[viewMonth]}
           </div>
        </div>

        <button type="button" onClick={() => navigateMonth(1)} className="p-1 hover:bg-neutral-50 rounded-md">
          <ChevronRight className="h-4 w-4 text-[#1a1a1a]" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {labels.map((day) => (
          <div key={day} className="flex h-10 w-10 items-center justify-center text-[14px] text-[#8a8a8a]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {renderDays()}
      </div>
    </div>
  );
}
