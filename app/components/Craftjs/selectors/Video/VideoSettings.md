```tsx

import React from 'react'

import { ToolbarSection, ToolbarItem } from '../../editor'

export const VideoSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Youtube"
        props={undefined}
        summary={undefined}
        children={undefined}
      >
        <ToolbarItem
          full={true}
          propKey="videoId"
          type="text"
          label="Video ID"
        />
      </ToolbarSection>
    </React.Fragment>
  )
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  import[React from 'react'] --> React
  import[ToolbarSection, ToolbarItem] from '../../editor' --> ToolbarSection, ToolbarItem
  export const VideoSettings = () => { --> VideoSettings
    <React.Fragment> --> React.Fragment
      <ToolbarSection
        title="Youtube" --> ToolbarSection
          props={undefined} --> ToolbarItem.propKey
          summary={undefined} --> ToolbarItem.summary
          children={undefined} --> ToolbarItem.children
      > --> ToolbarSection.children
        <ToolbarItem
          full={true} --> ToolbarItem.full
          propKey="videoId" --> ToolbarItem.propKey
          type="text" --> ToolbarItem.type
          label="Video ID" --> ToolbarItem.label
        /> --> ToolbarItem
    </React.Fragment> --> VideoSettings.children
```
Note: The above Mermaid Markdown code is just an overview of the Go file you provided, and

```
