```js

import CustomHome from 'src/customPages/Home/CustomHome'
import Loader from 'src/components/Loader/Loader'
import MyApplicationsCell from '../MyApplicationsCell/MyApplicationsCell'

export const QUERY = gql`
  query orgUsers {
    myOrgUser {
      id
      userId
      establishmentName
      User {
        firstName
        lastName
        id
        email
      }
    }
  }
`

export const Loading = () => <Loader />

export const Empty = () => <MyApplicationsCell />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ myEstablishments, myOrgUser }) => {
  console.log(myEstablishments)
  console.log(myOrgUser[0])
  return <CustomHome orgUsers={myOrgUser} establishment={myEstablishments} />
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Import] --> B[CustomHome]
    B --> C[Loader]
    C --> D[MyApplicationsCell]
    D --> E[Query]
    E --> F[Loading]
    F --> G[Empty]
    G --> H[Failure]
    H --> I[Success]
    I --> J[CustomHome]
    J --> K[establishment]
    K --> L[User]
    L --> M[myOrgUser]
    M --> N[myEstablishments]
    N --> O[Success]
    O --> P[Failure]
    P --> Q[Error]
    Q --> R[console.log]
    R --> S[Style]
    S --> T[color]
    T --> U[red]
    U --> V[message]
    V --> W[Error]
    W --> X[myOrgUser]
    X --> Y[myEstablishments]
    Y --> Z[CustomHome]

```
