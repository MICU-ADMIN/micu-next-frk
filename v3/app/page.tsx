"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "./not-found";
import PageOrganization from "./page-organization";
import PagePersonal from "./page-personal";

export default function Home() {
  const searchParams = useSearchParams();

  //   profile id or org id
  const user = searchParams.get("user");

  //   user or org
  const temp = searchParams.get("temp");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  //   if (id || type) {
  //     if (type == "organization") {
  //       return <NotFound />;
  //     } else {
  //       return <NotFound />;
  //     }
  //   } else {
  //     return <NotFound />;
  //   }

  //localhost:3001?v=Ux8M-G7rS8U
  http: if (temp) {
    return null;
  } else if (user) {
    return <PagePersonal />;
  } else {
    return <NotFound />;
  }

    if (temp == "organization") {
      if (user) {
        return <PageOrganization />;
      } else {
        return <NotFound />;
      }
    }

    if (user == "personal") {
      if (user) {
        return <PagePersonal />;
      } else {
        return <NotFound />;
      }
    }

    return <NotFound />;
  }

