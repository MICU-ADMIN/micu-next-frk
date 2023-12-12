import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { Trash2Icon } from "lucide-react";
import React from "react";
import Button from "../../Button/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SelectionItem from "./SelectionItem";

type Props = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  route?: string;
  setModel?: React.Dispatch<React.SetStateAction<any[]>>;
  columns: any[];
  onChangeRows?: (rows: any, cb: (message?: any) => void, iC?: boolean) => void;
};

function SelectionMenu({ selectedIds, setSelectedIds, route = "recordData", setModel, columns, onChangeRows }: Props) {
  const [onDelete, setOnDelete] = React.useState(false);
  const deleteSelected = () => {
    requestHandler({ type: "delete", route: `${route}`, body: { ids: selectedIds } }).then((res) => {
      if (res?.success) {
        handleSuccess("Deleted Successfully");
        if (setModel)
          setModel((prev) => {
            const curModel = [...prev];
            selectedIds.forEach((id) => {
              const index = curModel.findIndex((m) => m.id === id);
              curModel.splice(index, 1);
            });
            return curModel;
          });
        setSelectedIds((prev) => prev.filter((id) => !selectedIds.includes(id)));
      } else handleErrors(res);
    });
  };

  const filteColumns = (columns: any[]) => {
    return columns.filter(
      (c) =>
        c.type !== "id" &&
        c.type !== "createdAt" &&
        c.type !== "updatedAt" &&
        c.type !== "actions" &&
        c.type !== "files" &&
        c.type !== "view" &&
        c.type !== "userId" &&
        c.type !== "custom"
    );
  };

  return (
    <>
      <div style={{ zIndex: 100 }} className="fixed  left-[100px] ">
        <div className="flex flex-row fadeIn items-center w-fit border  rounded-md shadow-lg  transition duration-500 ease-in-out bg-white relative  bottom-[40px] ">
          <XMarkIcon
            className="cursor-pointer w-5 h-5 ml-2 text-gray-500 hover:text-gray-600 transition duration-500 ease-in-out"
            onClick={() => setSelectedIds([])}
          />
          <span
            className="text-indigo-500 text-sm border-r border-gray-300 p-2 mr-1 p-2  hover:bg-gray-100
           "
          >
            {selectedIds.length} Selected
          </span>{" "}
          {filteColumns(columns).map((column, index) => {
            return (
              <SelectionItem
                setModel={(value: any, column: { name: string | number }, setToggleSelect: (arg0: boolean) => void) => {
                  if (setModel) {
                    let selectedRows = [] as any[];
                    let startingModel = [] as any[];

                    setModel((prev) => {
                      const curModel = [...prev];
                      if (startingModel.length === 0) startingModel = [...prev];
                      selectedIds.forEach((id) => {
                        const index = curModel.findIndex((m) => m.id === id);
                        curModel[index][column.name] = value;
                        selectedRows.push(curModel[index]);
                      });

                      return curModel;
                    });
                    setToggleSelect(false);
                    if (onChangeRows)
                      onChangeRows(selectedRows, (message) => {
                        if (!message.success) {
                          //reverse changes
                          setModel(startingModel);
                        } else handleSuccess("Rows updated successfully");
                      });
                  }
                }}
                column={column}
                index={index}
                key={column.name}
              />
            );
          })}
          <Trash2Icon
            className=" cursor-pointer text-red-500 w-5 h-5 hover:text-red-600 transition duration-500 ease-in-out relative right-[10px]"
            onClick={() => setOnDelete(true)}
          />
          {onDelete && (
            <div className="absolute top-0 left-[110px] w-full h-full bg-black bg-opacity-0 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center bg-white p-5 rounded-md shadow-md">
                <span className="text-gray-500 text-sm font-semibold">Are you sure you want to delete {selectedIds.length} records?</span>
                <div className="flex flex-row mt-3">
                  <Button onClick={deleteSelected} style={{ backgroundColor: "#F87171" }} size="sm">
                    Delete
                  </Button>{" "}
                  <Button onClick={() => setOnDelete(false)} size="sm" variant="secondary" className="ml-2">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SelectionMenu;
