import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  startDate?: Date;
  endDate?: Date;
  onSelectRange?: (range: { start?: Date; end?: Date }) => void;
  // For backwards compatibility in AddClientDialog
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

const WEEKDAY_LABELS = ["Sa", "Fr", "Th", "We", "Tu", "Mo", "Su"];

export function CalendarContent({
  startDate,
  endDate,
  onSelectRange,
  selectedDate,
  onSelect,
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(startDate || selectedDate || new Date(2025, 5, 1)); // Default to June 2025 like screenshot

  useEffect(() => {
    if (startDate) {
      setViewDate(startDate);
    } else if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [startDate, selectedDate]);

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

    // Padding for previous month
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
      const isSelected =
        selectedDate?.toDateString() === date.toDateString() ||
        startDate?.toDateString() === date.toDateString() ||
        endDate?.toDateString() === date.toDateString();

      const isInRange =
        startDate &&
        endDate &&
        date > (startDate < endDate ? startDate : endDate) &&
        date < (startDate < endDate ? endDate : startDate);

      function handleSelect() {
        if (onSelectRange) {
          if (!startDate || (startDate && endDate)) {
            onSelectRange({ start: date, end: undefined });
          } else {
            // Second click
            onSelectRange({ start: startDate, end: date });
          }
        } else {
          onSelect?.(date);
        }
      }

      days.push(
        <button
          key={day}
          type="button"
          onClick={handleSelect}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-[8px] text-[12px] transition-colors relative",
            isSelected ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-neutral-50",
            isInRange && !isSelected ? "bg-[#f3f3f3]" : "",
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

      <div className="grid grid-cols-7 gap-y-1" dir="rtl">
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
