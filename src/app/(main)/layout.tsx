import { MainSidebar } from "@/components/layouts/MainSidebar";
import { Navbar } from "@/components/layouts/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModalProvider } from "@/providers/ModalProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="flex flex-col h-dvh w-screen">
        <div className="w-full flex items-center justify-between gap-x-8 pr-4">
          <SidebarTrigger />
          <Navbar />
        </div>
        <ModalProvider />
        {children}
      </main>
    </SidebarProvider>
  );
}
