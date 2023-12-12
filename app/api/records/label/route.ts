//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Update Record label
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    const date = new Date() as any;

    const [RecordQuery] = await (
      await conn
    ).query("UPDATE Record SET `label` = ?,`updatedAt` = ? WHERE `id` = ? AND `establishmentId` = ?", [body.label, date, body.id, session.establishmentId]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
