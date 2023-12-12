import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Article } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);
//Get articles
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const relationId = req.nextUrl.searchParams.get("relationId") || 0;
    const relationName = req.nextUrl.searchParams.get("relationName") || "";

    const [articles] = (await (
      await conn
    ).query(
      "SELECT id, description, title, userId, thumbnail, content, createdAt, updatedAt FROM Article WHERE establishmentId = ? AND relationId = ? AND relationName = ? AND id > ? ORDER BY id ASC LIMIT 30",
      [session.establishmentId, relationId, relationName, lastId]
    )) as any;

    return NextResponse.json(articles);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
