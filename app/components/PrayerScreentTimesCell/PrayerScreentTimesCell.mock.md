```js

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  prayerScreentTimes: [{ id: 42 }, { id: 43 }, { id: 44 }],
})


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  subgraph Go File
    Go File[Export const standard]
    +-------------------+
    |   standard        |
    +-------------------+
        |   vars, { ctx, req } |
        +-------------------+
        |   prayerScreentTimes |
        +-------------------+
            |   { id: 42 } |
            |   { id: 43 } |
            |   { id: 44 } |
    +-------------------+
  subgraph Mock Data
    Mock Data[Define your own mock data here]
```
Note: This is just one possible way to represent the structure of the Go file using Mermaid Markdown. The exact syntax and structure may vary depending on the specific requirements of your project.

```
