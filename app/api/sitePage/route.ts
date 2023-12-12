import { getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextResponse } from "next/server";

import { DBConnection } from "@/app/_helpers/api/configs";

//get Site Pages
export const GET = async (req: Request, res: Response) => {
  try {
    const siteName = req.nextUrl.searchParams.get("siteName");
    if (!siteName) return NextResponse.json({ message: "Invalid site name", errors: true }, { status: 400 });

    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const [rows] = await (
      await conn
    ).execute("SELECT id, siteName, label, userId, createdAt, updatedAt FROM SitePage WHERE establishmentId = ? AND siteName = ?", [
      session.establishmentId,
      siteName,
    ]);

    return NextResponse.json(rows);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Update Site Page
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const body = await req.json();
    const date = new Date() as any;

    //Update Site Page
    // const SiteQuery =
    //   await sql`UPDATE "SitePage" SET "content" = ${body.content}, "updatedAt" = ${date} WHERE "id" = ${body.id} AND "establishmentId" = ${session.establishmentId} RETURNING "id"`;

    await (
      await conn
    ).execute("UPDATE SitePage SET content = ?, updatedAt = ? WHERE id = ? AND establishmentId = ?", [body.content, date, body.id, session.establishmentId]);

    deleteFromServerCache("site" + body.siteName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
