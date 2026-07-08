"use client";

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, "").split("").slice(0, length);
  const allFilled = value.length === length;

  function handleChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;

    const newDigit = raw[raw.length - 1];
    const newValue =
      digits.slice(0, index).join("") +
      newDigit +
      digits.slice(index + 1).join("");
    const trimmed = newValue.replace(/\s/g, "").slice(0, length);
    onChange(trimmed);

    // Auto-advance
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const newValue =
          digits.slice(0, index).join("") +
          "" +
          digits.slice(index + 1).join("");
        onChange(newValue.replace(/\s/g, "").slice(0, length));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newValue =
          digits.slice(0, index - 1).join("") +
          "" +
          digits.slice(index).join("");
        onChange(newValue.replace(/\s/g, "").slice(0, length));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted.padEnd(length, "").slice(0, length).replace(/\s/g, ""));
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  }

  return (
    <div
      data-testid="otp-input"
      className="flex items-center justify-center gap-2 sm:gap-3"
    >
      {Array.from({ length }).map((_, index) => {
        const digit = digits[index] || "";
        const isFilled = digit !== "" && digit !== " ";
        const isCurrent = !isFilled && index === value.length;

        return (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit === " " ? "" : digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "w-11 h-14 sm:w-12 sm:h-16 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-150 font-mono",
              "focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20",
              isFilled && allFilled
                ? "border-[#10B981] bg-emerald-50 text-[#10B981]"
                : isFilled
                ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                : isCurrent
                ? "border-[#4F46E5] bg-white"
                : "border-[#E2E8F0] bg-white text-[#0F172A]"
            )}
          />
        );
      })}
    </div>
  );
}
