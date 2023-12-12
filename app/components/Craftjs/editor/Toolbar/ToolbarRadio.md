```tsx

import React from 'react'

export const ToolbarRadio = ({ value, label }: any) => {
  const radioClasses = `w-5 h-5 border-2 border-gray-400 rounded-full transition-all ${
    value ? 'bg-blue-500 border-transparent' : ''
  }`

  return (
    <label className="text-base">
      <input
        type="radio"
        className={radioClasses}
        checked={value}
        onChange={() => {
          // Handle radio button change event
        }}
      />
      <span className="ml-2">{label}</span>
    </label>
  )
}


```

```mermaid

Here is a possible Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    ToolbarRadio[import React from 'react';] --> Go File
    ToolbarRadio[value: any, label: any] --> Go Function
       +-------------------------------------------------------+
       | {ToolbarRadio[value: any, label: any]} --> Go Function Body |
       +-------------------------------------------------------+
       | const radioClasses = `w-5 h-5 border-2 border-gray-400 rounded-full transition-all ${
       | value ? 'bg-blue-500 border-transparent' : ''
       +-------------------------------------------------------+
       | return (
       |   <label className="text-base">
       |     <input
       |       type="radio"
       |       className={radioClasses}
       |       checked={value}
       |       onChange={() => {
       |         // Handle radio button change event
       +-------------------------------------------------------+
       |   }}

```
Note that this is just one possible way to represent the Go file in

```
