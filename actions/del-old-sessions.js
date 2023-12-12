require("dotenv").config();

const mysql = require("mysql2/promise");
const conn = mysql.createConnection(process.env.DATABASE_URL);

const DelOldSessions = async () => {
  //Delete sessions where createdAt is older than 1 week
  const [] = await (await conn).query("DELETE FROM SessionStorage WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 WEEK)");
  console.log("Deleted sessions older than 1 week");
  process.exit();
};

DelOldSessions();
