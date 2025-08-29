import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

export default function NavBread({
  currentPage,
  prevPath,
}: {
  currentPage: string;
  prevPath?: { path: string; name: string };
}) {
  return (
    <div className="flex items-center text-sm">
      {/* sidebar trigger */}
      <SidebarTrigger />

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4 font-semibold"
      />

      {/* breadcrumb navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/admin/dashboard">Dashboard</Link>
          </BreadcrumbItem>
          {prevPath ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={prevPath.path}>{prevPath.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : null}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
