import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
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

    const [art] = await (
      await conn
    ).query("SELECT id, description, label, userId, thumbnail, createdAt, updatedAt FROM Site WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30", [
      session.establishmentId,
      lastId,
    ]);

    return NextResponse.json(art as Article[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new article
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    const categoryIds = "[]";
    //Create new Article
    await (
      await conn
    ).query(
      "INSERT INTO Article (title, description, userId, content, establishmentId, thumbnail, attachments, updatedAt, categoryIds, relationId, relationName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.title,
        body.description,
        session.userId,
        body.content,
        session.establishmentId,
        body.thumbnail,
        body.attachments,
        date,
        categoryIds,
        body.relationId,
        body.relationName,
      ]
    );
    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//update an article
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    //Create new Article
    await (
      await conn
    ).query(
      "UPDATE Article SET `title` = ?, `description` = ?, `content` = ?, `thumbnail` = ?, `attachments` = ?, `updatedAt` = ?, `categoryIds` = ? WHERE `id` = ? AND `establishmentId` = ?",
      [body.title, body.description, body.content, body.thumbnail, body.attachments, date, "[]", body.id, session.establishmentId]
    );

    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Delete an article
export const DELETE = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    //Create new Article
    await (await conn).query("DELETE FROM Article WHERE `id` = ? AND `establishmentId` = ?", [body.id, session.establishmentId]);
    deleteFromServerCache("articles" + session.establishmentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
