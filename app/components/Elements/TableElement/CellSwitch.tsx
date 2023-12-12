import React from "react";
import Button from "../Button/Button";

type Props = {
  row: any;
  column: any;
  field: any;
  onChange: (v: any, field: any) => void;
  model: any;
  errors: any;
  index: number;
};

const CellSwitch = ({ row, column, field, onChange, model, errors, index }: Props) => {
  switch (column.type) {
    case "input":
      return (
        <input
          name={column.name}
          value={row[column.name] || ""}
          type={column.subType || "text"}
          onChange={(e) => {
            const curModel = [...model];
            console.log(curModel);
            if (!curModel[index]) curModel[index] = {};
            curModel[index][column.name] = e.target.value;
            onChange(curModel, field);
          }}
          className={`base-input 
             ${field.className || ""} base-input`}
          placeholder={field.placeholder + (field.required ? " *" : "")}
          {...column}
        />
      );
    case "select":
      return (
        <select
          name={column.name}
          value={row[column.name] || ""}
          onChange={(e) => {
            const curModel = [...model];
            if (!curModel[index]) curModel[index] = {};
            curModel[index][column.name] = e.target.value;
            onChange(curModel, field);
          }}
          className={`base-input ${errors && "error-input"} ${field.className || ""}`}
          {...column}
        >
          {column.options.map((option: any) => {
            return (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "button":
      return (
        <Button
          style={column.style || {}}
          className={column.className || ""}
          size="sm"
          variant={column.variant || "primary"}
          onClick={() => column.onClick(row, index)}
        >
          {column.icon && column.icon}
          {column.title}
        </Button>
      );
    case "custom":
      return column.component({ row, rowIndex: index, onChange: (v: any) => onChange(v, field), model, field });
    default:
      return null;
  }
};

export default CellSwitch;
