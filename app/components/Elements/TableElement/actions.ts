import { errorMessage } from "@/app/_helpers/web/formatters";
import React from "react";

//check whicch runs first
export const ColumnInit = (field: any, setColumns: React.Dispatch<React.SetStateAction<any[]>>) => {
  let curColumns = [...field.columns];

  if (field?.editColumns) {
    curColumns.push({
      name: "",
      editColumns: true,
      width: "100%",
    });
  }
  if (field.draggable) {
    curColumns.unshift({
      name: "",
      selector: "drag",
      width: "40px",
    });
  }

  setColumns(curColumns);
};

export const RowsInit = (
  data: any,
  field: any,
  setModel: React.Dispatch<React.SetStateAction<any[]>>,
  firstRender: boolean,
  setFirstRender: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!data || data.length !== 0) {
    if (field.parentRender) {
      setModel(data);
      if (firstRender) setFirstRender(false);
      return;
    }
    if (firstRender) {
      setModel(data);
      setFirstRender(false);
    }
  }
};
const notPlaceholderTypes = ["button", "file", "id", "createdAt", "updatedAt", "select", "checkbox", "number", "date"];

export const AddColumn = (
  type: string,
  columns: any,
  setColumns: React.Dispatch<React.SetStateAction<any[]>>,
  inputorDateType?: string,
  onChangeColumns?: (columns: any, cb: (message: any) => void) => void,
  setMenuOptions?: React.Dispatch<React.SetStateAction<any>>
) => {
  let curColumns = [...columns];

  const newColumn = {
    name: Date.now() + "_" + type,
    placeholder: inputorDateType || type,
    type,
    width: "150px",
    placeholderView: true,
  } as any;

  if (notPlaceholderTypes.includes(type)) delete newColumn.placeholderView;

  if (inputorDateType && type === "input") {
    newColumn.subType = inputorDateType;
  } else if (type === "date" && inputorDateType) {
    newColumn.dateSubType = inputorDateType;
  }

  if (type === "select") {
    newColumn.options = [
      { label: "Option 1", value: "option1", i: "1" },
      { label: "Option 2", value: "option2", i: "2" },
    ];
  } else if (type === "button") {
    newColumn.title = "Click Me";
  }

  //add new column 2nd to last
  curColumns.splice(curColumns.length - 1, 0, newColumn);

  if (setMenuOptions) setMenuOptions((prev: any) => ({ editPropertyIndex: curColumns.length - 2 }));

  setColumns(curColumns);
  if (onChangeColumns)
    onChangeColumns(curColumns, (message: any) => {
      //revert changes if error
      if (!message.success) {
        curColumns.splice(curColumns.length - 2, 1);
        if (setMenuOptions) setMenuOptions({ editPropertyIndex: null });
        setColumns(curColumns);
      }
    });
};

//edit column
export const EditProperty = (
  property: any,
  columns = [],
  setColumns: React.Dispatch<React.SetStateAction<any[]>>,
  index: number,
  setMenuOptions: React.Dispatch<React.SetStateAction<any>>,
  onChangeColumns?: (columns: any, cb: (message: any) => void) => void
) => {
  if (notPlaceholderTypes.includes(property.type)) delete property.placeholderView;
  else property.placeholderView = true;

  delete property.disableFocus;

  let curColumns = [...columns] as any;
  let startingColumn = { ...curColumns[index] };
  curColumns[index] = property;
  setColumns(curColumns);
  setMenuOptions((prev: any) => ({ ...prev, editPropertyIndex: null }));
  if (onChangeColumns)
    onChangeColumns(curColumns, (message: any) => {
      //revert changes if error
      if (!message.success) {
        curColumns[index] = startingColumn;
        setColumns(curColumns);
      }
    });
};

//delete column
export const RemoveProperty = (
  index: number,
  columns: any,
  setColumns: React.Dispatch<React.SetStateAction<any[]>>,
  onChangeColumns?: (columns: any, cb: (message: any) => void) => void
) => {
  let curColumns = [...columns];

  curColumns.splice(index, 1);

  setColumns(curColumns);
  if (onChangeColumns)
    onChangeColumns(curColumns, (message: any) => {
      //revert changes if error
      if (!message.success) {
        curColumns.splice(index, 0, columns[index]);
        setColumns(curColumns);
      }
    });
};

export const RowDelete = (
  setModel: React.Dispatch<React.SetStateAction<any[]>>,
  clickMenuOptions: any,
  setClickMenuOptions: React.Dispatch<React.SetStateAction<any>>,
  onDeleteRow?: (id: any, index: number, cb: (message?: any) => void) => void
) => {
  setModel((prev: any) => {
    const newModel = [...prev];
    newModel.splice(clickMenuOptions.index, 1);
    return newModel;
  });
  setClickMenuOptions({ position: { x: 0, y: 0 }, row: null, type: null });

  onDeleteRow &&
    onDeleteRow(clickMenuOptions.row.id, clickMenuOptions.index, (message?: any) => {
      if (!message.success) {
        //revert changes
        setModel((prev: any) => {
          const newModel = [...prev];
          newModel.splice(clickMenuOptions.index, 0, clickMenuOptions.row);
          return newModel;
        });
      }
    });
};

