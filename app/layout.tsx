import type { Metadata, Viewport } from "next";
import { Cinzel, JetBrains_Mono } from "next/font/google";
import { ZoomLock } from "@/components/ZoomLock";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-inventory-cinzel",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-inventory-mono",
});

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
    <html
      lang="en"
      className={`${cinzel.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden bg-[#071018]">
        <ZoomLock />
        {children}
      </body>
    </html>
  );
}
