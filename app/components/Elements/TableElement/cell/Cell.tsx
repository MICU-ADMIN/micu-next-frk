import React from "react";
import CellSwitch from "./CellSwitch";
import { MenuIcon } from "lucide-react";
import { Link } from "react-feather";
import { ValidateValue } from "../actions";

type Props = {
  row: any;
  index: number;
  cIndex: number;
  field: any;
  currentDragIndex: number;
  model: any;
  column: any;
  onChange: (v: any, field: any, error: any, name: string) => void;
  errors: any;
  cellSelected: any;
  setCellSelected: (v: any) => void;
  onChangeRow?: (
    v: any,
    error: any,
    name: string,
    firstTrigger?: boolean
  ) => void;
  rowHover: boolean;
  setClickMenuOptions: (v: any) => void;
  selectedIds: any[];
  setSelectedIds: (v: any) => void;
  setOpenFile: (v: any) => void;
};

function Cell({
  row,
  index,
  cIndex,
  field,
  currentDragIndex,
  model,
  column,
  onChange,
  errors,
  setCellSelected,
  cellSelected,
  onChangeRow,
  rowHover,
  setOpenFile,
  setClickMenuOptions,
  selectedIds,
  setSelectedIds,
}: Props) {
  const isSelected = cellSelected === "r" + row.id + "c" + cIndex;
  const [error, setError] = React.useState("");
  const [cellHover, setCellHover] = React.useState(false);

  React.useEffect(() => {
    if (
      column.type === "input" ||
      column.type === "date" ||
      column.type === "number"
    ) {
      const err = checkErrors(row[column.name], column);
      if (onChangeRow) onChangeRow(row, err, column.name, true);
    } else if (error) {
      setError("");
      if (onChangeRow) onChangeRow(row, null, column.name, true);
    }
  }, [
    column?.subType,
    column?.maxLength,
    column?.minLength,
    column?.required,
    column?.max,
    column.min,
  ]);

  const checkErrors = (
    v: any,
    column: {
      required: any;
      maxLength: number;
      minLength: number;
      subType: string;
    }
  ) => {
    return ValidateValue(v, column, setError, error);
  };

  return (
    <td
      onMouseEnter={() => setCellHover(true)}
      onMouseLeave={() => setCellHover(false)}
      className={` h-[40px] relative  px-2 py-1 ${
        field.cellSelection && !column.editColumns && isSelected
          ? `outline outline-dashed outline-offset-0 outline-1  ${
              error ? "outline-red-500" : "outline-primary-500"
            }`
          : "border-b border-top border-gray-200"
      }`}
      style={
        isSelected
          ? {
              zIndex: 99,
              paddingLeft: field.editColumns && cIndex === 0 ? 35 : 8,
            }
          : { paddingLeft: field.editColumns && cIndex === 0 ? 35 : 8 }
      }
      key={(row?.id || index) + cIndex}
      onClick={(e) => {
        e.stopPropagation();
        if (field?.cellSelection) setCellSelected("r" + row.id + "c" + cIndex);
        if (field?.rowOnClick)
          field.rowOnClick({ row, index, column, cIndex, event: e });
      }}
    >
      {field.editColumns && cIndex === 0 && (
        <div
          className="flex flex-row absolute left-[-13px] top-3"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuIcon
            style={{ opacity: rowHover ? 1 : 0 }}
            onClick={(e) => {
              setClickMenuOptions({
                position: { x: e.clientX, y: e.clientY },
                row: row,
                index: index,
              });
              setCellSelected(null);
            }}
            className=" fadeIn text-gray-500 ml-2 h-5 w-5 hover:text-primary-600 cursor-pointer bg-white/50 rounded shadow-md border border-gray-200 hover:shadow-lg hover:border-primary-600 transition-all duration-200"
          />

          {field?.cellSelection &&
            (cellHover || selectedIds.includes(row.id)) && (
              <input
                type="checkbox"
                className="mx-1"
                checked={selectedIds.includes(row.id)}
                onChange={() => {
                  if (selectedIds.includes(row.id)) {
                    setSelectedIds(selectedIds.filter((id) => id !== row.id));
                  } else {
                    setSelectedIds([...selectedIds, row.id]);
                  }
                }}
              />
            )}
        </div>
      )}
      <>
        {field?.cellSelection && column.placeholderView && !isSelected ? (
          <>
            {!error &&
            row[column.name] &&
            column.subType &&
            linkedSubtypes.includes(column.subType) ? (
              <div className="flex flex-row">
                <div
                  className={`flex items-center break-word h-full w-full text-[13px] decoration-primary-500 underline  ${
                    column.className || ""
                  }`}
                >
                  {column.transform ? column.transform(row) : row[column.name]}
                </div>
                <a
                  href={`${
                    column.subType === "email"
                      ? "mailto:"
                      : column.subType === "phone"
                      ? "tel:"
                      : ""
                  }${row[column.name]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link className="ml-1 text-primary-500 w-4 h-4" />
                </a>
              </div>
            ) : (
              <div
                style={{ width: column.width || "auto" }}
                className={`flex items-center break-all h-full w-full text-[13px]  ${
                  column.className || ""
                }`}
                dangerouslySetInnerHTML={
                  {
                    __html: column.transform
                      ? column.transform(row)
                      : row[column.name],
                  } as any
                }
              />
            )}
          </>
        ) : (
          <CellSwitch
            row={row}
            column={column}
            field={field}
            setOpenFile={setOpenFile}
            onChange={
              onChange
                ? (m: any, field: any, error: any) => {
                    onChange(m, field, error, column.name);
                  }
                : null
            }
            onChangeRow={(row: any, error: any) => {
              onChangeRow ? onChangeRow(row, error, column.name) : null;
            }}
            model={model[field?.name] || model}
            errors={errors}
            index={index}
            error={error}
            setError={setError}
            checkErrors={checkErrors}
            isSelected={isSelected}
          />
        )}
        {error && <div className="text-red-500  text-[12px]">{error}</div>}
      </>
    </td>
  );
}

const linkedSubtypes = ["email", "phone", "url"];

export default Cell;
