//Create a new application

import { DeleteHandler, Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";

import { Site } from "@/_types/dbTypes";

import { DBConnection } from "@/app/_helpers/api/configs";
//Get sites
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
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
    const conn = await DBConnection();
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
                  active: true,
                  data: [],
                },
                {
                  id: 2,
                  label: "Articles",
                  link: "/articles",
                  type: "link",
                  default: true,
                  active: false,
                  external: false,
                  data: [],
                },
                {
                  id: 3,
                  label: "Courses",
                  link: "/courses",
                  type: "link",
                  default: true,
                  active: false,
                  external: false,
                  data: [],
                },
                {
                  id: 4,
                  label: "Shop",
                  type: "link",
                  link: "/shop",
                  default: true,
                  active: false,
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

      //create article page
      await (
        await conn
      ).query("INSERT INTO SitePage (label, userId, establishmentId, siteName, content, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
        "articles",
        session.userId,
        session.establishmentId,
        body.label,
        '[{"id":1,"data":{"elements":[{"id":1702229388430,"type":"articles","data":{},"size":{"width":"92.04%","height":"787px"},"position":{"x":"4.00%","y":"4.82%","z":0}}],"height":968}}]',
        date,
      ]);

      //create courses page
      await (
        await conn
      ).query("INSERT INTO SitePage (label, userId, establishmentId, siteName, content, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
        "courses",
        session.userId,
        session.establishmentId,
        body.label,
        '[{"id":1,"data":{"elements":[{"id":1702229388430,"type":"courses","data":{},"size":{"width":"92.04%","height":"787px"},"position":{"x":"4.00%","y":"4.82%","z":0}}],"height":968}}]',
        date,
      ]);

      //create shop page
      await (
        await conn
      ).query("INSERT INTO SitePage (label, userId, establishmentId, siteName, content, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
        "shop",
        session.userId,
        session.establishmentId,
        body.label,
        '[{"id":1,"data":{"elements":[{"id":1702229388430,"type":"shop","data":{},"size":{"width":"92.04%","height":"787px"},"position":{"x":"4.00%","y":"4.82%","z":0}}],"height":968}}]',
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

//Update a site
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    if (!body.id) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    const date = new Date() as any;

    //start transaction
    await (await conn).query("START TRANSACTION");
    //Update Site
    await (
      await conn
    ).query("UPDATE Site SET `label` = ?, `description` = ?, `thumbnail` = ?, `updatedAt` = ? WHERE `id` = ? AND `establishmentId` = ?", [
      body.label,
      body.description,
      body.thumbnail,
      date,
      body.id,
      session.establishmentId,
    ]);

    await (
      await conn
    ).query("UPDATE SitePage SET `siteName` = ? WHERE `siteName` = ? AND `establishmentId` = ?", [body.label, body.oldLabel, session.establishmentId]);

    await (await conn).query("COMMIT");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    await (await conn).query("ROLLBACK");
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Delete site/s
export const DELETE = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    //start transaction
    await (await conn).query("START TRANSACTION");

    //Delete Site and SitePages
    if (body.labels) {
      await (await conn).query("DELETE FROM Site WHERE `label` IN (?) AND `establishmentId` = ?", [body.labels, session.establishmentId]);
      await (await conn).query("DELETE FROM SitePage WHERE `siteName` IN (?) AND `establishmentId` = ?", [body.labels, session.establishmentId]);
    } else {
      await (await conn).query("DELETE FROM Site WHERE `label` = ? AND `establishmentId` = ?", [body.label, session.establishmentId]);
      await (await conn).query("DELETE FROM SitePage WHERE `siteName` = ? AND `establishmentId` = ?", [body.label, session.establishmentId]);
    }

    await (await conn).query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    await (await conn).query("ROLLBACK");
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
