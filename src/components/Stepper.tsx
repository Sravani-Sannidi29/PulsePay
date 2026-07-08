import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isCurrent = index === current;
        const isFuture = index > current;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isCompleted && "bg-[#4F46E5] text-white",
                  isCurrent && "bg-white border-2 border-[#4F46E5] text-[#4F46E5] shadow-sm",
                  isFuture && "bg-[#F1F5F9] border-2 border-[#E2E8F0] text-[#94A3B8]"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "hidden sm:block text-xs font-medium whitespace-nowrap transition-colors",
                  isCompleted && "text-[#4F46E5]",
                  isCurrent && "text-[#0F172A]",
                  isFuture && "text-[#94A3B8]"
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 mt-[-12px] sm:mt-[-20px]">
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors duration-300",
                    index < current ? "bg-[#4F46E5]" : "bg-[#E2E8F0]"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
