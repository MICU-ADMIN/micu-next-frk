import React from "react";
import { Log, getSession } from "@/app/_helpers/api/helpers";

import { Record, RecordData } from "@/_types/dbTypes";
import { redirect } from "next/navigation";
import RecordItem from "./RecordItem";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData(id: string) {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    //join with Record table to get on id to recordId and get properties from Record table
    const [recordData] = (await (
      await conn
    ).execute(
      " SELECT `RecordData`.`id`, `RecordData`.`recordId`, `RecordData`.`index`, `RecordData`.`userId`, `RecordData`.`model`, `RecordData`.`createdAt`, `RecordData`.`updatedAt`, `Record`.`properties`, `RecordData`.`label` FROM `RecordData` LEFT JOIN `Record` ON `Record`.`id` = `RecordData`.`recordId` WHERE `RecordData`.`id` = ? AND `RecordData`.`establishmentId` = ? ",
      [id, session.establishmentId]
    )) as any;

    return recordData[0] as RecordData;
  } catch (err) {
    Log(err);
    return [];
  }
}

async function page({ searchParams }: any) {
  if (!searchParams.id) return <div className="flex flex-col items-center justify-center h-screen w-screen ">Invalid Record</div>;

  const data = (await getData(searchParams.id)) as RecordData | "unauthorised";
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <RecordItem data={data} />;
}

export default page;
