"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
      <FloatingActions />
    </>
  );
}
