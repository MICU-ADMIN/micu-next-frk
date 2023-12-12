import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Course", (table) => {
    table.increments("id").primary();
    table.string("userId", 10).notNullable().index();
    table.string("establishmentId", 100).notNullable().index();
    table.string("title", 90).notNullable();
    table.string("description", 1000);
    table.string("imageUrl", 300);
    table.float("price");
    table.string("progress", 10);
    table.boolean("isPublished").defaultTo(false);
    table.string("categoryId", 100).index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Course");
}
