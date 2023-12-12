```js

import React from 'react'

function Popover({ event, children, placement, show, onClose, plusY=0, plusX=0 }) {
  const windowWidth = window.innerWidth
  //   const windowHeight = window.innerHeight
  return (
    <>
      {show && (
        <div
          className="scaleIn fixed  inset-0 h-fit w-fit overflow-y-auto rounded-md bg-white p-2 shadow-2xl shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            top: event.clientY + plusY,
            left:
              windowWidth - event.clientX > 300
                ? event.clientX
                : event.clientX - 300,
            zIndex: 1001,
          }}
        >
          {children}
        </div>
      )}
      <div
        className="popover-overlay"
        style={{ display: show ? 'block' : 'none' }}
        onClick={onClose}
      ></div>
    </>
  )
}

export default Popover


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  Popover[show] --> Event[event]
  Popover[show] --> Children[children]
  Popover[show] --> Placement[placement]
  Popover[show] --> Show[show]
  Popover[show] --> OnClose[onClose]
  Popover[show] --> PlusY[plusY]
  Popover[show] --> PlusX[plusX]
  Popover[show] --> WindowWidth[windowWidth]
  Popover[show] --> WindowHeight[windowHeight]
  Popover[show] --> Role[role]
  Popover[show] --> AriaLabelledby[ariaLabelledby]
  Popover[show] --> AriaModal[ariaModal]
  Popover[show] --> Style[style]
  Popover[show] --> Top[top]
  Popover[show] --> Left[left]
  Popover[show] --> ZIndex[zIndex]
  Popover[show] --> ClassName[

```
