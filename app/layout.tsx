import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClientReply — Calibrated replies to sticky emails",
  description: "Paste sticky client email → 3 calibrated replies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
