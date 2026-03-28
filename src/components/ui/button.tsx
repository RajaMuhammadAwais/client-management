import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-[14px] ${typography.body} font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-black/92",
        outline:
          "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--muted)]",
        ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
        icon: "bg-transparent text-[#404040] hover:bg-[var(--muted)]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: `h-10 px-4 py-2 ${typography.secondary}`,
        lg: "h-[52px] px-8 py-3",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
