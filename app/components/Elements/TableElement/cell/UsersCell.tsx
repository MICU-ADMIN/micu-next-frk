import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

function UsersCell({ isSelected, onChangeRow, users, value, row, column }: any) {
  return (
    <>
      {isSelected && (
        <div className="absolute bg-white shadow-sm p-1 rounded w-full border border-gray-200 slideInDown max-h-[400px] overflow-y-auto">
          {users.arr.map((user: any) => {
            return (
              <div
                className="border-t border-gray-200 mt-1 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out flex flex-row items-center p-1"
                onClick={() => {
                  if (!onChangeRow) return;
                  //check if id already exists
                  if (value && value.includes(user.id)) return;
                  else if (!value) onChangeRow({ ...row, [column.name]: [] }, null);

                  onChangeRow({ ...row, [column.name]: value ? [...value, user.id] : [user.id] }, null);
                }}
              >
                {value && value.includes(user.id) && (
                  <XMarkIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!onChangeRow) return;
                      const filterArr = value.filter((r: any) => r != user.id);
                      onChangeRow({ ...row, [column.name]: filterArr }, null);
                    }}
                    className="text-red-500 mr-1 cursor-pointer h-4 w-4"
                  />
                )}
                <div
                  className="w-[21px] h-[21px] rounded-full bg-indigo-500 overflow-hidden text-white text-center align-center flex justify-center mr-1
                    "
                >
                  {user.firstName[0] + user.lastName[0]}
                </div>
                <span>
                  {user.firstName} {user.lastName}{" "}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {value && users.obj ? (
        <div className="f-row flex-wrap">
          {value.map((userId: string | number) => {
            return (
              <div className="flex lex-row">
                <div
                  title={users.obj[userId]?.firstName + " " + users.obj[userId]?.lastName}
                  className="w-[21px] h-[21px] rounded-full bg-indigo-500 overflow-hidden text-white text-center align-center flex justify-center mr-1
                    "
                >
                  {users.obj[userId]?.firstName[0] + users.obj[userId]?.lastName[0]}
                </div>
                <span>{users.obj[userId]?.firstName}</span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UsersCell;
