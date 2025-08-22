"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation";

export default function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
}[]
}) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild
                        className={`
                            hover:bg-amber-200
                            ${pathname == item.url ? "bg-amber-200 text-amber-800 font-bold" : ""}  
                        `}
                        >
                            <a href={item.url}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}