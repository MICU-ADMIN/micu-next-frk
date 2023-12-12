```ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ArticleCategoryId", (table) => {
    table.increments("id").primary();
    table.string("establishmentId", 50).index();
    table.integer("articleId").index();
    table.integer("articleCategoryId");
    table.integer("userId");
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ArticleCategoryId");
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[ArticleCategoryId] --> B[establishmentId]
    B --> C[articleId]
    C --> D[articleCategoryId]
    D --> E[userId]
    E --> F[createdAt]
    F --> G[updatedAt]
    G --> H[deletedAt]
```
In this overview, each node represents a table in the database, and the arrows represent the relationships between the tables.

* `A`: ArticleCategoryId - This is the table that will be created or dropped by the `up` and `down` functions, respectively.
* `B`: establishmentId - This is the column that will be used to create a unique index on the `ArticleCategoryId` table.
* `C`: articleId - This is the column that will be used to create a foreign key relationship with the `Article` table.
* `D`: userId - This is the column that will be used to create a foreign key relationship with the `User` table.
* `E`:

```
