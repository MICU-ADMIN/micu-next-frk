// import { EditIcon } from "lucide-react";
import React, { forwardRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import ElementWrapper from "./ElementWrapper";
import { Delete, Trash } from "react-feather";
import { ToolbarOptions } from "./ToolbarOptions";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import Button from "@/app/components/Elements/Button/Button";
import ClickMenu from "@/app/components/Modals/ClickMenu/ClickMenu";
import DeleteModal from "@/app/components/Modals/DeleteModal/DeleteModal";

type Props = {
  rows?: number;
  columns?: number;
  onDataChange: (data: any) => void;
  data: any;
  updateWrapperHeight: (height: number) => void;
  readOnly?: boolean;
  setEditSectionIndex?: () => void;
  deleteSection?: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
  index?: number;
  lastItem?: boolean;
  publicEstablishmentId?: string;
  siteData?: any;
  isSlide?: boolean;
};

function Area({
  rows = 1,
  columns = 1,
  onDataChange,
  data = {},
  siteData = {},
  updateWrapperHeight,
  readOnly = false,
  setEditSectionIndex = () => {},
  deleteSection = () => {},
  moveUp = () => {},
  publicEstablishmentId = "",
  moveDown = () => {},
  index = 0,
  isSlide = false,
  lastItem = false,
}: Props) {
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [elements, setElements] = React.useState<any>(data?.elements || []);
  const [hovering, setHovering] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(null);
  const scrollTimeout = React.useRef<any>(null);
  const [showEditMenu, setShowEditMenu] = React.useState(null);
  const firstWHeightChange = React.useRef(true);
  const [under1100, setUnder1100] = React.useState(false);

  //for some reason useResizeDetector is not working on next 14 just on local but works on prod

  const { ref } = useResizeDetector({
    onResize: (_width, height) => {
      if (readOnly || isSlide || !height) return;
      else if (firstWHeightChange.current) {
        return (firstWHeightChange.current = false);
      }
      // console.log('height', height)
      scrollTimeout.current && clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        updateWrapperHeight(height);
      }, 300);
    },
  });

  // const ref = React.useRef(null);

  const firstChange = React.useRef(true);

  React.useEffect(() => {
    if (elements.length > 0) {
      if (firstChange.current) {
        firstChange.current = false;
      } else {
        onDataChange({ ...data, elements });
      }
    }
  }, [elements]);

  //detect when window with is 1100px
  React.useEffect(
    () => {
      const checkWidth = () => {
        if (window.innerWidth < 1101) {
          setUnder1100(true);
        } else {
          setUnder1100(false);
        }
      };

      checkWidth();
      let timeout: any = null;

      //add on resize listener
      const resizeListener = () => {
        checkWidth();
      };
      window.addEventListener("resize", resizeListener);
      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className={` relative max-w-[100%]  ${
        !readOnly && !isSlide
          ? "input-wrapper-resizer hover:border-transparent hover:shadow-lg hover:outline-none hover:ring-2 hover:ring-indigo-600  focus:shadow-lg  focus:outline-none focus:ring-2 focus:ring-indigo-600 "
          : "overflow-hidden"
      }  `}
      style={{ height: !under1100 ? (data?.height ? data.height + "px" : "600px") : "fit-content" }}
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onContextMenu={(e) => {
        if (readOnly) return;
        e.preventDefault();
        setClickPosition({
          x: e.pageX - ref.current?.offsetLeft,
          y: e.pageY,
        });
      }}
    >
      {hovering && !readOnly && !isSlide && (
        <>
          <div style={{ zIndex: 99999 }} className="card  absolute right-[2px] rounded-lg p-2 opacity-90 shadow-lg slideLeft  bg-[rgba(255, 255, 255, 0.658)]">
            <Button
              variant="secondary"
              size="smd"
              onClick={(e) => {
                e.stopPropagation();
                setEditSectionIndex();
              }}
            >
              Edit Section {index + 1}
            </Button>

            <Button style={{ backgroundColor: "#fe1818b3" }} size="smd" className="mt-2 flex flex-row items-center" onClick={() => setShowDelete(true)}>
              <Trash className="w-[16px] h-[16px] text-white" />
              <span
                className=" font-sembold  ml-2  text-sm text-white
                 "
              >
                Delete
              </span>
            </Button>

            <div className="flex flex-row  mt-2 z-9999">
              <ArrowDownCircleIcon
                className={`text-gray-500 h-6 w-6 cursor-pointer hover:text-indigo-500  ${lastItem ? "opacity-30" : ""} `}
                title="Move Section Down"
                onClick={() => !lastItem && moveDown()}
              />
              <ArrowUpCircleIcon
                className={`ml-2 text-gray-500 h-6 w-6 cursor-pointer hover:text-indigo-500  ${index == 0 ? "opacity-30" : ""} `}
                onClick={() => index !== 0 && moveUp()}
                title="Move Section Up"
              />
            </div>
          </div>

          {isHovering && (
            <div
              className="absolute h-full w-[2px]  opacity-70 top-0 left-1/2 transform -translate-x-1/2 z-10 border-l border-indigo-500 border-dashed
            "
            ></div>
          )}
        </>
      )}
      <section
        style={{
          background:
            data?.backgroundType === "color"
              ? data?.backgroundColor
                ? data?.backgroundColor
                : siteData?.siteColors[siteData?.defaultColorIndexes?.sectionBackground]
              : "none",

          resize: readOnly || isSlide ? "none" : "vertical",
          position: "relative",
          opacity: data?.opacity || 1,
          boxSizing: "border-box",
          backgroundSize: data?.backgroundSize || "cover",
          backgroundImage:
            data?.backgroundType === "link" ? `url(${data?.backgroundImage || ""})` : data.backgroundType === "image" ? `url(${data?.imageUrl || ""})` : "",
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
        className={` area-wrapper  h-full  
        ${data?.backgroundParallax === "fixed" ? "bg-fixed" : data?.backgroundParallax === "Animate" ? "bg-local" : ""}  `}
      >
        {data?.backgroundOverlay && (
          <div style={{ boxShadow: `${data?.backgroundOverlay ? "inset 0 0 0 1000px " + data?.backgroundOverlay + "50" : ""}` }} className="sectionLayer"></div>
        )}
        {/* horizontal and vertical lines */}

        {elements.length > 0 ? (
          elements.map((element: { id: React.Key | null | undefined }, i: number) => (
            <ElementWrapper
              key={element.id}
              siteData={siteData}
              wrapperRef={ref}
              readOnly={readOnly}
              publicEstablishmentId={publicEstablishmentId}
              setSize={(size: any) => {
                const newElements = [...elements];
                newElements[i].size = size;
                onDataChange({ ...data, elements: newElements });
              }}
              setTransform={(transform: any) => {
                const newElements = [...elements];
                newElements[i].position = transform;
                onDataChange({ ...data, elements: newElements });
              }}
              element={element}
              onChange={(value: any) => {
                const newElements = [...elements];
                newElements[i].data = value;
                setElements(newElements);
              }}
              setElements={setElements}
              elementIndex={i}
              deleteElement={(id) => {
                const newElements = [...elements];
                const index = newElements.findIndex((e) => e.id == id);
                newElements.splice(index, 1);
                setElements(newElements);
              }}
              duplicateElement={(id, e) => {
                const newElements = [...elements];
                const index = newElements.findIndex((e) => e.id == id);
                const newElement = { ...newElements[index] };
                newElement.position.x = "10&";
                newElement.position.y = "10%";
                newElement.id = Date.now();
                newElements.splice(index + 1, 0, newElement);
                setElements(newElements);
              }}
              isHovering={isHovering === element.id}
              setIsHovering={setIsHovering}
              showEditMenu={showEditMenu}
              setShowEditMenu={setShowEditMenu}
            ></ElementWrapper>
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h2 className={`text-lg' font-semibold text-gray-900`}>Right click to add elements</h2>
          </div>
        )}
      </section>

      {/* <ElementToolbar position={toolbarPosition} /> */}

      {clickPosition.x !== 0 && (
        <>
          <ClickMenu items={ToolbarOptions(setElements, elements, clickPosition, setClickPosition)} position={clickPosition} title={""} variant="grid" />
          <div className="modal-overlay" style={{ background: "transparent" }} onClick={() => setClickPosition({ x: 0, y: 0 })}></div>
        </>
      )}

      {showDelete && (
        <DeleteModal close={() => setShowDelete(false)} deleteAction={() => deleteSection()} deleteText="Are you sure you want to delete this section?" />
      )}
    </div>
  );
}

export default Area;
