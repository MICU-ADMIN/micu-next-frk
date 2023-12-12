import dynamic from "next/dynamic";
import ServerEditor from "@/app/components/Elements/Editor/ServerEditor";
import ImageServerElement from "@/app/components/Elements/ImageElement/imageServerElement";

const EmbedInput = dynamic(() => import("@/app/components/Elements/EmbedInput/EmbedInput"));
const ButtonElement = dynamic(() => import("@/app/components/Elements/Button/ButtonElement"));

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
  targetRef?: React.MutableRefObject<HTMLDivElement>;
  siteData?: any;
};

const ServerElementSwitch = ({
  element,
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
    case "embed":
      return <EmbedInput element={element} readOnly />;
    default:
      return <div>Element not found</div>;
  }
};

export default ServerElementSwitch;
