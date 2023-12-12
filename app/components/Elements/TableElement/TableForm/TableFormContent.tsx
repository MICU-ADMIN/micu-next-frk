import React from "react";
import HeaderItem from "../HeaderItem";
import CellSwitch from "../cell/CellSwitch";
import { Tab } from "@headlessui/react";
import dynamic from "next/dynamic";
import Spinner from "../../Spinner/Spinner";
import { errorMessage } from "@/app/_helpers/web/formatters";

const Editor = dynamic(() => import("../../Editor/Editor"), {
  loading: () => <Spinner />,
});
const FormSlides = dynamic(() => import("./FormSlides"), {
  loading: () => <Spinner />,
});
const FormArticles = dynamic(() => import("./FormArticles"), {
  loading: () => <Spinner />,
});
const TableFiles = dynamic(() => import("./TableFiles"), {
  loading: () => <Spinner />,
});

const tabs = ["Slides", "Articles", "Uploads"];

function TableFormContent({
  row,
  onValChange,
  columns,
  field,
  publicEstablishmentId,
}: any) {
  const [errors, setErrors] = React.useState({}) as any;
  const [currentTab, setCurrentTab] = React.useState(tabs[0]) as any;
  const [selected, setSelected] = React.useState(false) as any;

  React.useEffect(() => {
    //loop through row and check for errors
    columns.forEach((column: any) => {
      if (column.type === "input") {
        const err = checkErrors(row[column.name], column);
        if (err) {
          setErrors((errors: any) => ({ ...errors, [column.name]: err }));
          onValChange(row, column, err);
        }
      }
    });
  }, []);

  const checkErrors = (
    v: any,
    column: {
      required: any;
      maxLength: number;
      minLength: number;
      subType: string;
      name: string;
    }
  ) => {
    if (column.required && !v) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: "This field is required",
      }));
      return "This field is required";
    }

    if (!v) {
      if (errors[column.name])
        setErrors((errors: any) => ({ ...errors, [column.name]: "" }));
      return null;
    }

    if (column.maxLength && v.length > column.maxLength) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: `Max length is ${column.maxLength}`,
      }));
      return `Max length is ${column.maxLength}`;
    } else if (column.minLength && v.length < column.minLength) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: `Min length is ${column.minLength}`,
      }));
      return `Min length is ${column.minLength}`;
    }

    if (column.subType === "email" && emailRegex.test(v) === false) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: "Invalid email",
      }));
      return "Invalid email";
    } else if (column.subType === "phone" && phoneRegex.test(v) === false) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: "Invalid phone number",
      }));
      return "Invalid phone number";
    } else if (column.subType === "url" && urlRegex.test(v) === false) {
      setErrors((errors: any) => ({ ...errors, [column.name]: "Invalid url" }));
      return "Invalid url";
    } else if (
      column.subType === "password" &&
      passwordRegex.test(v) === false
    ) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
      }));
      return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character";
    } else if (column.subType === "char" && charRegex.test(v) === false) {
      setErrors((errors: any) => ({
        ...errors,
        [column.name]: "Only characters are allowed",
      }));
      return "Only characters are allowed";
    }

    if (errors[column.name])
      setErrors((errors: any) => ({ ...errors, [column.name]: "" }));

    return null;
  };

  return (
    <div className=" p-8">
      <Editor
        theme="bubble"
        className="text-primary-500 text-2xl mt-1 outline-none border-none"
        value={row.value}
        disableFocus
        onChange={(v: string) => {
          //check if not more than 2000 characters
          if (v.length > 2000)
            return errorMessage("Max length of cell is 2000 characters");
          onValChange({ ...row, value: v }, row.id);
        }}
      />

      <div className="flex flex-col  mt-5  border-t border-gray-200 pt-5 overflow-y-auto max-h-[35vh]">
        {columns.map((column: any, index: number) => {
          if (index === 0 || index === columns.length - 1) return null;
          column.disableFocus = true;
          return (
            <div
              key={index}
              onClick={() => setSelected(column.name)}
              className={`flex flex-row w-full h-fit  border-l border-r border-gray-100  p-2  ${
                index == 1 ? "rounded-tl-md rounded-tr-md border-t" : ""
              }
                ${
                  index == columns.length - 2
                    ? "rounded-bl-md rounded-br-md border-b"
                    : ""
                }
            `}
            >
              <HeaderItem
                column={column}
                index={index}
                hardWith="120px"
                setMenuOptions={function (
                  value: React.SetStateAction<{}>
                ): void {
                  null;
                }}
                editColumns={false}
                setCurrentProperty={(value: any): void => {}}
                setColumns={(value: any): void => {}}
                selectAll={() => null}
                deselectAll={() => null}
              />
              <div>
                <CellSwitch
                  hardWidth="30vw"
                  row={row}
                  isSelected={selected === column.name}
                  column={column}
                  index={index}
                  onChangeRow={(row: any, err) => {
                    onValChange(row, column, err);
                    // setErrors((errors: any) => ({ ...errors, [column.name]: err }));
                  }} //@ts-ignore
                  checkErrors={checkErrors}
                  error={errors[column.name]}
                  field={field}
                  model={[]}
                />
                {column?.description && (
                  <div className="text-[12px] text-gray-500">
                    {column?.description}
                  </div>
                )}
                {errors[column.name] && (
                  <div className="text-red-500 text-[12px]">
                    {errors[column.name]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 mt-10  border-t border-gray-200 pt-5 ">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-primary-500 text-white"
                    : "text-gray-500 hover:bg-primary-200 hover:bg-opacity-50"
                } w-full py-2 text-sm leading-5 font-medium rounded`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 rounded-md p-1.5 border border-gray-200 bg-gray-50 min-h-[20px]">
          <Tab.Panel className="fadeIn ">
            <FormSlides
              publicEstablishmentId={publicEstablishmentId}
              row={row}
            />
          </Tab.Panel>
          <Tab.Panel className=" fadeIn">
            <FormArticles
              publicEstablishmentId={publicEstablishmentId}
              row={row}
            />
          </Tab.Panel>
          <Tab.Panel className="fadeIn">
            <TableFiles row={row} columns={columns} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
const passwordRegex =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
const charRegex = /^[a-zA-Z\s]+$/;
const urlRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export default TableFormContent;
