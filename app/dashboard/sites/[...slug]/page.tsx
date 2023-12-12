import { Log, getSession } from "@/app/_helpers/api/helpers";
import { getServerCacheValue, addServerCacheValue } from "@/app/_helpers/api/servercache";
import React from "react";
import SitesPage from "./sites";
import { redirect } from "next/navigation";
import mysql from "mysql2/promise";
import { Site } from "@/_types/dbTypes";
import { Metadata } from "next";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//This function is server side only.
async function getData() {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    const cachedData = await getServerCacheValue("sites" + session.establishmentId);
    if (cachedData) return cachedData;

    //The sql func automatically parametrizes your query to avoid SQL injection attacks. LIMIT 30 , order by id desc
    // const sites =
    //   await sql`SELECT "id", "description", "label", "userId", "thumbnail", "createdAt", "updatedAt" FROM "Site" WHERE "establishmentId" = ${session.establishmentId} ORDER BY "id" DESC LIMIT 30`;

    const [sites] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `label`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Site` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    addServerCacheValue(sites, "sites" + session.establishmentId);
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
