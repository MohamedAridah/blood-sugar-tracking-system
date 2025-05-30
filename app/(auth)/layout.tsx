import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <SidebarProvider>
      <Header showSidebar={false} />
      <div className="flex flex-col justify-center items-center my-14">
        {children}
      </div>
    </SidebarProvider>
  );
}
