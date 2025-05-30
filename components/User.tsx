"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/hooks/use-session";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Bell, ChevronUp, LogOut } from "lucide-react";

type Props = {
  showUserInfo?: boolean;
  dropdownSide?: "right" | "left" | "bottom" | "top";
};

const User = ({ showUserInfo, dropdownSide }: Props) => {
  const session = authClient.useSession();
  let triggerContent;

  if (!session.data) {
    return;
  }

  if (showUserInfo) {
    triggerContent = (
      <SidebarMenuButton>
        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>
            {session?.data.user.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{session?.data.user.name}</p>
          <p className="text-sm">{session?.data.user.email}</p>
        </div>
        <ChevronUp className="ml-auto" />
      </SidebarMenuButton>
    );
  } else {
    triggerContent = (
      <Avatar className="rounded-lg">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>
          {session?.data.user.name.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-full">
        {triggerContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={dropdownSide}
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem>
          <BadgeCheck className="text-muted-foreground" /> Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="text-muted-foreground" /> Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            authClient.signOut();
            redirect("/sign-in");
          }}
        >
          <LogOut className="text-muted-foreground" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
