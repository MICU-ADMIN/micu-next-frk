import React from "react";
import ElementMenuWrapper from "../area/ElementMenuWrapper";
import { NavOptions } from ".";
import NavMenuItem from "./NavMenuItem";

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  model: NavOptions;
  setModel: React.Dispatch<React.SetStateAction<NavOptions>>;
};

function NavEditOptions({ setEditMode, model, setModel }: Props) {
  return (
    <ElementMenuWrapper
      width={400}
      close={() => setEditMode(false)}
      submit={() => {}}
      options={[
        {
          key: "Menu Items",
          component: (
            <div className="flex flex-col w-full">
              {model.navItems.map((item, i) => {
                return (
                  <NavMenuItem
                    item={item}
                    onChange={(m) => {
                      const newModel = { ...m };
                      newModel.navItems[i] = m;
                      setModel(newModel);
                    }}
                  />
                );
              })}

              <p
                className="text-indigo-500   cursor-pointer hover:text-indigo-700 transition-all duration-300 ease-in-out"
                onClick={() => {
                  setModel({ ...model, navItems: [...model.navItems, { label: "", link: "", type: "link" }] });
                }}
              >
                Add Menu Item
              </p>
            </div>
          ),
        },
      ]}
      element={undefined}
    />
  );
}

export default NavEditOptions;
