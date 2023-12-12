import { Log, getSession } from "@/app/_helpers/api/helpers";
import React from "react";
import { redirect } from "next/navigation";

import { Record } from "@/_types/dbTypes";
import { Metadata } from "next";
import RecordsPage from "./records";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    const [records] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `label`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Record` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    return records;
  } catch (err) {
    Log(err);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Records",
  description: "Records | " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Page() {
  const data = (await getData()) as Record[] | "unauthorised";
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <RecordsPage data={data} />;
}
