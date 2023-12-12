import React from "react";
import Badge from "../Badge/Badge";
import { X } from "react-feather";

type Props = {
  filters: any;
  setFilters: (v: any) => void;
  refetch: () => void;
};

function FiltersBar({ filters, setFilters, refetch }: Props) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-start space-x-2 p-2 bg-white border-b border-gray-200 border-t sticky top-[0px] z-50 transition duration-500 ease-in-out slideInDown">
      {filters.map((filter: any, index: number) => {
        return <FilterItem key={index} filter={filter} index={index} setFilters={setFilters} refetch={refetch} />;
      })}
    </div>
  );
}

const FilterItem = ({ filter, index, setFilters, refetch }: any) => {
  return (
    <Badge key={index} style={filter.sortFilter ? { background: "#F3F4F6" } : {}}>
      <div className="flex flex-row items-center space-x-1 text-[13px] ">
        <X
          onClick={() => {
            setFilters((filters: any) => {
              const newFilters = [...filters];
              newFilters.splice(index, 1);

              if (newFilters.length === 0) refetch();

              return newFilters;
            });
          }}
          className="cursor-pointer h-3 w-3 hover:text-red-500 transition duration-100 ease-in-out"
        />
        {filter.sortFilter ? (
          <span>
            Sorted by {filter.placeholder} {filter.dir === "ASC" ? "Ascending" : "Descending"}
          </span>
        ) : (
          <div className="flex flex-row items-center space-x-1">
            <span>{filter.placeholder}</span>
            <select
              className="text-[13px]  ml-1 outline-none border-none bg-white w-[100px]"
              value={filter.operator}
              onChange={(e) => {
                setFilters((filters: any) => {
                  const newFilters = [...filters];
                  newFilters[index].operator = e.target.value;
                  return newFilters;
                });
              }}
            >
              <option value="=">Equals</option>
              <option value="!=">Not equals</option>
              <option value="LIKE">Contains</option>
              <option value="NOT LIKE">Does not contain</option>
              <option value="IS NULL">Is empty</option>
              <option value="IS NOT NULL">Is not empty</option>
              <option value=">">Greater than</option>
              <option value="<">Less than</option>
              <option value=">=">Greater than or equals</option>
              <option value="<=">Less than or equals</option>
            </select>

            <input
              type="text"
              className="text-[13px] outline-none border-none bg-white w-[100px]"
              placeholder="Value"
              value={filter.value}
              onChange={(e) => {
                setFilters((filters: any) => {
                  const newFilters = [...filters];
                  newFilters[index].value = e.target.value;
                  return newFilters;
                });
              }}
            />
          </div>
        )}
      </div>
    </Badge>
  );
};

export default FiltersBar;
