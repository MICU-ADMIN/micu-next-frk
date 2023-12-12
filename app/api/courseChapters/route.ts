// table.string("courseId", 10).notNullable().index();
// table.string("positionInCourse", 10).notNullable().index();
// table.string("userId", 10).notNullable();
// table.string("establishmentId", 100).notNullable().index();
// table.string("title", 90).notNullable();
// table.string("description", 1000);
// table.string("videoUrl", 300);
// table.integer("position");
// table.boolean("isPublished").defaultTo(false);
// table.boolean("isFree").defaultTo(false);
// table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
// table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
// table.timestamp("deletedAt")

//Create a new application

import { DeleteHandler, Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Record } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Add a new Course Chapter
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    const date = new Date() as any;

    //Create new Record
    await (
      await conn
    ).query("INSERT INTO CourseChapter (courseId, positionInCourse, userId, establishmentId, title, description, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [
      body.courseId,
      body.positionInCourse,
      session.userId,
      session.establishmentId,
      body.title,
      body.description,
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

    await DeleteHandler(body, session, "Course", conn);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
