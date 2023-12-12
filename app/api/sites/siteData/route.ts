//Create a new application

import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/app/_helpers/api/configs";

//Update a site data
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const body = await req.json();
    if (!body.id) return NextResponse.json({ message: "Invalid body", errors: true }, { status: 400 });

    //Update Site
    await (
      await conn
    ).query("UPDATE Site SET `siteData` = ?, `updatedAt` = ? WHERE `id` = ? AND `establishmentId` = ?", [
      body.siteData,
      new Date(),
      body.id,
      session.establishmentId,
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
