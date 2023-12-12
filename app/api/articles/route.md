```ts

import { getSession } from "@/app/_helpers/api/helpers";
import { addServerCacheValue, deleteFromServerCache, getServerCacheValue } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get current site
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const siteName = req.nextUrl.searchParams.get("siteName");

    const cachedData = await getServerCacheValue("site" + siteName);
    if (cachedData) return NextResponse.json(cachedData);

    const [site] = (await (
      await conn
    ).query("SELECT id, description, label, permissions, adminIds, userId, thumbnail, createdAt, updatedAt , siteData FROM Site WHERE label = ?", [
      siteName,
    ])) as any;

    if (!site || site.length === 0) return NextResponse.json({ message: "Site not found", errors: true }, { status: 404 });

    const [SitesPage] = await (await conn).query("SELECT id, description, content, label FROM SitePage WHERE siteName = ? AND label = ?", [siteName, "home"]);

    let currentSite = site[0] as any;
    currentSite.SitePages = SitesPage as any;

    addServerCacheValue(currentSite, "site" + siteName);

    return NextResponse.json(currentSite);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new article
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();
    const date = new Date() as any;

    const categoryIds = "[]";
    //Create new Article
    await (
      await conn
    ).query(
      "INSERT INTO Article (title, description, userId, content, establishmentId, thumbnail, attachments, updatedAt, categoryIds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [body.title, body.description, session.userId, body.content, session.establishmentId, body.thumbnail, body.attachments, date, categoryIds]
    );
    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//update an article
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();
    const date = new Date() as any;

    //Create new Article
    await (
      await conn
    ).query("UPDATE Article SET title = ?, description = ?, content = ?, thumbnail = ?, attachments = ?, updatedAt = ?, categoryIds = ? WHERE id = ?", [
      body.title,
      body.description,
      body.content,
      body.thumbnail,
      body.attachments,
      date,
      body.categoryIds || "[]",
      body.id,
    ]);

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};


```

```mermaid

Here is a generated Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File [0]
        + Import statements [1]
        + Functions [2]
        + MySQL queries [3]
        + Next.js API [4]
    + GET request [5]
    + POST request [6]
    + PUT request [7]

```
Note: The above graph is a simplified representation of the Go file structure, and the numbers in the graph are not necessarily the actual line numbers in the file. The graph is meant to provide a high-level overview of the file's structure and organization.

```
