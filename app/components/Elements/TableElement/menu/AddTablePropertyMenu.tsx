import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import { IceCream } from "lucide-react";
import React from "react";

type Props = {
  close: () => void;
  onAddProperty: (type: string, inputType?: string) => void;
  wrapperRef: React.MutableRefObject<any>;
};

function AddTablePropertyMenu({ close, onAddProperty, wrapperRef }: Props) {
  const [showInputOptions, setShowInputOptions] = React.useState(false);
  const [showDateOptions, setShowDateOptions] = React.useState(false);

  return (
    <>
      <div
        style={{ zIndex: 1000, top: wrapperRef?.current?.offsetTop, height: wrapperRef?.current?.offsetHeight }}
        className="flex bg-white h-full border slideLeft p-3 rounded shadow-md  transition duration-500 ease-in-out min-w-[300px] max-w-[500px] fixed  top-0 right-0 flex-col"
      >
        <p className="text-indigo-500">Add new property</p>

        <div className="flex flex-col w-full mt-3">
          <label className="text-xs text-gray-500 mb-2">Types</label>
          {properties.map((property, index) => {
            return (
              <div key={index} className="flex flex-col  py-1 px-1 cursor-pointer hover:bg-gray-100 rounded  shadow-sm">
                <div className="flex flex-row items-center" onClick={() => onAddProperty(property.value)}>
                  <IceCream className="h-5 w-5 text-indigo-500" />
                  <span className="ml-2 text-sm text-gray-600">{property.label}</span>
                  {property.value === "input" && (
                    <span
                      className="ml-2 text-xs text-gray-400 flex flex-row items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowInputOptions(!showInputOptions);
                      }}
                    >
                      - View options <ArrowSmallDownIcon className="w-4 h-4 ml-1" />
                    </span>
                  )}
                  {property.value === "date" && (
                    <span
                      className="ml-2 text-xs text-gray-400 flex flex-row items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDateOptions(!showDateOptions);
                      }}
                    >
                      - View options <ArrowSmallDownIcon className="w-4 h-4 ml-1" />
                    </span>
                  )}
                </div>

                {showInputOptions && property.value === "input" && (
                  <div className="flex flex-col ml-2 mt-2 text-sm text-gray-500  p-3 bg-white rounded shadow-sm">
                    {inputTypes.map((inputType, index) => {
                      return (
                        <p key={index} className="cursor-pointer hover:text-indigo-500" onClick={() => onAddProperty(property.value, inputType.value)}>
                          {inputType.label}
                        </p>
                      );
                    })}
                  </div>
                )}

                {showDateOptions && property.value === "date" && (
                  <div className="flex flex-col ml-2 mt-2 text-sm text-gray-500  p-3 bg-white rounded shadow-sm">
                    {showdDateTypes.map((inputType, index) => {
                      return (
                        <p key={index} className="cursor-pointer hover:text-indigo-500" onClick={() => onAddProperty(property.value, inputType.value)}>
                          {inputType.label}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div onClick={close} style={{ background: "transparent" }} className="modal-overlay"></div>
    </>
  );
}

const inputTypes = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Password", value: "password" },
  { label: "Phone ", value: "phone" },
  { label: "URL", value: "url" },
  { label: "Characters only", value: "char" },
];

const showdDateTypes = [
  { label: "Date", value: "date" },
  { label: "Date time", value: "datetime-local" },
  { label: "Time", value: "time" },
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Year", value: "year" },
];

const properties = [
  { label: "Text", value: "editor" },
  { label: "Validated input", value: "input" },
  { label: "Select", value: "select" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Users", value: "users" },
  { label: "Files", value: "file" },
  { label: "Button", value: "button" },
  { label: "ID", value: "id" },
  { label: "Created at", value: "createdAt" },
  { label: "Updated at", value: "updatedAt" },
  { label: "Created by", value: "userId" },
  { label: "Colour", value: "color" },

  // { label: "Date", value: "date" },
  // { label: "Boolean", value: "boolean" },
  // { label: "Select", value: "select" },
  // { label: "Multi Select", value: "multiSelect" },
  // { label: "Image", value: "image" },
  // { label: "File", value: "file" },
];

export default AddTablePropertyMenu;
