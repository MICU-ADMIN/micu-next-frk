import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Asset", (table) => {
    table.increments("id").primary();
    table.integer("userId").notNullable().index();
    table.string("establishmentId", 36).notNullable().index();
    table.string("description", 255).notNullable();
    table.string("images");
    table.text("content").notNullable();
    table.string("name");
    table.string("type");
    table.string("serialNumber");
    table.date("purchaseDate");
    table.decimal("purchaseCost", 10, 2);
    table.string("location");
    table.string("status");
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
  return knex.schema.dropTable("Asset");
}
