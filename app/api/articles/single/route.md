```ts

import { getSession } from "@/app/_helpers/api/helpers";
import { addServerCacheValue, deleteFromServerCache, getServerCacheValue } from "@/app/_helpers/api/servercache";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

//Get current article
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const session = await getSession(conn);
    if (!session?.establishmentId) return NextResponse.redirect("/login?unauthorised=true");

    const id = req.nextUrl.searchParams.get("id");

    const cachedData = await getServerCacheValue("article" + id);
    if (cachedData) return NextResponse.json(cachedData);

    const [article] = (await (
      await conn
    ).query(
      "SELECT id, title, description, content, establishmentId, userId, likes, attachments, allowComments, showAuthor, showDate, showLikes, thumbnail, createdAt, updatedAt, deletedAt, commentKey, categoryIds FROM Article WHERE id = ?",
      [id]
    )) as any;

    addServerCacheValue(article, "article" + id);

    return NextResponse.json(article[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "There was an error", errors: true }, { status: 500 });
  }
};


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Get current article] --> B[Get session]
    B --> C[Get server cache value]
    C --> D[Query database]
    D --> E[Return article]
    E --> F[Add server cache value]
    F --> G[Return article to client]
    G --> H[Return error message]
    H --> I[Add error to server cache]
```
In this overview, the graph represents the flow of the code in the Go file. The nodes in the graph are labeled with the name of the function or operation being performed at each step. The arrows between the nodes represent the data flow between the operations.
Here is a brief explanation of each node in the graph:
* A: The `GET` function is the entry point of the code. It receives a `NextRequest` and `NextResponse` object as input.
* B: The `getSession` function is called to retrieve a session object from the database.
* C: The `getServerCacheValue` function is called to retrieve a value

```
