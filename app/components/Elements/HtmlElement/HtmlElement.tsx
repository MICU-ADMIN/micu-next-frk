"use client";
import dynamic from "next/dynamic";
import React from "react";
import Spinner from "../Spinner/Spinner";

const HtmlEditOptions = dynamic(() => import("./HtmlEditOptions"), { loading: () => <Spinner /> });

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  defaultColor?: string;
};

function HtmlElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, defaultColor }: Props) {
  return (
    <>
      <style>
        {!element
          ? ""
          : `
    #html${element.id} {
      background: ${
        element.data?.isGradient
          ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
          : element.data?.color || "inherit"
      };
      color: ${element.data?.defaultTextColor || defaultColor || "black"};
      border-radius: ${element.data?.borderRadius ? element.data?.borderRadius + "px" : "0px"};
      height: 100%;
      width: 100%;
      padding: ${element?.data?.padding ? element?.data?.padding + "px" : "10px"};
      margin: ${element?.data?.margin ? element?.data?.margin + "px" : "0px"};
      cursor: ${element.data?.showCursor ? "pointer" : "default"};
      text-align: ${element.data?.textAlign || "left"};
    }

    #html${element.id}:hover {
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

      <div
        id={`html${element.id}`}
        className="h-full w-full text-wrapper "
        dangerouslySetInnerHTML={{ __html: element.data?.html || "<p>Open edit options to add html</p>" }}
      />
      {showEditMenu && (
        <HtmlEditOptions
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

export default HtmlElement;
