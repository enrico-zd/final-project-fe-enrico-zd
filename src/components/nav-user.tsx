import { Edit, EllipsisVertical, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavUser({
  user_id,
  email,
  name,
  avatar,
}: {
  user_id: number | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  avatar: string | undefined;
}) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/admin/users/${user_id}`);
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={setIsActive}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`p-1 ${
                isActive === true ? "bg-sidebar-accent" : ""
              } focus:ring-0 focus-visible:ring-0`}
            >
              <div className="flex w-full justify-between gap-2 text-left text-sm">
                <div className="flex gap-2 pl-1">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <EllipsisVertical size={22} />
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
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleClick}
              className="hover:!bg-amber-200 hover:!text-amber-800"
            >
              <User className="hover:!text-amber-800" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-amber-200 hover:!text-amber-800">
              <Link
                href={`/admin/users/update/${user_id}`}
                className="flex items-center gap-2"
              >
                <Edit className="hover:!text-amber-800" />{" "}
                <div>Edit Profile</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:!bg-red-200 hover:!text-red-600"
            >
              <LogOut className="hover:!text-red-600" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
