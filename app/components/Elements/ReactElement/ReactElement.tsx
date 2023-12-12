// This assumes React is available as a dependency.
import React, { useEffect, useRef } from "react";
import { transform } from "@babel/standalone";
import ReactEditOptions from "./ReactElementOptions";

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  defaultColor?: string;
};

const code = `
   () => {
      return (
        <div>
          <p>hello world</p>
        </div>
      );
    }; 
    `;

function ReactElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, defaultColor }: Props) {
  const [Component, setComponent] = React.useState(() => () => <p>loading...</p>);

  useEffect(() => {
    if (element.data) {
      try {
        const transpiled = transform(code, { presets: ["react"], filename: "code.js" });

        const createComponentFunction = new Function("React", transpiled.code);
        const createdComponent = createComponentFunction(React);

        console.log("Component:", createdComponent);
        setComponent((ReactComponent) => createdComponent);
      } catch (error) {
        console.error("Error transpiling code:", error);
      }
    }
  }, [element.data?.code]);

  return (
    <>
      <style>
        {!element
          ? ""
          : `
    #jsx${element.id} {
      background: ${
        element.data?.isGradient
          ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
          : element.data?.color || "inherit"
      };
      color: ${defaultColor || "black"};
      border-radius: ${element.data?.borderRadius ? element.data?.borderRadius + "px" : "0px"};
      height: fit-content;
      padding: ${element?.data?.padding ? element?.data?.padding + "px" : "10px"};
      margin: ${element?.data?.margin ? element?.data?.margin + "px" : "0px"};
      cursor: ${element.data?.showCursor ? "pointer" : "default"};
    }

    #jsx${element.id}:hover {
      ${
        element.data?.hoverColor || element.data?.hoverIsGradient
          ? `background: ${
              element.data?.hoverIsGradient
                ? `linear-gradient(${element.data?.hoverGradientDeg}deg, ${element.data?.hoverGradientLeft}, ${element.data?.hoverGradientRight})`
                : element.data?.hoverColor
            };`
          : ""
      }
      ${element.data?.hoverTextColor ? `color: ${element.data?.hoverTextColor};` : ""}
      ${element.data?.hoverBorderRadius ? `border-radius: ${element.data?.hoverBorderRadius}px";` : ""}
      ${element.data?.hoverPadding ? `padding: ${element.data?.hoverPadding}px;` : ""}
      ${element.data?.hoverMargin ? `margin: ${element.data?.hoverMargin}px";` : ""}
      }`}
      </style>

      <div id={`jsx${element.id}`} className="h-full w-full text-wrapper ">
        <Component />
      </div>
      {showEditMenu && (
        <ReactEditOptions
          element={element}
          onChange={onChange}
          setShowEditMenu={setShowEditMenu}
          targetRef={targetRef}
          setTransform={setTransform}
          onChangeData={function (v: any): void {}}
          colors={[]}
        />
      )}
    </>
  );
}

export default ReactElement;
