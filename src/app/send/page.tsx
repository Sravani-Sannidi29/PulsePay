"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronLeft,
  Download,
  AlertCircle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Stepper } from "@/components/Stepper";
import { RecipientCard } from "@/components/RecipientCard";
import { OTPInput } from "@/components/OTPInput";
import { TransferSummary } from "@/components/TransferSummary";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recipients, currencies, currentUser } from "@/data/mock";
import type { Recipient } from "@/data/mock";
import { generateReference, formatCurrency } from "@/lib/utils";

const STEPS = ["Recipient", "Amount", "Review", "Confirm", "Done"];

export default function SendPage() {
  const [step, setStep] = useState(0);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [speed, setSpeed] = useState<"instant" | "standard">("instant");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [reference] = useState(() => generateReference());

  function nextStep() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
    setOtp("");
  }

  function handleOTPSubmit() {
    if (otp.replace(/\s/g, "").length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 2000);
  }

  const currencySymbol =
    currencies.find((c) => c.code === currency)?.symbol || "$";
  const amountNum = parseFloat(amount) || 0;
  const fee = 0;
  const total = amountNum + fee;

  const arrivalDate = new Date();
  if (speed === "standard") arrivalDate.setDate(arrivalDate.getDate() + 3);
  const arrivalStr =
    speed === "instant"
      ? "Arrives today (instant)"
      : `Arrives by ${arrivalDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;

  return (
    <AppShell title="Send Money">
      {/* Stepper — hide on done step */}
      {step < 4 && <Stepper steps={STEPS} current={step} />}

      <div key={step} className="animate-fade-slide-in">
        {step === 0 && (
          <StepRecipient
            selectedRecipient={selectedRecipient}
            onSelect={setSelectedRecipient}
            onNext={nextStep}
          />
        )}
        {step === 1 && (
          <StepAmount
            recipient={selectedRecipient!}
            amount={amount}
            setAmount={setAmount}
            note={note}
            setNote={setNote}
            currency={currency}
            setCurrency={setCurrency}
            speed={speed}
            setSpeed={setSpeed}
            currencySymbol={currencySymbol}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 2 && (
          <StepReview
            recipient={selectedRecipient!}
            amount={amount}
            currency={currency}
            fee={`$${fee.toFixed(2)}`}
            total={`${currencySymbol}${total.toFixed(2)} ${currency}`}
            arrival={arrivalStr}
            reference={reference}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <StepOTP
            otp={otp}
            setOtp={setOtp}
            loading={loading}
            onSubmit={handleOTPSubmit}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <StepDone
            recipient={selectedRecipient!}
            amount={`${currencySymbol}${amountNum.toFixed(2)}`}
            reference={reference}
            arrival={arrivalStr}
          />
        )}
      </div>
    </AppShell>
  );
}

/* ─── Step 0: Choose Recipient ─── */
function StepRecipient({
  selectedRecipient,
  onSelect,
  onNext,
}: {
  selectedRecipient: Recipient | null;
  onSelect: (r: Recipient) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <p className="text-[#64748B] mb-6">Who are you sending to?</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {recipients.map((r) => (
          <RecipientCard
            key={r.id}
            recipient={r}
            selected={selectedRecipient?.id === r.id}
            onClick={() => onSelect(r)}
          />
        ))}
      </div>

      {/* FIX: wired onClick + accessible name + test id so the control is no longer a dead click */}
      <button
        type="button"
        data-testid="new-recipient-button"
        aria-label="Add a new recipient"
        onClick={() => console.info("[PulsePay] Add recipient — flow coming soon")}
        className="flex items-center gap-2 text-sm font-medium text-[#4F46E5] hover:text-[#3730A3] transition-colors mb-8 px-1"
      >
        <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#4F46E5] flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </div>
        New recipient
      </button>

      <Button
        size="lg"
        className="w-full sm:w-auto sm:min-w-[200px]"
        disabled={!selectedRecipient}
        onClick={onNext}
      >
        Continue
      </Button>
    </div>
  );
}

/* ─── Step 1: Amount ─── */
function StepAmount({
  recipient,
  amount,
  setAmount,
  note,
  setNote,
  currency,
  setCurrency,
  speed,
  setSpeed,
  currencySymbol,
  onNext,
  onBack,
}: {
  recipient: Recipient;
  amount: string;
  setAmount: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
  speed: "instant" | "standard";
  setSpeed: (v: "instant" | "standard") => void;
  currencySymbol: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const amountNum = parseFloat(amount) || 0;
  const isValid = amountNum > 0 && amountNum <= currentUser.available;

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  }

  return (
    <div>
      {/* Selected recipient mini-card */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E2E8F0] mb-6">
        <Avatar initials={recipient.initials} color={recipient.color} size="md" />
        <div>
          <p className="text-sm font-semibold text-[#0F172A]">{recipient.name}</p>
          <p className="text-xs text-[#64748B]">
            {recipient.bank} · {recipient.account}
          </p>
        </div>
        <button
          onClick={onBack}
          className="ml-auto text-xs text-[#4F46E5] hover:text-[#3730A3] font-medium"
        >
          Change
        </button>
      </div>

      <p className="text-[#64748B] mb-4">How much to send?</p>

      {/* Amount input */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl font-bold text-[#94A3B8]">{currencySymbol}</span>
          <input
            data-testid="amount-input"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="text-5xl font-bold text-[#0F172A] text-center bg-transparent outline-none w-full max-w-[240px] font-mono placeholder:text-[#E2E8F0]"
          />
        </div>

        {/* Currency selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="text-sm font-medium text-[#4F46E5] bg-[#EEF2FF] border-0 rounded-xl px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-center text-sm text-[#64748B]">
          Available:{" "}
          <span className="font-semibold text-[#0F172A]">
            {formatCurrency(currentUser.available)}
          </span>
        </p>

        {amountNum > currentUser.available && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[#EF4444]">
            <AlertCircle className="w-4 h-4" />
            Insufficient balance
          </div>
        )}
      </div>

      {/* Speed toggle */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
          Transfer Speed
        </p>
        <div className="flex gap-2">
          <SpeedOption
            active={speed === "instant"}
            onClick={() => setSpeed("instant")}
            label="Instant"
            sublabel="Free"
            testId="speed-instant"
          />
          <SpeedOption
            active={speed === "standard"}
            onClick={() => setSpeed("standard")}
            label="Standard"
            sublabel="Free · 1-3 days"
            testId="speed-standard"
          />
        </div>
        <p className="text-xs text-[#94A3B8] mt-3">Transfer fee: $0.00</p>
      </div>

      {/* Note */}
      <div className="mb-6">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" size="lg" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          data-testid="amount-continue"
          size="lg"
          className="flex-1"
          disabled={!isValid}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function SpeedOption({
  active,
  onClick,
  label,
  sublabel,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sublabel: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={`flex-1 py-3 px-4 rounded-xl border-2 text-left transition-all duration-150 ${
        active
          ? "border-[#4F46E5] bg-[#EEF2FF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <p
        className={`text-sm font-semibold ${active ? "text-[#4F46E5]" : "text-[#0F172A]"}`}
      >
        {label}
      </p>
      <p className="text-xs text-[#64748B] mt-0.5">{sublabel}</p>
    </button>
  );
}

