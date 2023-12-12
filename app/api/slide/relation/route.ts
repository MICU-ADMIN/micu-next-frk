import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Slide } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get slides by relation
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const relationId = req.nextUrl.searchParams.get("relationId") || 0;
    const relationName = req.nextUrl.searchParams.get("relationName") || "";

    if (!relationId || !relationName) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    const [slides] = await (
      await conn
    ).query(
      "SELECT id, description, label, relationId, relationName, content, userId, thumbnail, createdAt, thumbnail, updatedAt FROM Slide WHERE establishmentId = ? AND relationId = ? AND relationName = ? AND id > ? ORDER BY id ASC LIMIT 30",
      [session.establishmentId, relationId, relationName, lastId]
    );

    return NextResponse.json(slides as Slide[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
