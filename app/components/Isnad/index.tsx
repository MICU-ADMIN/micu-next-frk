import React from "react";
import HadithView, { Hadith } from "./hadithView/HadithView";
import LeftSideBar from "./leftSidebar/LeftSideBar";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import Loader from "../Elements/Loader/Loader";

function Isnad({ close }: any) {
  const [currentParams, setCurrentParams] = React.useState({ collectionId: 1, bookId: 1 });
  const [loading, setLoading] = React.useState(false);
  const [hadithData, setHadithData] = React.useState<Hadith[]>();

  React.useEffect(() => {
    if (currentParams?.collectionId) {
      fetchHadith();
    }
  }, [currentParams]);

  const fetchHadith = async () => {
    setLoading(true);
    const data = await requestHandler({
      route: "hadith?collectionId=" + currentParams.collectionId + "&bookId=" + currentParams.bookId,
      type: "get",
      shouldCache: true,
      returnCache: true,
    });
    setLoading(false);
    setHadithData(data);
  };

  return (
    <>
      <div style={{ width: "90vw" }} className="modal-center modal-center-large  h-[94vh] flex flex-row p-2">
        {loading && <Loader />}
        <LeftSideBar setCurrentParams={setCurrentParams}>
          {hadithData && (
            <>
              <HadithView
                hadithData={hadithData}
                currentBook={currentParams.bookId}
                currentCollection={currentParams.collectionId}
                setHadithData={setHadithData}
              />
            </>
          )}
        </LeftSideBar>
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  );
}

export default Isnad;
