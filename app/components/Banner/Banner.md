```js

import styled from 'styled-components'

const Banner = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
export default Banner

const Wrapper = styled.div`
  background: var(--primary);
  border-radius: 0.65em;
  margin-top: var(--padding);
  padding: var(--padding);
  box-shadow: var(--shadow);
  width: 100%;
  color: var(--white);
`


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[Banner] --> B[Children]
    A[Wrapper] --> B[Background]
    A[Border Radius] --> B[Border Radius]
    A[Margin Top] --> B[Margin Top]
    A[Padding] --> B[Padding]
    A[Box Shadow] --> B[Box Shadow]
    A[Color] --> B[Color]
```
This overview shows the relationships between the different components in the Go file, using the `A` and `B` symbols to represent the parent and child elements, respectively. The `>` symbol is used to indicate the direction of the relationship.
In this example, the `Banner` component takes a `children` prop and renders it inside a `Wrapper` component, which has a number of styles defined using the `styled-components` library. The `Wrapper` component has a `background` property that sets the background color to `--primary`, and a `border-radius` property that sets the border radius to 0.65em

```
