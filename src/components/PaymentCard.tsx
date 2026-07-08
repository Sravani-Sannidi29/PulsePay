import { cn } from "@/lib/utils";
import type { Card } from "@/data/mock";

interface PaymentCardProps {
  card: Card;
}

export function PaymentCard({ card }: PaymentCardProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-2xl bg-gradient-to-br text-white p-5 sm:p-6 overflow-hidden",
        card.color
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 -translate-x-12 translate-y-12" />

      {/* Chip */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div className="w-10 h-8 rounded-md bg-amber-300/80 flex items-center justify-center">
          <div className="w-7 h-5 rounded-sm bg-amber-400/60 border border-amber-200/40" />
        </div>
        <div className="text-right">
          <span className="text-xs font-medium opacity-70 uppercase tracking-widest">
            {card.type}
          </span>
        </div>
      </div>

      {/* Card Number */}
      <div className="relative z-10 mb-6">
        <p className="font-mono text-lg tracking-widest font-medium">
          •••• •••• •••• {card.last4}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-60 uppercase tracking-wider mb-0.5">Card Holder</p>
          <p className="text-sm font-semibold">{card.holder}</p>
        </div>
        <div className="text-center">
          <p className="text-xs opacity-60 uppercase tracking-wider mb-0.5">Expires</p>
          <p className="text-sm font-semibold font-mono">{card.expiry}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold opacity-90 tracking-wide">{card.network}</p>
        </div>
      </div>
    </div>
  );
}
