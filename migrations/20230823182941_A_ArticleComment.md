```ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("A_ArticleComment", (table) => {
    table.increments("id").primary();
    table.string("title", 90).notNullable();
    table.string("comment", 2000).notNullable();
    table.integer("likes").defaultTo(0);
    table.integer("parentCommentId");
    table.string("establishmentId", 50);
    table.string("establishmentPublicId", 100).notNullable();
    table.integer("userId");
    table.integer("articleId").index();
    table.timestamp("createdAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("A_ArticleComment");
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Go File] --> B[Knex]
    B --> C[Schema]
    C --> D[Table]
    D --> E[Columns]
    E --> F[Increments]
    E --> G[String]
    G --> H[Not Nullable]
    H --> I[Default Value]
    I --> J[Primary Key]
    J --> K[Index]
    K --> L[Timestamps]
    L --> M[Created At]
    M --> N[Updated At]
    N --> O[Deleted At]
    O --> P[Drop Table]
    P --> Q[Knex]
    Q --> R[Schema]
    R --> S[Table]
    S --> T[Columns]
    T --> U[Increments]
    T --> V[String]
    V --> W[Not Nullable]
    W --> X[Default Value]
    X --> Y[Primary Key]
    Y --> Z[Index]
    Z -->

```
