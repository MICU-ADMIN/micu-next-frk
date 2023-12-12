import React, { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import InfoCardModal from "./InfoCardModal/InfoCardModal";
import { ScholarNodeData } from "./IsnadViewer";

function CustomNode({ data }: { data: ScholarNodeData }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="px-2 py-1 shadow-md rounded-md bg-white border-2 border-stone-300 relative">
        <div className="flex">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">{data.icon}</div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.name}</div>
            <div className="text-gray-500">{data?.designation}</div>
          </div>
        </div>
        <Handle type="target" position={Position.Top} isConnectable={false} className="w-16 !bg-blue-500" />
        <Handle type="source" position={Position.Bottom} isConnectable={false} className="w-16 !bg-blue-500" />
        <MagnifyingGlassCircleIcon
          className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 absolute  right-2 bottom-1 hover:scale-110 transform transition-all hover:rotate-12 duration-300"
          onClick={openModal}
        />
      </div>
      {isOpen && <InfoCardModal data={data} closeModal={closeModal} />}
    </>
  );
}

export default memo(CustomNode);
