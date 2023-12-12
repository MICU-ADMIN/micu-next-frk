import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Slide } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get Slide
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const id = req.nextUrl.searchParams.get("id") || 0;

    const [slides] = (await (
      await conn
    ).query(
      "SELECT id, description, label, relationId, relationName, userId, thumbnail, content, createdAt, updatedAt FROM Slide WHERE establishmentId = ? AND id = ?",
      [session.establishmentId, id]
    )) as any;

    return NextResponse.json(slides[0] as Slide);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
