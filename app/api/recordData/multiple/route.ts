//Create a new application

import { Log, RedirectLogin, SortRecordData, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Record } from "@/_types/dbTypes";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get records with multiple filters
export const POST = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    // const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const recordId = req.nextUrl.searchParams.get("recordId") || 0;
    const dir = req.nextUrl.searchParams.get("dir") || "ASC";
    const orderBy = req.nextUrl.searchParams.get("orderBy") || "id";
    const fp = req.nextUrl.searchParams.get("fp") || 0;
    const columns = ["id", "label", "model", "createdAt", "updatedAt", "index"];

    if (!recordId) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    else if (dir !== "ASC" && dir !== "DESC") return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    // else if (orderBy !== "index" && HasSql(orderBy)) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    const body = await req.json();
    if (!body.filters) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    let sql =
      "SELECT id, label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt, `index` FROM RecordData WHERE establishmentId = ? AND recordId = ?";
    const dependencyArray = [session.establishmentId, recordId];
    body.filters.forEach((filter: any) => {
      sql += " AND ? ? ?";
      dependencyArray.push(filter.column, filter.operator, filter.value);
    });

    let existingColumn = columns.includes(orderBy) ? true : false;
    if (existingColumn) {
      sql += " ORDER BY " + orderBy + " " + dir + " LIMIT 250";
    } else {
      sql += " ORDER BY id " + dir + " LIMIT 250";
    }

    const [records] = (await (await conn).query(sql, dependencyArray)) as any;
    //check if orderBy is a column present in the table if not and sort data manually in the backend
    const sortedData = SortRecordData(records, orderBy, dir, existingColumn);
    if (sortedData) return NextResponse.json({ sortedRecords: sortedData });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
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
      ).execute("UPDATE RecordData SET `label` = ?, `updatedAt` = ?, `model` = ? WHERE `id` = ? AND `establishmentId` = ?", [
        record.label,
        date,
        record.model,
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
