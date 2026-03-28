import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarContent({ selectedDate, onSelect }: CalendarProps) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date(2025, 3, 1));

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [selectedDate]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const prevMonthDays = (year: number, month: number) => new Date(year, month, 0).getDate();

  function navigateMonth(step: number) {
    setViewDate(new Date(viewYear, viewMonth + step, 1));
  }

  function renderDays() {
    const days = [];
    const totalDays = daysInMonth(viewYear, viewMonth);
    const firstDay = startDayOfMonth(viewYear, viewMonth);
    const previousMonthTotal = prevMonthDays(viewYear, viewMonth);

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      days.push(
        <div
          key={`prev-${index}`}
          className="flex h-8 w-8 items-center justify-center text-[12px] text-[#b0b0b0]"
        >
          {previousMonthTotal - index}
        </div>,
      );
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => onSelect?.(date)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-[8px] text-[12px] transition-colors",
            isSelected ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-neutral-50",
          )}
        >
          {day}
        </button>,
      );
    }

    const remaining = 42 - days.length;
    for (let day = 1; day <= remaining; day += 1) {
      days.push(
        <div
          key={`next-${day}`}
          className="flex h-8 w-8 items-center justify-center text-[12px] text-[#b0b0b0]"
        >
          {day}
        </div>,
      );
    }

    return days;
  }

  return (
    <div className="w-[294px] select-none rounded-[10px] border border-[#efebe4] bg-white p-3 shadow-panel [direction:ltr]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigateMonth(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-[8px] hover:bg-neutral-50"
        >
          <ChevronLeft className="h-4 w-4 text-[#1a1a1a]" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-[8px] border border-[#efebe4] px-3 text-[13px] font-medium text-[#1a1a1a]"
          >
            <span>{MONTHS[viewMonth]}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#8a8a8a]" />
          </button>
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-[8px] border border-[#efebe4] px-3 text-[13px] font-medium text-[#1a1a1a]"
          >
            <span>{viewYear}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#8a8a8a]" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigateMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-[8px] hover:bg-neutral-50"
        >
          <ChevronRight className="h-4 w-4 text-[#1a1a1a]" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {WEEKDAY_LABELS.map((day) => (
          <div key={day} className="flex h-8 w-8 items-center justify-center text-[12px] text-[#8a8a8a]">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
}
