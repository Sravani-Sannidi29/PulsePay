"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, Shield, Zap, DollarSign, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("jordan.lee@email.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 -translate-x-24 translate-y-24" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white/3 -translate-x-32 -translate-y-32" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-white">PulsePay</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Fast. Secure.
            <br />
            Money in Motion.
          </h1>
          <p className="text-indigo-200 text-lg mb-10">
            The modern way to send, receive, and manage your money globally.
          </p>

          <div className="space-y-5">
            <Feature
              icon={<Zap className="w-5 h-5 text-amber-300" />}
              title="Instant Transfers"
              desc="Send money anywhere in seconds, 24/7."
            />
            <Feature
              icon={<Shield className="w-5 h-5 text-emerald-300" />}
              title="Bank-grade Security"
              desc="256-bit encryption and biometric authentication."
            />
            <Feature
              icon={<DollarSign className="w-5 h-5 text-sky-300" />}
              title="Zero Fees"
              desc="No hidden charges. Ever. Send globally for free."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-indigo-300 text-sm">
            Trusted by 2M+ users worldwide · FDIC insured
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      {/* FIX: anchor to top on small viewports (not vertically centered) and tighten
          header spacing, so email/password sit above the mobile-keyboard-safe line
          instead of being pushed down by centering + decorative whitespace */}
      <div className="flex-1 flex items-start lg:items-center justify-center bg-white p-6 pt-3 sm:p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2 justify-center">
            <div className="w-9 h-9 bg-[#4F46E5] rounded-xl flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-[#0F172A]">PulsePay</span>
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-bold text-[#0F172A] mb-1">Welcome back</h2>
            <p className="text-[#64748B]">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#4F46E5] accent-[#4F46E5]"
                />
                <span className="text-sm text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="#"
                className="text-sm text-[#4F46E5] hover:text-[#3730A3] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748B]">
            Don&apos;t have an account?{" "}
            <Link
              href="/open-account"
              className="text-[#4F46E5] font-medium hover:text-[#3730A3] transition-colors"
            >
              Open one
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-[#94A3B8]">
            By signing in, you agree to our{" "}
            <Link href="#" className="underline hover:text-[#64748B]">Terms</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-[#64748B]">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-indigo-200 text-sm">{desc}</p>
      </div>
    </div>
  );
}
