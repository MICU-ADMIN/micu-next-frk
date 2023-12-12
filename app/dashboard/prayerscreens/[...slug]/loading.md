```tsx

import Loader from "@/app/components/Loader/Loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <Loader />;
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    Loading[Loading] --> Loader[Loader]
    Loading --> UI[You can add any UI inside Loading, including a Skeleton.]
```
Explanation:

* `Loading`: This represents the `Loading` function in the Go file. It is the starting point of the diagram.
* `Loader`: This represents the `Loader` component in the Go file. It is connected to `Loading` via an arrow, indicating that `Loader` is a dependency of `Loading`.
* `UI`: This represents any user interface elements that can be added inside `Loading`. It is connected to `Loading` via an arrow, indicating that `UI` is a child of `Loading`.
Note: In Mermaid Markdown, you can use the `graph` keyword to create a directed graph, where nodes represent functions or components, and arrows represent dependencies or relationships between them.

```
