require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");
const conn = mysql.createConnection(process.env.DATABASE_URL);

const createTableTypes = async () => {
  //get table names

  const tableNames = [];
  const [tables] = await (await conn).query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='micu'");

  for (const table of tables) {
    tableNames.push(table.TABLE_NAME);
  }

  console.log(tableNames);
  let types = "";
  for (const tableName of tableNames) {
    let current = "";
    if (tableName.includes("knex")) continue;

    const [columns] = await (await conn).query("SHOW COLUMNS FROM " + tableName);

    current = `export type ${tableName} = {\n`;
    for (const column of columns) {
      current += `${column.Field}${column.Null === "YES" ? "?" : ""} : ${
        column.Type.includes("int")
          ? "number"
          : column.Type.includes("varchar") || column.Type.includes("text")
          ? "string"
          : column.Type.includes("date") || column.Type.includes("time")
          ? "Date"
          : column.Type.includes("json")
          ? "unknown[]"
          : "unknown"
      };\n`;
    }
    current += "};\n\n";
    types += current;
  }

  fs.writeFileSync("_types/dbTypes.ts", types);

  console.log("Types generated at _types/dbTypes.ts");
  process.exit();
};

createTableTypes();

// SELECT TABLE_NAME
// FROM INFORMATION_SCHEMA.TABLES
// WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='dbName'
