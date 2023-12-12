import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("RecordData", (table) => {
    table.increments("id").primary();
    table.string("label", 90);
    table.integer("recordId").index();
    table.string("index", 10).index();
    table.string("establishmentId", 50).index();
    table.string("establishmentPublicId", 100);
    table.integer("userId");
    table.json("permissions");
    table.json("adminIds");
    table.json("model");
    table.json("uploadIds");
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("RecordData");
}
