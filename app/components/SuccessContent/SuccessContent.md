```js

import styled from 'styled-components'

import { routes } from '@redwoodjs/router'

import Button from 'src/components/Button'
import Shield from 'src/components/Shield'

const SuccessContent = ({ customerName, customerSignedUp }) => {
  return (
    <Wrapper>
      <div style={{ textAlign: 'center' }}>
        <Heading>Thank you</Heading>
        <Description>
          Have a <span style={{ color: 'var(--primary)' }}>SUPER</span> day,{' '}
          {customerName}!
        </Description>
      </div>
      <SVGWrapper>
        <Shield />
      </SVGWrapper>

      {!customerSignedUp && (
        <Banner>
          <p>
            It looks like you don&apos;t have an account yet. Signing up lets
            you checkout faster and see better at night.
          </p>
          <SignupButton variant="secondary" to={routes.signup()}>
            Sign up
          </SignupButton>
        </Banner>
      )}
    </Wrapper>
  )
}

export default SuccessContent

const Wrapper = styled.div`
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: var(--padding);

  margin: var(--padding);
  padding: var(--padding);

  background: var(--primary-tint);
  border-radius: var(--radius-3);

  color: var(--gray-0);
`

const Heading = styled.h2`
  font-size: var(--font-size-8);
  letter-spacing: var(--font-letterspacing-1);
`

const Description = styled.p`
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-7);
`

const SVGWrapper = styled.div`
  & > svg {
    width: 250px;
    height: 250px;
  }
`

const SignupButton = styled(Button)`
  display: inline-block;
  margin-top: var(--padding);
`

const Banner = styled.div`
  padding: var(--padding);
  background: var(--primary);
  border-radius: var(--radius-3);
`


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    +-------------------------------+
    | SuccessContent |
    +-------------------------------+
    partition
        +-------------------------------+
        | CustomerName |
        +-------------------------------+
        | CustomerSignedUp |
        +-------------------------------+
        if (!customerSignedUp) {
            +-------------------------------+
            | Banner |
            +-------------------------------+
            padding
            +-------------------------------+
            | SignupButton |
            +-------------------------------+

            SignupButton

        } else {

            +-------------------------------+

            | Heading |
            +-------------------------------+

            | Description |
            +-------------------------------+

        }
```
This Mermaid Markdown overview uses the following syntax:
* `graph LR`: Defines a directed graph with a single layer.
* `+-------------------------------+`: Used to define a node in the graph.
* `--------------------------------+`: Used to define a directed edge between two nodes.
* `partition`: Used to partition

```
