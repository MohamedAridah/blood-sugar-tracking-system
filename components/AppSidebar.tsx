import Link from "next/link";
import {
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
} from "lucide-react";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
    title: "New Meal",
    url: "/meals/new",
    icon: ForkKnifeCrossedIcon,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}
