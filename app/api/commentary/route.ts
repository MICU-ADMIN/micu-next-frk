import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";

// const mysql = require('mysql2/promise');
// const conn = mysql.createConnection(process.env.DATABASE_URL);
const conn = connect({
  url: process.env.ISNAD_DATABASE_URL,
});
export const GET = async (req: Request, res: Response) => {
  try {
    // get site query param
    const searchParams = new URL(req.url).searchParams;

    const commentaryId = searchParams.get("commentaryId");
    const hadithId = searchParams.get("hadithId");

    if (!commentaryId || !hadithId) return NextResponse.json({ errors: "incorrect params" }, { status: 400 });

    //Get commentary

    const c = await conn.execute(
      `SELECT id, commentaryId, hadithId, englishText, arabicJson, arabicText FROM commentary WHERE commentaryId = ? AND hadithId = ?`,
      [commentaryId, hadithId]
    );

    return NextResponse.json(c?.rows || []);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: "Server Error" }, { status: 500 });
  }
};
