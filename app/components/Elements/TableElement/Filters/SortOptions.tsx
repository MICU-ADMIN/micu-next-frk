const SortOptions = ({ filter, index, setFilters, columns }: any) => {
  return (
    <span>
      Sort by
      <select
        className="text-[13px] py-[1.5px]  ml-1 outline-none  bg-white w-[80px] rounded-md border border-gray-300 focus:border-indigo-500"
        value={filter.orderBy}
        onChange={(e) => {
          setFilters((filters: any) => {
            const newFilters = [...filters];
            newFilters[index].orderBy = e.target.value;
            return newFilters;
          });
        }}
      >
        {columns.map((c: any) => {
          if (columns.type === "file" || !c.placeholder) return null;
          return (
            <option key={c.name} value={c.name}>
              {c.placeholder}
            </option>
          );
        })}
      </select>{" "}
      <select
        className="text-[13px] py-[1.5px]   outline-none  bg-white w-[55px] rounded-md border border-gray-300 focus:border-indigo-500"
        value={filter.dir}
        onChange={(e) => {
          setFilters((filters: any) => {
            const newFilters = [...filters];
            newFilters[index].dir = e.target.value;
            return newFilters;
          });
        }}
      >
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
    </span>
  );
};

export default SortOptions;
