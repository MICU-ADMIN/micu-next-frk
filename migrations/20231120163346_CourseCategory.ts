import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CourseCategory", (table) => {
    table.increments("id").primary();
    table.string("name", 90).notNullable(); // remove unique as multiple organizations could have the same category, unque would prevent that
    table.integer("userId").notNullable();
    table.string("establishmentId", 100).notNullable().index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CourseCategory");
}
