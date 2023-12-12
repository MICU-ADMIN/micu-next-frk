import React from "react";

type Props = {
  element: any;
  siteData: any;
};

function ServerEditor({ element, siteData }: Props) {
  return (
    <>
      <style>
        {`

    #s_editor${element.id} {
      background: ${
        element.data?.isGradient
          ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
          : element.data?.color || "inherit"
      };
      color: ${siteData.siteColors[siteData?.defaultColorIndexes?.textColor] || "black"};
      border-radius: ${element.data?.borderRadius ? element.data?.borderRadius + "px" : "0px"};
      height: fit-content;
      padding: ${element?.data?.padding ? element?.data?.padding + "px" : "50px"};
      cursor: ${element.data?.showCursor ? "pointer" : "default"};
    }
    #s_editor${element.id}:hover {
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
      <div id={`s_editor${element.id}`} className="text-wrapper h-fit align-middle" dangerouslySetInnerHTML={{ __html: element.data.value || "" }}></div>
    </>
  );
}

export default ServerEditor;
