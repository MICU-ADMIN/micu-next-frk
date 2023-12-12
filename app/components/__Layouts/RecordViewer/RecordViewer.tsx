import { requestHandler } from "@/app/_helpers/web/requestHandler";
import React from "react";
import { Settings, Table } from "react-feather";
import dynamic from "next/dynamic";
import Spinner from "../../Elements/Spinner/Spinner";
import { useRouter } from "next/navigation";

const TableElement = dynamic(
  () => import("../../Elements/TableElement/TableElement"),
  {
    loading: () => (
      <div className="h-[80vh] flex items-center justify-center">
        <Spinner />
      </div>
    ),
  }
);

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
}: Props) {
  let scrollTimeout = React.useRef<any>(null);
  let searchTimeout = React.useRef<any>(null);
  const router = useRouter();

  const [filterData, setFilterData] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [tableView, setTableView] = React.useState(false);
  const [noMoreData, setNoMoreData] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectionData, setSelectionData] = React.useState({
    clickPosition: null,
    data: null,
  }) as any;

  React.useEffect(() => {
    //check if the url has a query param of view=table
    if (inRecord) return;
    const url = new URL(window.location.href);
    const view = url.searchParams.get("view");
    if (view === "table") {
      setTableView(true);
    }
  }, []);

  React.useEffect(() => {
    if (!searchTerm) return setFilterData(null);

    if (records.length < 30) {
      const filtered = records.filter((r) => {
        if (r.label)
          return r.label.toLowerCase().includes(searchTerm.toLowerCase());
        else return r.title.toLowerCase().includes(searchTerm.toLowerCase());
      }) as any;
      setFilterData(filtered);
    } else {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    }
  }, [searchTerm]);

  const fetchNextRecords = async () => {
    if (noMoreData) return;
    setLoading(true); // fetch next 30 records based on the id of the last record
    const response = await requestHandler({
      type: "get",
      route: route + `?lastId=${records[records.length - 1].id}`,
    });
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
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        // when near the bottom of the page is reached fetch more data
        fetchNextRecords();
        onEndReached && onEndReached();
      }
    }, 100);
  };

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className=" mx-5 min-h-[400px] ">
        <div
          className={`flex items-center justify-between px-5 relative bottom-2 ${
            inRecord ? "border-b border-gray-100 pb-5" : ""
          }`}
        >
          <div className="flex flex-row bg-white/75 rounded-md shadow-md p-1 mt-3 hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out">
            <Table
              className="cursor-pointer  rounded-md text-primary-600 hover:text-primary-600 transition duration-500 ease-in-out"
              size={22}
              onClick={() => {
                //set isTable query param to true
                setTableView(!tableView);

                if (inRecord) return;

                //get the current url
                const url = new URL(window.location.href);
                if (!tableView) {
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

        {!tableView ? (
          <div
            onScroll={(e: any) => onScroll(e)}
            className="scrollbar-hide  grid grid-cols-1  gap-4 overflow-y-auto px-4  pb-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4"
          >
            {(filterData || records).map((screen) => (
              <div
                key={screen.id}
                onClick={() =>
                  onPress(labelId ? screen.label : screen.id, screen)
                }
                className="cursor-pointer overflow-hidden rounded-lg  bg-white shadow-md transition duration-500 ease-in-out hover:scale-105 hover:transform hover:shadow-lg relative group/item "
              >
                <div className="absolute top-0 right-0 p-2 bg-white/50 rounded-bl-md rounded-tr-md shadow-md transition duration-500 ease-in-out hover:scale-105 hover:transform hover:shadow-lg hidden group-hover/item:inline fadeIn">
                  <Settings
                    className="cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      setSelectionData({
                        clickPosition: {
                          x: e.clientX,
                          y: e.clientY,
                        },
                        data: screen,
                      });
                    }}
                  />
                </div>

                {screen.thumbnail && (
                  <img
                    src={screen.thumbnail || screen.images[0]}
                    alt={screen.title}
                    className="h-[150px] w-full object-cover"
                  />
                )}

                <div className="p-3">
                  <h3 className="mb-2 text-lg font-medium">
                    {screen?.title || screen?.label || ""}
                  </h3>
                  {/* <p className="text-sm text-gray-600">{screen.description}</p> */}
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(screen.createdAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="overflow-hidden overflow-ellipsis text-sm text-gray-400">
                      {screen.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-white/50 transition duration-500 ease-in-out hover:scale-105 hover:transform hover:bg-gray-100 hover:shadow-lg"
              onClick={() => addAction(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-2 h-20 w-20 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-medium text-gray-600">
                {addLabel || "Add"}
              </span>
            </div>
          </div>
        ) : (
          <div
            className="  max-h-[80vh] overflow-y-auto"
            onScroll={(e: any) => onScroll(e)}
          >
            {(filterData || records).length === 0 ? (
              <div className="h-[50vh] flex items-center justify-center">
                No Records Found
              </div>
            ) : (
              <TableElement
                field={{
                  height: "80vh",
                  parentRender: true,
                  columns: [
                    {
                      type: "view",
                      name: "title",
                      placeholder: "Title",
                      width: "100px",
                      transform: (row: any) => row.label || row.title,
                    },
                    {
                      type: "view",
                      name: "description",
                      placeholder: "Description",
                      width: "100px",
                    },
                    {
                      type: "view",
                      name: "userId",
                      placeholder: "Created By",
                      width: "100px",
                    },
                    {
                      type: "view",
                      name: "createdAt",
                      transform: (row: any) =>
                        new Date(row.createdAt)
                          .toString()
                          .split(" ")
                          .slice(0, 5)
                          .join(" "),
                      placeholder: "Created At",
                      width: "100px",
                    },
                    {
                      type: "view",
                      name: "updatedAt",
                      transform: (row: any) =>
                        new Date(row.createdAt)
                          .toString()
                          .split(" ")
                          .slice(0, 5)
                          .join(" "),
                      placeholder: "Updated At",
                      width: "100px",
                    },
                  ],
                  rowOnClick: ({ row }: any) =>
                    onPress(labelId ? row.label : row.id, row),
                }}
                onChange={function (v: any, field: any): void {
                  () => {};
                }}
                data={filterData || records}
                errors={{}}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default RecordViewer;
