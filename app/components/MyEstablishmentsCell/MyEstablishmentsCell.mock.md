```js

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  myEstablishments: [{ id: 42 }, { id: 43 }, { id: 44 }],
})


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  subgraph standard
    standard[myEstablishments] --> (42)
    standard[myEstablishments] --> (43)
    standard[myEstablishments] --> (44)
  end
```
This overview uses the `graph` and `subgraph` keywords to define a directed graph, where `standard` is the name of the subgraph. The `myEstablishments` field in the Go file is represented as a list of nodes, each with an `id` attribute. The nodes are connected by edges, which represent the relationships between the establishments.
Note that this is just one possible way to represent the data in Mermaid Markdown. Depending on the specific structure of your data, you may need to adjust the syntax to match your needs.

```
