import { Log, RedirectLogin, getSession } from "@/app/_helpers/api/helpers";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const Buckets = {
  public: process.env.AWS_BUCKET_PUBLIC as string,
  private: process.env.AWS_BUCKET as string,
};

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Return private file
export async function GET(_: Request, { params }: { params: { key: string } }) {
  const session = await getSession(conn);
  if (!session?.establishmentId) return RedirectLogin();

  const objectSream = new GetObjectCommand({ Bucket: Buckets.private, Key: session.establishmentName + "/" + params.key });
  //  send the object stream to the client
  return s3.send(objectSream);
}

//Upload files
export const POST = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    //get search params
    const ispublicParam = req.nextUrl.searchParams.get("ispublic");

    const isPublic = ispublicParam === "true" ? "true" : "false";

    const bucket = isPublic ? Buckets.public : Buckets.private;
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    const fileData = [];
    const returnData = [];

    const dateObj = new Date();

    for (const file of files) {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer()) as Buffer;
      const date = Date.now();
      const key = encodeURI(session.establishmentName + "/" + session.userId + "/" + date + "-" + file.name);
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body }));

      const content = {
        key: encodeURI((isPublic ? session.establishmentName + "/" : "") + session.userId + "/" + date + "-" + file.name),
        public: isPublic === "true" ? 1 : 0,
        name: file.name,
        type: file.type,
        size: file.size,
        userId: session.userId,
        createdAt: dateObj,
        updatedAt: dateObj,
      };

      fileData.push({
        ...content,
        establishmentId: session.establishmentId,
      });
      returnData.push(content);
    }

    //insert into db
    await (
      await conn
    ).query("INSERT INTO File (`key`, `public`, `name`, `type`, `size`, `userId`, `createdAt`, `updatedAt`, `establishmentId`) VALUES ?", [
      fileData.map((file) => Object.values(file)),
    ]);

    //only send return data without establishmentId
    return NextResponse.json(returnData);
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};

//Delete a file
export const DELETE = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return RedirectLogin();

    const ispublicParam = req.nextUrl.searchParams.get("ispublic");
    let key = req.nextUrl.searchParams.get("key");

    if (!key) return NextResponse.json({ message: "Invalid key", errors: true }, { status: 400 });

    const isPublic = ispublicParam === "true" ? "true" : "false";
    const bucket = isPublic ? Buckets.public : Buckets.private;

    if (!isPublic) key = session.establishmentName + "/" + key;
    const splitKey = key.split("/");

    //check if key begins with establishment name
    if (splitKey[0] !== session.establishmentName) return NextResponse.json({ message: "Permission denied", errors: true }, { status: 403 });
    //check if the user deleting now is the one that uploaded the file or is an admin
    else if (splitKey[1] !== session.userId.toString() && session.role !== "admin")
      return NextResponse.json({ message: "Permission denied", errors: true }, { status: 403 });

    //delete from s3
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    //delete from db
    await (await conn).query("DELETE FROM File WHERE `key` = ?", [key]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    Log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};
