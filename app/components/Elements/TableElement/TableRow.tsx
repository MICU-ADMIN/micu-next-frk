import React from "react";
import Cell from "./cell/Cell";
import { errorMessage } from "@/app/_helpers/web/formatters";

type Props = {
  row: any;
  index: number;
  field: any;
  currentDragIndex: number;
  model: any;
  columns: any;
  onChangeRow?: (v: any, column: any, cb: (message?: any) => void) => void;
  onChangeRows?: (rows: any[], cb: (message?: any) => void, indexChage?: boolean) => void;
  onChange?: (v: any, field: any) => void;
  errors: any;
  cellSelected: any;
  setCellSelected: (v: any) => void;
  setModel: (v: any) => void;
  onSetCurrentDragIndex: (v: any) => void;
  setClickMenuOptions: (v: any) => void;
  setSelectedIds: (v: any) => void;
  selectedIds: any[];
  setOpenFile?: (v: any) => void;
  users: {
    obj: {};
    arr: never[];
  };
};

function TableRow({
  row,
  index,
  field,
  currentDragIndex,
  model,
  columns,
  onChangeRow,
  onChange,
  errors,
  cellSelected,
  setCellSelected,
  setModel,
  onSetCurrentDragIndex,
  setClickMenuOptions,
  setSelectedIds,
  selectedIds,
  setOpenFile,
  users,
  onChangeRows,
}: Props) {
  const [rowHover, setRowHover] = React.useState(false);

  //Handle drag and drop of rows
  const onDragEnd = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentDragIndex !== index) {
      const prevModel = [...model];
      const newModel = [...model];
      const draggedRow = newModel[index];
      newModel.splice(index, 1);
      newModel.splice(currentDragIndex, 0, draggedRow);
      setModel(newModel);

      if (onChangeRows) {
        //get all the rows including and between the indexes
        const indexes = [currentDragIndex, index];
        const min = Math.min(...indexes);
        const max = Math.max(...indexes);
        const rows = prevModel.slice(min, max + 1);

        onChangeRows(
          rows,
          (message) => {
            //reverse changes if error
            if (!message.success) {
              setModel(prevModel);
            }
          },
          true
        );
      }
    }
    onSetCurrentDragIndex(-1);
  };
  return (
    <tr
      draggable={true}
      onDragEnd={(e) => onDragEnd(e)}
      onDragOver={(e) => {
        e.stopPropagation();
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          onSetCurrentDragIndex(index);
        }, 0);
      }}
      onContextMenu={(e) => {
        if (!field.contextMenu) return;
        e.preventDefault();
        e.stopPropagation();
        if (field.customContextMenu) return field.customContextMenu(e, row, index);
        setClickMenuOptions({
          index: index,
          position: {
            x: e.clientX,
            y: e.clientY,
          },
          row: row,
        });
      }}
      className={
        selectedIds.includes(row.id)
          ? `bg-indigo-100  ${currentDragIndex === index ? "bg-indigo-200" : ""}`
          : `hover:bg-gray-50 ${currentDragIndex === index ? "bg-indigo-200" : ""}`
      }
      onMouseEnter={() => setRowHover(true)}
      onMouseLeave={() => setRowHover(false)}
    >
      {columns.map((column: any, cIndex: number) => {
        return (
          <Cell
            row={row}
            index={index}
            key={(row?.id || index) + cIndex}
            cIndex={cIndex}
            field={field}
            rowHover={rowHover}
            currentDragIndex={currentDragIndex}
            model={model}
            column={column}
            users={users}
            setOpenFile={setOpenFile}
            setClickMenuOptions={setClickMenuOptions}
            onChangeRow={
              onChangeRow
                ? (row: any, error: any, columnName, firstTrigger = false) => {
                    if (row.error && row.errorColumn !== columnName)
                      return errorMessage("Please fix the error in the other column first to edit other columns in this row");
                    let prevRow = {} as any;

                    if (!error && !firstTrigger)
                      onChangeRow(row, column, (message) => {
                        //reverse changes if error
                        if (!message.success) {
                          setModel((prev: any) => {
                            const newModel = [...prev];
                            newModel[index] = prevRow;
                            return newModel;
                          });
                        }
                      });

                    setModel((prev: any) => {
                      const newModel = [...prev];
                      prevRow = { ...newModel[index] };
                      newModel[index] = row;
                      if (error) {
                        newModel[index].error = error;
                        newModel[index].errorColumn = columnName;
                      } else if (newModel[index].error) {
                        delete newModel[index].error;
                        delete newModel[index].errorColumn;
                      }
                      return newModel;
                    });
                  }
                : null
            }
            onChange={
              onChange
                ? (v: any, field: any, error: any, columnName) => {
                    if (!error) setModel(v);
                    onChange(v, field);
                  }
                : null
            }
            errors={errors}
            cellSelected={cellSelected}
            setCellSelected={setCellSelected}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
          />
        );
      })}
    </tr>
  );
}

let timeout: any = null;

export default TableRow;
