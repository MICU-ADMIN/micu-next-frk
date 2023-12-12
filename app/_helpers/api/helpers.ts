import "server-only";

import { Knex } from "knex";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Session } from "@/_types/base";

export const getSession = async (connection: any): Promise<Session | null> => {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) return null;

  const [rows] = (await (await connection).execute("SELECT data, userId FROM SessionStorage WHERE token = ?", [sessionCookie.value])) as any;

  if (!rows || rows.length === 0) return null;

  const data = typeof rows[0].data === "string" ? JSON.parse(rows[0].data) : rows[0].data;
  return { ...data, userId: rows[0].userId } as Session;
};

export const CheckErrors = async (body: any, schema: any, session?: any, db?: Knex) => {
  if (!body) {
    // Error(res, "Invalid Request", "400");
    return "Invalid Request";
  }
  for (const [key, value] of Object.entries(schema)) {
    //@ts-ignore
    for (const option of value.split("|")) {
      if (option === "required" && !body.hasOwnProperty(key)) {
        // Ckecks if the value was passed in the bod
        return `${key} is required`;
      } else if (body.hasOwnProperty(key)) {
        if (option.startsWith("max") && (typeof body[key] === "number" ? body[key] : body[key].length) > parseInt(option.split(":")[1])) {
          // Checks if the value is less than the max length
          return `${key} is too long`;
        } else if (option.startsWith("min") && (typeof body[key] === "number" ? body[key] : body[key].length) < parseInt(option.split(":")[1])) {
          // Checks if the value is more than the min length
          return `${key} is too short`;
        } else if (option === "email" && !body[key].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
          // Checks if the value is a valid email
          return `${key} is not a valid email`;
        } else if (option.startsWith("type") && typeof body[key] !== option.split(":")[1]) {
          // Checks if the value is a string type
          return `${key} is not a valid ${option.split(":")[1]}`;
        } else if (option === "phone" && !body[key].match(/^[0-9]+$/g)) {
          // Checks if the value is a valid phone number
          return `${key} is not a valid phone number`;
        } else if (option === "url" && !body[key].match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/g)) {
          // Checks if the value is a valid url
          return `${key} is not a valid url`;
        } else if (option.startsWith("regex") && !body[key].match(new RegExp(option.split(":")[1]))) {
          // Checks if the value matches the regex
          NextResponse.json({ message: `${key} is not valid` }, { status: 400 });
          return false;
        } else if (option.startsWith("unique") && session && db) {
          // Checks if the value is unique, the unique option must be passed with the table name and will only be unique to the specific org, hence the org_id in the where clause
          const values = option.split(":");
          const result = await db(values[1])
            .where({ [key]: body[key], org_id: session.orgId })
            .first();
          if (result) {
            return `${key} is already taken`;
          } else {
            continue;
          }
        }
      } else {
        return null;
      }
    }
  }
  return null;
};

//database deleete handler for estabishment data
export const DeleteHandler = async (body: { id?: number; ids: number[]; archive?: boolean }, session: { establishmentId: any }, tableName: any, conn: any) => {
  try {
    if (body.ids) {
      if (body.ids.length > 200) {
        return NextResponse.json({ message: "Too many records to delete" }, { status: 400 });
      }
      body.archive
        ? await (await conn).query(`UPDATE ${tableName} SET deletedAt = NOW() WHERE id IN (?) AND establishmentId = ?`, [body.ids, session.establishmentId])
        : await (await conn).query(`DELETE FROM ${tableName} WHERE id IN (?) AND establishmentId = ?`, [body.ids, session.establishmentId]);
      return;
    } else if (body.id) {
      body.archive
        ? await (await conn).query(`UPDATE ${tableName} SET deletedAt = NOW() WHERE id = ? AND establishmentId = ?`, [body.id, session.establishmentId])
        : await (await conn).query(`DELETE FROM ${tableName} WHERE id = ? AND establishmentId = ?`, [body.id, session.establishmentId]);
      return;
    }

    throw "incorrect params";
  } catch (err: any) {
    throw err;
  }
};

export const RedirectHome = () => {
  return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL + "/dashboard/home");
};

export const RedirectLogin = () => {
  // the requestHandler.ts func will check for a 401 status on the client and redirect to login
  return NextResponse.json({ message: "unauthorised", errors: true }, { status: 401 });
};

export const Log = (message: any) => {
  if (process.env.NODE_ENV === "development") console.log(message);
};

export function HasSql(value: string | null | undefined) {
  if (value === null || value === undefined) {
    return false;
  }

  // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
  var sql_meta = new RegExp("(%27)|(')|(--)|(%23)|(#)", "i");
  if (sql_meta.test(value)) {
    return true;
  }

  var sql_meta2 = new RegExp("((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))", "i");
  if (sql_meta2.test(value)) {
    return true;
  }

  var sql_typical = new RegExp("w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))", "i");
  if (sql_typical.test(value)) {
    return true;
  }

  var sql_union = new RegExp("((%27)|('))union", "i");
  if (sql_union.test(value)) {
    return true;
  }

  return false;
}

export const SortRecordData = (records: any, orderBy: string, dir: string, existingColumn: boolean) => {
  if (!records || records.length === 0 || existingColumn) return null;
  const curData = [] as any;
  for (const row of records) {
    const curRow = { ...row.model, id: row.id, userId: row.userId, createdAt: row.createdAt, updatedAt: row.updatedAt, index: row.index };
    curData.push(curRow);
  }

  //manually sort the curData by the column value are numeric
  if (!Number.isNaN(parseInt(curData[0][orderBy]))) {
    curData.sort((a: any, b: any) => {
      if (!a[orderBy] || !b[orderBy]) return 0;
      return dir === "ASC" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    });
  } else {
    curData.sort((a: any, b: any) => {
      if (!a[orderBy] || !b[orderBy]) return 0;
      return dir === "ASC" ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
    });
  }

  return curData;
};
