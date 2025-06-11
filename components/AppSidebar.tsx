import Link from "next/link";
import {
  CakeIcon,
  Calendar,
  Database,
  Edit,
  ForkKnifeCrossedIcon,
  Home,
  Inbox,
  Info,
  Plus,
  Search,
  Settings,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import User from "@/components/User";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Measurement",
    url: "/measurements",
    icon: Inbox,
  },

  {
    title: "New Measurement",
    url: "/measurements/new",
    icon: Plus,
  },
  {
    title: "Meals",
    url: "/meals/",
    icon: CakeIcon,
  },
  {
    title: "New Meal",
    url: "/meals/new",
    icon: ForkKnifeCrossedIcon,
  },
  {
    title: "Profile",
    url: "/account",
    icon: User2,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="h-[calc(100vh-45px)]" collapsible="icon">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} closeAfter asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <User showUserInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
