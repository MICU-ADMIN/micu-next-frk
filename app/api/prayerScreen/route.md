```ts

//Create a new application

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

//Add a new Prayer Screen
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();
    const date = new Date() as any;

    //Create new Site
    const [screenQuery] = await (
      await conn
    ).query(
      "INSERT INTO PrayerTimesScreen (title, description, userId, establishmentId, topMessage, bottomMessage, images, theme, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [body.title, body.description, session.userId, session.establishmentId, body.topMessage, body.bottomMessage, body.images, body.theme, date]
    );
    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    deleteFromServerCache("prayerScreens" + session.establishmentId);

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};


```

```mermaid
graph LR
    + Go File [0]
    +- Import statements [1]
    +- Create a new application [2]
    +- Get current site [3]
    +- Add a new Prayer Screen [4]
    +- Get current site
        |- Query database for site information [5]
        |- Check if site exists [6]
        |- Return site information if it exists [7]
    +- Add a new Prayer Screen
        |- Validate request body [8]
        |- Create new site [9]
        |- Update site information [10]
        |- Return new site information [11]
```
In this Go file, there are several functions that handle different routes and operations:
1. `GET /`: This function handles the root URL of the application and returns the current site information.
2. `POST /`: This function handles POST requests to the root URL and creates a new prayer screen. It validates the request body, creates a new site, and updates

```
