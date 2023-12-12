import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";

// const mysql = require('mysql2/promise');
// import { DBConnection } from "@/app/_helpers/api/configs";
const conn = connect({
  url: process.env.ISNAD_DATABASE_URL,
});
export const GET = async (req: Request, res: Response) => {
  try {
    // get site query param
    const searchParams = new URL(req.url).searchParams;

    let isnad = searchParams.get("ids");

    if (!isnad) return NextResponse.json({ errors: "incorrect params" }, { status: 400 });

    const isnadParsed = (await JSON.parse(isnad)) as number[];

    //@ts-expect-error
    if (!isnadParsed.length > 30) {
      return NextResponse.json({ errors: "incorrect params" }, { status: 400 });
    }

    const scholars = await conn.execute(`SELECT id, name, bornAt, diedAt, livedIn, nickName FROM scholar WHERE id IN (?) ORDER BY FIELD(id, ?)`, [
      isnadParsed as number[],
      isnadParsed as number[],
    ]);

    return NextResponse.json(scholars?.rows || []);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: "Server Error" }, { status: 500 });
  }
};
