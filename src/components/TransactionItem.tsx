import { Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/data/mock";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isReceived = transaction.type === "received";

  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group cursor-default">
      <Avatar
        initials={transaction.initials}
        color={transaction.color}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A] truncate">
          {transaction.name}
        </p>
        <p className="text-xs text-[#94A3B8]">
          {transaction.category} · {transaction.date}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p
          className={cn(
            "text-sm font-semibold",
            isReceived ? "text-[#10B981]" : "text-[#0F172A]"
          )}
        >
          {isReceived ? "+" : ""}
          {isReceived
            ? `$${transaction.amount.toFixed(2)}`
            : `-$${Math.abs(transaction.amount).toFixed(2)}`}
        </p>
        <p className="text-xs text-[#10B981] capitalize">{transaction.status}</p>
      </div>
    </div>
  );
}
