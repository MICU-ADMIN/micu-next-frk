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
    let query = searchParams.get("q");

    query = query?.replace("%20", " ") || "";

    //Get Hadith

    const hadith = await conn.execute(
      `SELECT id, collectionId, bookId, hadithNumber, label , isnad , arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
      FROM hadith WHERE arabic LIKE ? OR englishTrans LIKE ? LIMIT 200`,
      [`%${query}%`, `%${query}%`]
    );

    return NextResponse.json(hadith?.rows || []);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: "Server Error" }, { status: 500 });
  }
};
