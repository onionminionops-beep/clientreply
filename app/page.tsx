"use client";
import posthog from "posthog-js";

import { useState } from "react";

const STUB_REPLIES = {
  firm: "Thanks for reaching out. I understand the request, but given our current scope and timeline, we'd need to adjust the deliverables or extend the deadline. Let's schedule a quick call to discuss trade-offs and find the right path forward.",
  warm: "I really appreciate you sharing this! I can see why this matters. To make it work without derailing what we've planned, let's explore a few options together. When's a good time to chat through what's flexible on both sides?",
  clarify: "Thanks for this. Before I respond fully, I want to make sure I understand correctly. Are you asking about [specific aspect], or is this more about [alternative interpretation]? A quick clarification will help me give you the most useful answer.",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setShowPreview(true);
    setLoading(false);
  };

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const res = await posthog.capture("checkout_cta_clicked", { product: "ClientReply" });
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const tones = [
    { key: "firm", label: "FIRM", color: "text-red-400" },
    { key: "warm", label: "WARM", color: "text-amber-400" },
    { key: "clarify", label: "CLARIFY", color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">ClientReply</h1>
          <p className="text-inbox-muted text-lg">
            Calibrated replies to sticky client emails
          </p>
        </div>

        {!showPreview ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Paste client email
              </label>
              <textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="They're asking for a scope change..."
                className="w-full h-40 bg-inbox-card border border-inbox-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-inbox-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Context (optional)
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Project deadline, budget constraints..."
                className="w-full bg-inbox-card border border-inbox-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-inbox-accent"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!email.trim() || loading}
              className="w-full bg-inbox-accent text-white font-medium py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Replies"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tones.map((tone) => (
              <div
                key={tone.key}
                className="bg-inbox-card border border-inbox-border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-semibold ${tone.color}`}>
                    {tone.label}
                  </span>
                  <span className="text-xs bg-inbox-bg px-2 py-1 rounded">
                    Preview
                  </span>
                </div>
                <div className="relative">
                  <p className="text-inbox-text/30 blur-[3px] select-none leading-relaxed">
                    {STUB_REPLIES[tone.key as keyof typeof STUB_REPLIES]}
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-inbox-bg/95 backdrop-blur-sm px-4 py-2 rounded border border-inbox-border">
                      <p className="text-xs font-medium">Unlock for $9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full bg-inbox-accent text-white font-semibold py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-lg mt-6"
            >
              {loading ? "Redirecting..." : "Unlock 3 Full Replies — $9"}
            </button>

            <button
              onClick={() => setShowPreview(false)}
              className="w-full text-inbox-muted hover:text-inbox-text transition-colors text-sm"
            >
              ← Start over
            </button>
          </div>
        )}

        <div className="text-center text-xs text-inbox-muted pt-4 space-y-4">
          <p>For freelancers mid-conflict. Sharp replies, not fluff.</p>
          <a
            href="https://thesaasdir.com/product/clientreply?ref=badge"
            rel="dofollow"
          >
            <img
              src="https://thesaasdir.com/badge/clientreply.svg"
              alt="Featured on TheSaaSDir"
              width={182}
              height={46}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
