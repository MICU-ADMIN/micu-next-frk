import { NextResponse } from "next/server";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cronKey = searchParams.get(process.env.CRON_KEY);
  if (!cronKey) {
    return NextResponse.json({ message: "Error doing request", errors: true }, { status: 500 });
  }

  //Delete all sessions which are 1 week old

  let date7DaysAgo = new Date();
  date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

  await (await conn).query("DELETE FROM SessionStorage WHERE createdAt < ?", [date7DaysAgo]);

  return NextResponse.json({ success: true });
}
