"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { LeadFormSection } from "@/components/ui/LeadFormSection";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");
  const isCartPage = pathname === "/cart";

  if (isLoginPage || isAdminPage) {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      {!isCartPage && <LeadFormSection />}
      <Footer />
      <FloatingActions />
    </>
  );
}
