"use server";

import { getSession } from "../../_helpers/api/helpers";
import {
  addServerCacheValue,
  getServerCacheValue,
} from "../../_helpers/api/servercache";
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

export async function createIncident(userId, formData) {
  console.log("USERID", userId);

  try {
    const [result] = await (
      await conn
    ).execute(`SELECT * FROM Incident WHERE userId = ?`, [userId]);

    if (result.length === 0) {
      // User has no existing incident, so create a new one
      const insertResult = await (
        await conn
      ).execute(
        "INSERT INTO `Incident` (`userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        addServerCacheValue([], "incidents" + userId);
        return true;
      } else {
        console.error(
          "Failed to insert incident. Rows affected:",
          insertResult.affectedRows
        );
        return false;
      }
    } else {
      // User has an existing incident, so update it
      const updateResult = await (
        await conn
      ).execute(
        `UPDATE Incident SET email = ?, telephone = ?, firstLine = ?, secondLine = ?, zip = ?, country = ?, buildingNumber = ?, city = ?, county = ?, institutionName = ?, type = ? WHERE userId = ?`,
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
        addServerCacheValue([], "incidents" + userId);
        return true;
      } else {
        console.error(
          "Failed to update incident. Rows affected:",
          updateResult.affectedRows
        );
        return false;
      }
    }
  } catch (err) {
    console.error("Error during incident operation:", err.message);
    return false;
  }
  revalidatePath("/dashboard");
}

export async function addComment(userId, formData) {
  console.log("USERID", userId);

  try {
    const [result] = await (
      await conn
    ).execute(`SELECT * FROM Incident WHERE userId = ?`, [userId]);

    if (result.length === 0) {
      // User has no existing incident, so create a new one
      const insertResult = await (
        await conn
      ).execute(
        "INSERT INTO `Incident` (`userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        addServerCacheValue([], "incidents" + userId);
        return true;
      } else {
        console.error(
          "Failed to insert incident. Rows affected:",
          insertResult.affectedRows
        );
        return false;
      }
    } else {
      // User has an existing incident, so update it
      const updateResult = await (
        await conn
      ).execute(
        `UPDATE Incident SET email = ?, telephone = ?, firstLine = ?, secondLine = ?, zip = ?, country = ?, buildingNumber = ?, city = ?, county = ?, institutionName = ?, type = ? WHERE userId = ?`,
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
        addServerCacheValue([], "incidents" + userId);
        return true;
      } else {
        console.error(
          "Failed to update incident. Rows affected:",
          updateResult.affectedRows
        );
        return false;
      }
    }
  } catch (err) {
    console.error("Error during incident operation:", err.message);
    return false;
  }
  revalidatePath("/dashboard");
}

//This function is server side only.
export async function getIncident() {
  try {
    const session = await getSession(conn);
    if (!session) return NextResponse.redirect("/login?unauthorized=true");

    const cachedOrgData = await getServerCacheValue("org" + session.userId);
    if (cachedOrgData) return NextResponse.redirect("/dashboard/home");

    const cachedData = await getServerCacheValue("incidents" + session.userId);
    if (cachedData) return cachedData;

    const [rows] = await (
      await conn
    ).execute(
      " SELECT `id`, `userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`, `createdAt`, `updatedAt` FROM `Incident` WHERE `userId` = ? ",
      [session.userId]
    );

    addServerCacheValue(rows, "incidents" + session.userId);

    return rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}
