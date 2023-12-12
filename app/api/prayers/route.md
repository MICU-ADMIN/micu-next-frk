```ts

import { getSession } from "@/app/_helpers/api/helpers";
import {
  addServerCacheValue,
  deleteFromServerCache,
  getServerCacheValue,
} from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get current site
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId)
      return NextResponse.redirect("/login?unauthorised=true");

    const siteName = req.nextUrl.searchParams.get("siteName");

    const cachedData = await getServerCacheValue("site" + siteName);
    if (cachedData) return NextResponse.json(cachedData);

    const [site] = (await (
      await conn
    ).query(
      "SELECT id, description, label, permissions, adminIds, userId, thumbnail, createdAt, updatedAt , siteData FROM Site WHERE label = ?",
      [siteName]
    )) as any;

    if (!site || site.length === 0)
      return NextResponse.json(
        { message: "Site not found", errors: true },
        { status: 404 }
      );

    const [SitesPage] = await (
      await conn
    ).query(
      "SELECT id, description, content, label FROM SitePage WHERE siteName = ? AND label = ?",
      [siteName, "home"]
    );

    let currentSite = site[0] as any;
    currentSite.SitePages = SitesPage as any;

    addServerCacheValue(currentSite, "site" + siteName);

    return NextResponse.json(currentSite);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "There was an error", errors: true },
      { status: 500 }
    );
  }
};

//Add a new prayer
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId)
      return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();
    const date = new Date() as any;

    const categoryIds = "[]";
    //Create new prayer
    await (
      await conn
    ).query(
      "INSERT INTO Prayer (title, description,establishmentId, timesData,userId, updatedAt ) VALUES (?, ?, ?, ?, ?, ?)",
      [
        body.title,
        body.description,
        session.establishmentId,
        body.timesData,
        session.userId,
        date,
      ]
    );
    //last insert id
    const [lastInsertId] = (await (
      await conn
    ).query("SELECT LAST_INSERT_ID() as id")) as any;

    deleteFromServerCache("prayers" + session.establishmentId);

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "There was an error", errors: true },
      { status: 500 }
    );
  }
};

//update an prayer
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId)
      return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();
    const date = new Date() as any;

    //Create new prayer
    await (
      await conn
    ).query(
      "UPDATE Prayer SET title = ?, description = ?,  timesData = ?, updatedAt = ?, WHERE id = ?",
      [body.title, body.description, body.timesData, date, body.id]
    );

    deleteFromServerCache("prayers" + session.establishmentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "There was an error", errors: true },
      { status: 500 }
    );
  }
};


```

```mermaid
graph LR
    + Go File (1)
    +- Import (2)
    +- MySQL (3)
    +- Next.js (4)
    +- Get Current Site (5)
    +- Get Site Data (6)
    +- Add Server Cache Value (7)
    +- Get Server Cache Value (8)
    +- Get Site (9)
    +- Add New Prayer (10)
    +- Update Prayer (11)
    +- Delete From Server Cache (12)
```
Here is a breakdown of each step in the graph:

1. Go File: This is the file being analyzed, which contains the Go code for the application.
2. Import: This step represents the import statements in the file, which bring in necessary packages and modules for the application.
3. MySQL: This step represents the MySQL database connection, which is used to interact with the database in the application.
4. Next.js: This step represents the Next.js server,

```
