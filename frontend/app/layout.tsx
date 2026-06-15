import type { Metadata } from "next";
import { Lora, Mulish } from "next/font/google";
import { ToastProvider } from "@/context/ToastContext";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { Providers } from "@/app/providers";
import "./globals.css";

const displayFont = Lora({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Mulish({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Nutriphar | Natural Health & Wellness",
  description: "High-quality, natural health and wellness products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body" suppressHydrationWarning>
        <Providers>
          <ToastProvider>
            <ClientLayout>{children}</ClientLayout>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
