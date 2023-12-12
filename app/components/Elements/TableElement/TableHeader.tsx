import React from "react";

type Props = {
  field: any;
  model: any;
  onChange?: (v: any, field: any) => void;
  onChangeRow?: (v: any) => void;
};

function TableHeader({ field, model, onChange, onChangeRow }: Props) {
  return (
    <div className="flex flex-row justify-between items-center mb-1">
      <label className="">{field.title}</label>
      {field?.addRow && (
        <button
          onClick={() => field.addRow({ model, onChange, field, onChangeRow })}
          className="flex flex-row items-center px-2 py-1 rounded-md text-indigo-500  hover:bg-indigo-500 transition-all duration-200 hover:text-white hover:shadow-md"
        >
          <span className="mr-1">Add Row</span>
        </button>
      )}
    </div>
  );
}

export default TableHeader;
