import { getSession } from "@/app/_helpers/api/helpers";
import { getServerCacheValue, addServerCacheValue } from "@/app/_helpers/api/servercache";
import React from "react";
import { NextResponse } from "next/server";

import PrayerScreensPage from "../PrayerScreens";
import { Prayer, PrayerTimesScreen } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL + "/login?unauthorised=true");

    const cachedData = await getServerCacheValue("sites" + session.establishmentId);
    if (cachedData) return cachedData;

    //The sql func automatically parametrizes your query to avoid SQL injection attacks. LIMIT 30 , order by id desc
    // const sites =
    //   await sql`SELECT "id", "description", "title", "userId", "thumbnail", "createdAt", "updatedAt" FROM "PrayerTimesScreen" WHERE "establishmentId" = ${session.establishmentId} ORDER BY "id" DESC LIMIT 30`;

    const [screens] = await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `title`, `userId`, `createdAt`, `updatedAt` ,`images` FROM `PrayerTimesScreen` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ",
      [session.establishmentId]
    );

    addServerCacheValue(screens, "prayerScreen" + session.establishmentId);
    return screens;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Page() {
  const data = (await getData()) as PrayerTimesScreen[];

  return <PrayerScreensPage screens={data} />;
}
