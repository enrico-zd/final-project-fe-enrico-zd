
import { Edit, EllipsisVertical, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { useState } from "react";

export default function NavUser({
    item,
}: {
    item: {
        name: string;
        email: string;
        avatar: string;
}
}){
    const [isActive, setIsActive] = useState(false);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu onOpenChange={setIsActive}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className={`p-1 ${isActive === true ? "bg-sidebar-accent" : ""} focus:ring-0 focus-visible:ring-0`}>
                            <div className="flex w-full justify-between gap-2 text-left text-sm">
                                <div className="flex gap-2 pl-1">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/1/12/230601_Karina_%28aespa%29.jpg' alt="jimin" />
                                        <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Kim Jimin</span>
                                        <span className="text-muted-foreground truncate text-xs">
                                            jimin@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <EllipsisVertical size={22}/>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width)"
                        side="right"
                        align="start"
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{item.name}</span>
                            <span className="text-muted-foreground truncate text-xs">
                                {item.email}
                            </span>
                            </div>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User />Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit /> Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />Sign out
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}