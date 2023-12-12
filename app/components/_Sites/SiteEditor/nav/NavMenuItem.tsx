import FormGroup from "@/app/components/Elements/Form/FormGroup";
import { ArrowDown, ArrowUp, Edit2Icon } from "lucide-react";
import React from "react";

function NavMenuItem({
  item,
  onChange,
}: {
  item: any;
  onChange: (v: any) => void;
}) {
  const [showEdit, setShowEdit] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const Icon = !showEdit ? ArrowDown : ArrowUp;

  return (
    <div
      className="flex flex-col  bg-white p-2 rounded-md mb-2 shadow-md bg-opacity-50 w-full border border-gray-200 cursor-move"
      draggable={true}
      onDragStart={(e) => {
        console.log("drag start");
      }}
      onDragEnd={(e) => {
        console.log("drag end");
      }}
    >
      <div className="flex flex-row justify-between w-full">
        <div>
          <span className="">{item.label}</span>
          <span>
            {item.type === "link" && (
              <span className="text-primary-500 ml-1">( {item.link} )</span>
            )}
          </span>
        </div>

        <Icon
          className="cursor-pointer text-primary-500 hover:text-primary-700 transition-all duration-300 ease-in-out h-4 w-4"
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
