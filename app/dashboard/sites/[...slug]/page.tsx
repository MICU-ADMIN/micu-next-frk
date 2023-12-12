import { Log, getSession } from "@/app/_helpers/api/helpers";
import React from "react";
import SitesPage from "./sites";
import { redirect } from "next/navigation";

import { Site } from "@/_types/dbTypes";
import { Metadata } from "next";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    const [sites] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `label`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Site` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    return sites;
  } catch (err) {
    Log(err);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Sites",
  description: "Sites | " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Page() {
  const data = (await getData()) as Site[] | "unauthorised";
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <SitesPage data={data} />;
}
