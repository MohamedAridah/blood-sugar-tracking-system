
import {
  CakeIcon,
  ForkKnifeCrossedIcon,
  Home,
  Inbox,
  Plus,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import User from "@/components/User";
import { NavItem, NavMain } from "@/components/nav-main";

const items: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
    isActive: true,
    items: [],
  },
  {
    title: "Measurement",
    url: "/measurements",
    icon: <Inbox />,
    items: [
      {
        title: "New Measurement",
        url: "/measurements/new",
        icon: <Plus />,
        items: [],
      },
    ],
  },
  {
    title: "Meals",
    url: "/meals/",
    icon: <CakeIcon />,
    items: [
      {
        title: "New Meal",
        url: "/meals/new",
        icon: <ForkKnifeCrossedIcon />,
        items: [],
      },
    ],
  },
  {
    title: "Profile",
    url: "/account",
    icon: <User2 />,
    items: [],
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="h-[calc(100vh-45px)]" collapsible="icon">
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <User showUserInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
