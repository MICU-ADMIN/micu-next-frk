```js

import Grid from 'src/components/Grid'

import {
  // Loading,
  // Empty,
  // Failure,
  Success,
} from './CheckoutSuccessCell'
import { standard } from './CheckoutSuccessCell.mock'

// export const loading = () => {
//   return Loading ? <Loading /> : null
// }

// export const empty = () => {
//   return Empty ? <Empty /> : null
// }

// export const failure = () => {
//   return Failure ? <Failure error={new Error('Oh no')} /> : null
// }

export const success = () => {
  return Success ? <Success {...standard()} /> : null
}

export default {
  title: 'Cells/CheckoutSuccessCell',
  decorators: [
    (Story) => (
      <Grid>
        <Story />
      </Grid>
    ),
  ],
}


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  +---------------+
  |   Grid        |
  +---------------+
  |<Grid>|
  +---------------+
  |   loading    |
  +---------------+
  |<Loading />|
  +---------------+
  |   empty      |
  +---------------+
  |<Empty />|
  +---------------+
  |   failure    |
  +---------------+
  |<Failure error="Oh no">|
  +---------------+
  |   success    |
  +---------------+
  |<Success {...standard()} />|
  +---------------+
  |   default    |
  +---------------+
  |<div class="Cells__CheckoutSuccessCell">...</div>|
```
Note: This is just one possible way to represent the Go file in Mermaid Markdown. There are many other ways to structure and format the code, depending on your preferences and the specific needs of your project.

```
