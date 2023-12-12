import React from "react";
import Badge from "../../Badge/Badge";
import FilterOptions from "./FilterOptions";
import SortOptions from "./SortOptions";
import { X } from "react-feather";

type Props = {
  filters: any;
  setFilters: (v: any) => void;
  refetch: () => void;
  users: any;
  columns: any;
};

function FiltersBar({ filters, setFilters, refetch, users, columns }: Props) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-start space-x-2 p-2 bg-white border-b border-gray-200 border-t sticky top-[0px] z-50 transition duration-500 ease-in-out slideInDown w-full overflow-auto">
      {filters.map((filter: any, index: number) => {
        return <FilterItem key={index} filter={filter} index={index} setFilters={setFilters} refetch={refetch} users={users} columns={columns} />;
      })}
    </div>
  );
}

const FilterItem = ({ filter, index, setFilters, refetch, users, columns }: any) => {
  return (
    <Badge key={index} style={filter.sortFilter ? { background: "#F3F4F6" } : { marginTop: 2 }}>
      <div className="flex flex-row items-center space-x-1 text-[13px]  ">
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
          <SortOptions filter={filter} index={index} setFilters={setFilters} columns={columns} />
        ) : (
          <FilterOptions filter={filter} index={index} setFilters={setFilters} refetch={refetch} users={users} columns={columns} />
        )}
      </div>
    </Badge>
  );
};

export default FiltersBar;
