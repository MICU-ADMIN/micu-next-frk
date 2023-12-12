"use client";
import dynamic from "next/dynamic";
import React from "react";
const ButtonElementEditOptions = dynamic(() => import("@/app/components/Elements/Button/ButtonElementEditOptions"));

type Props = {
  element: any;
  onChange: (v: any) => void;
  showEditMenu: boolean;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  readOnly: boolean;
  siteData: any;
};

function ButtonElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, readOnly, siteData }: Props) {
  return (
    <>
      <style>
        {`
    #btn${element.id} {
      transition: all 0.1s ease-in-out;
      border-radius: ${element?.data?.borderRadius || 0}px;
      opacity: ${element?.data?.opacity || 1};
      height: ${element?.size?.height || "100%"};
      background: ${
        element?.data?.backgroundColor ||
        (siteData?.defaultColorIndexes?.buttonBackground ? siteData?.siteColors[siteData?.defaultColorIndexes?.buttonBackground] : "initial")
      };
      color: ${
        element?.data?.color ||
        (siteData?.defaultColorIndexes?.buttonTextColor ? siteData?.siteColors[siteData?.defaultColorIndexes?.buttonTextColor] : "initial")
      };
      box-shadow: ${
        element?.data?.shadowColor
          ? `${element?.data?.shadowWidth || 2}px ${element?.data?.shadowHeight || 2}px ${element?.data?.shadowBlur | 1}px ${
              element?.data?.shadowSpread | 1
            }px ${element?.data?.shadowColor}`
          : "none"
      };
    }
    #btn${element.id}:hover {
      ${element.data?.hoverBorderRadius ? `border-radius: ${element?.data?.hoverBorderRadius}px;` : ""}
      ${element.data?.hoverOpacity ? `opacity: ${element?.data?.hoverOpacity};` : ""}
      ${element.data?.hoverBackgroundColor ? `background: ${element?.data?.hoverBackgroundColor};` : ""}
      ${element.data?.hoverColor ? `color: ${element?.data?.hoverColor};` : ""}
      ${
        element.data?.hoverShadowColor
          ? `box-shadow: ${element?.data?.hoverShadowWidth || 2}px ${element?.data?.hoverShadowHeight || 2}px ${element?.data?.hoverShadowBlur || 1}px ${
              element?.data?.hoverShadowSpread || 1
            }px ${element?.data?.hoverShadowColor};`
          : ""
      }
    }

      `}
      </style>

      <a className="h-full w-full" target={element.data?.newTab && readOnly ? "_blank" : "_self"} href={readOnly ? element.data?.link || "#" : "#"}>
        <button
          id={`btn${element.id}`}
          className={`hover: h-full w-full transform transition-all duration-300 ease-in-out  hover:scale-105 hover:shadow-lg 
          `}
        >
          {element?.data?.text || "Click here"}
        </button>
      </a>

      {showEditMenu && (
        <ButtonElementEditOptions element={element} onChange={onChange} setShowEditMenu={setShowEditMenu} targetRef={targetRef} setTransform={setTransform} />
      )}
    </>
  );
}

export default ButtonElement;
