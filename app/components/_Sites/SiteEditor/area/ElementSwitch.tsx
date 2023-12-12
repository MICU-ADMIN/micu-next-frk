"use client";
import React, { Suspense } from "react";

const Editor = React.lazy(() => import("@/app/components/Elements/Editor/Editor")); //#region
const EmbedInput = React.lazy(() => import("@/app/components/Elements/EmbedInput/EmbedInput"));
const BackgroundElement = React.lazy(() => import("@/app/components/Elements/BackgroundElement/BackgroundElement"));
const ImageElement = React.lazy(() => import("@/app/components/Elements/ImageElement/ImageElement")); //#endregion
const VideoElement = React.lazy(() => import("@/app/components/Elements/VideoElement/VideoElement"));
const ButtonElement = React.lazy(() => import("@/app/components/Elements/Button/ButtonElement"));

type Props = {
  element: any;
  readOnly?: boolean;
  onChange: (v: string) => void;
  deleteElement: (id: number) => void;
  isFocused?: boolean;
  setElements?: any;
  startUp?: boolean;
  elementIndex?: number;
  isHovering?: boolean;
  showEditMenu?: boolean;
  setShowEditMenu?: (v: number) => void;
  setSize?: (v: any) => void;
  setTransform?: (v: any) => void;
  targetRef?: React.MutableRefObject<HTMLDivElement> | null;
  siteData?: any;
};

const ElementSwitch = ({
  element,
  readOnly = false,
  siteData = null,
  startUp = false,
  isFocused = false,
  onChange = () => {},
  setShowEditMenu = () => {},
  setSize = () => {},
  setTransform = () => {},
  targetRef = null,
  elementIndex = 0,
  isHovering = false,
  showEditMenu = false,
}: Props) => {
  return (
    // @ts-ignore
    <Suspense fallback={<div></div>}>
      {element.type === "text" && ( // @ts-ignore
        <Editor
          toggleHtml={!isFocused}
          title="Edit Top Message"
          value={element?.data?.value || "Type here"}
          element={element}
          theme="bubble"
          readOnly={readOnly}
          setTransform={setTransform}
          targetRef={targetRef}
          showEditMenu={showEditMenu}
          colors={siteData.siteColors || null}
          defaultColor={siteData.siteColors[siteData?.defaultColorIndexes?.textColor] || null}
          setShowEditMenu={setShowEditMenu}
          onChange={(content: any) => {
            onChange({ ...element.data, value: content });
          }}
          onChangeData={onChange}
          // onCancel={() => setShowTopMessageEditor(false)}
        />
      )}

      {element.type === "background" && ( // @ts-ignore
        <BackgroundElement element={element} onChange={onChange} showEditMenu={showEditMenu} setShowEditMenu={setShowEditMenu} />
      )}

      {element.type === "image" && ( // @ts-ignore
        <ImageElement element={element} onChange={onChange} showEditMenu={showEditMenu} targetRef={targetRef} setShowEditMenu={setShowEditMenu} />
      )}

      {element.type === "video" && ( // @ts-ignore
        <VideoElement element={element} onChange={onChange} showEditMenu={showEditMenu} targetRef={targetRef} setShowEditMenu={setShowEditMenu} />
      )}

      {element.type === "button" && ( // @ts-ignore
        <ButtonElement
          element={element}
          onChange={onChange}
          readOnly={readOnly}
          showEditMenu={showEditMenu}
          siteData={siteData}
          targetRef={targetRef}
          setShowEditMenu={setShowEditMenu}
        />
      )}

      {element.type === "embed" && (
        <EmbedInput // @ts-ignore
          element={element}
          onChange={onChange}
          readOnly={readOnly}
          showEditMenu={showEditMenu}
          targetRef={targetRef}
          setShowEditMenu={setShowEditMenu}
        />
      )}
    </Suspense>
  );
};

export default ElementSwitch;
