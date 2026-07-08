"use client";

import Link from "next/link";
import { Send, Plus, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { currentUser } from "@/data/mock";

export function BalanceCard() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-24 -translate-y-24" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-16 translate-y-16" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold tracking-tight">
              {formatCurrency(currentUser.balance)}
            </h2>
            <p className="text-indigo-200 text-sm mt-1">
              Available: {formatCurrency(currentUser.available)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-200 text-xs">Account</p>
            <p className="text-white font-mono font-semibold">{currentUser.account}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <QuickAction href="/send" icon={<Send className="w-4 h-4" />} label="Send" />
          <QuickAction href="#" icon={<ArrowDownLeft className="w-4 h-4" />} label="Receive" />
          <QuickAction href="#" icon={<Plus className="w-4 h-4" />} label="Add" />
          <QuickAction href="#" icon={<MoreHorizontal className="w-4 h-4" />} label="More" />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 flex-1"
    >
      <div className="w-11 h-11 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center backdrop-blur-sm">
        {icon}
      </div>
      <span className="text-xs text-indigo-100 font-medium">{label}</span>
    </Link>
  );
}
