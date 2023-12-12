import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CourseVideoData", (table) => {
    table.increments("id").primary();
    table.string("assetId", 90).notNullable();
    table.string("playbackId", 90);
    table.string("chapterId", 90).notNullable().index();
    table.string("userId", 10);
    table.string("establishmentId", 100).notNullable().index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CourseVideoData");
}
