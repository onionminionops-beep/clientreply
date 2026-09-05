"use client";

import { useState } from "react";

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
      const res = await fetch("/api/checkout", {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
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
          <div className="space-y-6">
            <div className="bg-inbox-card border border-inbox-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-inbox-muted">
                  FIRM
                </span>
                <span className="text-xs bg-inbox-bg px-2 py-1 rounded">
                  Preview
                </span>
              </div>
              <div className="relative">
                <p className="text-inbox-text/30 blur-[3px] select-none">
                  Thanks for reaching out. I understand the request, but given
                  our current scope and timeline, we'd need to adjust the
                  deliverables or extend the deadline. Let's schedule a quick
                  call to discuss trade-offs and find the right path forward.
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-inbox-bg/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-inbox-border">
                    <p className="text-sm font-medium">
                      Unlock 3 full replies for $9
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full bg-inbox-accent text-white font-semibold py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-lg"
            >
              {loading ? "Redirecting..." : "Unlock Full Replies — $9"}
            </button>

            <button
              onClick={() => setShowPreview(false)}
              className="w-full text-inbox-muted hover:text-inbox-text transition-colors text-sm"
            >
              ← Start over
            </button>
          </div>
        )}

        <div className="text-center text-xs text-inbox-muted pt-8">
          <p>For freelancers mid-conflict. Sharp replies, not fluff.</p>
        </div>
      </div>
    </div>
  );
}
