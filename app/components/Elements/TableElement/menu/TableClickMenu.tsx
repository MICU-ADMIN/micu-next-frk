import React from "react";
import ClickMenu from "@/app/components/Modals/ClickMenu/ClickMenu";
import { SidebarOpenIcon } from "lucide-react";
import { Copy, Trash2 } from "react-feather";
import { LinkIcon } from "@heroicons/react/24/outline";

type Props = {
  clickMenuOptions: any;
  deleteRow: () => void;
  setShowForm: (v: boolean) => void;
  close: () => void;
  users: any;
  addRow: () => void;
  publicEstablishmentId: string;
};

function TableClickMenu({ clickMenuOptions, addRow, setShowForm, deleteRow, close, publicEstablishmentId }: Props) {
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
          label: "Delete",
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
        {
          label: "View in new tab",
          icon: <LinkIcon className="w-[14px]" />,
          onClick: () => {
            window.open(`/dashboard/record-item/${publicEstablishmentId}?id=${clickMenuOptions.row.id}`, "_blank");
          },
        },
        {
          label: "Copy",
          icon: <Copy className="w-[14px]" />,
          onClick: () => {
            addRow();
          },
        },
      ]}
      position={clickMenuOptions.position}
      title={""}
      bottomContent={`<p> Last updated ${clickMenuOptions?.row?.updatedAt ? clickMenuOptions.row.updatedAt.toDateString() : ""} </p>`}
    />
  );
}

export default TableClickMenu;
