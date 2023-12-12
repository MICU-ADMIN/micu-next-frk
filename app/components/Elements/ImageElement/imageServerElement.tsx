import React from "react";
import Image from "next/image";

function ImageServerElement({ element }: any) {
  return (
    <>
      <style>
        {`
    #s_img${element.id} {
     border-radius: ${element?.data?.borderRadius || 0}px; 
     object-fit: ${element?.data?.objectFit || "cover"};
     opacity: ${element?.data?.opacity || 1};
     filter: ${element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none"};
     box-shadow: ${element?.data?.shadowColor ? `${element?.data?.shadowColor} 0px 0px 10px ${element?.data?.shadowOpacity || 0.5}` : "none"};
     transition: all 0.1s ease-in-out;
    }

    #s_img${element.id}:hover {
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
        id={`s_img${element.id}`}
        fill
        className="h-full w-full   media-wrapper"
        src={element.data?.isUrl ? element.data?.url : element.data?.file || "https://via.placeholder.com/150"}
        loading="lazy"
        alt={element.data?.alt || "image"}
      />
    </>
  );
}

export default ImageServerElement;
