import React from "react";

type Props = {
  column: any;
  index: number;
};

function HeaderItem({ column, index }: Props) {
  const ref = React.useRef() as React.MutableRefObject<any>;
  const [width, setWidth] = React.useState(column.width || "auto");

  const resizeColumn = (e: any) => {
    const offset = e.pageX - ref.current.getBoundingClientRect().left;
    setWidth(offset + "px");
  };

  return (
    <th ref={ref} style={{ width }} className="border border-gray-100  px-3 py-2 text-left text-sm font-medium  relative" key={index}>
      {column.name}
      <div
        draggable={true}
        onDrag={(e) => resizeColumn(e)}
        className="absolute right-0 top-0 h-full w-[0.8px] hover:w-[1px] hover:bg-indigo-500 bg-gray-100 cursor-col-resize"
      ></div>
    </th>
  );
}

export default HeaderItem;
