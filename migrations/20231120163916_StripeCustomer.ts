import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("StripeCustomer", (table) => {
    table.increments("id").primary();
    table.string("userId", 10).notNullable();
    table.string("establishmentId", 100).notNullable().index();
    table.string("stripeCustomerId", 100).notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("StripeCustomer");
}
