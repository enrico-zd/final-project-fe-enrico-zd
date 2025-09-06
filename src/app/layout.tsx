import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Human Resource Management System (HRMS) Application - RevoU Final Project",
  description:
    "A Human Resource Management System (HRMS) application that provides attendance tracking, shift management, and leave management features.",
  keywords: [
    "HRMS",
    "Absensi",
    "Leave Request",
    "Shift Management",
    "Employee Portal",
    "Next.js",
    "NestJS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors theme="light" position="top-right" />
      </body>
    </html>
  );
}
