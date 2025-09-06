import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Staff Page",
  description: "this dashboard for staff can managing data",
};

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex h-screen justify-center bg-gradient-to-br from-amber-300  to-amber-600">
      {children}
    </main>
  );
}
