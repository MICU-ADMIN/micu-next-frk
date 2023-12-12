import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("AssetPlan", (table) => {
    table.increments("id").primary();
    table.integer("userId").notNullable().index();
    table.string("establishmentId", 36).notNullable().index();
    table.string("title", 255).notNullable();
    table.text("description").notNullable();
    table.integer("assetId").notNullable()
    table.date("startDate");
    table.date("endDate");
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
  return knex.schema.dropTable("AssetPlan");
}
