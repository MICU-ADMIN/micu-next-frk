//Create a new application

import { Log, RedirectLogin, SortRecordData, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Record } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get records with multiple filters
export const POST = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const recordId = req.nextUrl.searchParams.get("recordId") || 0;
    const dir = req.nextUrl.searchParams.get("dir") || "ASC";
    const orderBy = req.nextUrl.searchParams.get("orderBy") || "id";

    if (!recordId) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    else if (dir !== "ASC" && dir !== "DESC") return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    // else if (orderBy !== "index" && HasSql(orderBy)) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    const body = await req.json();
    if (!body.sqlFilters || !body.jsonFilters) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });
    else if (body.sqlFilters.length + body.jsonFilters.length > 10)
      return NextResponse.json({ message: "Maximum 10 filters allowed", errors: true }, { status: 400 });

    let sql =
      "SELECT id, label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt, `index` FROM RecordData WHERE establishmentId = ? AND recordId = ?";
    const dependencyArray = [session.establishmentId, recordId];

    const existingColumns = ["id", "label", "model", "createdAt", "updatedAt", "index", "userId"];
    const allowedOperators = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "NOT LIKE", "IS NULL", "IS NOT NULL", "IN", "NOT IN", "BETWEEN", "NOT BETWEEN"];

    if (body.sqlFilters.length > 0) {
      body.sqlFilters.forEach((filter) => {
        if (!existingColumns.includes(filter.type)) throw "incorrect params";
        else if (!allowedOperators.includes(filter.operator)) throw "incorrect params";
        sql += "AND" + "`" + filter.type + "`" + filter.operator + "?";
        dependencyArray.push(filter.operator.includes("LIKE") ? `%${filter.value}%` : filter.value);
      });
    }

    if (body.jsonFilters.length > 0) {
      body.jsonFilters.forEach((filter) => {
        if (!allowedOperators.includes(filter.operator)) {
          throw new Error("Incorrect operator used");
        }
        //filter.column represents the JSON key to extract in the model json column. Then filter operator is applied to the value of that key
        sql += ` AND JSON_EXTRACT(model, '$.${filter.column}') ${filter.operator}  ${filter.operator.includes("IN") ? `(${filter.value})` : "?"}`;
        dependencyArray.push(filter.operator.includes("LIKE") ? `%${filter.value}%` : filter.value);
      });
    }

    let existingColumn = existingColumns.includes(orderBy) ? true : false;
    sql += "AND id" + (dir == "ASC" || lastId == 0 ? ">" : "<") + "?";
    sql += existingColumn ? " ORDER BY " + orderBy + " " + dir + " LIMIT 30" : " LIMIT 30";

    dependencyArray.push(lastId);

    const [records] = await (await conn).query(sql, dependencyArray);

    //`check if orderBy is a column present in the table if not and sort data manually in the backend
    const sortedData = SortRecordData(records, orderBy, dir, existingColumn);
    if (sortedData) return NextResponse.json({ sortedRecords: sortedData });

    return NextResponse.json(records as Record[]);
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
