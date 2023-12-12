"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "../not-found";
import ContactOrganization from "./page-organization";
import PagePersonal from "../page-personal";

export default function Home() {
  const searchParams = useSearchParams();

  //   profile id or org id
  const id = searchParams.get("id");

  //   user or org
  const type = searchParams.get("type");

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

  if (type == "organization") {
    if (id) {
      return <ContactOrganization />;
    } else {
      return <NotFound />;
    }
  }

  if (type == "personal") {
    if (id) {
      return <PagePersonal />;
    } else {
      return <NotFound />;
    }
  }

  return <NotFound />;
}
