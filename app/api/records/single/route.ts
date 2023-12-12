//Create a new application

import { DeleteHandler, Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Record } from "@/_types/dbTypes";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get records

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const id = req.nextUrl.searchParams.get("id") || 0;

    //get record
    let [record] = (await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `properties`, `label`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Record` WHERE `establishmentId` = ? AND `id` = ? ",
      [session.establishmentId, id]
    )) as any;

    return NextResponse.json(record as Record);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
