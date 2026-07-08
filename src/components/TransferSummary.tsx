import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface TransferSummaryProps {
  from: string;
  to: string;
  amount: string;
  fee: string;
  total: string;
  currency: string;
  arrival: string;
  reference?: string;
}

export function TransferSummary({
  from,
  to,
  amount,
  fee,
  total,
  currency,
  arrival,
  reference,
}: TransferSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* From / To */}
      <div className="p-5 space-y-3">
        <Row label="From" value={from} />
        <Row label="To" value={to} />
      </div>

      <Separator />

      {/* Amount breakdown */}
      <div className="p-5 space-y-3">
        <Row label="Amount" value={`${getCurrencySymbol(currency)}${parseFloat(amount || "0").toFixed(2)} ${currency}`} />
        <Row label="Transfer fee" value={fee} muted />
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-[#0F172A]">Total</span>
          <span className="text-lg font-bold text-[#0F172A]">{total}</span>
        </div>
      </div>

      <Separator />

      {/* Arrival & Reference */}
      <div className="p-5 space-y-3">
        <Row
          label="Estimated arrival"
          value={arrival}
          valueClass="text-[#10B981] font-semibold"
        />
        {reference && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Reference</span>
            <Badge variant="muted" className="font-mono text-xs">
              {reference}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  valueClass,
}: {
  label: string;
  value: string;
  muted?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#64748B]">{label}</span>
      <span
        className={
          valueClass ||
          (muted ? "text-sm text-[#94A3B8]" : "text-sm font-medium text-[#0F172A]")
        }
      >
        {value}
      </span>
    </div>
  );
}

function getCurrencySymbol(code: string): string {
  const map: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    CAD: "C$",
  };
  return map[code] || "$";
}
