//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

const defaultSiteData = {
  siteColors: ["#FFFFFF", "#D8DAD3", "#4F46E5", "A3A0D8", "#000000"],
  defaultColorIndexes: {
    sectionBackground: 0,
    textColor: 4,
    buttonBackground: 4,
    buttonTextColor: 0,
    buttonHoverBackground: 2,
    buttonHoverTextColor: 0,
    buttonBorder: 0,
  },
};

//Get current site
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const siteName = req.nextUrl.searchParams.get("siteName");
    const pageName = req.nextUrl.searchParams.get("pageName");

    const [site] = (await (
      await conn
    ) //get site page as join
      .query(
        `SELECT s.id, s.description, s.label, s.permissions, s.adminIds, s.siteData, s.userId, s.thumbnail, s.createdAt, s.updatedAt, sp.id AS SitePages_id, sp.description AS SitePages_description, sp.content AS SitePages_content, sp.label AS SitePages_label 
FROM Site s 
JOIN SitePage sp ON s.label = sp.siteName 
WHERE s.label = ? AND sp.label = ?
`,
        [siteName, pageName || "home"]
      )) as any;

    if (!site || site.length === 0) return NextResponse.json({ message: "Site not found", errors: true }, { status: 404 });
    let currentSite = site[0] as any;
    currentSite.siteData = { ...defaultSiteData, ...(currentSite.siteData || []) };
    //parse sitePage content
    currentSite.SitePages = [
      {
        id: currentSite.SitePages_id,
        description: currentSite.SitePages_description,
        content: await JSON.parse(currentSite.SitePages_content),
        label: currentSite.SitePages_label,
      },
    ];

    return NextResponse.json(currentSite);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
