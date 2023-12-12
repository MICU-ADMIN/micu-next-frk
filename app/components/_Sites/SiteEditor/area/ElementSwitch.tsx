"use client";
import React, { Suspense } from "react";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
import ArticlesViewer from "@/app/components/_Articles/ArtclesViewer/ArticlesViewer";

const Editor = React.lazy(() => import("@/app/components/Elements/Editor/Editor")); //#region
const EmbdedElement = React.lazy(() => import("@/app/components/Elements/EmbedElemennt/EmbdedElement"));
const BackgroundElement = React.lazy(() => import("@/app/components/Elements/BackgroundElement/BackgroundElement"));
const ImageElement = React.lazy(() => import("@/app/components/Elements/ImageElement/ImageElement")); //#endregion
const VideoElement = React.lazy(() => import("@/app/components/Elements/VideoElement/VideoElement"));
const ButtonElement = React.lazy(() => import("@/app/components/Elements/Button/ButtonElement"));
const SliderElement = React.lazy(() => import("@/app/components/Elements/SliderElement/SliderElement"));
const HtmlElement = React.lazy(() => import("@/app/components/Elements/HtmlElement/HtmlElement"));
const ReactElement = React.lazy(() => import("@/app/components/Elements/ReactElement/ReactElement"));
const RecordFormElement = React.lazy(() => import("@/app/components/Elements/RecordForm/RecordForm"));
const ArticleViewerElement = React.lazy(() => import("@/app/components/Elements/ArticleViewer/ArticleViewerElements"));

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
  publicEstablishmentId?: string;
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
  publicEstablishmentId = "",
}: Props) => {
  return (
    // @ts-ignore
    <Suspense fallback={<Spinner />}>
      <Switch
        element={element}
        readOnly={readOnly}
        siteData={siteData}
        startUp={startUp}
        isFocused={isFocused}
        onChange={onChange}
        setShowEditMenu={setShowEditMenu}
        setSize={setSize}
        setTransform={setTransform}
        targetRef={targetRef}
        elementIndex={elementIndex}
        publicEstablishmentId={publicEstablishmentId}
        isHovering={isHovering}
        showEditMenu={showEditMenu}
      />
    </Suspense>
  );
};

const Switch = (props: any) => {
  switch (props.element.type) {
    case "text":
      return (
        <Editor
          toggleHtml={!props.isFocused}
          title="Edit Top Message"
          value={props.element?.data?.value || "Type here"}
          element={props.element}
          readOnly={props.readOnly}
          setTransform={props.setTransform}
          targetRef={props.targetRef}
          showEditMenu={props.showEditMenu}
          colors={props.siteData?.siteColors || null}
          defaultColor={
            props.siteData?.siteColors
              ? props.siteData?.siteColors[props.siteData?.defaultColorIndexes?.textColor]
              : props.element?.data?.defaultTextColor || null
          }
          setShowEditMenu={props.setShowEditMenu}
          onChange={(content: any) => {
            props.onChange({ ...props.element.data, value: content });
          }}
          onChangeData={props.onChange}
          // onCancel={() => setShowTopMessageEditor(false)}
        />
      );
    case "background":
      return <BackgroundElement {...props} />;
    case "image":
      return <ImageElement {...props} />;
    case "video":
      return <VideoElement {...props} />;
    case "button":
      return <ButtonElement {...props} />;
    case "slider":
      return <SliderElement {...props} />;
    case "embed":
      return <EmbdedElement {...props} />;
    case "form":
      return <RecordFormElement {...props} />;
    case "article":
      return <ArticleViewerElement {...props} />;
    case "html":
      return (
        <HtmlElement
          {...props}
          defaultColor={
            props.siteData?.siteColors
              ? props.siteData?.siteColors[props.siteData?.defaultColorIndexes?.textColor]
              : props.element?.data?.defaultTextColor || null
          }
        />
      );
    case "articles":
      return <ArticlesViewer {...props} />;
    case "react":
      return (
        <ReactElement
          {...props}
          defaultColor={
            props.siteData?.siteColors
              ? props.siteData?.siteColors[props.siteData?.defaultColorIndexes?.textColor]
              : props.element?.data?.defaultTextColor || null
          }
        />
      );
    default:
      return <div>Element not found</div>;
  }
};

export default ElementSwitch;
