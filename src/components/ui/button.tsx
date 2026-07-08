"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-md hover:-translate-y-px active:translate-y-0 active:shadow-none select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#4F46E5] text-white hover:bg-[#3730A3] focus-visible:ring-[#4F46E5]",
        secondary:
          "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] focus-visible:ring-[#4F46E5]",
        ghost:
          "bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:ring-[#4F46E5] shadow-none hover:shadow-none hover:translate-y-0",
        danger:
          "bg-[#EF4444] text-white hover:bg-red-600 focus-visible:ring-[#EF4444]",
        outline:
          "bg-transparent text-[#4F46E5] border border-[#4F46E5] hover:bg-[#EEF2FF] focus-visible:ring-[#4F46E5]",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
