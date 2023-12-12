"use client";
import React from "react";
import VideoElementEditOptions from "./VideoElementEditOptions";

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function VideoElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform }: Props) {
  return (
    <>
      <video
        className="h-full w-full "
        src={element.data?.isUrl ? element.data?.url : element.data?.file || "https://via.placeholder.com/150"}
        aria-describedby="video-description"
        controls={element.data?.controls || false}
        autoPlay={element.data?.autoPlay || false}
        loop={element.data?.loop || false}
        muted={element.data?.muted || false}
        style={{
          borderRadius: element?.data?.borderRadius ? element?.data?.borderRadius + "px" : "0px",
          height: element?.size?.height || "100%",
          objectFit: element?.data?.objectFit || "cover",
          opacity: element?.data?.opacity || 1,
          filter: element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none",
        }}
      />
      {showEditMenu && (
        <VideoElementEditOptions element={element} onChange={onChange} setShowEditMenu={setShowEditMenu} targetRef={targetRef} setTransform={setTransform} />
      )}
    </>
  );
}

export default VideoElement;
