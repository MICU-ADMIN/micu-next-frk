```js

import { Loading, Empty, Failure, Success } from './MyEstablishmentsCell'
import { standard } from './MyEstablishmentsCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
}

export const success = (args) => {
  return Success ? <Success {...standard()} {...args} /> : <></>
}

export default { title: 'Cells/MyEstablishmentsCell' }


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Loading] --> B[Empty]
    B --> C[Failure]
    C --> D[Success]
    D --> E[standard]
    E --> F[MyEstablishmentsCell]
    F --> G[title]
```
Explanation:

* `A[Loading] --> B[Empty]`: The `Loading` state is a parent of the `Empty` state.
* `B --> C[Failure]`: The `Empty` state is a parent of the `Failure` state.
* `C --> D[Success]`: The `Failure` state is a parent of the `Success` state.
* `D --> E[standard]`: The `Success` state is a parent of the `standard` state.
* `E --> F[MyEstablishmentsCell]`: The `standard` state is a parent of the `MyEstablishmentsCell` state.
* `F --> G[title]`: The `MyEstablishmentsCell` state has a title.
Note:

```
