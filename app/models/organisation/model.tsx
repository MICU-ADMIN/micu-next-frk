("use server");

import 
import mysql from "mysql2/promise";
//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

export async function getOrgColleagues(filter: any) {
  switch (filter) {
    case filter ==  "recent"
    return [DUMMY_orgUsers[5], DUMMY_orgUsers[4], DUMMY_orgUsers[2], DUMMY_orgUsers[10], DUMMY_orgUsers[16]]

    default:
        return DUMMY_orgUsers
  }
}