/* ─── Step 2: Review ─── */
function StepReview({
  recipient,
  amount,
  currency,
  fee,
  total,
  arrival,
  reference,
  onNext,
  onBack,
}: {
  recipient: Recipient;
  amount: string;
  currency: string;
  fee: string;
  total: string;
  arrival: string;
  reference: string;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <p className="text-[#64748B] mb-6">Review your transfer before confirming</p>

      <TransferSummary
        from={`${currentUser.name} (${currentUser.account})`}
        to={`${recipient.name} (${recipient.account})`}
        amount={amount}
        fee={fee}
        total={total}
        currency={currency}
        arrival={arrival}
        reference={reference}
      />

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" size="lg" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          data-testid="review-confirm"
          size="lg"
          className="flex-1"
          onClick={onNext}
        >
          Looks good, confirm →
        </Button>
      </div>
    </div>
  );
}

/* ─── Step 3: OTP ─── */
function StepOTP({
  otp,
  setOtp,
  loading,
  onSubmit,
  onBack,
}: {
  otp: string;
  setOtp: (v: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleResend() {
    setCountdown(45);
    setCanResend(false);
    setOtp("");
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  const cleanOtp = otp.replace(/\s/g, "");
  const isReady = cleanOtp.length === 6;

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-[#4F46E5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-[#0F172A] mb-2">
        Verify your identity
      </h2>
      <p className="text-[#64748B] text-sm mb-2">
        We sent a 6-digit code to
      </p>
      <p className="font-semibold text-[#0F172A] mb-8">
        +1 (***) ***-0123
      </p>

      <div className="mb-6">
        <OTPInput value={otp} onChange={setOtp} length={6} />
      </div>

      <p className="text-sm text-[#64748B] mb-8">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-[#4F46E5] font-medium hover:text-[#3730A3] transition-colors"
          >
            Resend code
          </button>
        ) : (
          <>
            Resend in{" "}
            <span className="font-semibold text-[#0F172A] font-mono">
              {String(Math.floor(countdown / 60)).padStart(2, "0")}:
              {String(countdown % 60).padStart(2, "0")}
            </span>
          </>
        )}
      </p>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={onBack}
          disabled={loading}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          data-testid="otp-submit"
          size="lg"
          className="flex-1"
          disabled={!isReady || loading}
          onClick={onSubmit}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            "Verify & Send"
          )}
        </Button>
      </div>
    </div>
  );
}

/* ─── Step 4: Done ─── */
function StepDone({
  recipient,
  amount,
  reference,
  arrival,
}: {
  recipient: Recipient;
  amount: string;
  reference: string;
  arrival: string;
}) {
  return (
    <div className="max-w-md mx-auto text-center py-8">
      {/* Animated success circle */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-emerald-50 animate-pulse-ring" />
        <div className="absolute w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center animate-scale-in">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              className="animate-check-draw"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
        Transfer Successful!
      </h2>
      <p className="text-[#64748B] mb-2">
        You sent{" "}
        <span className="font-semibold text-[#0F172A]">{amount}</span> to{" "}
        <span className="font-semibold text-[#0F172A]">{recipient.name}</span>
      </p>
      <p className="text-sm text-[#10B981] font-medium mb-6">{arrival}</p>

      <div className="flex items-center justify-center mb-8">
        <Badge variant="muted" className="font-mono text-sm px-4 py-2">
          {reference}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" size="lg" className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          Download Receipt
        </Button>
        <Button size="lg" className="flex-1" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
