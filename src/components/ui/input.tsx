import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#0F172A] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-11 rounded-xl border bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFC]",
              error
                ? "border-[#EF4444] focus:ring-red-200 focus:border-[#EF4444]"
                : "border-[#E2E8F0]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-[#EF4444]">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1.5 text-sm text-[#64748B]">{helper}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
