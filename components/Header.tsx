
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggler from "@/components/ThemeToggler";
import User from "@/components/User";

type Props = {
  showSidebar?: boolean;
};

export default async function Header({ showSidebar }: Props) {
  return (
    <header className="sticky top-0 backdrop-blur-md z-20 border-b border-b-border  py-2 px-5 flex items-center gap-2 ">
      {showSidebar && <SidebarTrigger />}
      <div className="flex items-center gap-2 justify-self-end ms-auto">
        <User showUserInfo={false} dropdownSide="bottom" />
        <ThemeToggler />
      </div>
    </header>
  );
}
