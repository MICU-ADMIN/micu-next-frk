import { getSession } from "@/app/_helpers/api/helpers";
import { NextResponse } from "next/server";

import { DBConnection } from "@/app/_helpers/api/configs";

//get Site Page
export const GET = async (req: Request, res: Response) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Invalid parameter", errors: true }, { status: 400 });

    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const [rows] = await (
      await conn
    ).execute("SELECT id, siteName, label, userId, content, createdAt, updatedAt FROM SitePage WHERE establishmentId = ? AND id = ?", [
      session.establishmentId,
      id,
    ]);
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
