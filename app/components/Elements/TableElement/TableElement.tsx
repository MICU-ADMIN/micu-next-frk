import React from "react";
import CellSwitch from "./CellSwitch";
import DragCell from "./DragCell";
import HeaderItem from "./HeaderItem";

type Props = {
  field: any;
  onChange: (v: any, field: any) => void;
  model: any;
  showFloatingLabel?: boolean;
  errors: any;
};

function TableElement({ field, onChange, model, showFloatingLabel, errors }: Props) {
  const [currentDragIndex, setCurrentDragIndex] = React.useState(-1);
  const [columns, setColumns] = React.useState([]) as any;
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (field.columns) {
      let curColumns = [...field.columns];
      if (field.draggable) {
        curColumns.unshift({
          name: "",
          selector: "drag",
          width: "40px",
        });
      }

      setColumns(curColumns);
    }
  }, []);

  let timeout: any = null;
  const onSetCurrentDragIndex = (index: number) => {
    setCurrentDragIndex(index);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-1">
        <label className="">{field.title}</label>
        {field?.addRow && (
          <button
            onClick={() => field.addRow({ model, onChange, field })}
            className="flex flex-row items-center px-2 py-1 rounded-md text-indigo-500  hover:bg-indigo-500 transition-all duration-200 hover:text-white hover:shadow-md"
          >
            <span className="mr-1">Add Row</span>
          </button>
        )}
      </div>
      <div
        id={"table" + field.title}
        style={{ height: field?.height || "auto", maxHeight: field?.height || "auto" }}
        className=" rounded-md shadow-sm p-1 bg-gray-50 overflow-y-auto border border-gray-100"
      >
        <table className="w-full table-auto border-collapse  rounded-md bg-white overflow-x-scroll relative">
          <thead className="sticky top-[0] z-50 bg-white border-b border-gray-200 border-t ">
            <tr>
              {columns.map(
                (
                  column: {
                    name: string;
                  },
                  index: number
                ) => {
                  return <HeaderItem column={column} index={index} key={index} />;
                }
              )}
            </tr>
          </thead>

          <tbody>
            {model &&
              (model[field.name] || model).map((row: any, index: React.Key | null | undefined) => {
                return (
                  <>
                    {field?.draggable && isDragging && (
                      <div
                        draggable={true}
                        className=" w-full absolute  bg-indigo-400 h-1 rounded shadow-sm cursor-cell"
                        onDragOver={(e) => onSetCurrentDragIndex(index)}
                      ></div>
                    )}
                    <tr key={index} draggable={true}>
                      {columns.map((column: any, cIndex: React.Key | null | undefined) => {
                        return (
                          <td className="border-top border-b border-gray-200 px-2 py-1" key={row?.id + cIndex}>
                            {field?.draggable && cIndex === 0 && (
                              <DragCell
                                rowIndex={index}
                                field={field}
                                onDragEnd={(e: any) => {
                                  setIsDragging(false);
                                  const source = Number(e.currentTarget.id);
                                  if (source && currentDragIndex !== -1 && source !== currentDragIndex) {
                                    let newModel;
                                    if (field?.name) newModel = [...model[field.name]];
                                    else newModel = [...model];
                                    const draggedElement = newModel[source];
                                    newModel.splice(source, 1);
                                    newModel.splice(currentDragIndex, 0, draggedElement);
                                    onChange(newModel, field);
                                  }
                                }}
                                model={model[field.name] || model}
                                currentDragIndex={currentDragIndex}
                                setIsDragging={setIsDragging}
                              />
                            )}

                            {row && (
                              <CellSwitch
                                row={row}
                                column={column}
                                field={field}
                                onChange={(m: any, field: any) => {
                                  onChange(m, field);
                                }}
                                model={model[field?.name] || model}
                                errors={errors}
                                index={index}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableElement;
