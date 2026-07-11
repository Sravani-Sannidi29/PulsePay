import { Check } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";
import type { Recipient } from "@/data/mock";

interface RecipientCardProps {
  recipient: Recipient;
  selected: boolean;
  onClick: () => void;
}

export function RecipientCard({ recipient, selected, onClick }: RecipientCardProps) {
  return (
    <button
      type="button"
      data-testid="recipient-card"
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/30",
        selected
          ? "border-[#4F46E5] bg-[#EEF2FF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar
          initials={recipient.initials}
          color={recipient.color}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#0F172A] truncate">
              {recipient.name}
            </p>
            {selected && (
              <div className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">{recipient.bank}</p>
          <p className="text-xs text-[#94A3B8]">{recipient.account}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">Last: ${recipient.lastAmount.toFixed(2)}</span>
        <span className="text-xs text-[#94A3B8]">{recipient.lastDate}</span>
      </div>
      {recipient.frequent && (
        <div className="mt-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
            ★ Frequent
          </span>
        </div>
      )}
    </button>
  );
}
