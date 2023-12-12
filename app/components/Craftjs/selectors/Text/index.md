```tsx

import React from "react";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
};

export const Text = ({ fontSize, textAlign, fontWeight, color, shadow, text, margin }: Partial<TextProps>) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ContentEditable
      innerRef={connect}
      html={text} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        outline: "none",
        fontWeight,
        textAlign,
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: "Text",
  },
  related: {
    toolbar: TextSettings,
  },
};


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Text[fontSize:15, textAlign:"left", fontWeight:"500", color:{r:92, g:90, b:90, a:1}, margin:[0,0,0,0], shadow:0, text:"Text"]
    + Text[-> TextSettings]
    + TextSettings[toolbar:"Text"]
```
This overview uses the following conventions:
* `graph LR`: Defines the graph layout. In this case, we are using the "LR" layout, which means the graph will be laid out horizontally and vertically.
* `+`: Defines a node in the graph. In this case, we are defining a node called "Text".
* `fontSize:15`: Defines a property of the "Text" node called "fontSize". The value of this property is "15".
* `textAlign:"left"`: Defines a property of the "Text" node called "textAlign". The value of this property is "

```
