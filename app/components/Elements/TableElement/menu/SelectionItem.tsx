import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../../Spinner/Spinner";
import Button from "../../Button/Button";

const CellSwitch = dynamic(() => import("../cell/CellSwitch"), { loading: () => <Spinner /> });

function SelectionItem({ column, index, setModel }: any) {
  const [toggleSelect, setToggleSelect] = React.useState(false);
  const [error, setError] = React.useState("");
  const [value, setValue] = React.useState("");

  const checkErrors = (v: any, column: { required: any; maxLength: number; minLength: number; subType: string }) => {
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
    } else if (column.minLength && v.length < column.minLength) {
      setError(`Min length is ${column.minLength}`);
      return `Min length is ${column.minLength}`;
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

  return (
    <>
      {toggleSelect ? (
        <>
          <div style={{ zIndex: 9990 }} className="absolute  bg-white  shadow-md rounded w-fit h-fit border border-gray-300 p-2">
            <CellSwitch
              row={{ [column.name]: value }}
              column={column}
              field={{}}
              setOpenFile={() => {}}
              hardWidth="300px"
              onChangeRow={(row: any) => {
                let err = null;

                if (column.type === "input") {
                  err = checkErrors(row[column.name], column);
                }

                if (err) setError(err);
                else if (error) setError("");
                setValue(row[column.name] === "<p><br></p>" ? "" : row[column.name]);

                // onChangeRow ? onChangeRow(row, error, column.name) : null;
              }}
              model={{ [column.name]: value }}
              index={index}
              error={error}
              checkErrors={() => {}}
              isSelected={toggleSelect}
            />
            {value && !error && (
              <Button className="mt-2 slideInDown" size="sm" onClick={() => setModel(value, column, setToggleSelect)}>
                Change the "{column.placeholder || column.name}" column to above in all selected
              </Button>
            )}
          </div>
          <div onClick={() => setToggleSelect(false)} style={{ opacity: "0.1" }} className="modal-overlay"></div>
        </>
      ) : (
        <div className="flex flex-col cursor-pointer hover:bg-gray-100 border-r border-gray-300  p-2 " onClick={() => setToggleSelect(true)}>
          <div className="flex flex-row items-center">
            <span className="text-sm text-gray-600">{column.placeholder || column.name}</span>
          </div>
        </div>
      )}
    </>
  );
}

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
const charRegex = /^[a-zA-Z\s]+$/;
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const linkedSubtypes = ["email", "phone", "url"];

export default SelectionItem;
