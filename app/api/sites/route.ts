//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Site } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get sites
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [sites] = await (
      await conn
    ).query("SELECT id, description, label, userId, thumbnail, createdAt, updatedAt FROM Site WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30", [
      session.establishmentId,
      lastId,
    ]);

    return NextResponse.json(sites as Site[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new site
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    body.label = body.label.replace(/\s+/g, "-").toLowerCase();

    const date = new Date() as any;

    let siteid = null;
    try {
      //start transaction
      await (await conn).query("START TRANSACTION");

      //Create new Site
      const [SiteQuery] = await (
        await conn
      ).query(
        "INSERT INTO Site (label, description, userId, establishmentId, establishmentPublicId, thumbnail, updatedAt, siteData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          body.label,
          body.description,
          session.userId,
          session.establishmentId,
          body.establishmentPublicId,
          body.thumbnail,
          date,
          JSON.stringify({
            navOptions: {
              navItems: [
                {
                  id: 1,
                  label: "Home",
                  link: "/",
                  type: "link",
                  external: false,
                  data: [],
                },
              ],
            },
          }),
        ]
      );

      //last insert id
      const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

      //Add site page to the site
      await (
        await conn
      ).query("INSERT INTO SitePage (label, userId, establishmentId, siteName, content, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
        "home",
        session.userId,
        session.establishmentId,
        body.label,
        '[{"id":1,"data":[]}]',
        date,
      ]);

      await (await conn).query("COMMIT");
      siteid = lastInsertId[0].id;
    } catch (err) {
      await (await conn).query("ROLLBACK");
      throw err;
    }

    deleteFromServerCache("sites" + session.establishmentId);

    return NextResponse.json({ success: true, id: siteid });
  } catch (err: any) {
    Log(err);
    //check if unique constraint was violated
    if (err.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "Site name is already taken", errors: true }, { status: 400 });
    }

    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
