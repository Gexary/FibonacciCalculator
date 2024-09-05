import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fibonacci Calculator • by Gexary",
  description: "Simple Fibonacci sequence calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(GeistSans.variable, GeistMono.variable, "h-full flex items-center justify-center", GeistSans.className)}
      >
        {children}
      </body>
    </html>
  );
}
