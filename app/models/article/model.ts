"use server";

import mysql from "mysql2/promise";
import { addServerCacheValue } from "@/app/_helpers/api/servercache";
import { NextResponse } from "next/server";
import { getSession } from "@/app/_helpers/api/helpers";
import { getServerCacheValue } from "@/app/_helpers/api/servercache";
import { revalidatePath } from "next/cache";

const conn = mysql.createConnection(process.env.DATABASE_URL);

export async function createArticle(userId, formData) {
  console.log("USERID", userId);

  try {
    const [result] = await (
      await conn
    ).execute(`SELECT * FROM Article WHERE userId = ?`, [userId]);

    if (result.length === 0) {
      // User has no existing article, so create a new one
      const insertResult = await (
        await conn
      ).execute(
        "INSERT INTO `Article` (`userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        addServerCacheValue([], "articles" + userId);
        return true;
      } else {
        console.error(
          "Failed to insert article. Rows affected:",
          insertResult.affectedRows
        );
        return false;
      }
    } else {
      // User has an existing article, so update it
      const updateResult = await (
        await conn
      ).execute(
        `UPDATE Article SET email = ?, telephone = ?, firstLine = ?, secondLine = ?, zip = ?, country = ?, buildingNumber = ?, city = ?, county = ?, institutionName = ?, type = ? WHERE userId = ?`,
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
        addServerCacheValue([], "articles" + userId);
        return true;
      } else {
        console.error(
          "Failed to update article. Rows affected:",
          updateResult.affectedRows
        );
        return false;
      }
    }
  } catch (err) {
    console.error("Error during article operation:", err.message);
    return false;
  }
  revalidatePath("/dashboard");
}

//This function is server side only.
async function getArticle() {
  try {
    const session = await getSession(conn);
    if (!session) return NextResponse.redirect("/login?unauthorized=true");

    const cachedOrgData = await getServerCacheValue("org" + session.userId);
    if (cachedOrgData) return NextResponse.redirect("/dashboard/home");

    const cachedData = await getServerCacheValue("articles" + session.userId);
    if (cachedData) return cachedData;

    const [rows] = await (
      await conn
    ).execute(
      " SELECT `id`, `userId`, `email`, `telephone`, `firstLine`, `secondLine`, `zip`, `country`, `buildingNumber`, `city`, `county`, `institutionName`, `type`, `createdAt`, `updatedAt` FROM `Article` WHERE `userId` = ? ",
      [session.userId]
    );

    addServerCacheValue(rows, "articles" + session.userId);

    return rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}
