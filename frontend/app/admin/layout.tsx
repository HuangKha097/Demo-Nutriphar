'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/contexts/auth-context';

const TITLES: Record<string, string> = {
  '/admin': 'Tổng quan',
  '/admin/products': 'Sản phẩm',
  '/admin/categories': 'Danh mục',
  '/admin/news': 'Tin tức',
  '/admin/users': 'Người dùng',
  '/admin/roles': 'Vai trò',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUserId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUserId) {
      router.replace('/login');
    }
  }, [currentUserId, router]);

  if (!currentUserId) return null;

  const title = TITLES[pathname] ?? 'CMS';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#FAFAF7] text-foreground font-body">
        <AppSidebar />
        <SidebarInset className="bg-[#FAFAF7]">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-[#E5E5E5]/60 bg-white/70 backdrop-blur-md px-6 shadow-3xs">
            <SidebarTrigger className="hover:bg-neutral-100 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors" />
            <div className="w-[1px] h-4 bg-[#E5E5E5] shrink-0" />
            <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1A2F6B] font-display">{title}</h1>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
