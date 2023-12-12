import { MenuIcon } from "lucide-react";
import React from "react";
import { PlusCircle } from "react-feather";

type Props = {
  column: any;
  index: number;
  setMenuOptions: React.Dispatch<React.SetStateAction<{}>>;
  editColumns: boolean;
  setCurrentProperty: React.Dispatch<React.SetStateAction<any>>;
  setColumns: React.Dispatch<React.SetStateAction<any> | any>;
  onChangeColumns?: (column: any, cb: (message?: any) => void) => void | null;
  selectAll: () => void;
  deselectAll: () => void;
  hardWith?: string;
  selectedIds?: string[];
  dragIndex: number;
  setDragIndex: (v: any) => void;
  draggable?: boolean;
  isResizing: boolean;
  setIsResizing: (v: boolean) => void;
  isHorizontalScroll: boolean;
  selectColumn?: boolean;
};

function HeaderItem({
  column,
  setColumns,
  index,
  setMenuOptions,
  editColumns,
  setCurrentProperty,
  onChangeColumns,
  selectAll,
  deselectAll,
  hardWith,
  selectedIds,
  dragIndex,
  setDragIndex,
  isResizing,
  isHorizontalScroll,
  setIsResizing,
  selectColumn,
}: Props) {
  const ref = React.useRef() as React.MutableRefObject<any>;
  const [width, setWidth] = React.useState(column.width || "auto");
  const [showAllClicked, setShowAllClicked] = React.useState(false);
  const [columnPopup, setColumnPopup] = React.useState(false);

  let setColTimeout = React.useRef<any>(null);

  const resizeColumn = (e: any) => {
    setIsResizing(true);
    const left = e.pageX - ref.current.getBoundingClientRect().left;

    if (left < 0) return;

    const offset = left.toFixed(2);

    setWidth(offset + "px");

    let oldWidth = column.width;

    if (setColTimeout.current) clearTimeout(setColTimeout.current);
    setColTimeout.current = setTimeout(() => {
      setIsResizing(false);

      setColumns((prev: any) => {
        const newColumns = [...prev];
        newColumns[index].width = offset + "px";
        if (onChangeColumns)
          onChangeColumns(newColumns, (message) => {
            //if error set back to old width

            if (!message?.success) setWidth(oldWidth);
          });
        return newColumns;
      });
    }, 500);
  };

  React.useEffect(() => {
    if (column.width && !hardWith) setWidth(column.width);
  }, [column?.width]);

  React.useEffect(() => {
    if (selectedIds && selectedIds.length === 0) setShowAllClicked(false);
  }, [selectedIds]);

  const newondragend = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragIndex !== index) {
      setColumns((prev: any) => {
        // set index to replace the dragged index and move every other index up or down
        const newColumns = [...prev];
        const draggedColumn = newColumns[index];
        newColumns.splice(index, 1);
        newColumns.splice(dragIndex, 0, draggedColumn);
        if (onChangeColumns) onChangeColumns(newColumns, () => null);
        return newColumns;
      });
    }
    setDragIndex(-1);
  };

  return (
    <>
      <th
        draggable={!isResizing}
        onDragOver={(e) => {
          e.stopPropagation();
          if (isResizing) return;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            setDragIndex(index);
          }, 0);
        }}
        onDoubleClick={(e) => {
          if (!editColumns || !column.editColumns) return;
          setCurrentProperty(index);
        }}
        onClick={(e) => {
          if (!selectColumn || column.editColumns) return;
          e.stopPropagation();
          setMenuOptions({ columnEditIndex: index, columnTarget: e.currentTarget });
        }}
        onDragEnd={(e) => !isResizing && newondragend(e)}
        ref={ref}
        id={column.name}
        style={{
          width: isHorizontalScroll && column.selectColumn ? "100px" : hardWith || width,
          paddingLeft: selectColumn && index === 0 ? 30 : 8,
        }}
        className={`${
          hardWith ? "" : "border"
        }  border-gray-100  px-3 py-2 text-left font-medium  relative text-gray-500 hover:text-gray-600  cursor-pointer hover:bg-gray-50`}
        key={index}
      >
        {selectColumn && index === 0 && (
          <input
            className="absolute left-2 top-3 bg-transparent"
            type="checkbox"
            checked={showAllClicked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => {
              setShowAllClicked((prev) => {
                !prev ? selectAll() : deselectAll();
                return !prev;
              });
            }}
          />
        )}
        <span
          className="cursor-pointer hover:underline underline-2 underline-indigo-500 hover:text-indigo-500 w-full"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   if (editColumns) setCurrentProperty(index);
          // }}
        >
          {column.placeholder || column.name}
        </span>
        {column.editColumns && (
          <div className="flex flex-row">
            <PlusCircle
              className="text-indigo-500 h-4 w-4 hover:text-indigo-600 cursor-pointer"
              onClick={() =>
                setMenuOptions((prev: any) => {
                  return { ...prev, addProperty: true };
                })
              }
            />
            <MenuIcon
              className="text-gray-500 ml-2 h-4 w-4 hover:text-indigo-600 cursor-pointer"
              onClick={() =>
                setMenuOptions((prev: any) => {
                  return { ...prev, propertyMenu: true };
                })
              }
            />
          </div>
        )}
        {!hardWith && (
          <div
            draggable={true}
            onDragOver={(e) => e.stopPropagation()}
            onDragEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onDrag={(e) => {
              e.stopPropagation();
              resizeColumn(e);
            }}
            className="absolute right-0 top-0 h-full w-[0.8px] hover:w-[1px] hover:bg-indigo-500 bg-gray-100 cursor-col-resize hover:w-[3px]  "
          ></div>
        )}
      </th>
    </>
  );
}

let timeout: any = null;

export default HeaderItem;
