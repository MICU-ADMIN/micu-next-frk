import { Settings } from "lucide-react";
import React from "react";

type Props = {
  model: any;
  columns: any;
  fields: any;
  setClickMenuOptions: any;
  setFormOptions: any;
  users: any;
};

function TableCards({ model, columns, fields, setClickMenuOptions, setFormOptions, users }: Props) {
  return (
    <div className="scrollbar-hide  grid grid-cols-1  gap-4 overflow-y-auto px-4  pb-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
      {model.map((screen: any, index: number) => (
        <div
          key={screen.id}
          onClick={() => {
            fields.onClick && fields.onClick(screen, index);
            setFormOptions({
              open: true,
              index: index,
              row: screen,
            });
          }}
          className="cursor-pointer overflow-hidden rounded-lg  bg-white shadow-md transition duration-500 ease-in-out hover:scale-105 hover:transform hover:shadow-lg relative group/item "
        >
          <div className="absolute top-0 right-0 p-2 bg-white/50 rounded-bl-md rounded-tr-md shadow-md transition duration-500 ease-in-out hover:scale-105 hover:transform hover:shadow-lg hidden group-hover/item:inline fadeIn ">
            <Settings
              className="cursor-pointer"
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                setClickMenuOptions({
                  index: index,
                  position: {
                    x: e.clientX,
                    y: e.clientY,
                  },
                  row: screen,
                });
              }}
            />
          </div>

          <img
            src={
              screen.thumbnail ||
              "https://images.unsplash.com/photo-1591981901625-8000a340f781?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={screen.title}
            className="h-[100px] w-full object-cover"
          />

          <div className="p-3">
            <h3 dangerouslySetInnerHTML={{ __html: screen.value || screen.index }} className="mb-2 text-lg font-medium"></h3>
            {/* <p className="text-sm text-gray-600">{screen.description}</p> */}
            <div className="mt-2 flex items-center">
              <span className="overflow-hidden overflow-ellipsis text-sm text-gray-400">
                {" "}
                <div className="flex lex-row">
                  <div
                    title={users.obj[screen.userId]?.firstName + " " + users.obj[screen.userId]?.lastName}
                    className="w-[21px] h-[21px] rounded-full bg-indigo-500 overflow-hidden text-white text-center align-center flex justify-center mr-1
                    "
                  >
                    {users.obj[screen.userId]?.firstName[0] + users.obj[screen.userId]?.lastName[0]}
                  </div>
                  <span>{users.obj[screen.userId]?.firstName}</span>
                </div>
              </span>
              <span className="mx-2 text-gray-400">•</span>

              <span className="text-sm text-gray-400">{new Date(screen.createdAt).toString().slice(0, 24)}</span>
            </div>
          </div>
        </div>
      ))}
      <div
        className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-white/50 transition duration-500 ease-in-out hover:scale-105 hover:transform hover:bg-gray-100 hover:shadow-lg"
        // onClick={() => addAction(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 h-14 w-14 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-lg font-medium text-gray-600">{"Add"}</span>
      </div>
    </div>
  );
}

export default TableCards;
