```js

import Loader from '../Loader/Loader'
import Articles from '../Articles/Articles'
import { navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query ArticlesQuery($page: Int!) {
    paginatedArticles(page: $page, limit: 25) {
      articles {
        id
        description
        title
        userId
        thumbnail
        createdAt
        updatedAt
      }
      total
    }
  }
`

export const Loading = () => <Loader />

export const Empty = () => (
  <div className="-mt-24 h-full pb-8">
    <Articles />
  </div>
)

export const Failure = ({ error }) => {
  if (error?.message === 'Unauthenticated') {
    navigate(routes.home())
    return null
  }
  return <div style={{ color: 'red' }}>Error: {error?.message}</div>
}

export const Success = (data) => {
  console.log('data', data)
  return (
    <div className="-mt-24 h-full pb-8">
      <Articles
        articles={data.paginatedArticles.articles}
        total={data.paginatedArticles.total}
        page={data.variables.page}
        currentEstablishment={data.currentEstablishment}
        updating={data.updating}
        refetch={(page) => {
          data.variables.page = page
          data.refetch(data.variables)
        }}
      />
    </div>
  )
}


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Loading] --> B[Articles]
    B --> C[Empty]
    B --> D[Failure]
    B --> E[Success]
    E --> F[Articles]
    F --> G[Total]
    G --> H[Current Establishment]
    H --> I[Updating]
    I --> J[Refetch]
    J --> K[Page]
    K --> L[Data]
    L --> M[Error]
    M --> N[Console Log]
    N --> O[Data]
    O --> P[Articles]
    P --> Q[Total]
    Q --> R[Current Establishment]
    R --> S[Updating]
    S --> T[Refetch]
    T --> U[Page]
    U --> V[Data]
    V --> W[Error]
    W --> X[Console Log]
    X --> Y[Data]
    Y --> Z[Articles]
    Z --> AA[Total]

```
