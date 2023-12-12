import React from "react";
import { PlusCircle } from "react-feather";
import Spinner from "../../Spinner/Spinner";

function AddNewRowCell({ columns, onAddRow, setModel }: any) {
  const showAddSpinner = React.useRef(false);
  return (
    <td
      colSpan={columns.length}
      onClick={() => {
        showAddSpinner.current = true;
        onAddRow({}, (message?: any) => {
          showAddSpinner.current = false;
          if (message.success) {
            const date = new Date();
            setModel((prev: any) => [...prev, { id: message.id, createdAt: date, updatedAt: date }]);
          }
        });
      }}
    >
      <button className=" px-2 py-2 ml-2" style={{ display: showAddSpinner.current ? "none" : "initial" }}>
        <PlusCircle className="mr-1 w-4 h-4 inline-block" />
        Add row
      </button>
      {showAddSpinner.current && (
        <div className="px-2 py-1 ml-2">
          <Spinner />
        </div>
      )}
    </td>
  );
}

export default AddNewRowCell;
