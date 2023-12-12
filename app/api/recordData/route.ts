//Create a new application

import { DeleteHandler, Log, RedirectLogin, SortRecordData, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { RecordData } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get recordsData records
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const recordId = req.nextUrl.searchParams.get("recordId") || 0;
    const dir = req.nextUrl.searchParams.get("dir") || "ASC";
    const orderBy = req.nextUrl.searchParams.get("orderBy") || "id";
    // const fp = req.nextUrl.searchParams.get("fp") || 0;
    const existingColumns = ["id", "label", "createdAt", "updatedAt", "index", "userId"];

    if (!recordId) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    else if (dir !== "ASC" && dir !== "DESC") return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    let records;

    let sql =
      "SELECT id, label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt, `index` FROM RecordData WHERE establishmentId = ? AND recordId = ?";
    if (orderBy == "id") {
      sql += " AND id" + (dir == "ASC" || lastId == 0 ? ">" : "<") + "? ORDER BY id " + dir + " LIMIT 30";
      [records] = await (await conn).query(sql, [session.establishmentId, recordId, lastId]);
    } else {
      let existingColumn = existingColumns.includes(orderBy) ? true : false;
      sql += "AND id" + (dir == "ASC" || lastId == 0 ? ">" : "<") + "?";
      sql += existingColumn ? " ORDER BY " + orderBy + " " + dir + " LIMIT 30" : " LIMIT 30";
      [records] = await (await conn).query(sql, [session.establishmentId, recordId, lastId]);

      //`check if orderBy is a column present in the table if not and sort data manually in the backend
      const sortedData = SortRecordData(records, orderBy, dir, existingColumn);
      if (sortedData) return NextResponse.json({ sortedRecords: sortedData });
    }

    return NextResponse.json(records as RecordData[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Add a new recorddata
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;
    const [RecordDataQuery] = await (
      await conn
    ).query(
      //do a subquery to get the last index of the record arse it as a number then increment it by 1. cast as number
      `INSERT INTO RecordData 
    (label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt,` +
        "`index`" +
        `)                        
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT \`index\` FROM (SELECT  CAST(\`index\` AS UNSIGNED) AS \`index\` FROM RecordData WHERE recordId = ? ORDER BY \`index\` DESC LIMIT 1) AS \`index\`)+1)`,
      [body.label, session.userId, session.establishmentId, session.establishmentPublicId, body.recordId, body.model, date, date, body.recordId]
    );

    //get last id inserted and index
    const [lastInsertId] = (await (await conn).query("SELECT LAST_INSERT_ID() as id")) as any;

    return NextResponse.json({ success: true, id: lastInsertId[0].id });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

// //Update a Record
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    if (!body.id) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    const date = new Date() as any;

    await (
      await conn
    ).query("UPDATE RecordData SET `label` = ?, `updatedAt` = ?, `model` = ? WHERE `id` = ? AND `establishmentId` = ?", [
      body.label,
      date,
      body.model,
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
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();

    await DeleteHandler(body, session, "RecordData", conn);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
