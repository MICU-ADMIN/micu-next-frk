import { getSession } from "@/app/_helpers/api/helpers";
import { addServerCacheValue, deleteFromServerCache, getServerCacheValue } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";

import { DBConnection } from "@/app/_helpers/api/configs";
//Get current article
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    // const session = await getSession(conn);
    // if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const id = req.nextUrl.searchParams.get("id");

    const [article] = (await (
      await conn
    ).query(
      "SELECT id, title, description, content, userId, likes, attachments, allowComments, showAuthor, showDate, showLikes, thumbnail, createdAt, updatedAt, deletedAt, commentKey, categoryIds FROM Article WHERE id = ?",
      [id]
    )) as any;

    return NextResponse.json(article[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
