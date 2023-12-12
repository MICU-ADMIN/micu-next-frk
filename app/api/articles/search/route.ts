import { getSession } from "@/app/_helpers/api/helpers";
import { NextResponse } from "next/server";

import { DBConnection } from "@/app/_helpers/api/configs";
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();

    const [articleQuery] = await (
      await conn
    ).query(
      "SELECT id, description, title as label, userId, thumbnail, createdAt, updatedAt FROM Article WHERE establishmentId = ? AND LOWER(title) LIKE ? ORDER BY id DESC LIMIT 30",
      [session.establishmentId, "%" + body.searchTerm + "%"]
    );

    return NextResponse.json(articleQuery);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
