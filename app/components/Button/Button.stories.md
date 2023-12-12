```js

import { User } from 'react-feather'

import Button from './Button'

export const Fill = () => {
  return <Button>Checkout</Button>
}

export const Secondary = () => {
  return <Button variant="secondary">Cancel</Button>
}

export const Icon = () => {
  return (
    <Button variant="icon">
      <User />
    </Button>
  )
}

export const Link = () => {
  return (
    <Button variant="link" to={'/'}>
      Login
    </Button>
  )
}

export const LinkSecondary = () => {
  return (
    <Button variant="secondary" to={'signup'}>
      Sign Up
    </Button>
  )
}

export const _Library = () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Fill />
      <Secondary />
      <Icon />
      <Link />
      <LinkSecondary />
    </div>
  )
}

export default { title: 'Components/Button' }


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    +-------------------------------------------------------+
    | Button                                                   |
    +-------------------------------------------------------+
    |- Fill                                                   |
    +-------------------------------------------------------+
    |- Secondary                                                  |
    +-------------------------------------------------------+
    |- Icon                                                       |
    +-------------------------------------------------------+
    |- Link                                                        |
    +-------------------------------------------------------+
    |- LinkSecondary                                               |
    +-------------------------------------------------------+
    |- _Library                                                   |
    +-------------------------------------------------------+
```
Note: This is just one possible way to represent the Go file as Mermaid Markdown. There are many other ways to do it, and the exact syntax may vary depending on the specific Mermaid Markdown implementation you are using.

```
