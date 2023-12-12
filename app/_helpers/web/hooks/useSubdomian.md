```tsx

import React from 'react'

function useSubdomian() {
  const [subdomain, setSubdomain] = React.useState('')

  React.useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0]
    setSubdomain(subdomain)
  }, [])

  return {
    subdomain,
  }
}

export default useSubdomian


```

```mermaid
graph LR
  subdomain[UseSubdomain] --> React[React]
  React[React] --> useState[useState]
  useState[useState] --> [subdomain, setSubdomain]
  [subdomain, setSubdomain] --> window.location.hostname[window.location.hostname]
  window.location.hostname[window.location.hostname] --> split[split]
  split[split] --> [subdomain, .][subdomain, .]
  [subdomain, .][subdomain, .] --> setSubdomain[setSubdomain]
  setSubdomain[setSubdomain] --> return[return]
  return[return] --> {subdomain, }[return {subdomain, }]
```
Note: The above diagram is a simplified representation of the code structure, and some details have been omitted for clarity.

```
