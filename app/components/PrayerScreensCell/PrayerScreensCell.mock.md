```js

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  prayerScreens: [{ id: 42 }, { id: 43 }, { id: 44 }],
})


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  subgraph standard
    node[shape=box, label="standard"]
    standard[label="prayerScreens"]
    standard->prayerScreens[label="prayerScreens"]
  end
```
Explanation:

* The `graph` keyword is used to define the overall graph structure.
* The `subgraph` keyword is used to define a subgraph within the graph. In this case, we define a subgraph called "standard".
* The `node` keyword is used to define a node in the graph. In this case, we define three nodes: `standard`, `prayerScreens`, and `prayerScreens`.
* The `shape` keyword is used to define the shape of the node. In this case, we use the `box` shape to represent a rectangle.
* The `label` keyword is used to define a label for the node. In this case, we use the label "standard" to represent the subgraph.
* The `->` keyword is used to define

```
