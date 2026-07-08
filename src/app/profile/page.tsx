import Link from "next/link";
import {
  ChevronRight,
  User,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  MessageSquare,
  Key,
  Smartphone,
  Clock,
  DollarSign,
  LogOut,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/data/mock";

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      {/* User Info Header */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-[#0F172A]">{currentUser.name}</h2>
              <Badge variant="success">Verified</Badge>
            </div>
            <p className="text-sm text-[#64748B] truncate">{currentUser.email}</p>
            <p className="text-sm text-[#64748B]">{currentUser.phone}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#94A3B8] mb-0.5">Account Number</p>
            <p className="text-sm font-semibold text-[#0F172A] font-mono">
              {currentUser.account}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] mb-0.5">Member Since</p>
            <p className="text-sm font-semibold text-[#0F172A]">Jan 2024</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        <SettingsSection
          title="Account Settings"
          items={[
            { icon: <User className="w-4 h-4" />, label: "Edit profile", desc: "Update your personal info" },
            { icon: <Key className="w-4 h-4" />, label: "Change password", desc: "Last changed 30 days ago" },
            { icon: <Shield className="w-4 h-4" />, label: "Two-factor authentication", desc: "Enabled", badge: <Badge variant="success">On</Badge> },
          ]}
        />

        <SettingsSection
          title="Preferences"
          items={[
            { icon: <Bell className="w-4 h-4" />, label: "Notifications", desc: "Email, push & SMS alerts" },
            { icon: <DollarSign className="w-4 h-4" />, label: "Default currency", desc: "US Dollar (USD)" },
            { icon: <Globe className="w-4 h-4" />, label: "Language", desc: "English (US)" },
          ]}
        />

        <SettingsSection
          title="Security"
          items={[
            { icon: <Clock className="w-4 h-4" />, label: "Login history", desc: "View recent sign-ins" },
            { icon: <Smartphone className="w-4 h-4" />, label: "Trusted devices", desc: "2 devices" },
          ]}
        />

        <SettingsSection
          title="Support"
          items={[
            { icon: <HelpCircle className="w-4 h-4" />, label: "Help center", desc: "FAQs and guides" },
            { icon: <MessageSquare className="w-4 h-4" />, label: "Contact us", desc: "Chat, email, or call" },
          ]}
        />
      </div>

      {/* Sign Out */}
      <div className="mt-6">
        <Button variant="danger" size="lg" className="w-full gap-2" asChild>
          <Link href="/login">
            <LogOut className="w-4 h-4" />
            Sign out
          </Link>
        </Button>
      </div>

      <p className="text-center text-xs text-[#94A3B8] mt-6">
        PulsePay v0.1.0 · FDIC Insured · 256-bit SSL
      </p>
    </AppShell>
  );
}

function SettingsSection({
  title,
  items,
}: {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    desc?: string;
    badge?: React.ReactNode;
  }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <ul className="divide-y divide-[#F8FAFC]">
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#F8FAFC] transition-colors group text-left min-h-[56px]"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#64748B] shrink-0 group-hover:bg-[#EEF2FF] group-hover:text-[#4F46E5] transition-colors">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
                {item.desc && (
                  <p className="text-xs text-[#94A3B8] mt-0.5">{item.desc}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.badge}
                <ChevronRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
