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

const Area = dynamic(() => import("@/app/components/_Sites/SiteEditor/area"), { loading: () => <Spinner /> });

function FormSlides({ row, publicEstablishmentId }: { row: any; publicEstablishmentId: string }) {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showAddSlide, setShowAddSlide] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState<Slide | null>(null);

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
    <div className="bg-white h-full rounded pt-5">
      {loading && (
        <div className="w-full h-full relative top-[150px] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && currentSlide ? (
        <div className="relative">
          <ArrowLeftSquareIcon
            className="h-5 w-5 absolute left-3 top-0 cursor-pointer text-gray-400 cursor-pointer"
            style={{ zIndex: 999999 }}
            onClick={() => setCurrentSlide(null)}
          />
          <Button style={{ zIndex: 999999 }} className="absolute right-3 top-0" onClick={() => updateSlide()} size="sm">
            Save Changes
          </Button>
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
