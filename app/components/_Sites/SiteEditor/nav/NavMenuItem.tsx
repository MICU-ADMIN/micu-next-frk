import FormGroup from "@/app/components/Elements/Form/FormGroup";
import { ArrowDown, ArrowUp, Edit2Icon, Grip } from "lucide-react";
import React from "react";

function NavMenuItem({ item, onChange, snapshot, provided }: { item: any; onChange: (v: any) => void }) {
  const [showEdit, setShowEdit] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const Icon = !showEdit ? ArrowDown : ArrowUp;

  return (
    <div
      className="flex flex-col  bg-white p-2 rounded-md mb-2 shadow-md bg-opacity-50 w-full border border-gray-200 cursor-move"
      ref={provided.innerRef}
      style={{ ...provided.draggableProps?.style, zIndex: 99999, backgroundColor: snapshot?.isDragging ? "#f5f5f5" : "white" }}
      {...provided.draggableProps}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center gap-x-2">
          <div
            className={`px-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition  hover:bg-indigo-200 border-r border-r-indigo-30 text-gray-500
        `}
            {...provided.dragHandleProps}
          >
            <Grip className="h-4 w-4" />
          </div>
          <div>
            <span className="">{item.label}</span>
            <span>{item.type === "link" && <span className="text-indigo-500 ml-1">( {item.link} )</span>}</span>
          </div>
        </div>
        <Icon
          className="cursor-pointer text-indigo-500 hover:text-indigo-700 transition-all duration-300 ease-in-out h-4 w-4"
          onClick={() => setShowEdit((prev: any) => !prev)}
        />
      </div>
      {showEdit ? (
        <div
          className="slideInDown  w-full 
        "
        >
          <hr className="my-3" />
          <FormGroup
            className="w-full mt-2"
            altSetModel={true}
            errors={errors}
            setErrors={setErrors}
            fields={[
              {
                name: "label",
                placeholder: "Label",
                type: "input",
                maxLength: 50,
              },
              {
                name: "link",
                placeholder: "Link",
                type: "nativeSelect",
                maxLength: 255,
                options: [],
                disabled: ({ model }) => model.default || model.url === "/",
              },
              {
                name: "active",
                title: "Active",
                type: "checkbox",
              },
              {
                name: "openInNewTab",
                title: "Open in new tab",
                type: "checkbox",
              },
            ]}
            model={item}
            setModel={(model) => {
              onChange(model);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default NavMenuItem;
