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

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Update a Course
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    const date = new Date() as any;

    if (!body.data) return NextResponse.json({ message: "Invalid form data", errors: true }, { status: 400 });

    for (const item of body.data) {
      //Update Record
      await (
        await conn
      ).query("UPDATE CourseChapter SET positionInCourse = ?, updatedAt = ? WHERE id = ? AND establishmentId = ?", [
        item.position,
        date,
        item.id,
        session.establishmentId,
      ]);
    }

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
