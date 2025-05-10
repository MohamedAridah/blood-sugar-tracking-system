import ThemeToggler from "@/components/ThemeToggler";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-md z-20 border-b border-b-border  py-2 px-5 flex items-center gap-2 ">
      <SidebarTrigger />
      <div className="justify-self-end ms-auto gap-2">
        <ThemeToggler />
      </div>
    </header>
  );
}
