import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Receipt,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transactions } from "@/data/mock";

export default function DashboardPage() {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Good morning, Jordan 👋
        </h1>
        <p className="text-[#64748B] mt-0.5">
          Here&apos;s your financial overview
        </p>
      </div>

      {/* Balance Card */}
      <div className="mb-6">
        <BalanceCard />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard
          label="This Month Sent"
          value="$2,847"
          icon={<TrendingDown className="w-4 h-4" />}
          color="text-[#EF4444]"
          bgColor="bg-red-50"
        />
        <StatCard
          label="This Month Received"
          value="$8,047"
          icon={<TrendingUp className="w-4 h-4" />}
          color="text-[#10B981]"
          bgColor="bg-emerald-50"
        />
        <StatCard
          label="Pending"
          value="0"
          icon={<Clock className="w-4 h-4" />}
          color="text-[#64748B]"
          bgColor="bg-[#F1F5F9]"
        />
      </div>

      {/* Recent Transactions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link
              href="#"
              className="text-sm font-medium text-[#4F46E5] hover:text-[#3730A3] transition-colors"
            >
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <div className="divide-y divide-[#F1F5F9]">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-3">
          Quick Actions
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <QuickActionCard
            href="/send"
            icon={<ArrowUpRight className="w-5 h-5 text-[#4F46E5]" />}
            label="Send Money"
            bg="bg-[#EEF2FF]"
          />
          <QuickActionCard
            href="#"
            icon={<ArrowDownLeft className="w-5 h-5 text-[#10B981]" />}
            label="Add Money"
            bg="bg-emerald-50"
          />
          <QuickActionCard
            href="#"
            icon={<Receipt className="w-5 h-5 text-[#F59E0B]" />}
            label="Pay Bills"
            bg="bg-amber-50"
          />
          <QuickActionCard
            href="#"
            icon={<RefreshCw className="w-5 h-5 text-sky-600" />}
            label="Convert"
            bg="bg-sky-50"
          />
          <QuickActionCard
            href="#"
            icon={<Plus className="w-5 h-5 text-violet-600" />}
            label="More"
            bg="bg-violet-50"
          />
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  bgColor,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <Card className="p-3 sm:p-4">
      <div className={`w-8 h-8 rounded-lg ${bgColor} ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-base sm:text-lg font-bold text-[#0F172A] leading-tight">
        {value}
      </p>
      <p className="text-[10px] sm:text-xs text-[#64748B] mt-0.5 leading-tight">{label}</p>
    </Card>
  );
}

function QuickActionCard({
  href,
  icon,
  label,
  bg,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  bg: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-md hover:-translate-y-px transition-all duration-150 shrink-0 min-w-[80px]"
    >
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-[#64748B] text-center whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}
