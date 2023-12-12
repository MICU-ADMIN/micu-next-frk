//Create a new application

import { DeleteHandler, Log, RedirectLogin, SortRecordData, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { RecordData } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get recordsData records
export const POST = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const recordId = req.nextUrl.searchParams.get("recordId") || 0;

    const body = await req.json();

    const [Records] = await (
      await conn
    ).query(
      "SELECT id, label, userId, establishmentId, establishmentPublicId, recordId, model, createdAt, updatedAt, `index` FROM RecordData WHERE establishmentId = ? AND recordId = ? AND createdAt BETWEEN ? AND ?",
      [session.establishmentId, recordId, body.startDate, body.endDate]
    );

    return NextResponse.json(Records as RecordData[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
