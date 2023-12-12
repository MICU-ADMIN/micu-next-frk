import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CoursePurchase", (table) => {
    table.increments("id").primary();
    table.string("userId", 10).notNullable();
    table.string("establishmentId", 100).notNullable().index();
    table.string("courseId", 10).notNullable().index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CoursePurchase");
}
