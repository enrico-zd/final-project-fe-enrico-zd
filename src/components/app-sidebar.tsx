"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Book, Building2, CalendarRangeIcon, LayoutDashboard, Loader, Users } from "lucide-react"
import Link from "next/link"
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar"
import NavMain from "./nav-main"
import NavUser from "./nav-user"

const data = {
  user: {
    name: "Kim Jimin",
    email: "jimin@gmail.com",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/1/12/230601_Karina_%28aespa%29.jpg"
  },
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
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" { ...props }>

      {/* sidebar header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin/dashboard">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-xl">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/1/12/230601_Karina_%28aespa%29.jpg' alt="jimin" />
                    <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                  </Avatar>
                    <p className="font-medium">Jimin company</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* sidebar content */}
          <SidebarContent>
            <NavMain items={data.mainNav} />
          </SidebarContent>

          {/* sidebar footer */}
          <SidebarFooter>
            <NavUser item={data.user} />
          </SidebarFooter>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  )
}