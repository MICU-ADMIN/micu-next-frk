"use server";

import React from "react";
import Applications from "./Applications";
import ViewApplication from "./ViewApplication";
import { getSession } from "../../_helpers/api/helpers";
import {
  addServerCacheValue,
  getServerCacheValue,
} from "../../_helpers/api/servercache";
import { Toaster } from "react-hot-toast";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

function revalidatePath(path) {
  switch (path) {
    case "/":
      revalidatePath("/");
      break;
    case "/dashboard":
      revalidatePath("/dashboard");
      break;

    default:
      break;
  }
}

export async function createApplication(userId, formData) {
  console.log("USERID", userId);

  try {
    const [result] = await (
      await conn
    ).execute(`SELECT * FROM Application WHERE userId = ?`, [userId]);

    if (result.length === 0) {
      // User has no existing application, so create a new one
      const insertResult = await (
        await conn
      ).execute(
        "INSERT INTO `Application` (`userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          formData.get("email"),
          formData.get("telephone"),
          formData.get("firstLine"),
          formData.get("secondLine"),
          formData.get("zip"),
          formData.get("country"),
          formData.get("buildingNumber"),
          formData.get("city"),
          formData.get("county"),
          formData.get("institutionName"),
          formData.get("type"),
        ]
      );

      if (insertResult.affectedRows === 1) {
        addServerCacheValue([], "applications" + userId);
        return true;
      } else {
        console.error(
          "Failed to insert application. Rows affected:",
          insertResult.affectedRows
        );
        return false;
      }
    } else {
      // User has an existing application, so update it
      const updateResult = await (
        await conn
      ).execute(
        `UPDATE Application SET email = ?, telephone = ?, firstLine = ?, secondLine = ?, zip = ?, country = ?, buildingNumber = ?, city = ?, county = ?, institutionName = ?, type = ? WHERE userId = ?`,
        [
          formData.get("email"),
          formData.get("telephone"),
          formData.get("firstLine"),
          formData.get("secondLine"),
          formData.get("zip"),
          formData.get("country"),
          formData.get("buildingNumber"),
          formData.get("city"),
          formData.get("county"),
          formData.get("institutionName"),
          formData.get("type"),
          userId,
        ]
      );

      if (updateResult.affectedRows === 1) {
        addServerCacheValue([], "applications" + userId);
        revalidatePath("/dashboard");
        return true;
      } else {
        console.error(
          "Failed to update application. Rows affected:",
          updateResult.affectedRows
        );
        return false;
      }
    }
  } catch (err) {
    console.error("Error during application operation:", err.message);
    return false;
  }
}

//This function is server side only.
async function getApplication() {
  try {
    const session = await getSession(conn);
    if (!session) return NextResponse.redirect("/login?unauthorized=true");

    const cachedOrgData = await getServerCacheValue("org" + session.userId);
    if (cachedOrgData) return NextResponse.redirect("/dashboard/home");

    const cachedData = await getServerCacheValue(
      "applications" + session.userId
    );
    if (cachedData) return cachedData;

    const [rows] = await (
      await conn
    ).execute(
      " SELECT `id`, `userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`, `createdAt`, `updatedAt` FROM `Application` WHERE `userId` = ? ",
      [session.userId]
    );

    addServerCacheValue(rows, "applications" + session.userId);

    return rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default async function Page() {
  const application = await getApplication();
  const session = await getSession(conn);

  console.log("APPLICATION" + application);

  // if the user already has an application we want to show them their existing application
  if (application.length >= 1) {
    return (
      <ViewApplication userId={session.userId} application={application[0]} />
    );
  }

  // if a user doesnt have a application redirect them to appplication creation
  return (
    <>
      <Toaster />
      <Applications userId={session.userId} data={application[0]} />
    </>
  );
}