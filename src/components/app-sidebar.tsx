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
import { useEffect, useState } from "react";
import { fetchCompany } from "@/services/CompanyApi";
import { useSession } from "next-auth/react";
import { ICompany, IError } from "@/types/interface";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";

const dataNav = [
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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

  const [dataCompany, setDataCompany] = useState<ICompany>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    const accessToken = session?.user.accessToken;

    if (status !== "authenticated" || !accessToken) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchCompany(accessToken);

        if (!cancelled) {
          setDataCompany(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, session?.user.accessToken]);

  return (
    <div>
      {isLoading ? (
        <aside
          className="w-64 p-4 space-y-6"
          aria-busy="true"
          aria-label="Loading sidebar"
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
            <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-44 rounded bg-gray-200 animate-pulse" />
            </div>
          </nav>

          {/* Separator */}
          <div className="h-px w-full bg-gray-200" />

          {/* User card */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
            <div className="h-6 w-6 rounded bg-gray-200 animate-pulse" />
          </div>
        </aside>
      ) : (
        <Sidebar collapsible="offcanvas" {...props}>
          {error && <h1>{error.message}</h1>}
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
                        <AvatarImage
                          src={dataCompany?.image_company}
                          alt="jimin"
                        />
                      </Avatar>
                      <p className="font-medium">{dataCompany?.company_name}</p>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* sidebar content */}
              <SidebarContent>
                <NavMain items={dataNav} />
              </SidebarContent>

              {/* sidebar footer */}
              <SidebarFooter>
                <NavUser
                  user_id={session?.user.user_id}
                  email={session?.user.email}
                  name={session?.user.name}
                  avatar={session?.user.avatar}
                />
              </SidebarFooter>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
      )}
    </div>
  );
}
