//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Record } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get records

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [records] = await (
      await conn
    ).query(
      "SELECT id, description, label, userId, thumbnail, createdAt, updatedAt FROM Record WHERE establishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30",
      [session.establishmentId, lastId]
    );

    return NextResponse.json(records as Record[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new record
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    const date = new Date() as any;

    //Create new Record
    const [RecordQuery] = await (
      await conn
    ).query(
      "INSERT INTO Record (label, description, userId, establishmentId, establishmentPublicId, thumbnail, updatedAt, properties, additionalData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.label,
        body.description,
        session.userId,
        session.establishmentId,
        body.establishmentPublicId,
        body.thumbnail,
        date,
        body?.properties,
        body?.additionalData,
      ]
    );
    //last insert id
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    //Create new RecordData for this Record
    const [RecordDataQuery] = await (
      await conn
    ).query(
      "INSERT INTO RecordData (label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      ["", session.userId, session.establishmentId, body.establishmentPublicId, lastInsertId[0].id, "{}", date, date]
    );

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Update a Record
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    const [RecordQuery] = await (
      await conn
    ).query(
      "UPDATE Record SET `label` = ?, `description` = ?, `thumbnail` = ?, `updatedAt` = ?, `properties` = ?, `additionalData` = ? WHERE `id` = ? AND `establishmentId` = ?",
      [body.label, body.description, body.thumbnail, date, body?.properties, body?.additionalData, body.id, session.establishmentId]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
