"use client";

import { useState } from "react";
import { Snowflake, Lock, Info, RefreshCw, Plus, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PaymentCard } from "@/components/PaymentCard";
import { Badge } from "@/components/ui/badge";
import { cards } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function CardsPage() {
  const [frozenCards, setFrozenCards] = useState<Set<string>>(new Set());

  function toggleFreeze(cardId: string) {
    setFrozenCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  }

  return (
    <AppShell title="My Cards">
      <div className="space-y-8">
        {cards.map((card) => {
          const isFrozen = frozenCards.has(card.id);
          const spentPct = (card.spent / card.limit) * 100;

          return (
            <div key={card.id} className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden">
              {/* Card Visual */}
              <div className={cn("p-5 sm:p-6 relative", isFrozen && "opacity-60")}>
                {isFrozen && (
                  <div className="absolute inset-0 bg-[#F8FAFC]/80 backdrop-blur-sm rounded-none flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-[#E2E8F0]">
                      <Snowflake className="w-4 h-4 text-sky-500" />
                      <span className="text-sm font-semibold text-[#0F172A]">Card Frozen</span>
                    </div>
                  </div>
                )}
                <PaymentCard card={card} />
              </div>

              {/* Card Info */}
              <div className="px-5 sm:px-6 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0F172A] capitalize">
                        {card.type} Card
                      </span>
                      <Badge variant={isFrozen ? "info" : "success"}>
                        {isFrozen ? "Frozen" : "Active"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {card.network} ···· {card.last4}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#64748B]">Spending limit</p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      ${card.limit.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Spending progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Spent this month
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      ${card.spent.toLocaleString("en-US", { minimumFractionDigits: 2 })} /{" "}
                      ${card.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        spentPct > 80 ? "bg-[#EF4444]" : spentPct > 60 ? "bg-[#F59E0B]" : "bg-[#4F46E5]"
                      )}
                      style={{ width: `${spentPct}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {(100 - spentPct).toFixed(0)}% of limit remaining
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-5 sm:px-6 pb-5 grid grid-cols-4 gap-2 border-t border-[#F1F5F9] pt-4">
                <CardAction
                  icon={<Snowflake className="w-4 h-4" />}
                  label={isFrozen ? "Unfreeze" : "Freeze"}
                  active={isFrozen}
                  onClick={() => toggleFreeze(card.id)}
                />
                <CardAction
                  icon={<Lock className="w-4 h-4" />}
                  label="Lock"
                />
                <CardAction
                  icon={<Info className="w-4 h-4" />}
                  label="Details"
                />
                <CardAction
                  icon={<RefreshCw className="w-4 h-4" />}
                  label="Replace"
                />
              </div>
            </div>
          );
        })}

        {/* Add new card */}
        <button
          type="button"
          className="w-full border-2 border-dashed border-[#E2E8F0] rounded-3xl p-8 flex flex-col items-center gap-3 text-[#94A3B8] hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#EEF2FF]/30 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] group-hover:bg-[#EEF2FF] flex items-center justify-center transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Add new card</p>
            <p className="text-sm mt-0.5">Virtual or physical debit card</p>
          </div>
        </button>
      </div>
    </AppShell>
  );
}

function CardAction({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150 min-h-[44px]",
        active
          ? "bg-sky-50 text-sky-600"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
      )}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
