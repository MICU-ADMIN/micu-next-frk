import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

const DropDowns = ({ list, selectedIcon, style, type }: any) => {
  const [selected, setSelected] = useState(selectedIcon);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className={`${style}`}>
          {type == "crypto" && <img src={selected?.img} className="h-5 w-5" />}
          {selected?.name}
          {type == "crypto" ? (
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2 w-1.5">
              <path
                d="M0.420825 1.61555L2.84342 4.19964C3.19898 4.57891 3.80102 4.57891 4.15658 4.19964L6.57918 1.61555C7.11805 1.04075 6.71049 0.099999 5.92259 0.099999L1.07741 0.099999C0.289513 0.099999 -0.118049 1.04075 0.420825 1.61555Z"
                fill="#212B36"
              />
            </svg>
          ) : (
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" className="fill-[#363062] group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.97904 9L13.0911 15L19.2031 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-w-[76px]">
            {list?.map((person, personId) => (
              <Listbox.Option
                key={personId}
                className={({ active }) => `relative select-none py-2 pl-2 pr-4 cursor-pointer ${active ? "bg-[#F6F8FA] text-gray-900" : "text-gray-900"}`}
                value={person}
              >
                {({ selected }) => (
                  <div className="flex gap-2 ">
                    {type == "crypto" && <img src={person?.img} alt="crypto" className="h-5 w-5" />}
                    <span
                      className={`block truncate tracking-[1px] ${selected ? "font-medium text-[#212B36]" : "font-normal text-[#212B36]"} ${
                        type == "crypto" && "uppercase"
                      }`}
                    >
                      {person?.name}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropDowns;
