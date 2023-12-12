import dynamic from "next/dynamic";
import ServerEditor from "@/app/components/Elements/Editor/ServerEditor";
import ImageServerElement from "@/app/components/Elements/ImageElement/imageServerElement";
import HtmlElement from "@/app/components/Elements/HtmlElement/HtmlElement";
import Spinner from "@/app/components/Elements/Spinner/Spinner";

const ButtonElement = dynamic(() => import("@/app/components/Elements/Button/ButtonElement"));
const SliderElement = dynamic(() => import("@/app/components/Elements/SliderElement/SliderElement"));
const EmbdedElement = dynamic(() => import("@/app/components/Elements/EmbedElemennt/EmbdedElement"), { loading: () => <Spinner /> });
const ArticleViewerElement = dynamic(() => import("@/app/components/Elements/ArticleViewer/ArticleViewerElements"), { loading: () => <Spinner /> });
const RecordFormElement = dynamic(() => import("@/app/components/Elements/RecordForm/RecordForm"), { loading: () => <Spinner /> });
const ArticlesViewer = dynamic(() => import("@/app/components/_Articles/ArtclesViewer/ArticlesViewer"), { loading: () => <Spinner /> });

type Props = {
  element: any;
  readOnly?: boolean;
  onChange: (v: string) => void;
  deleteElement: (id: number) => void;
  isFocused?: boolean;
  setElements?: any;
  elementIndex?: number;
  isHovering?: boolean;
  showEditMenu?: boolean;
  setShowEditMenu?: (v: number) => void;
  setSize?: (v: any) => void;
  setTransform?: (v: any) => void;
  publicId?: string;
  targetRef?: React.MutableRefObject<HTMLDivElement>;
  siteData?: any;
};

const ServerElementSwitch = ({
  element,
  publicId = "",
  // readOnly = false,
  siteData = null,
}: // isFocused = false,
// onChange = () => {},
// setShowEditMenu = () => {},
// setSize = () => {},
// setTransform = () => {},
// targetRef = null,
// elementIndex = 0,
// isHovering = false,
// showEditMenu = false,
Props) => {
  switch (element.type) {
    case "text":
      return <ServerEditor element={element} siteData={siteData} />;
    case "background":
      return (
        <div
          style={{
            backgroundColor: element.data?.color || "inherit",
            backgroundImage: element.data?.isGradient
              ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
              : "",
            borderRadius: element?.data?.borderRadius ? element?.data?.borderRadius + "px" : "0px",
            height: element?.size?.height || "100%",
          }}
        ></div>
      );
    case "image":
      return <ImageServerElement element={element} />;
    case "video":
      return (
        <video
          className="h-full w-full media-wrapper  "
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
            filter:
              element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none",
          }}
        />
      );
    case "button":
      return <ButtonElement element={element} readOnly siteData={siteData} />;
    case "slider":
      return <SliderElement element={element} />;
    case "embed":
      return <EmbdedElement element={element} readOnly siteData={siteData} />;
    case "html":
      return <HtmlElement element={element} readOnly />;
    case "article":
      return <ArticleViewerElement element={element} readOnly siteData={siteData} />;
    case "form":
      return <RecordFormElement element={element} readOnly siteData={siteData} />;
    case "articles":
      return <ArticlesViewer element={element} readOnly siteData={siteData} publicEstablishmentId={publicId} />;

    default:
      return <div>{element.type} not found</div>;
  }
};

export default ServerElementSwitch;
