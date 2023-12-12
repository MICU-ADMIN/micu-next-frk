import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//Get articles
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const [users] = await (
      await conn
    ) //Join with org users
      .query(
        "SELECT u.id, u.email, u.firstName, u.lastName, u.mobile, u.isEmailVerified, u.isMobileVerified, u.isDisabled, u.createdAt, ou.role, ou.establishmentName FROM User u JOIN OrgUser ou ON u.id = ou.userId WHERE ou.establishmentId = ? AND ou.deletedAt IS NULL",
        [session.establishmentId]
      );

    return NextResponse.json(users);
  } catch (err) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
