//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { File } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get files
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [files] = await (
      await conn
    ).query(
      " SELECT `id`, `name`, `key`, `folderId`, `size`, `type`, `userId`, `public`, `createdAt`, `updatedAt`, `lastViewed`, `favouriteIds`, `deletedAt` FROM `File` WHERE `establishmentId` = ? AND `id` > ? ORDER BY `id` DESC LIMIT 50",
      [session.establishmentId, lastId]
    );

    return NextResponse.json(files as File[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new Prayer Screen
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

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

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
