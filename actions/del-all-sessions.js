require("dotenv").config();

const mysql = require("mysql2/promise");
const DelAllessions = async () => {
  const conn = mysql.createConnection(process.env.Databae_URL);

  const [] = await (await conn).query("DELETE FROM SessionStorage");
  console.log("✅ Reset All user sessions");
  process.exit();
};

DelAllessions();
