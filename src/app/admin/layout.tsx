import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin Page",
  description: "this dashboard for admin can managing user data",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
