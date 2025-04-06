import Link from "next/link";
import {
  Calendar,
  Database,
  Edit,
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
    title: "Measurement overview",
    url: "/measurements/overview",
    icon: Database,
  },
  {
    title: "New Measurement",
    url: "/measurements/new",
    icon: Plus,
  },
  {
    title: "Edit Measurement",
    url: "/measurements/67edbe23bb188a7911515805/edit",
    icon: Edit,
  },
  {
    title: "Details Measurement",
    url: "/measurements/67edbe23bb188a7911515805/details",
    icon: Info,
  },
  {
    title: "Tresiba",
    url: "/tresiba",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
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
