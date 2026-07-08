import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({ initials, color, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white shrink-0",
        sizeMap[size],
        className
      )}
      style={{ backgroundColor: color || "#4F46E5" }}
    >
      {initials}
    </div>
  );
}
