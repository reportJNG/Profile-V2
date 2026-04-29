import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio Mode Select",
  description:
    "A cinematic game-style portfolio menu for profile, work, skills, credentials, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full overflow-hidden bg-[#071018]">{children}</body>
    </html>
  );
}
