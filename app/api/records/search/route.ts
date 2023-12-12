import { getSession } from "@/app/_helpers/api/helpers";
import { NextResponse } from "next/server";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const body = await req.json();

    const [Query] = (await (
      await conn
    ).query(
      "SELECT id, properties, description, label, userId, thumbnail, createdAt, updatedAt FROM Record WHERE establishmentId = ? AND LOWER(label) LIKE ? ORDER BY id DESC LIMIT 30",
      [session.establishmentId, "%" + body.searchTerm || "" + "%"]
    )) as any;

    return NextResponse.json(Query);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
