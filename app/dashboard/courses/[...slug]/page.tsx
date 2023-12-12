import { Log, getSession } from "@/app/_helpers/api/helpers";
import React from "react";
import CoursesPage from "./courses";
import { redirect } from "next/navigation";

import { Course } from "@/_types/dbTypes";
import { Metadata } from "next";

//@ts-expect-error
import { DBConnection } from "@/app/_helpers/api/configs";
//This function is server side only.
async function getData() {
  try {
    const conn = await DBConnection();
    const session = await getSession(conn);
    if (!session?.establishmentId) return "unauthorised";

    const [courses] = await (
      await conn
    ).execute(
      " SELECT `id`, `userId`, `type`, `establishmentId`, `title`, `description`, `imageUrl`, `price`, `progress`, `isPublished`, `categoryId`, `createdAt`, `updatedAt`, `deletedAt` FROM `Course` WHERE `establishmentId` = ? ORDER BY `id` DESC",
      [session.establishmentId]
    );

    return courses;
  } catch (err) {
    Log(err);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Courses",
  description: "Courses | " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Page() {
  const data = (await getData()) as Course[] | "unauthorised";

  console.log(data);
  if (data === "unauthorised") return redirect("/login?unauthorised=true");

  return <CoursesPage data={data} />;
}
