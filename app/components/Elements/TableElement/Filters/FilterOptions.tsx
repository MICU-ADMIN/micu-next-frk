import React from "react";

type Props = {
  filter: any;
  index: number;
  setFilters: (v: any) => void;
  refetch: () => void;
  users: any;
  columns: any;
};

function FilterOptions({ filter, index, setFilters, refetch, users, columns }: Props) {
  return (
    <div className="flex flex-row items-center space-x-1">
      <select
        className="text-[13px] py-[1.5px] outline-none  bg-white w-[75px] rounded-md border border-gray-300 focus:border-indigo-500"
        value={filter.column}
        onChange={(e) => {
          setFilters((filters: any) => {
            //get thr column type
            const col = columns.find((c: any) => c.name === e.target.value);

            const newFilters = [...filters];
            newFilters[index].column = e.target.value;
            newFilters[index].type = col.type;
            return newFilters;
          });
        }}
      >
        {columns.map((c: any) => {
          if (columns.type === "file") return null;
          return (
            <option key={c.name} value={c.name}>
              {c.placeholder}
            </option>
          );
        })}
      </select>
      <select
        className="text-[13px] py-[1.5px]   outline-none  bg-white w-[80px] rounded-md border border-gray-300 focus:border-indigo-500"
        value={filter.operator}
        onChange={(e) => {
          setFilters((filters: any) => {
            const newFilters = [...filters];
            newFilters[index].operator = e.target.value;
            return newFilters;
          });
        }}
      >
        {operators.map((operator) => {
          if (operator.value === "=" && filter.type === "users") return <> </>;
          return (
            <option key={operator.value} value={operator.value}>
              {operator.label}
            </option>
          );
        })}
      </select>

      {filter.type === "select" || filter.type === "userId" || filter.type === "users" ? (
        <FiltersSelect filter={filter} index={index} setFilters={setFilters} refetch={refetch} users={users} />
      ) : (
        <input
          type={filter.type === "number" ? "number" : filter.type === "date" || filter.type === "createdAt " || filter.type === "updatedAt" ? "date" : "text"}
          className="text-[13px] outline-none  bg-white max-w-[100px] rounded-md px-1 w-[75px] border border-gray-300 focus:border-indigo-500"
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
      )}
    </div>
  );
}

const FiltersSelect = ({ filter, index, setFilters, refetch, users }: any) => {
  return (
    <select
      className="text-[13px] py-[1.5px]   outline-none  bg-white w-[100px] rounded-md border border-gray-300 focus:border-indigo-500 "
      value={filter.value}
      onChange={(e) => {
        setFilters((filters: any) => {
          const newFilters = [...filters];
          newFilters[index].value = e.target.value;
          return newFilters;
        });
      }}
    >
      {filter.type === "users" || filter.type === "userId" ? (
        <>
          <option value="">Select user</option>
          {users.arr.map((u: any) => {
            return (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName}
              </option>
            );
          })}
        </>
      ) : (
        <>
          <option value="">Select value</option>
          {filter.options.map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </>
      )}
    </select>
  );
};

export default FilterOptions;

const operators = [
  { label: "Equals", value: "=" },
  { label: "Not equals", value: "!=" },
  { label: "Contains", value: "LIKE" },
  { label: "Not equals", value: "!=" },
  { label: "Does not contain", value: "NOT LIKE" },
  // { label: "Is empty", value: "IS NULL" },
  // { label: "Is not empty", value: "IS NOT NULL" },
  { label: "Greater than", value: ">" },
  { label: "Less than", value: "<" },
  { label: "Greater than or equals", value: ">=" },
  { label: "Less than or equals", value: "<=" },
];
