import React from "react";
import Applications from "./Applications";
import { getSession } from "../_helpers/api/helpers";
import { addServerCacheValue, getServerCacheValue } from "../_helpers/api/servercache";
import { Toaster } from "react-hot-toast";

import { NextResponse } from "next/server";
//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session) return NextResponse.redirect("/login?unauthorized=true");

    const cachedOrgData = await getServerCacheValue("org" + session.userId);
    if (cachedOrgData) return NextResponse.redirect("/dashboard/home");

    const cachedData = await getServerCacheValue("applications" + session.userId);
    if (cachedData) return cachedData;

    const [rows] = await (
      await conn
    ).execute(
      " SELECT `id`, `userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`, `createdAt`, `updatedAt` FROM `Application` WHERE `userId` = ? ",
      [session.userId]
    );

    addServerCacheValue(rows, "applications" + session.userId);

    return rows;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <Toaster />
      <Applications data={data} />
    </>
  );
}
