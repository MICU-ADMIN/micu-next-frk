import React from "react";
import TableElement from "../../Elements/TableElement/TableElement";

type Props = {
  records: any;
  filterData: any;
  fetchNextRecords: () => void;
  addAction: (v: boolean) => void;
  setClickMenuOptions: (v: any) => void;
  additionalColumns?: any;
};

function RecordViewerTable({ records, filterData, fetchNextRecords, addAction, setClickMenuOptions, additionalColumns }: Props) {
  return (
    <>
      {(filterData || records).length === 0 ? (
        <div className="h-[50vh] flex items-center justify-center ">No Records Found</div>
      ) : (
        <TableElement
          field={{
            height: "80vh",
            style: { marginLeft: 18, marginRight: 18 },
            parentRender: true,
            contextMenu: true,
            editAction: true,
            cellSelection: true,
            customContextMenu: (e: { clientX: any; clientY: any }, row: any) => setClickMenuOptions({ position: { x: e.clientX, y: e.clientY }, row }),
            columns: [
              {
                type: "input",
                maxLength: 50,
                name: "title",
                placeholder: "Title",
                placeholderView: true,
                width: "150px",
                transform: (row: any) => row.label || row.title,
              },
              ...(additionalColumns || []),
              {
                type: "userId",
                name: "userId",
                placeholder: "Created By",
                width: "150px",
              },
              {
                type: "view",
                name: "createdAt",
                transform: (row: any) => new Date(row.createdAt).toString().split(" ").slice(0, 5).join(" "),
                placeholder: "Created At",
                width: "150px",
              },
              {
                type: "view",
                name: "updatedAt",
                transform: (row: any) => new Date(row.createdAt).toString().split(" ").slice(0, 5).join(" "),
                placeholder: "Updated At",
                width: "150px",
              },
            ],
          }}
          onAddRow={(_row: any, cb) => {
            addAction(true);
            cb();
          }}
          fetchHandler={(lastId: number, cb: (arg0: any) => void, sorts?: any, filters?: any) => {
            fetchNextRecords();
          }}
          data={filterData || records}
        />
      )}
    </>
  );
}

export default RecordViewerTable;
