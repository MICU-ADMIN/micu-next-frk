import React from "react";
import Button from "../../Button/Button";
import { EditIcon } from "lucide-react";
import { ArrowDown, ArrowUp, Filter } from "react-feather";

type Props = {
  column: any;
  onEditProperty: (v: any) => void;
  setPropertyIndex: () => void;
  setFilters: (v: any) => void;
};

function ColumnPopupContent({ column, setPropertyIndex, onEditProperty, setFilters }: Props) {
  const [curColumn, setCurColumn] = React.useState({}) as any;
  const changeTimeout = React.useRef<any>(null);

  React.useEffect(() => {
    if (column) setCurColumn({ ...column });
  }, [column]);

  const onValChange = (e: any) => {
    setCurColumn({ ...curColumn, placeholder: e.target.value });

    if (changeTimeout.current) clearTimeout(changeTimeout.current);
    changeTimeout.current = setTimeout(() => {
      onEditProperty({ ...curColumn, placeholder: e.target.value });
    }, 1000);
  };

  const onSetFilter = (dir: string) => {
    setFilters((prev: any) => {
      //filter out if there is a existing sort filter
      const newFilters = prev.filter((f: any) => !f.sortFilter);
      newFilters.push({
        dir: dir,
        orderBy: curColumn.name === "value" ? "label" : curColumn.name,
        placeholder: curColumn.placeholder,
        id: Date.now(),
        type: curColumn.type,
        sortFilter: true,
      });
      return newFilters;
    });
  };

  return (
    <div>
      <input
        type="text"
        value={curColumn?.placeholder || ""}
        className="w-full base-input"
        autoFocus
        onChange={(e) => {
          onValChange(e);
        }}
      />
      <Button size="sm" style={{ width: "100%" }} className="mt-2 w-full" onClick={setPropertyIndex} variant="secondary">
        <div className="flex flex-row items-center pl-1">
          <EditIcon className="mr-2 h-4 w-4" />
          Edit column
        </div>
      </Button>
      <hr className="my-3" />
      {column.type !== "file" && (
        <>
          <Button size="sm" style={{ width: "100%", background: "#F3F4F6" }} className=" w-full " onClick={() => onSetFilter("ASC")} variant="secondary">
            <div className="flex flex-row items-center pl-1">
              <ArrowUp className="mr-2 h-4 w-4" />
              Sort Acsending
            </div>
          </Button>
          <Button size="sm" style={{ width: "100%", background: "#F3F4F6" }} className=" w-full mt-2" onClick={() => onSetFilter("DESC")} variant="secondary">
            <div className="flex flex-row items-center pl-1">
              <ArrowDown className="mr-2 h-4 w-4" />
              Sort Descending
            </div>
          </Button>
        </>
      )}
      <Button
        size="sm"
        style={{ width: "100%" }}
        className=" w-full mt-2"
        onClick={() => {
          setFilters((prev: any) => [
            ...prev,
            {
              placeholder: curColumn.placeholder,
              id: Date.now(),
              type: curColumn.type,
              column: curColumn.name,
              operator: "=",
              value: "",
            },
          ]);
        }}
      >
        <div className="flex flex-row items-center pl-1">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </div>
      </Button>
    </div>
  );
}

export default ColumnPopupContent;
