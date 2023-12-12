//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { File } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get files by lastViewed
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const lastId = req.nextUrl.searchParams.get("lastId") || 0;

    const [files] = await (
      await conn
    ).query(
      " SELECT `id`, `name`, `key`, `folderId`, `size`, `type`, `userId`, `public`, `createdAt`, `updatedAt`, `lastViewed`, `favouriteIds`, `deletedAt` FROM `File` WHERE `establishmentId` = ? AND `id` > ? ORDER BY `lastViewed` DESC LIMIT 50",
      [session.establishmentId, lastId]
    );

    return NextResponse.json(files as File[]);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
