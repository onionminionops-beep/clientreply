"use client";

import PurchaseTracker from "@/app/components/PurchaseTracker";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PurchaseTracker product="ClientReply" />
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold">Payment Successful</h1>
        <p className="text-inbox-muted text-lg">
          Your calibrated replies are ready. Check your email for access.
        </p>
        {sessionId && (
          <p className="text-xs text-inbox-muted font-mono">
            Session: {sessionId}
          </p>
        )}
        <div className="pt-8">
          <a
            href="/"
            className="inline-block bg-inbox-accent text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Another Reply
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
