import { downloadFile } from "@/actions/file-utils";
import React from "react";
import Button from "../Elements/Button/Button";

type Props = {
  file: any;
  close: () => void;
};

function FileViewerModal({ file, close }: Props) {
  return (
    <>
      <div
        className="modal-center modal-center-large  h-[90vh] flex flex-row "
        style={{ zIndex: 9999997, width: "fit-content" }}
      >
        <TypeSwitcher file={file} />
      </div>
      <div
        className="absolute bottom-[20px] flex flex-row justify-center w-full text-primary-500 text-lg font-medium
      "
      >
        {file.name}{" "}
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  );
}

const TypeSwitcher = ({ file }: { file: any }) => {
  switch (file.cat) {
    case "image":
      return <img src={file.url} alt={file.name} className=" object-cover" />;
    case "video":
      return (
        <video src={file.url} controls className="w-full h-full object-cover" />
      );
    case "audio":
      return (
        <audio src={file.url} controls className="w-full h-full object-cover" />
      );
    case "other":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="text-lg font-medium text-gray-900">
            {file.name} is not supported
          </p>

          <Button
            onClick={() => window.open(file.url, "_blank")}
            className="mt-2"
          >
            Download to view
          </Button>
        </div>
      );
    default:
      null;
  }
};

export default FileViewerModal;
