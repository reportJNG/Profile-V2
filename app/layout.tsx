import type { Metadata, Viewport } from "next";
import { ZoomLock } from "@/components/ZoomLock";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio Mode Select",
  description:
    "A cinematic game-style portfolio menu for profile, work, skills, credentials, and contact.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full overflow-hidden bg-[#071018]">
        <ZoomLock />
        {children}
      </body>
    </html>
  );
}
