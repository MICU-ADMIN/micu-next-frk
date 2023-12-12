require("dotenv").config();

const mysql = require("mysql2/promise");
const conn = mysql.createConnection(process.env.DATABASE_URL);

const DelAllessions = async () => {
  const [] = await (await conn).query("DELETE FROM SessionStorage");
  console.log("Reset All user sessions");
  process.exit();
};

DelAllessions();
