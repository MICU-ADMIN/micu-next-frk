import { getSession } from "@/app/_helpers/api/helpers";
import { getServerCacheValue, addServerCacheValue } from "@/app/_helpers/api/servercache";
import React from "react";
import { NextResponse } from "next/server";

import SettingsPage from "./Help";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL + "/login?unathorised=true");

    const cachedData = await getServerCacheValue("prayers" + session.establishmentId);
    if (cachedData) return cachedData;

    const [sites] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `title`, `userId`, `timesData`, `createdAt`, `updatedAt` FROM `Prayer` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    addServerCacheValue(sites, "prayers" + session.establishmentId);
    return sites;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return <SettingsPage data={data} />;
}
