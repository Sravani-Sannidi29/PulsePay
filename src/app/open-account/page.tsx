"use client";

import { useState } from "react";
import { Check, User, Briefcase, Users, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const accountTypes = [
  {
    id: "personal",
    icon: <User className="w-6 h-6" />,
    name: "Personal",
    description: "For individuals managing everyday finances",
    featured: true,
    benefits: [
      "Free instant transfers",
      "Virtual & physical debit card",
      "Mobile check deposit",
      "Zero monthly fees",
      "Up to $250,000 FDIC insured",
    ],
    color: "from-indigo-600 to-violet-600",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
  {
    id: "business",
    icon: <Briefcase className="w-6 h-6" />,
    name: "Business",
    description: "For growing businesses and freelancers",
    featured: false,
    benefits: [
      "Multi-user access",
      "Invoicing & payments",
      "Expense management",
      "Business debit cards",
      "Dedicated support",
    ],
    color: "from-slate-700 to-slate-900",
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
  {
    id: "joint",
    icon: <Users className="w-6 h-6" />,
    name: "Joint",
    description: "Shared account for couples and families",
    featured: false,
    benefits: [
      "Shared balance visibility",
      "Dual authorization options",
      "Shared spending insights",
      "Individual sub-accounts",
      "Family spending limits",
    ],
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

export default function OpenAccountPage() {
  const [appliedType, setAppliedType] = useState<string | null>(null);

  return (
    <AppShell title="Open Account">
      <p className="text-[#64748B] mb-8">
        Choose the account type that works best for you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {accountTypes.map((type) => (
          <AccountTypeCard
            key={type.id}
            type={type}
            applied={appliedType === type.id}
            onApply={() => setAppliedType(type.id)}
          />
        ))}
      </div>

      {appliedType && (
        <div className="mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 animate-fade-slide-in">
          <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">Application received!</p>
            <p className="text-emerald-700 text-sm mt-0.5">
              Your{" "}
              <span className="font-medium capitalize">
                {accountTypes.find((t) => t.id === appliedType)?.name}
              </span>{" "}
              account application is being processed. We&apos;ll send a confirmation
              to your email within 24 hours.
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 p-6 bg-white rounded-2xl border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="font-semibold text-[#0F172A]">Why PulsePay?</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "2M+", desc: "Active users" },
            { label: "190+", desc: "Countries" },
            { label: "$0", desc: "Monthly fees" },
            { label: "99.9%", desc: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#4F46E5]">{stat.label}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function AccountTypeCard({
  type,
  applied,
  onApply,
}: {
  type: (typeof accountTypes)[0];
  applied: boolean;
  onApply: () => void;
}) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200",
        type.featured
          ? "border-[#4F46E5] shadow-lg shadow-indigo-100"
          : "border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-md"
      )}
    >
      {type.featured && (
        <div className="bg-[#4F46E5] text-white text-xs font-semibold text-center py-1.5 tracking-wide">
          ★ RECOMMENDED
        </div>
      )}

      <div className="p-6">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", type.iconBg, type.iconColor)}>
          {type.icon}
        </div>

        <h3 className="text-lg font-bold text-[#0F172A] mb-1">{type.name}</h3>
        <p className="text-sm text-[#64748B] mb-5">{type.description}</p>

        <ul className="space-y-2 mb-6">
          {type.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-[#0F172A]">
              <Check className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={2.5} />
              {benefit}
            </li>
          ))}
        </ul>

        {applied ? (
          <div className="flex items-center gap-2 justify-center py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium text-sm">
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Application Sent
          </div>
        ) : (
          <Button
            variant={type.featured ? "default" : "secondary"}
            size="lg"
            className="w-full"
            onClick={onApply}
          >
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
}
