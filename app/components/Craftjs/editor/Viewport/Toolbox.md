```tsx

import React from 'react'
import styled from 'styled-components'

import ButtonSvg from 'src/assets/icons/toolbox/button.svg'
import SquareSvg from 'src/assets/icons/toolbox/rectangle.svg'
import TypeSvg from 'src/assets/icons/toolbox/text.svg'
import YoutubeSvg from 'src/assets/icons/toolbox/video-line.svg'

// import { Button } from '../../selectors/Button'
// import { Container } from '../../selectors/Container'
// import { Text } from '../../selectors/Text'
// import { Video } from '../../selectors/Video'
import { Tooltip } from 'react-tooltip'

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
  border-radius: 6px;
`

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`

export const Toolbox = () => {
  return (
    <ToolboxDiv
      enabled={true && true}
      className="toolbox border-gray-150 w-18 slideLeft flex h-full flex-col border-r bg-white transition"
    >
      {/* <div className="m-x-5 flex flex-1 flex-col items-center px-2 pt-3 ">
        <p className="mb-2 w-full border-b border-gray-300 pb-2 text-center text-sm font-semibold text-indigo-600 shadow-sm">
          Elements
        </p>
        <div
          className="flex flex-row flex-wrap"
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Item className="m-2 block cursor-pointer pb-1" move>
            <SquareSvg />
          </Item>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Item className="0 m-2 block flex cursor-pointer flex-row pb-1" move>
            <TypeSvg />
          </Item>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Item className="m-2 block cursor-pointer pb-1" move>
            <ButtonSvg />
          </Item>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Item className="m-2 block cursor-pointer pb-1" move>
            <YoutubeSvg />
          </Item>
        </div>
      </div> */}
    </ToolboxDiv>
  )
}


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    Toolbox[enabled=true] --> Container[background={{r: 78, g: 78, b: 78, a: 1}}]
    Container --> Element[is=Container]
    Element --> Square[width="300px"]
    Element --> Text[fontSize="12", textAlign="left", text="Hi there"]
    Text --> Button[width="300px"]
    Button --> ButtonSvg[width="300px"]
    Button --> Video[width="300px"]
    Video --> YoutubeSvg[width="300px"]
```
In this overview, we have used the `graph` keyword to define a directed graph, where `Toolbox` is the starting node, and `Container`, `Element`, `Text`, `Button`, `Video`, and `YoutubeSvg` are the nodes that `Toolbox` connects to. The `enabled` property of `Toolbox` is set to `true`, indicating that

```
