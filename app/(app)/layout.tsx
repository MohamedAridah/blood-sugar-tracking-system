import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = Readonly<React.PropsWithChildren>;

export default function MainLayout({ children }: Props) {
  return (
    <>
      <SidebarProvider>
        <Header showSidebar />
        <div className="flex">
          <AppSidebar />
          <main className="p-4 md:p-5 flex-1 w-full h-full">{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}
