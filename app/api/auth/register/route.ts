import { NextResponse } from "next/server";
import { uuid } from "uuidv4";
import { CheckErrors } from "@/app/_helpers/api/helpers";
import { DBConnection } from "@/app/_helpers/api/configs";

const argon2 = require("argon2");

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const connection = await DBConnection();

    const errors = await CheckErrors(body, {
      email: "required|email|max:255",
      password: "required|type:string|min:8|max:100",
      firstName: "required|min:2|max:50",
      lastName: "required|min:2|max:50",
    });
    if (errors) return NextResponse.json({ message: errors, errors: true }, { status: 400 });

    body.hashedPassword = await argon2.hash(body.password);

    const [rows, fields] = await (
      await connection
    ).execute("INSERT INTO User (privateId, email, hashedPassword, firstName, lastName, salt) VALUES (?, ?, ?, ?, ?, ?)", [
      uuid(),
      body.email,
      body.hashedPassword,
      body.firstName,
      body.lastName,
      uuid(),
    ]);

    return NextResponse.json({ success: true, rows: rows, field: fields });
  } catch (e: any) {
    console.log(e);
    //check if the error is a unique constraint error myysql
    if (e.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "Email is already taken", errors: true }, { status: 400 });
    }

    return NextResponse.json({ message: "Server error", errors: true }, { status: 500 });
  }
};
