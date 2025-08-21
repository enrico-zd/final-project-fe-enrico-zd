"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Building2,
  CalendarRangeIcon,
  LayoutDashboard,
  Loader,
  Users,
} from "lucide-react";
import NavMain from "./nav-main";
import NavUser from "./nav-user";
import CompanyProfile from "./company-profile";

const dataNav = {
  mainNav: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Company Management",
      url: "/admin/company",
      icon: Building2,
    },
    {
      title: "Employee Management",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Shift Management",
      url: "/admin/shift",
      icon: Book,
    },
    {
      title: "Attendance Management",
      url: "/admin/attendance",
      icon: Loader,
    },
    {
      title: "Leave",
      url: "/admin/leave",
      icon: CalendarRangeIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* sidebar header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <CompanyProfile />
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* sidebar content */}
          <SidebarContent>
            <NavMain items={dataNav.mainNav} />
          </SidebarContent>

          {/* sidebar footer */}
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}
