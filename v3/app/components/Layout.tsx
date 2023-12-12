"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";
import PageOrganization from "../page-organization";

export function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  let isHomePage = usePathname() === "/";
  const temp = searchParams.get("temp");

  if (isHomePage) {
    if (temp) {
      return (
        <>
          {/* <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative z-10 flex w-full flex-col"> */}
          <PageOrganization />

          {/* <main className="flex-auto"> {children}</main> */}
          {/* </div> */}
        </>
      );
    } else {
      return (
        <>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative z-10 flex w-full flex-col">
            {/* <Header /> */}

            <main className="flex-auto">{children}</main>
            <Footer
              creditation={`MosqueICU. All rights
                reserved.`}
            />
          </div>
        </>
      );
    }
  }

  if (isHomePage && temp) {
  } else {
    return (
      <>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative z-10 flex w-full flex-col">
          <Header />

          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </>
    );
  }
}
