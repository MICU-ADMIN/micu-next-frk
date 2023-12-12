import React from "react";

import { HandIcon } from "lucide-react";

type Props = {
  rowIndex: string;
  field: any;
  onDragEnd: (v: any) => void;
  model: any;
  currentDragIndex: number;
  setIsDragging: (v: boolean) => void;
};

function DragCell({ rowIndex, field, onDragEnd, model, currentDragIndex, setIsDragging }: Props) {
  return (
    <div
      draggable="true"
      id={rowIndex}
      className="cursor-move  "
      onDragStart={(e) => {
        console.log(e);
        setIsDragging(true);
        // console.log("dragenter", e);
        // if (!dragging) setDragging(true);
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        onDragEnd(e);
      }}
    >
      <HandIcon className="text-gray-500 h-5 w-5 cursor-grab" />
    </div>
  );
}

export default DragCell;
