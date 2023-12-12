```js

import styled from 'styled-components'

const Grid = styled.div`
  /*
    Better than 100vh; doesn't cause a scrollburglar on mobile.
  */
  height: 100%;

  /*
    On the home page, there's a scroll bar, but on the login page, there isn't.
    This dynamically adjusts the padding on the left of the grid so that it doesn't move.
    See https://stackoverflow.com/a/30293718.
  */
  padding-left: calc(100vw - 100%);

  display: grid;
  row-gap: calc(var(--padding) * 2);

  /*
    The min function takes two values and returns the smaller of them.
    Since one's dynamic (calc), that'll be smaller on small screens.
    We subtract from it so that things don't go all the way to the edge.
  */
  grid-template-columns:
    1fr
    min(var(--size-md), calc(100% - var(--padding) * 2))
    1fr;

  /*
    We don't want the <header> to grow on the login page.
  */
  grid-template-rows: var(--size-11) 1fr;

  /*
    Center all the grid's direct children.
  */
  & > * {
    grid-column: 2;
  }
`

export default Grid


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  A[Grid] --> B[styled-components]
  A --> C[const]
  A --> D[import]
  A --> E[const]
  A --> F[const]
  A --> G[const]
  A --> H[const]
  A --> I[const]
  A --> J[const]
  A --> K[const]
  A --> L[const]
  A --> M[const]
  A --> N[const]
  A --> O[const]
  A --> P[const]
  A --> Q[const]
  A --> R[const]
  A --> S[const]
  A --> T[const]
  A --> U[const]
  A --> V[const]
  A --> W[const]
  A --> X[const]
  A --> Y[const]
  A --> Z[const]
  A --> AA[const]
  A --> BB[const]
  A --> CC[const

```
