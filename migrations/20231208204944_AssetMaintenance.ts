import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("AssetMaintenance", (table) => {
    table.increments("id").primary();
    table.integer("assetManagementPlanId").notNullable();
    table.string("maintenanceType");
    table.date("dueDate");
    table.date("performedOn");
    table.text("notes");
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
  return knex.schema.dropTable("AssetMaintenance");
}
