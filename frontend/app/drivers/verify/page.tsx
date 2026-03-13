"use client";

import * as React from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Step = "enter_phone" | "enter_code" | "verified";

export default function DriverPhoneVerificationPage() {
  const [step, setStep] = React.useState<Step>("enter_phone");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const requestOtp = async () => {
    setError(null);
    if (!phone.trim()) {
      setError("Enter a valid phone number (e.g. +2547...).");
      return;
    }
    setIsBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.trim(),
      });
      if (error) throw error;
      setStep("enter_code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setIsBusy(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    if (!phone.trim() || !code.trim()) {
      setError("Enter the phone number and OTP code.");
      return;
    }
    setIsBusy(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone.trim(),
        token: code.trim(),
        type: "sms",
      });
      if (error) throw error;

      // Mark driver phone_verified=true for matching phone (requires matching schema + RLS/policies).
      // In production, prefer linking drivers to auth users (auth_user_id) and updating by auth.uid().
      const { error: updateError } = await supabase
        .from("drivers")
        .update({ phone_verified: true })
        .eq("phone", phone.trim());

      if (updateError) throw updateError;

      setStep("verified");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "OTP verification failed. Try again."
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          Driver phone verification
        </h1>
        <p className="text-muted-foreground">
          Verify your phone number via SMS OTP. You must be phone-verified before
          you can operate.
        </p>
      </div>

      <Card className="border-border bg-card max-w-xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Verification
            <Badge variant="outline">
              {step === "enter_phone"
                ? "Step 1/2"
                : step === "enter_code"
                  ? "Step 2/2"
                  : "Complete"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2547..."
              disabled={step === "verified"}
            />
          </div>

          {step !== "enter_phone" && (
            <div className="space-y-1.5">
              <Label htmlFor="code">OTP code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                disabled={step === "verified"}
              />
            </div>
          )}

          {step === "enter_phone" ? (
            <Button onClick={requestOtp} disabled={isBusy} className="w-full">
              {isBusy ? "Sending..." : "Request OTP"}
            </Button>
          ) : step === "enter_code" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={requestOtp}
                disabled={isBusy}
              >
                Resend OTP
              </Button>
              <Button onClick={verifyOtp} disabled={isBusy}>
                {isBusy ? "Verifying..." : "Confirm verification"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              Phone verified successfully.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

