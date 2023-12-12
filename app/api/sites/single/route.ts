//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { addServerCacheValue, getServerCacheValue } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get current site
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const path = req.nextUrl.searchParams.get("path");
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

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
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
