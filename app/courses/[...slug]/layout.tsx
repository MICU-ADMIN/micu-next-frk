import { Sidebar } from "@/app/components/_Courses/sidebar";
import PageHeader from "./PageHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader />
      <div className="h-full bg-white page-wrapper relative">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">{/* <Navbar /> */}</div>
        <div className="hidden md:flex h-screen w-56 flex-col  absolute inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
