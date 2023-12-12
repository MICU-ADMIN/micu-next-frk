```js

// import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import AuthButton from './AuthButton'

describe('AuthButton', () => {
  it("renders Log in when the user's unauthenticated", () => {
    render(<AuthButton />)

    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it("renders Log out when the user's authenticated", async () => {
    mockCurrentUser({ id: 'cus_42' })

    render(<AuthButton />)

    expect(await screen.findByText('Log out')).toBeInTheDocument()
  })

  // it('redirects to billing portal session', async () => {
  //   mockCurrentUser({ id: 'cus_42' })

  //   mockGraphQLMutation('Portal', (variables) => {
  //     return {
  //       portal: {
  //         url: `localhost:8910/${variables.userId}`,
  //       },
  //     }
  //   })

  //   const user = userEvent.setup()
  //   render(<AuthButton />)

  //   const userButton = await screen.findByLabelText(
  //     'Start billing portal session'
  //   )

  //   await user.click(userButton)
  // })
})


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    +-------------------------------+
    | Go File                         |
    +-------------------------------+
    | Import Statements            |
    +-------------------------------+
    | UserEvent Import            |
    +-------------------------------+
    | Render and Screen Shots      |
    +-------------------------------+
    | AuthButton Component      |
    +-------------------------------+
    | Tests                         |
    +-------------------------------+
    | Description                  |
    +-------------------------------+
    | It Renders Log in When Unauthenticated |
    +-------------------------------+
    | It Renders Log out When Authenticated |
    +-------------------------------+
    | Redirects to Billing Portal Session |
    +-------------------------------+
    | Mock Current User            |
    +-------------------------------+
    | Mock GraphQL Mutation      |
    +-------------------------------+
    | User Event Setup          |
    +-------------------------------+
    | Render AuthButton Component |

    +-------------------------------+
    | Find By Label Text

```
