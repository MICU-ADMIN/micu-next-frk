import React from "react";
import RecordPage from "./Record";
import { Log, getSession } from "@/app/_helpers/api/helpers";
import mysql from "mysql2/promise";

import { Record, RecordData } from "@/_types/dbTypes";
import { redirect } from "next/navigation";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//This function is server side only.
async function getData(id: string) {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    //get record
    let [record] = (await (
      await conn
    ).execute(
      " SELECT `id`, `description`, `properties`, `label`, `userId`, `thumbnail`, `createdAt`, `updatedAt` FROM `Record` WHERE `establishmentId` = ? AND `id` = ? ",
      [session.establishmentId, id]
    )) as any;

    //get record data with record id
    const [recordData] = await (
      await conn
    ).execute(
      " SELECT `id`, `recordId`, `model`, `createdAt`, `userId`, `uploadIds`, `index`, `createdAt`, `updatedAt` FROM `RecordData` WHERE `recordId` = ? AND `establishmentId` = ? ORDER BY `index` ASC  LIMIT 30 ",
      [id, session.establishmentId]
    );

    record[0].data = recordData;

    return record[0];
  } catch (err) {
    Log(err);
    return [];
  }
}

async function page({ searchParams }: any) {
  if (!searchParams.id) return <div className="flex flex-col items-center justify-center h-screen w-screen ">Invalid Record</div>;

  const data = (await getData(searchParams.id)) as (Record & { data: RecordData }) | "unauthorised";
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <RecordPage record={data} />;
}

export default page;
