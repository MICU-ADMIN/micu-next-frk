import { getSession, RedirectLogin, Log } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

//Create a new application

import { Record } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get files
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const key = req.nextUrl.searchParams.get("key") || "";

    const [file] = (await (
      await conn
    ).query(
      " SELECT `id`, `name`, `key`, `folderId`, `size`, `type`, `userId`, `public`, `createdAt`, `updatedAt`, `lastViewed`, `favouriteIds`, `deletedAt` FROM `File` WHERE `establishmentId` = ? AND `key` = ?",
      [session.establishmentId, key]
    )) as any;

    return NextResponse.json(file[0] as File);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
