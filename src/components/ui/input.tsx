import * as React from "react";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block h-16 w-full rounded-[14px] border border-[var(--input)] bg-white px-5 py-0 text-[var(--foreground)] shadow-none outline-none transition-colors placeholder:text-[#9d9d9d] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          typography.body,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
