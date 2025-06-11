import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = Readonly<React.PropsWithChildren>;

export default function MainLayout({ children }: Props) {
  return (
    <>
      <SidebarProvider>
        <Header showSidebar />
        <div className="flex">
          <AppSidebar />
          <section className="flex flex-col w-full min-h-[calc(100dvh-53px)]">
            <main className="p-4 md:p-5 flex-1 w-full h-full">{children}</main>
            <Footer />
          </section>
        </div>
      </SidebarProvider>
    </>
  );
}
