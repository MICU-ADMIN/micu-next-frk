import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Incident", (table) => {
    table.increments("id").primary();
    table.integer("userId").notNullable().index();
    table.string("establishmentId", 36).notNullable().index();
    table.string("title", 255).notNullable();
    table.text("content").notNullable();
    table.json("images");
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
  return knex.schema.dropTable("Incident");
}
