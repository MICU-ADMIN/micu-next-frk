```tsx

import { getSession } from "@/app/_helpers/api/helpers";
import {
  getServerCacheValue,
  addServerCacheValue,
} from "@/app/_helpers/api/servercache";
import React from "react";
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import PrayersPage from "./Prayers";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//This function is server side only.
async function getData() {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId)
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/login?unathorised=true"
      );

    const cachedData = await getServerCacheValue(
      "prayers" + session.establishmentId
    );
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

  return <PrayersPage data={data} />;
}


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File (${file})
    + Import (${import})
    + Function (${function})
    + Connections (${connection})
    + Try-Catch Block (${try-catch})
    + Return (${return})
    + Redirect (${redirect})
    + Establishment ID (${establishmentId})
    + Session (${session})
    + Next Response (${nextResponse})
    + MySQL (${mysql})
    + Prayers Page (${prayersPage})
    + Data (${data})
    + Get Data (${getData})
    + Add Server Cache Value (${addServerCacheValue})
    + Get Server Cache Value (${getServerCacheValue})
    + Execute Query (${executeQuery})
    + Return Sites (${sites})
    + Cache (${cache})
    + Limit (${limit})
    + Order By (${orderBy})
    + Desc (${desc})
    + Error

```
