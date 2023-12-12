```ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ArticleCategory", (table) => {
    table.increments("id").primary();
    table.string("label", 90).notNullable();
    table.string("description", 500);
    table.string("establishmentId", 50).index();
    table.integer("userId");
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ArticleCategory");
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[ArticleCategory] --> B[Knex]
    B --> C[table]
    C --> D[increments]
    C --> E[label]
    C --> F[description]
    C --> G[establishmentId]
    C --> H[userId]
    C --> I[createdAt]
    C --> J[updatedAt]
    C --> K[deletedAt]
    H --> L[up]
    L --> M[down]
    M --> N[Knex]
```
This overview shows the relationships between the tables and columns in the `ArticleCategory` table, as well as the functions `up` and `down` that are used to create and drop the table. The `Knex` object is also shown as the import statement at the top of the file.

```
