import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Newspaper,
  Users,
  ShieldAlert,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/Button";

import { useAuth } from "@/contexts/auth-context";
import { useUsers } from "@/hooks/use-users-query";
import { useRoles } from "@/hooks/use-roles-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { Resource } from "@/lib/permissions";

const items: { title: string; url: string; icon: typeof LayoutDashboard }[] = [
  { title: "Tổng quan", url: "/admin", icon: LayoutDashboard },
  { title: "Sản phẩm", url: "/admin/products", icon: Package },
  { title: "Danh mục", url: "/admin/categories", icon: FolderTree },
  { title: "Tin tức", url: "/admin/news", icon: Newspaper },
  { title: "Người dùng", url: "/admin/users", icon: Users },
  { title: "Vai trò", url: "/admin/roles", icon: ShieldAlert },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout, currentUserId } = useAuth();
  const { data: usersData } = useUsers({ limit: 1000 });
  const { data: rolesData } = useRoles();
  const { hasPermission } = usePermissions();

  const allUsers = usersData?.data || [];
  const allRoles = rolesData || [];

  // Fallback demo admin details
  const fallbackAdmin = { id: "user-admin", fullName: "Demo Admin", email: "admin@nutriphar.vn", roleId: "role-admin" };
  const user = allUsers.find(u => u.id === currentUserId) || (currentUserId === "user-admin" ? fallbackAdmin : null);
  const userRole = allRoles.find(r => r.id === user?.roleId);

  const filteredItems = items.filter(item => {
    if (item.url === "/admin") return true; // Everyone can view dashboard
    const resourceMap: Record<string, Resource> = {
      "/admin/products": "products",
      "/admin/categories": "categories",
      "/admin/news": "news",
      "/admin/users": "users",
      "/admin/roles": "roles"
    };
    const resource = resourceMap[item.url];
    if (!resource) return true;
    return hasPermission(resource, "view");
  });

  return (
    <Sidebar collapsible="icon" className="border-r border-[#E5E5E5]/60 bg-white">
      <SidebarHeader className="border-b border-[#E5E5E5]/60 px-5 py-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1A2F6B] text-[#D4AF37] font-display font-bold text-lg shadow-sm border border-[#D4AF37]/25">
            N
          </div>
          <div className="group-data-[collapsible=icon]:hidden space-y-0.5">
            <div className="text-sm font-bold font-display text-[#1A2F6B] tracking-wide">Nutriphar Admin</div>
            <div className="text-[10px] text-[#8C6A00] font-bold uppercase tracking-wider font-body">Hệ thống quản trị</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Quản lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`rounded-xl px-3 py-2.5 h-10 transition-all duration-300 font-body text-[13px] ${
                        isActive
                          ? "bg-[#1A2F6B]/5 text-[#1A2F6B] font-semibold"
                          : "text-[#4A4A4A] hover:bg-neutral-50 hover:text-[#1A2F6B]"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-[#D4AF37]" : "text-gray-400 group-hover:text-primary"}`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#E5E5E5]/60 p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E5E5E5]/40 text-[#1A2F6B] font-display text-sm font-bold uppercase border border-white">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-bold font-display text-primary">{user?.fullName || "Người dùng"}</div>
            <div className="truncate text-[10px] text-muted-foreground font-body font-semibold uppercase tracking-wider mt-0.5">{userRole?.roleName || "Không có vai trò"}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start rounded-full px-4 h-9 hover:bg-red-50 hover:text-[#A4161A] text-gray-500 font-body text-xs cursor-pointer transition-colors"
          onClick={() => logout()}
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          <span className="group-data-[collapsible=icon]:hidden font-semibold">Đăng xuất</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
