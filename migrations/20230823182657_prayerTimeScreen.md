```ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("PrayerTimesScreen", (table) => {
    table.increments("id").primary();
    table.string("title", 90).notNullable();
    table.string("description", 150).notNullable();
    table.string("establishmentId", 100).notNullable().index();
    table.string("topMessage", 500);
    table.string("bottomMessage", 700);
    table.json("images");
    table.integer("prayerId").index();
    table.json("theme");
    table.integer("userId").notNullable().index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("PrayerTimesScreen");
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[PrayerTimesScreen] --> B[Knex]
    B --> C[table]
    C --> D[increments("id")]
    C --> E[string("title", 90)]
    C --> F[string("description", 150)]
    C --> G[string("establishmentId", 100)]
    C --> H[string("topMessage", 500)]
    C --> I[string("bottomMessage", 700)]
    C --> J[json("images")]
    C --> K[integer("prayerId").index()]
    C --> L[json("theme")]
    C --> M[integer("userId").notNullable().index()]
    C --> N[timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"))]
    C --> O[timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP

```
