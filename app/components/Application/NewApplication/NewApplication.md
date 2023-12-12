```js

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ApplicationForm from 'src/components/Application/ApplicationForm'

const CREATE_APPLICATION_MUTATION = gql`
  mutation CreateApplicationMutation($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      id
    }
  }
`

const NewApplication = () => {
  const [createApplication, { loading, error }] = useMutation(
    CREATE_APPLICATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Application created')
        navigate(routes.applications())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createApplication({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Application</h2>
      </header>
      <div className="rw-segment-main">
        <ApplicationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewApplication


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + NewApplication --> ApplicationForm [ApplicationForm]
    + ApplicationForm --> onSave [onSave]
    + onSave --> createApplication [createApplication]
    + createApplication --> {loading: true, error: null} [createApplication]
    + createApplication --> {loading: false, error: null} [createApplication]
    + createApplication --> toast [toast]
    + toast --> {message: "Application created", type: "success"} [toast]
    + navigate --> routes.applications [navigate]
    + navigate --> {path: "applications"} [navigate]
```
This overview shows the relationships between the components and mutations in the Go file. The `NewApplication` component is the entry point for the application, and it uses the `useMutation` hook to perform a mutation to create a new application. The `ApplicationForm` component is used to handle the form submission, and it calls the `onSave` function when the form is submitted. The `onSave`

```
