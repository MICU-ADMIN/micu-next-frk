"use client";

import React from "react";
import TableFormContent from "./TableFormContent";

type Props = {
  close: () => void;
  row: any;
  onValChange: (row: any, column: any, err: any) => void;
  columns: any;
  publicEstablishmentId: string;
  field: any;
  setOpenFile: (v: any) => void;
  users: any;
};

function TableForm({ close, row, onValChange, columns, field, publicEstablishmentId, users, setOpenFile }: Props) {
  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className="flex bg-white slideLeft  h-screen border  p-3 rounded shadow-md  transition duration-500 ease-in-out min-w-[500px] w-[70vw] absolute top-0 right-0 flex-col overflow-y-auto"
      >
        <TableFormContent
          publicEstablishmentId={publicEstablishmentId}
          row={row}
          onValChange={onValChange}
          columns={[...columns]}
          field={field}
          setOpenFile={setOpenFile}
          users={users}
        />
      </div>
      <div onClick={close} style={{ background: "transparent" }} className="modal-overlay"></div>
    </>
  );
}

export default TableForm;
