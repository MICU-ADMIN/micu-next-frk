import React from "react";
import Button from "../../Elements/Button/Button";

type DeleteModalProps = {
  close: () => void;
  deleteText: string;
  deleteAction: () => void;
};

function DeleteModal({ close, deleteText, deleteAction }: DeleteModalProps) {
  return (
    <>
      <div
        style={{ zIndex: 999999 }}
        className="bg-white fadeIn rounded-md p-5 w-[400px] h-[200px] flex flex-col justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 border border-gray-500"
      >
        <p className="text-lg  text-center text-semibold">{deleteText}</p>
        <div className="flex mt-5 border-t pt-5 ">
          <Button onClick={deleteAction} style={{ background: "red" }}>
            <span className="bold">Delete</span>
          </Button>
          <Button onClick={close} className=" rounded-md ml-2" variant="secondary">
            Cancel
          </Button>
        </div>
      </div>

      <div style={{ zIndex: 999998 }} className="modal-overlay backdrop-filter backdrop-blur-sm fixed inset-0" onClick={close}></div>
    </>
  );
}

export default DeleteModal;
