"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "../not-found";
import PageOrganization from "./page-organization";
import PagePersonal from "./page-personal";
import NotFoundPersonal from "../not-found-personal";

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
      return <PageOrganization />;
    } else {
      return <NotFound />;
    }
  }

  if (type == "personal") {
    if (id) {
      return <PagePersonal />;
    } else {
      return <NotFoundPersonal />;
    }
  }

  return <NotFound />;
}
