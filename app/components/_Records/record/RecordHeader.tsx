import React from "react";
import Spinner from "../../Elements/Spinner/Spinner";
import Select from "../../Elements/Select/Select";
import { UpdateRecordLabel } from "@/actions/record-actions";
import { ViewColumnsIcon } from "@heroicons/react/20/solid";
import { Square, Table } from "react-feather";
import { BoxIcon, Calendar, Layout, LayoutGrid, SquareCode, SquareDot, SquareKanban, SquareStack, TableIcon } from "lucide-react";
import { Square2StackIcon } from "@heroicons/react/24/outline";

type Props = {
  loading?: boolean;
  record: any;
  setLoading: (v: boolean) => void;
  setView: (v: string) => void;
  view: string;
};

function RecordHeader({ loading = false, record, setLoading, setView, view }: Props) {
  const [recordLabel, setRecordLabel] = React.useState("");
  let changeTimeout = React.useRef<any>(null);

  React.useEffect(() => {
    if (record) {
      setRecordLabel(record?.label);
    }
  }, [record]);

  return (
    <div className="flex border-b border-gray-200 min-h-[49px] mx-5 items-center justify-between">
      <div className="flex flex-row ">
        <Select
          className="w-30 "
          options={[{ label: recordLabel, value: record?.id }]}
          name="Record"
          isCreatable
          value={record?.id}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />{" "}
        <div className="flex flex-row items-center">
          {view !== "table" && (
            <TableIcon
              onClick={() => setView("table")}
              className="cursor-pointer ml-4 w-6 h-6 text-gray-500 hover:text-indigo-500 transition duration-100 ease-in-out"
            />
          )}
          {view !== "calender" && (
            <Calendar
              onClick={() => setView("calender")}
              className="cursor-pointer ml-4 w-6 h-6 text-gray-500 hover:text-indigo-500 transition duration-100 ease-in-out"
            />
          )}

          {view !== "cards" && (
            <LayoutGrid
              onClick={() => setView("cards")}
              className="cursor-pointer ml-4 w-6 h-6 text-gray-500 hover:text-indigo-500 transition duration-100 ease-in-out"
            />
          )}
        </div>
        <input
          type="text"
          value={recordLabel}
          className="text-[20px] ml-8 outline-none border-none "
          placeholder="Record name"
          maxLength={50}
          onChange={(e) => {
            setRecordLabel(e.target.value);
            changeTimeout.current && clearTimeout(changeTimeout.current);
            changeTimeout.current = setTimeout(() => {
              UpdateRecordLabel(e.target.value, setLoading, loading, record);
            }, 500);
          }}
        />
      </div>
      <div>
        {loading && (
          <div className="text-sm fadeIn text-gray-500 flex items-center flex-row">
            <span className="mr-1 text-indigo-500">Saving</span> <Spinner className="w-5 h-5 inline-block " />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordHeader;
