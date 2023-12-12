import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CourseChapter", (table) => {
    table.increments("id").primary();
    table.string("courseId", 10).notNullable().index();
    table.string("positionInCourse", 10).notNullable().index();
    table.string("userId", 10).notNullable();
    table.string("establishmentId", 100).notNullable().index();
    table.string("title", 90).notNullable();
    table.string("description", 1000);
    table.string("videoUrl", 300);
    table.integer("position");
    table.boolean("isPublished").defaultTo(false);
    table.boolean("isFree").defaultTo(false);
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CourseChapter");
}
