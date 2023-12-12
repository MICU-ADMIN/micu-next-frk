```tsx

import Select from "@/app/components/Select/Select";
import React from "react";

export const ToolbarDropdown = ({ title, value, onChange, options }: any) => {
  return <Select placeholder={title} value={value} options={options} onChange={(e) => onChange(e.target.value)} />;
};


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    A[ToolbarDropdown] --> B[Select]
    A --> C[React]
    B --> D[options]
    B --> E[onChange]
    A --> F[title]
    A --> G[value]
```
Explanation:

* `A` represents the `ToolbarDropdown` component.
* `B` represents the `Select` component.
* `C` represents the `React` framework.
* `D` represents the `options` property of the `ToolbarDropdown` component.
* `E` represents the `onChange` property of the `ToolbarDropdown` component.
* `F` represents the `title` property of the `ToolbarDropdown` component.
* `G` represents the `value` property of the `ToolbarDropdown` component.
Note: The arrows in the diagram represent the relationships between the components and properties, which are explained in the previous table.

```