//hadle row edit and validation
export const HandleSetRow = (
  row: { error: any; errorColumn: any },
  column: { name: any },
  index: number,
  error: any,
  setModel: (arg0: (prev: any) => any[]) => void,
  onChangeRow?: (row: any, column: any, cb: (message?: any) => void) => void
) => {
  if (row.error && row.errorColumn !== column.name) return errorMessage("Please fix the error in the other column first to edit other columns in this row");

  let currentRow = {} as any;

  if (onChangeRow && !error)
    onChangeRow(row, column, (message?: any) => {
      //revert changes if error
      if (!message.success) {
        setModel((prev: any) => {
          const newModel = [...prev];
          newModel[index] = currentRow;
          return newModel;
        });
      }
    });

  setModel((prev: any) => {
    const newModel = [...prev];
    currentRow = newModel[index];
    newModel[index] = row;
    if (error) {
      newModel[index].error = error;
      newModel[index].errorColumn = column.name;
    } else if (newModel[index].error) {
      delete newModel[index].error;
      delete newModel[index].errorColumn;
    }
    return newModel;
  });
};

//Handle OnSroll when near bottom of table
export const OnBottomScrollHandler = (
  e: any,
  model: any,
  setModel: React.Dispatch<React.SetStateAction<any[]>>,
  setNoMoreData: React.Dispatch<React.SetStateAction<boolean>>,
  onEndReached?: () => void,
  fetchHandler?: (arg0: any, arg1: (arg0: any) => void, arg2?: any[]) => void,
  filters?: any[],
  requestTransformer?: (arg0: any) => any
) => {
  // only check for vertical scrolling
  const bottom = e.target.scrollHeight - e.target.scrollTop + 30 > e.target.clientHeight;

  if (bottom) {
    // when near the bottom of the page is reached fetch more data
    onEndReached && onEndReached();
    if (fetchHandler && model) {
      fetchHandler(
        model[model.length - 1].id,
        (res: any) => {
          if (!res || res?.errors) return;
          else if (res?.sortedRecords) {
            if (res?.sortedRecords.length === 0) return setNoMoreData(true);
            return setModel((prev: any) => [...prev, ...res?.sortedRecords]);
          } else if (res.length === 0) return setNoMoreData(true);
          else if (requestTransformer) res = requestTransformer(res);

          setModel((prev: any) => [...prev, ...res]);
        },
        filters
      );
    }
  }
};

//handle filtering

export const HandleTableFilter = (
  filters: any[],
  setModel: any,
  fetchHandler?: (arg0: any, arg1: (arg0: any) => void | undefined, arg2?: any[]) => void,
  requestTransformer?: (arg0: any) => any,
  setNoMoreData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!fetchHandler) return;
  fetchHandler(
    0,
    (res: any) => {
      if (!res || res?.errors) return;
      else if (res?.sortedRecords) {
        //@ts-ignore
        if (res?.sortedRecords.length === 0) return setNoMoreData(true);
        return setModel(res?.sortedRecords);
      } else if (requestTransformer) res = requestTransformer(res);
      setModel(res); //@ts-ignore
      setNoMoreData(false);
    },
    filters
  );
};

export const RowDrag = (e: { currentTarget: { id: any } }, currentDragIndex: number, field: any, model: any, onChange: (arg0: any[], arg1: any) => void) => {
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
};

//validate value

export const ValidateValue = (v: any, column: any, setError: (arg0: string) => void, error: any) => {
  if (column.required && !v) {
    setError("This field is required");
    return "This field is required";
  }

  if (!v) {
    if (error) setError("");
    return null;
  }

  if (column.maxLength && v.length > column.maxLength) {
    setError(`Max length is ${column.maxLength}`);
    return `Max length is ${column.maxLength}`;
  }
  if (column.minLength && v.length < column.minLength) {
    setError(`Min length is ${column.minLength}`);
    return `Min length is ${column.minLength}`;
  }

  if (column.max && v > column.max) {
    setError(`Max value is ${column.max}`);
    return `Max value is ${column.max}`;
  } else if (column.min && v < column.min) {
    setError(`Min value is ${column.min}`);
    return `Min value is ${column.min}`;
  }

  if (column.subType === "email" && emailRegex.test(v) === false) {
    setError("Invalid email");
    return "Invalid email";
  } else if (column.subType === "phone" && phoneRegex.test(v) === false) {
    setError("Invalid phone number");
    return "Invalid phone number";
  } else if (column.subType === "url" && urlRegex.test(v) === false) {
    setError("Invalid url");
    return "Invalid url";
  } else if (column.subType === "password" && passwordRegex.test(v) === false) {
    setError("Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character");
    return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character";
  } else if (column.subType === "char" && charRegex.test(v) === false) {
    setError("Only characters are allowed");
    return "Only characters are allowed";
  }

  if (error) setError("");

  return null;
};

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
const charRegex = /^[a-zA-Z\s]+$/;
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
