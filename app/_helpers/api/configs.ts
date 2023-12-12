import { Knex } from "knex";
import mysql from "mysql2/promise";

const knex = require("knex");

let cachedKnexConnection: any = null;
let cachedConnection: any = null;

export const DBConnection = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  //@ts-expect-error
  const connection = await mysql.createConnection(process.env.DATABASE_URL, {
    max: 1,
  });

  cachedConnection = connection;
  return connection;
};

export const KnexConnection = async () => {
  if (cachedKnexConnection) {
    return cachedKnexConnection as Knex;
  }

  const connection = await knex({
    client: "mysql2",
    connection: {
      uri: process.env.DATABASE_URL,
      multipleStatements: true,
      namedPlaceholders: true,
    },
  });

  cachedKnexConnection = connection;
  return connection as Knex;
};
