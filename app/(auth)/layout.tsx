import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <SidebarProvider>
      <Header showSidebar={false} />
      <div className="flex justify-center items-center my-[15vh] px-4">
        {children}
      </div>
      <Footer />
    </SidebarProvider>
  );
}
