import React from "react";
import ColumnPopupContent from "./ColumnPopupContent";

type Props = {
  target: HTMLTableColElement;
  column: any;
  close: () => void;
  setPropertyIndex: () => void;
  onEditProperty: (column: any) => void;
  setFilters: (v: any) => void;
};

function ColumnPopup({ target, column, close, setPropertyIndex, onEditProperty, setFilters }: Props) {
  return (
    <>
      <div
        style={{
          zIndex: 1000,
          left: target?.offsetLeft + 4,
        }}
        className="flex bg-white  border slideInDown  p-3 rounded shadow-md transition duration-500 ease-in-out   absolute flex-col w-[240px] h-fit top-[42px]"
      >
        <ColumnPopupContent setFilters={setFilters} column={column} setPropertyIndex={setPropertyIndex} onEditProperty={onEditProperty} />
      </div>
      <div onClick={close} style={{ background: "transparent" }} className="modal-overlay"></div>
    </>
  );
}

export default ColumnPopup;
