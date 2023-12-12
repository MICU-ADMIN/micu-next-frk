import React from "react";
import ElementMenuWrapper from "../area/ElementMenuWrapper";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { NavOptions } from ".";
import NavMenuItem from "./NavMenuItem";

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  model: NavOptions;
  setModel: React.Dispatch<React.SetStateAction<NavOptions>>;
  onUpdate: (data: NavOptions) => void;
};

function NavEditOptions({ setEditMode, model, setModel, onUpdate }: Props) {
  const [errors, setErrors] = React.useState({});

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    else if (result.destination.index === result.source.index) return;

    const sourceItem = model.navItems[result.source.index];
    const destinationItem = model.navItems[result.destination.index];

    const newModel = { ...model };
    newModel.navItems.splice(result.source.index, 1);
    newModel.navItems.splice(result.destination.index, 0, sourceItem);

    console.log("newModel", newModel);
    setModel(newModel);
  };

  return (
    <ElementMenuWrapper
      width={500}
      close={() => setEditMode(false)}
      submit={() => onUpdate(model)}
      options={[
        {
          key: "Menu Items",
          component: (
            <div className="flex flex-col w-full">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="navItems">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col w-full">
                      {model.navItems.map((item, i) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={i}>
                          {(provided) => (
                            <NavMenuItem
                              item={item}
                              snapshot={snapshot}
                              provided={provided}
                              onChange={(m) => {
                                const newModel = { ...model };
                                newModel.navItems[i] = m;
                                setModel(newModel);
                              }}
                            />
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <p className="text-indigo-500  mt-2 cursor-pointer hover:text-indigo-700 transition-all duration-300 ease-in-out">Create a new menu item </p>
            </div>
          ),
        },
      ]}
      element={undefined}
    />
  );
}

export default NavEditOptions;
