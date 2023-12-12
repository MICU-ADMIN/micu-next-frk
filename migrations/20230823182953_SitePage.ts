import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("SitePage", (table) => {
    table.increments("id").primary();
    table.string("path", 90).notNullable();
    table.string("metadata", 500);
    table.text("content", "mediumtext");
    // this is where the site data is stored in json such
    table.string("siteName", 90).index();
    table.string("establishmentId", 50).index();
    table.integer("userId");
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("SitePage");
}
