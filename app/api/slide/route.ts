import { DeleteHandler, Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Slide } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get slides
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [slides] = await (
      await conn
    ).query(
      "SELECT id, description, label, relationId, relationName, userId, thumbnail, createdAt, updatedAt FROM Slide WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30",
      [session.establishmentId, lastId]
    );

    return NextResponse.json(slides as Slide[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new slide
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = (await req.json()) as Slide;
    const date = new Date() as any;

    const [SlideQuery] = await (
      await conn
    ).query(
      "INSERT INTO Slide (label, description, content, relationId, relationName, establishmentId, userId, createdAt, updatedAt, thumbnail ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [body.label, body.description, body.content, body.relationId, body.relationName, session.establishmentId, session.userId, date, date, body.thumbnail]
    );

    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

// //Update a slide
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = (await req.json()) as Slide;
    const date = new Date() as any;

    const [SlideQuery] = await (
      await conn
    ).query("UPDATE Slide SET `label` = ?, `description` = ?, `content` = ?, `updatedAt` = ? WHERE `id` = ? AND `establishmentId` = ?", [
      body.label,
      body.description,
      body.content,
      date,
      body.id,
      session.establishmentId,
    ]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Delete a Record/s
export const DELETE = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    await DeleteHandler(body, session, "Slide", conn);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
