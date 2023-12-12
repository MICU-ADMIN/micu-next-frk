```tsx

import React from 'react'

function SettingsMenu({ close }) {
  return (
    <>
      <div className="modal-center">
        <div className="h-[85vh] w-[800px] p-4">
          <h2 className="text-2xl font-bold">Page Settings</h2>
        </div>
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  )
}

export default SettingsMenu


```

```mermaid

Here is the Mermaid Markdown overview for the given Go file:
```mermaid
graph LR
  SettingsMenu[Settings Menu] --> Close[Close]
  SettingsMenu --> React[React]
  React --> import[Import]
  import --> React[React]
  SettingsMenu --> div[Div]
  div --> className[Class]
  className --> "modal-center"[Modal Center]
  SettingsMenu --> div[Div]
  div --> className[Class]
  className --> "h-[85vh]"[Height]
  SettingsMenu --> div[Div]
  div --> className[Class]
  className --> "w-[800px]"[Width]
  SettingsMenu --> h2[H2]
  h2 --> className[Class]
  className --> "text-2xl font-bold"[Text Size]
  SettingsMenu --> div[Div]
  div --> onClick[OnClick]
  onClick --> close[Close]
```
Note: The above diagram is a simplified representation of the Go file structure, and it may not reflect the actual implementation details.

```
