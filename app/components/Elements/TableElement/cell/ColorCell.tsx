import React from "react";

function ColorCell({ isSelected, row, column, onChangeRow, onChangeCell, field, error, checkErrors, onChange, hardWidth }: any) {
  return (
    <>
      {isSelected ? (
        <input
          name={column.name}
          style={{ maxWidth: hardWidth || column.width ? `calc(${column.width} - 15px)` : "fit" }}
          value={column.transform ? column.transform(row) : row[column.name]}
          type="color"
          autoFocus
          onChange={(e) => {
            e.stopPropagation();
            const error = checkErrors && (checkErrors(e.target.value, column) as any);
            onChange && onChangeCell(e.target.value, error);
            onChangeRow && onChangeRow({ ...row, [column.name]: e.target.value }, error);
          }}
          className={`base-input  max-h-[30px]  w-full
             ${field.className || ""} base-input   ${error && "error-input "}`}
          placeholder={field.placeholder + (field.required ? " *" : "")}
          {...column}
        />
      ) : (
        row[column.name] && (
          <div
            style={{ background: row[column.name] }}
            className="rounded-md mt-1 mb-[1px] w-full h-5  cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg p-1 hover:scale-105 border-[6px] border-gray-200"
          ></div>
        )
      )}
    </>
  );
}

export default ColorCell;
