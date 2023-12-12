//Create a new application

import { DeleteHandler, Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";

import { Record } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get records

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [records] = await (
      await conn
    ).query("SELECT id, description, title, userId, imageUrl, createdAt, updatedAt FROM Course WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30", [
      session.establishmentId,
      lastId,
    ]);

    return NextResponse.json(records as Record[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new Course
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    const date = new Date() as any;

    //Create new Record
    const [RecordQuery] = await (
      await conn
    ).query("INSERT INTO Course (title, description, userId, establishmentId, imageUrl , type, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [
      body.title,
      body.description,
      session.userId,
      session.establishmentId,
      body.imageUrl,
      body.type,
      date,
    ]);

    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Update a Course
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    const date = new Date() as any;

    //Update Record
    const [RecordQuery] = await (
      await conn
    ).query(
      "UPDATE Course SET title = ?, description = ?, imageUrl = ?, type = ?, progress = ?, isPublished = ?, categoryId = ?, price = ?, updatedAt = ? WHERE id = ? AND establishmentId = ?",
      [
        body.title,
        body.description,
        body.imageUrl,
        body.type,
        body.progress,
        body.isPublished,
        body.categoryId,
        body.price,
        date,
        body.id,
        session.establishmentId,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    //start transaction
    await (await conn).query("START TRANSACTION");

    //Delete Course and CourseChapters and CourseAttachments
    if (body.ids) {
      await (await conn).query("DELETE FROM Course WHERE `id` IN (?) AND `establishmentId` = ?", [body.ids, session.establishmentId]);
      await (await conn).query("DELETE FROM CourseChapter WHERE `courseId` IN (?) AND `establishmentId` = ?", [body.ids, session.establishmentId]);
      await (await conn).query("DELETE FROM CourseAttachment WHERE `courseId` IN (?) AND `establishmentId` = ?", [body.ids, session.establishmentId]);
    } else {
      await (await conn).query("DELETE FROM Course WHERE `id` = ? AND `establishmentId` = ?", [body.id, session.establishmentId]);
      await (await conn).query("DELETE FROM CourseChapter WHERE `courseId` = ? AND `establishmentId` = ?", [body.id, session.establishmentId]);
      await (await conn).query("DELETE FROM CourseAttachment WHERE `courseId` = ? AND `establishmentId` = ?", [body.id, session.establishmentId]);
    }

    await (await conn).query("COMMIT");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    await (await conn).query("ROLLBACK");
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
