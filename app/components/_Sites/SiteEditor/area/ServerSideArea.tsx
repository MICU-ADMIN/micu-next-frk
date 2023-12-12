import React from "react";
import ServerElementSwitch from "./ServerElementSwitch";

type Props = {
  data: any;
  siteData: any;
  i: number;
};

function ServerSideArea({ data, siteData, i } : Props) {
  return (
    <div
      style={{
        height: data?.height ? data.height + "px" : "600px",

        background:
          data?.backgroundType === "color"
            ? data?.backgroundColor
              ? data?.backgroundColor
              : siteData?.siteColors[siteData?.defaultColorIndexes?.sectionBackground]
            : "none",

        position: "relative",
        opacity: data?.opacity || 1,
        boxSizing: "border-box",
        backgroundSize: data?.backgroundSize || "cover",
        backgroundImage: data?.backgroundType === "link" ? `url(${data?.backgroundImage || ""})` : "none",
        boxShadow: data?.boxShadow ? ` 0 0 0 ${data?.boxShadowWidth || "5"}px ${data?.boxShadow || ""}` : "",
        margin:
          data?.margin === "full"
            ? data.marginFull + "px"
            : `${data?.marginTop || 0}px ${data?.marginRight || 0}px ${data?.marginBottom || 0}px ${data?.marginLeft || 0}px`,
        padding:
          data.padding === "full"
            ? data.paddingFull + "px"
            : data.padding === "side"
            ? `
          ${data?.padding?.top || 0}px ${data?.padding?.right || 0}px ${data?.padding?.bottom || 0}px ${data?.padding?.left || 0}px`
            : "",
        border: data?.borderType ? `${data?.borderWidth}px ${data?.borderType} ${data?.borderColor || "black"}` : "none",
        animation: data?.animation
          ? `${data?.animation} ${data?.animationDuration || 1}s 
            ${data?.animationDelay || 0}s ${data?.animationIterationCount || 1} ${data?.animationDirection || "normal"} ${data?.animationFillMode || "none"} ${
              data?.animationPlayState || "running"
            }`
          : "",
      }}
      className={` w-full area-wrapper  ${data?.backgroundParallax === "fixed" ? "bg-fixed" : data?.backgroundParallax === "Animate" ? "bg-local" : ""} ${
        i === 0 ? "mt-20" : ""
      }  `}
    >
      {data?.backgroundOverlay && (
        <div style={{ boxShadow: `${data?.backgroundOverlay ? "inset 0 0 0 1000px " + data?.backgroundOverlay + "50" : ""}` }} className="sectionLayer"></div>
      )}
      {data.elements &&
        data.elements.map(
          (
            element: { type: string; position: { y: any; x: any; z: any }; size: { width: any; height: any }; id: React.Key | null | undefined },
            i: number | undefined
          ) => {
            return (
              <div
                className={`absolute element-wrapper  `}
                style={{
                  top: element.position.y,
                  left: element.position.x,
                  zIndex: element.position.z,
                  width: element.size.width,
                  height: element.size.height,
                }}
                key={element.id}
              >
                <ServerElementSwitch
                  element={element}
                  readOnly
                  elementIndex={i}
                  siteData={siteData}
                  onChange={function (v: string): void {
                    null;
                  }}
                  deleteElement={function (id: number): void {
                    null;
                  }}
                />
              </div>
            );
          }
        )}
    </div>
  );
}

export default ServerSideArea;
