//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Record } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

// //Update a Record
export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    if (!body.records) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    else if (body.records.length > 50) return NextResponse.json({ message: "Too many records", errors: true }, { status: 400 });

    //update multiple reco rds in one query
    for (const record of body.records) {
      await (
        await conn
      ).execute("UPDATE RecordData SET `index` = ?, `updatedAt` = ? WHERE `id` = ? AND `establishmentId` = ? AND `recordId` = ?", [
        parseInt(record.index),
        date,
        record.id,
        session.establishmentId,
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
