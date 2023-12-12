import { requestHandler } from "@/app/_helpers/web/requestHandler";
import React from "react";
import { Edit2, Table } from "react-feather";
import dynamic from "next/dynamic";
import Spinner from "../../Elements/Spinner/Spinner";
import { useRouter } from "next/navigation";
import ClickMenu from "../../Modals/ClickMenu/ClickMenu";
import { Archive, SidebarOpenIcon, Trash2 } from "lucide-react";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import RecordViewerCards from "./RecordViewerCards";

const RecordViewerTable = dynamic(() => import("./RecordViewerTable"), {
  loading: () => (
    <div className="h-[80vh] flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

type Props = {
  onPress: (id: string | number, data?: any) => void;
  addAction: (arg0: boolean) => void;
  addLabel?: string;
  records: any[];
  onEndReached?: () => void;
  labelId?: boolean;
  route?: string;
  setRecords?: any;
  inRecord?: boolean;
  editAction: (arg0: any) => void;
  showTable?: boolean;
  defaultView?: string;
  additionalColumns?: any[];
};
function RecordViewer({
  onPress,
  records = [],
  addAction,
  addLabel,
  onEndReached,
  labelId = false,
  setRecords,
  route,
  inRecord = false,
  editAction,
  additionalColumns,
  defaultView,
}: Props) {
  let scrollTimeout = React.useRef<any>(null);
  let searchTimeout = React.useRef<any>(null);
  const router = useRouter();

  const [filterData, setFilterData] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [view, setView] = React.useState("");
  const [noMoreData, setNoMoreData] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [clickMenuOptions, setClickMenuOptions] = React.useState({ position: { x: 0, y: 0 }, row: null });
  const [selectionData, setSelectionData] = React.useState({
    clickPosition: null,
    data: null,
  }) as any;

  React.useEffect(() => {
    //check if the url has a query param of view=table
    if (inRecord) return setView("list");
    const url = new URL(window.location.href);
    const view = url.searchParams.get("view");
    if (view === "table") {
      setView("table");
    } else {
      setView(defaultView || "list");
    }
  }, []);

  React.useEffect(() => {
    if (!searchTerm) return setFilterData(null);

    if (records.length < 31) {
      const filtered = records.filter((r) => {
        if (r.label) return r.label.toLowerCase().includes(searchTerm.toLowerCase());
        else return r.title.toLowerCase().includes(searchTerm.toLowerCase());
      }) as any;
      setFilterData(filtered);
    } else {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(async () => {
        const response = await requestHandler({ type: "post", route: route + `search`, body: { searchTerm: searchTerm.toLowerCase() } });
        if (!response.errors) {
          setFilterData(response);
        }
      }, 500);
    }
  }, [searchTerm]);

  const fetchNextRecords = async () => {
    if (noMoreData) return;
    setLoading(true); // fetch next 30 records based on the id of the last record
    const response = await requestHandler({ type: "get", route: route + `?lastId=${records[records.length - 1].id}` });
    setLoading(false);
    if (!response.errors) {
      // if the response is empty or less than 30 records, set noMoreData to true, meaning there are no more records to fetch
      if (response.length === 0 || response.length < 30) setNoMoreData(true);
      setRecords([...records, ...response]);
    }
  };

  const onScroll = (e: any) => {
    if (noMoreData) return;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        // when near the bottom of the page is reached fetch more data
        fetchNextRecords();
        onEndReached && onEndReached();
      }
    }, 100);
  };

  const deleteItem = async (id: string | number, label, archive = false) => {
    const response = await requestHandler({ type: "delete", route: route, body: { id, archive: archive ? true : null, label: label } });
    if (!response.errors) {
      setRecords(records.filter((r) => r.id !== id));
      setClickMenuOptions({ position: { x: 0, y: 0 }, row: null });
      handleSuccess("Deleted successfully");
    } else {
      handleErrors(response);
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className=" mx-2 min-h-[400px] ">
        <div className={`flex items-center justify-between px-5 relative bottom-2 ${inRecord ? "border-b border-gray-100 pb-5" : ""}`}>
          <div className="flex flex-row bg-white/75 rounded-md shadow-md p-1 mt-3 hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out">
            <Table
              className="cursor-pointer  rounded-md text-indigo-600 hover:text-indigo-600 transition duration-500 ease-in-out"
              size={22}
              onClick={() => {
                //set isTable query param to true
                setView((prev) => (prev === "table" ? "list" : "table"));
                if (inRecord) return;
                //get the current url
                const url = new URL(window.location.href);
                if (view === "list") {
                  router.push(url.pathname + "?view=table");
                } else {
                  router.push(url.pathname + "?view=list");
                }
              }}
            />
          </div>

          <input
            className="base-input relative top-2 bg-white/75 rounded-md shadow-md p-1  hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out focus:hover:bg-gray-100 focus:shadow-lg focus:scale-105 focus:outline-none"
            placeholder="Search title..."
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {view == "list" ? (
          <RecordViewerCards
            onPress={onPress}
            records={records}
            addAction={addAction}
            addLabel={addLabel}
            labelId={labelId}
            filterData={filterData}
            setClickMenuOptions={setClickMenuOptions}
            onScroll={onScroll}
          />
        ) : (
          view === "table" && (
            <RecordViewerTable
              records={records}
              filterData={filterData}
              fetchNextRecords={fetchNextRecords}
              addAction={addAction}
              setClickMenuOptions={setClickMenuOptions}
              additionalColumns={additionalColumns}
            />
          )
        )}
      </div>

      {clickMenuOptions.position.x !== 0 && clickMenuOptions.position.y !== 0 && (
        <>
          <ClickMenu
            items={[
              {
                label: "View",
                icon: <SidebarOpenIcon className="w-[14px]" />,
                onClick: () => {
                  //@ts-ignore
                  onPress(labelId ? clickMenuOptions.row.label : clickMenuOptions.row.id, clickMenuOptions.row);
                },
              },
              {
                label: "Edit",
                icon: <Edit2 className="w-[14px]" />,
                onClick: () => {
                  editAction(clickMenuOptions.row);
                  setClickMenuOptions({ position: { x: 0, y: 0 }, row: null });
                },
              },

              {
                label: "Delete Item",
                type: "delete",
                icon: <Trash2 className="w-[14px] text-red-500" />,
                onClick: () => {
                  //@ts-ignore
                  deleteItem(clickMenuOptions.row.id, clickMenuOptions.row.label);
                },
              },

              {
                label: "Archive Item",
                icon: <Archive className="w-[14px] " />,
                onClick: () => {
                  //@ts-ignore
                  deleteItem(clickMenuOptions.row.id, clickMenuOptions.row.label, true);
                },
              },
            ]}
            position={clickMenuOptions.position}
          />
          <div
            className="modal-overlay"
            style={{ background: "transparent" }}
            onClick={() => setClickMenuOptions({ position: { x: 0, y: 0 }, row: null })}
          ></div>
        </>
      )}
    </>
  );
}

export default RecordViewer;
