import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../../Spinner/Spinner";

import "quill/dist/quill.bubble.css"; // adding css styles for `snow` theme
import { Plus } from "react-feather";
import Button from "../../Button/Button";
import Badge from "../../Badge/Badge";
import { dateFormat, errorMessage } from "@/app/_helpers/web/formatters";
import { Check } from "lucide-react";

const Editor = dynamic(() => import("../../Editor/Editor"), {
  loading: () => <Spinner />,
});
const FileSelectorModal = dynamic(
  () => import("@/app/components/_Uploads/FileSelectorModal"),
  { loading: () => <Spinner /> }
);
const SelectComponent = dynamic(() => import("../../Select/Select"), {
  loading: () => <Spinner />,
});

type Props = {
  row: any;
  column: any;
  field: any;
  onChange?: (v: any, field: any, error: any) => void | null;
  model: any;
  index: number;
  onChangeRow?: (v: any, error: any) => void | null;
  hardWidth?: string;
  error?: string;
  checkErrors?: (
    v: any,
    column: {
      required: any;
      maxLength: number;
      minLength: number;
      subType: string;
    }
  ) => void;
  isSelected?: boolean;
  setOpenFile?: (v: any) => void;
};

const CellSwitch = ({
  row,
  column,
  field,
  onChange,
  model,
  index,
  onChangeRow,
  hardWidth,
  error,
  checkErrors,
  isSelected,
  setOpenFile,
}: Props) => {
  const [focused, setFocused] = React.useState(false);
  const [showFileSelector, setShowFileSelector] = React.useState(false);
  const onChangeCell = (v: any, error = null) => {
    if (!onChange) return;
    const curModel = [...model];
    if (!curModel[index]) curModel[index] = {};
    curModel[index][column.name] = v;
    onChange(curModel, field, error);
  };

  const showFloatingLabel =
    column.placeholder && (focused || model[field.name]);

  switch (column.type) {
    case "view":
      return (
        <div className="flex items-center">
          {column.transform ? column.transform(row) : row[column.name]}
        </div>
      );

    case "editor":
      return (
        //@ts-ignore
        <Editor
          theme="bubble"
          styles={{
            maxWidth: hardWidth || column.width || "auto",
            break: "break-all",
          }}
          value={column.transform ? column.transform(row) : row[column.name]}
          disableFocus={column?.disableFocus}
          onChange={(v: string) => {
            //check if not more than 2000 characters
            if (v.length > 2000)
              return errorMessage("Max length of cell is 2000 characters");
            onChange && onChangeCell(v);
            onChangeRow && onChangeRow({ ...row, [column.name]: v }, null);
          }}
        />
      );

    case "input":
      return (
        <div className="flex flex-col relative">
          {showFloatingLabel && (
            <span
              style={{ zIndex: 99 }}
              className={`slideInUp absolute -top-[4px] left-0 left-2 bg-white px-1 text-xs leading-none ${
                column?.labelClass || ""
              }`}
            >
              {column.placeholder + (column.required ? "*" : "")}
            </span>
          )}
          <input
            name={column.name}
            style={{
              maxWidth:
                hardWidth || column.width
                  ? `calc(${column.width} - 15px)`
                  : "fit",
            }}
            value={column.transform ? column.transform(row) : row[column.name]}
            type={column.subType || "text"}
            autoFocus={field.cellSelection}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              e.stopPropagation();
              const error =
                checkErrors && (checkErrors(e.target.value, column) as any);
              onChange && onChangeCell(e.target.value, error);
              onChangeRow &&
                onChangeRow({ ...row, [column.name]: e.target.value }, error);
            }}
            className={`base-input  max-h-[30px]  
             ${field.className || ""} base-input   ${error && "error-input "}`}
            placeholder={field.placeholder + (field.required ? " *" : "")}
            {...column}
          />
          {column?.description && (
            <div className="text-[12px]  text-gray-500">
              {column?.description}
            </div>
          )}
        </div>
      );
    case "select":
      return (
        <>
          {isSelected ? (
            <SelectComponent
              multiple={column.multiple}
              value={row[column.name]}
              defaultMenuIsOpen={true}
              onChange={(e) => {
                onChange && onChangeCell(e);
                onChangeRow && onChangeRow({ ...row, [column.name]: e }, null);
              }}
              placeholder={
                column.placeholder + (column.required ? " *" : "") || ""
              }
              {...column}
              name={column.name}
            />
          ) : row.hasOwnProperty(column.name) && column.multiple ? (
            <div className="flex flex-row flex-wrap">
              {row[column.name] &&
                row[column.name].map((v: any) => {
                  return (
                    <Badge color={column?.badgeColor || "primary"}>{v}</Badge>
                  );
                })}
            </div>
          ) : (
            row.hasOwnProperty(column.name) && (
              <Badge color={column?.badgeColor || "primary"}>
                {row[column.name]}
              </Badge>
            )
          )}
          {column?.description && (
            <div className="text-[12px]  text-gray-500">
              {column?.description}
            </div>
          )}
        </>
      );
    case "number":
      return (
        <>
          {isSelected ? (
            <input
              name={column.name}
              style={{
                maxWidth:
                  hardWidth || column.width
                    ? `calc(${column.width} - 15px)`
                    : "fit",
              }}
              value={
                column.transform ? column.transform(row) : row[column.name]
              }
              type="number"
              max={column.max}
              autoFocus
              min={column.min}
              step={column.step}
              onChange={(e) => {
                e.stopPropagation();
                const error =
                  checkErrors && (checkErrors(e.target.value, column) as any);
                onChange && onChangeCell(e.target.value, error);
                onChangeRow &&
                  onChangeRow({ ...row, [column.name]: e.target.value }, error);
              }}
              className={`base-input  max-h-[30px]  
             ${field.className || ""} base-input   ${error && "error-input "}`}
              placeholder={field.placeholder + (field.required ? " *" : "")}
              {...column}
            />
          ) : (
            <span>
              {row[column.name] && column.numberSubType === "currency"
                ? "£"
                : ""}{" "}
              {row[column.name]}
              {row[column.name] && column.numberSubType === "percentage"
                ? "%"
                : ""}
            </span>
          )}
          {column?.description && (
            <div className="text-[12px]  text-gray-500">
              {column?.description}
            </div>
          )}
        </>
      );
    case "date":
      return (
        <>
          {isSelected ? (
            <input
              name={column.name}
              style={{
                maxWidth:
                  hardWidth || column.width
                    ? `calc(${column.width} - 15px)`
                    : "fit",
              }}
              value={
                column.transform ? column.transform(row) : row[column.name]
              }
              type={column?.dateSubType || "date"}
              max={column.max}
              autoFocus
              min={column.min}
              onChange={(e) => {
                e.stopPropagation();
                const error =
                  checkErrors && (checkErrors(e.target.value, column) as any);
                onChange && onChangeCell(e.target.value, error);
                onChangeRow &&
                  onChangeRow({ ...row, [column.name]: e.target.value }, error);
              }}
              className={`base-input  max-h-[30px]  
             ${field.className || ""} base-input   ${error && "error-input "}`}
              placeholder={field.placeholder + (field.required ? " *" : "")}
              {...column}
            />
          ) : (
            <span>{row[column.name]}</span>
            // <span>{dateFormat(row[column.name], column?.dateSubType || "date")}</span>
          )}
          {column?.description && (
            <div className="text-[12px]  text-gray-500">
              {column?.description}
            </div>
          )}
        </>
      );

    case "checkbox":
      return (
        <>
          {isSelected ? (
            <div className="flex items-center">
              <input
                name={column.name}
                type="checkbox"
                checked={row[column.name]}
                onChange={(e) => {
                  e.stopPropagation();
                  onChange && onChangeCell(e.target.checked);
                  onChangeRow &&
                    onChangeRow(
                      { ...row, [column.name]: e.target.checked },
                      null
                    );
                }}
                className={`base-input  max-h-[30px]  
             ${field.className || ""} base-input   ${error && "error-input "}`}
                placeholder={field.placeholder + (field.required ? " *" : "")}
                {...column}
              />{" "}
              <label className="ml-2">{column.placeholder}</label>
            </div>
          ) : (
            <span>
              {row[column.name] ? <Check className="text-green-500" /> : ""}{" "}
            </span>
          )}
        </>
      );

    case "file":
      return (
        <>
          <div
            style={{ maxWidth: column.width || "auto" }}
            className="w-full h-full  flex flex-row flex-wrap relative"
          >
            {isSelected && (
              <Button
                className="ml-2  w-fit absolute fadeIn flex flex-row items-center right-0 "
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowFileSelector(true);
                }}
              >
                {" "}
                <Plus size={15} />
                Add Files
              </Button>
            )}

            {true &&
              row[column.name] &&
              row[column.name].map((file: any) => {
                return file.cat === "image" ? (
                  <img
                    src={file.url}
                    alt=""
                    loading="lazy"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFile && setOpenFile(file);
                    }}
                    className="w-[50px] h-[50px] object-cover rounded shadow-md cursor-pointer mr-1 mb-1 hover:shadow-lg transition-all duration-200"
                  />
                ) : (
                  <Badge
                    color="primary"
                    style={{ maxWidth: column.width || "auto" }}
                    className="flex items-center h-fit cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFile && setOpenFile(file);
                    }}
                  >
                    {file.name}
                  </Badge>
                );
              })}
          </div>
          {showFileSelector && (
            <FileSelectorModal
              allowMultiple={true}
              allowedTypes={["images", "videos", "audio", "other"]}
              close={() => setShowFileSelector(false)}
              onFilesSelect={(files) => {
                const curFiles = [];
                for (const file of files) {
                  curFiles.push({
                    url: file.url,
                    cat: file.cat,
                    name: file.name,
                    id: file.id,
                  });
                }
                onChangeRow &&
                  onChangeRow({ ...row, [column.name]: curFiles }, null);
                setShowFileSelector(false);
              }}
            />
          )}
        </>
      );
    case "button":
      return (
        <Button
          style={column.style || {}}
          className={column.className || ""}
          size="sm"
          variant={column.variant || "primary"}
          onClick={() => {
            column.onClick(row, index);
          }}
        >
          {column.icon && column.icon}
          {column.title}
        </Button>
      );
    case "id":
      return (
        <span className="flex items-center text-[13px]">{row?.index}</span>
      );
    case "createdAt":
      return (
        <span className="flex items-center text-[13px]">
          {new Date(row?.createdAt).toString().split(" ").slice(0, 5).join(" ")}
        </span>
      );
    case "updatedAt":
      return (
        <span className="flex items-center text-[13px]">
          {new Date(row?.updatedAt).toString().split(" ").slice(0, 5).join(" ")}
        </span>
      );
    case "color":
      return (
        <>
          {isSelected ? (
            <input
              name={column.name}
              style={{
                maxWidth:
                  hardWidth || column.width
                    ? `calc(${column.width} - 15px)`
                    : "fit",
              }}
              value={
                column.transform ? column.transform(row) : row[column.name]
              }
              type="color"
              autoFocus
              onChange={(e) => {
                e.stopPropagation();
                const error =
                  checkErrors && (checkErrors(e.target.value, column) as any);
                onChange && onChangeCell(e.target.value, error);
                onChangeRow &&
                  onChangeRow({ ...row, [column.name]: e.target.value }, error);
              }}
              className={`base-input  max-h-[30px]  
             ${field.className || ""} base-input   ${error && "error-input "}`}
              placeholder={field.placeholder + (field.required ? " *" : "")}
              {...column}
            />
          ) : (
            <div
              style={{ background: row[column.name] }}
              className="rounded-md mt-1 mb-[1px] w-full h-7 shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg p-1 hover:scale-105 border-[6px] border-gray-200"
            ></div>
          )}
        </>
      );
    case "custom":
      return column.component({
        row,
        rowIndex: index,
        onChange: (v: any) => onChangeCell(v),
        model,
        field,
        onChangeRow,
      });
    default:
      return null;
  }
};

export default CellSwitch;
