"use client";
import React from "react";
import Image from "next/image";
import ImageElementEditOptions from "./ImageElementEditOptions";

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function ImageElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform }: Props) {
  return (
    <>
      <style>
        {`
    #img${element.id} {
     border-radius: ${element?.data?.borderRadius || 0}px; 
     object-fit: ${element?.data?.objectFit || "cover"};
    opacity: ${element?.data?.opacity || 1};
      filter: ${element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none"};
      box-shadow: ${element?.data?.shadowColor ? `${element?.data?.shadowColor} 0px 0px 10px ${element?.data?.shadowOpacity || 0.5}` : "none"};
      transition: all 0.1s ease-in-out;
    
    }

    #img${element.id}:hover {
      ${element.data?.hoverBorderRadius ? `border-radius: ${element?.data?.hoverBorderRadius}px;` : ""}
      ${element.data?.hoverObjectFit ? `object-fit: ${element?.data?.hoverObjectFit};` : ""}
      ${element.data?.hoverOpacity ? `opacity: ${element?.data?.hoverOpacity};` : ""}
      ${
        element.data?.hoverFilter && element.data?.hoverFilterValue !== "none"
          ? `filter: ${element?.data?.hoverFilter}(${element?.data?.hoverFilterValue || "50"}%);`
          : ""
      }
      ${element.data?.hoverShadowColor ? `box-shadow: ${element?.data?.hoverShadowColor} 0px 0px 10px ${element?.data?.hoverShadowOpacity || 0.5};` : ""}
      }`}
      </style>
      <Image
        id={`img${element.id}`}
        className="h-full w-full media-wrapper "
        fill
        src={element.data?.isUrl ? element.data?.url : element.data?.file || "https://via.placeholder.com/150"}
        loading="lazy"
        alt={element.data?.alt || "image"}
      />
      {showEditMenu && (
        <ImageElementEditOptions element={element} onChange={onChange} setShowEditMenu={setShowEditMenu} targetRef={targetRef} setTransform={setTransform} />
      )}
    </>
  );
}

export default ImageElement;
