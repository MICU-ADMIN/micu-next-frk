```tsx

import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { Container } from '../Container';
import { Video } from '../Video';

export const Custom2VideoDrop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="flex-1 ml-5 h-full">
      {children}
    </div>
  );
};
Custom2VideoDrop.craft = {
  rules: {
    canMoveIn: (nodes, self, helper) => {
      return (
        nodes.every((node) => node.data.type === Video) &&
        helper(self.id).decendants().length === 0
      );
    },
  },
};
export const Custom2 = (props: any) => {
  return (
    <Container {...props} className="overflow-hidden">
      <div className="w-24">
        <h2 className="text-xs text-white">
          You can only drop
          <br />
          one video here.
        </h2>
      </div>
      <Element canvas is={Custom2VideoDrop} id="wow">
        <Video />
      </Element>
    </Container>
  );
};

Custom2.craft = {
  ...Container.craft,
  displayName: 'Custom 2',
};


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  Container[style] --> Custom2[style]
    Custom2[style] --> Custom2VideoDrop[style]
    Custom2VideoDrop[style] --> Video[style]
    Video[style] --> Container[style]
```
Explanation:

* The `graph` keyword is used to define the graph structure of the code.
* The `LR` keyword is used to specify the direction of the graph, which in this case is left to right (LR).
* The `Container` and `Custom2` nodes are connected by a solid line, indicating that they are siblings.
* The `Custom2` node is connected to the `Custom2VideoDrop` node by a dotted line, indicating that `Custom2VideoDrop` is a child of `Custom2`.
* The `Custom2VideoDrop` node is connected to the `Video` node by a solid line, indicating that they are siblings.
* The `Video` node is connected to the `Container` node by a dotted line, indicating that `Video`

```
