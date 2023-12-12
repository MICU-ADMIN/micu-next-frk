import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { deleteFromServerCache } from "@/app/_helpers/api/servercache";
import { NextResponse } from "next/server";

import { DBConnection } from "@/app/_helpers/api/configs";

//Get all applications for a user
export const GET = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session) return RedirectLogin();

    const [rows] = await (
      await conn
    ).execute(
      `SELECT id, userId, email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type, createdAt, updatedAt FROM Application WHERE userId = ${session.userId}`
    );
    return NextResponse.json(rows);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 450 });
  }
};

//Create a new application
export const POST = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const { email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type } = await req.json();

    // const application =
    //   await sql`INSERT INTO "Application" ("userId", "email", "telephone", "firstLine", "secondLine", "zip", "country", "buildingNumber", "city", "county", "institutionName", "type")
    //             VALUES (${session.userId}, ${email}, ${telephone}, ${firstLine}, ${secondLine}, ${zip}, ${country}, ${buildingNumber}, ${city}, ${county}, ${institutionName}, ${type})  RETURNING "id"`;

    const [application] = await (
      await conn
    ).execute(
      "INSERT INTO Application (userId, email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type) VALUES (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)",
      [session.userId, email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type]
    );

    deleteFromServerCache("applications" + session.userId);

    return NextResponse.json({ success: true, id: application });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Update an application
export const PUT = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const { email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type } = await req.json();

    // const application =
    //   await sql`UPDATE "Application" SET "email" = ${email}, "telephone" = ${telephone}, "firstLine" = ${firstLine}, "secondLine" = ${secondLine}, "zip" = ${zip}, "country" = ${country},
    //             "buildingNumber" = ${buildingNumber}, "city" = ${city}, "county" = ${county}, "institutionName" = ${institutionName}, "type" = ${type} WHERE "userId" = ${session.userId} RETURNING "id"`;

    const [application] = await (
      await conn
    ).execute(
      `UPDATE Application SET email = ?, telephone = ?, firstLine = ?, secondLine = ?, zip = ?, country = ?, buildingNumber = ?, city = ?, county = ?, institutionName = ?, type = ? WHERE userId = ? RETURNING id`,
      [email, telephone, firstLine, secondLine, zip, country, buildingNumber, city, county, institutionName, type, session.userId]
    );

    deleteFromServerCache("applications" + session.userId);

    return NextResponse.json({ success: true, id: application });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Delete an application
export const DELETE = async (req: Request, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session) return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });

    const body = await req.json();

    // const application = await sql`DELETE FROM "Application" WHERE "userId" = ${session.userId} AND "id" = ${body.id} RETURNING "id"`;

    const [application] = await (await conn).execute(`DELETE FROM Application WHERE userId = ${session.userId} AND id = ? RETURNING id`, [body.id]);

    deleteFromServerCache("applications" + session.userId);

    return NextResponse.json({ success: true, id: application });
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
