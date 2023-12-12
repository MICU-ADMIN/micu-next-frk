import { Settings } from "lucide-react";
import React from "react";

type Props = {
  model: any;
  columns: any;
  fields: any;
  setClickMenuOptions: any;
  setFormOptions: any;
};

function TableCards({ model, columns, fields, setClickMenuOptions, setFormOptions }: Props) {
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
          <div className="absolute top-0 right-0 p-2 bg-white/50 rounded-bl-md rounded-tr-md shadow-md transition duration-500 ease-in-out hover:scale-105 hover:transform hover:shadow-lg hidden group-hover/item:inline fadeIn">
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

          {screen.thumbnail && <img src={screen.thumbnail || screen.images[0]} alt={screen.title} className="h-[150px] w-full object-cover" />}

          <div className="p-3">
            <h3 dangerouslySetInnerHTML={{ __html: screen.value || screen.index }} className="mb-2 text-lg font-medium"></h3>
            {/* <p className="text-sm text-gray-600">{screen.description}</p> */}
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-400">{new Date(screen.createdAt).toLocaleDateString()}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="overflow-hidden overflow-ellipsis text-sm text-gray-400">{screen.description}</span>
            </div>
          </div>
        </div>
      ))}
      <div
        className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-white/50 transition duration-500 ease-in-out hover:scale-105 hover:transform hover:bg-gray-100 hover:shadow-lg"
        // onClick={() => addAction(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-lg font-medium text-gray-600">{"Add"}</span>
      </div>
    </div>
  );
}

export default TableCards;
