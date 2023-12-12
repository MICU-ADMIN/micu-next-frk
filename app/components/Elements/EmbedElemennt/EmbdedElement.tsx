"use client";
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";
const EmbedElementEditOptions = dynamic(() => import("./EmbedElementEditOptions"), { loading: () => <Spinner /> });

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  readOnly?: boolean;
};

function EmbdedElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, readOnly }: Props) {
  return (
    <>
      <style>
        {`
    #embd${element.id} {
     border-radius: ${element?.data?.borderRadius || 0}px; 
   
     object-fit: ${element?.data?.objectFit || "cover"};
    opacity: ${element?.data?.opacity || 1};
      filter: ${element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none"};
      box-shadow: ${element?.data?.shadowColor ? `${element?.data?.shadowColor} 0px 0px 10px ${element?.data?.shadowOpacity || 0.5}` : "none"};
      transition: all 0.1s ease-in-out;
     height: 100%;
     width: 100%;
     pointer-events: ${readOnly ? "auto" : "none"};
    }

    #embd${element.id}:hover {
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

      {element?.data?.url && <EmbedSwitch element={element} />}

      {showEditMenu && (
        <EmbedElementEditOptions element={element} onChange={onChange} setShowEditMenu={setShowEditMenu} targetRef={targetRef} setTransform={setTransform} />
      )}
    </>
  );
}

const EmbedSwitch = ({ element }: any) => {
  const [rerender, setRerender] = React.useState(false);

  React.useEffect(() => {
    setRerender((prev) => !prev);
  }, [element.data?.url]);

  switch (element.data?.embedType) {
    case "youtube":
      return <object data={`https://www.youtube.com/embed/${element.data.url.split("v=")[1]}`} className=" media-wrapper " id={`embd${element.id}`} />;
    case "asset" || "website":
      return <object data={element.data?.url} className=" media-wrapper " id={`embd${element.id}`} />;
    case "gdrive":
      return <object data={element.data?.url.replace("view?usp=drive_link", "preview")} className=" media-wrapper " id={`embd${element.id}`} />;

    case "gdrive-folder":
      return (
        <>
          <object
            data={`https://drive.google.com/embeddedfolderview?id=${element.data.url.split("/")[5] ? element.data.url.split("/")[5].split("?")[0] : ""}`}
            className="media-wrapper"
            id={`embd${element.id}`}
          />
        </>
      );
    case "gmaps":
      return (
        <>
          <iframe
            src={`https://maps.google.com/maps?q=${element.data.url.split("q=")[1]}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            className="media-wrapper"
            id={`embd${element.id}`}
          />
        </>
      );

    default:
      return <object data={element.data?.url} className=" media-wrapper " id={`embd${element.id}`} />;
  }
};

export default EmbdedElement;
