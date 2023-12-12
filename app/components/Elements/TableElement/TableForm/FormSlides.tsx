import React from "react";
import RecordViewer from "@/app/components/__Layouts/RecordViewer/RecordViewer";
import Spinner from "../../Spinner/Spinner";
import Loader from "../../Loader/Loader";
import dynamic from "next/dynamic";
import { ArrowLeftSquareIcon } from "lucide-react";
import Button from "../../Button/Button";
import AddSlide from "@/app/components/_Slides/AddSlide";
import { removeFromCache, requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors, handleSuccess, parseDataIfString } from "@/app/_helpers/web/formatters";
import { Slide } from "@/_types/dbTypes";
import { deleteFromCacheWithPrefix } from "@/app/_helpers/web/cache/cache";
import DrawingCanvas from "../../Canvas/Canvas";
import "@tldraw/tldraw/tldraw.css";

const Tldraw = dynamic(async () => (await import("@tldraw/tldraw")).Tldraw, { ssr: false });

const Area = dynamic(() => import("@/app/components/_Sites/SiteEditor/area"), { loading: () => <Spinner /> });

function FormSlides({ row, publicEstablishmentId }: { row: any; publicEstablishmentId: string }) {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showAddSlide, setShowAddSlide] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState<Slide | null>(null);
  const [drawMode, setDrawMode] = React.useState(false);
  const [drawingActions, setDrawingActions] = React.useState([]);

  const tldrawEditor = React.useRef<any>(null);
  React.useEffect(() => {
    fetchSlides();
    return () => {};
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await requestHandler({
      type: "get",
      route: `slide/relation?relationId=${row.id}&relationName=RecordData&lastId=${slides[slides.length - 1]?.id || 0}`,
      returnCache: true,
      shouldCache: true,
    });
    setLoading(false);
    if (!res.errors) {
      setSlides([...slides, ...res]);
    } else {
      handleErrors(res);
    }
  };
  const onSetCurrentSlide = (slide: Slide) => {
    slide.content = parseDataIfString(slide.content);
    setCurrentSlide(slide);
  };

  const updateSlide = async () => {
    const slide = { ...currentSlide };

    slide.content = JSON.stringify(slide.content);
    setLoading(true);
    const res = await requestHandler({ type: "put", route: `slide`, body: slide });
    setLoading(false);
    if (!res.errors) {
      handleSuccess("Slide updated successfully");
      deleteFromCacheWithPrefix("slide");
    } else {
      handleErrors(res);
    }
  };

  return (
    <div className="bg-white h-full rounded pt-5 ">
      {loading && (
        <div className="w-full h-full relative top-[150px] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && currentSlide ? (
        <div className="relative">
          <ArrowLeftSquareIcon
            className="h-4 w-4 absolute left-1 top-[-19px] cursor-pointer text-gray-400 cursor-pointer"
            style={{ zIndex: 999999 }}
            onClick={() => setCurrentSlide(null)}
          />

          <Button style={{ zIndex: 999999 }} className="absolute right-[180px] top-0" onClick={() => updateSlide()} size="sm">
            Save
          </Button>
          <Button
            style={{ zIndex: 999999 }}
            variant="secondary"
            className="absolute right-[245px] top-0"
            onClick={() => {
              setDrawMode((prev) => {
                if (prev) {
                  tldrawEditor.current.updateInstanceState({ isReadonly: true });
                } else {
                  tldrawEditor.current.updateInstanceState({ isReadonly: false });
                  setTimeout(() => {
                    const imgTool = document.querySelector("[data-tool=asset]");
                    console.log(imgTool);
                    if (imgTool) imgTool.style.display = "none";
                  }, 100);
                }
                return !prev;
              });
            }}
            size="sm"
          >
            {drawMode ? "Exit Draw Mode" : "Enter Draw Mode"}
          </Button>

          <div
            className="w-full h-full absolute top-0 left-0 "
            style={{ zIndex: drawMode ? 99 : 2, pointerEvents: drawMode ? "all" : "none", overflow: "hidden" }}
          >
            {/* <DrawingCanvas readOnly={!drawMode} drawingActions={drawingActions} setDrawingActions={setDrawingActions} /> */}
            <Tldraw
              components={{
                Background: () => <div className="w-full h-full" style={{ backgroundColor: "transparent" }} />,
              }}
              persistenceKey={currentSlide.id.toString()}
              onMount={(editor) => {
                console.log("editor mounted", editor);
                tldrawEditor.current = editor;
                editor.updateInstanceState({ isReadonly: true });
              }}
            />
          </div>

          <Area
            siteData={{}}
            isSlide
            updateWrapperHeight={(height) => {}}
            //   deleteSection={() => deleteSection(i)}
            onDataChange={(data) => {
              setCurrentSlide((prev) => {
                if (!prev) return prev;
                return { ...prev, content: data };
              });
            }}
            moveDown={() => {}}
            data={currentSlide?.content || []}
            lastItem={false}
          />
        </div>
      ) : (
        !loading && (
          <>
            <RecordViewer
              records={slides} //@ts-ignore
              onPress={(_label: string, data: any) => onSetCurrentSlide(data)}
              addAction={() => setShowAddSlide(true)}
              addLabel="Add New Slide"
              labelId
              route="slide/relation"
              setRecords={setSlides}
              inRecord
            />
            {showAddSlide && (
              <AddSlide
                close={() => setShowAddSlide(false)}
                setSlides={setSlides}
                publicEstablishmentId={publicEstablishmentId}
                relationData={{ relationId: row.id, relationName: "RecordData" }}
              />
            )}
          </>
        )
      )}
    </div>
  );
}

export default FormSlides;
