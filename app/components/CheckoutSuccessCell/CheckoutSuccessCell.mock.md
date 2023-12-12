```js

// Define your own mock data here:
export const standard = () => ({
  getSession: {
    id: 'cus_42',
    customerName: 'Redwood Cone',
    customerEmail: 'cone@redwoodjs.com',
    customerSignedUp: false,
  },
})


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  subgraph Go File
    import * as std from "./standard.go"
    std.standard() --> getSession
      --> id: "cus_42"
      --> customerName: "Redwood Cone"
      --> customerEmail: "cone@redwoodjs.com"
      --> customerSignedUp: false
  end
end
```
This overview uses the `graph` and `subgraph` keywords to define a directed graph, where the `Go File` subgraph represents the Go file you provided, and the `std.standard()` function is a node that is connected to the `getSession` node via an arrow. The arrow has a label indicating the type of connection (in this case, a method call). The `id`, `customerName`, `customerEmail`, and `customerSignedUp` properties of the `standard` object are also labeled and connected to their corresponding nodes in the graph.

```
