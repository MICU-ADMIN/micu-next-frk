import React from "react";
import ClickMenu from "@/app/components/Modals/ClickMenu/ClickMenu";
import { SidebarOpenIcon } from "lucide-react";
import { Trash2 } from "react-feather";

type Props = {
  clickMenuOptions: any;
  deleteRow: () => void;
  setShowForm: (v: boolean) => void;
  close: () => void;
};

function TableClickMenu({ clickMenuOptions, setShowForm, deleteRow, close }: Props) {
  return (
    <ClickMenu
      items={[
        {
          label: "View",
          icon: <SidebarOpenIcon className="w-[14px]" />,
          onClick: () => {
            setShowForm(true);
            close();
          },
        },

        {
          label: "Delete Row",
          type: "delete",
          icon: <Trash2 className="w-[14px] text-red-500" />,
          onClick: () => {
            deleteRow();
          },
        },
        {
          label: "divider",
          divider: true,
        },
      ]}
      position={clickMenuOptions.position}
      title={""}
      bottomContent={`<p> Created by ${clickMenuOptions?.row?.userId} </p> <p> Last updated ${
        clickMenuOptions?.row?.updatedAt ? clickMenuOptions.row.updatedAt.toDateString() : ""
      } </p>`}
    />
  );
}

export default TableClickMenu;
