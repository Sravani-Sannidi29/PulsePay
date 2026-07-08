"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Send, CreditCard, Building2, User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Send Money", href: "/send", icon: Send },
  { label: "Cards", href: "/cards", icon: CreditCard },
  { label: "Open Account", href: "/open-account", icon: Building2 },
  { label: "Profile", href: "/profile", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#E2E8F0] flex-col z-30">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-[#E2E8F0]">
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-[#0F172A]">PulsePay</span>
        </div>

        {/* Nav Items */}
        <div className="flex-1 py-4 px-3">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                      isActive
                        ? "bg-[#EEF2FF] text-[#4F46E5]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-[#4F46E5]" : "text-[#94A3B8] group-hover:text-[#64748B]"
                      )}
                    />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Profile at bottom */}
        <div className="p-4 border-t border-[#E2E8F0]">
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              JL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A] truncate">Jordan Lee</p>
              <p className="text-xs text-[#94A3B8] truncate">jordan.lee@email.com</p>
            </div>
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-30 safe-area-inset-bottom">
        <ul className="flex items-center justify-around px-2 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl min-h-[44px] transition-colors",
                    isActive ? "text-[#4F46E5]" : "text-[#94A3B8]"
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">
                    {item.label.split(" ")[0]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
