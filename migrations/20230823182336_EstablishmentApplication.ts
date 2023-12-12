import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Application", (table) => {
    table.increments("id").primary();
    table.integer("userId").index();
    table.string("email", 255).notNullable();
    table.string("telephone", 13).notNullable();
    table.string("firstLine", 150).notNullable();
    table.string("secondLine", 150);
    table.string("zip", 10).notNullable();
    table.string("country", 50).notNullable();
    table.string("buildingNumber", 10);
    table.string("city", 50).notNullable();
    table.string("county", 50);
    table.string("institutionName", 150).notNullable();
    table.string("type", 30).notNullable();
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Application");
}
