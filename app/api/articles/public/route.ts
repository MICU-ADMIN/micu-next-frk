import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";

import { Article } from "@/_types/dbTypes";

import { DBConnection } from "@/app/_helpers/api/configs";
//Get articles
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;
    const publicId = req.nextUrl.searchParams.get("publicId") || 0;

    const [art] = await (
      await conn
    ).query(
      "SELECT id, description, title, userId, thumbnail, createdAt, updatedAt FROM Article WHERE publicEstablishmentId = ? AND id > ? ORDER BY id ASC LIMIT 30",
      [publicId, lastId]
    );

    return NextResponse.json(art as Article[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
