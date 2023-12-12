import React from "react";
import Button from "../Elements/Button/Button";
import { formatPrivateFileKey } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";

type Props = {
  file: any;
  close: () => void;
};

const publicUrl = "https://mosqueicu-public.s3.eu-west-2.amazonaws.com/";

function FileViewerModal({ file, close }: Props) {
  return (
    <>
      <div className="modal-center modal-center-large  h-[90vh] flex flex-row " style={{ zIndex: 9999997, width: "fit-content" }}>
        <TypeSwitcher file={file} />
      </div>
      <div
        className="absolute bottom-[20px] flex flex-row justify-center w-full text-indigo-500 text-lg font-medium
      "
      >
        {file.name}{" "}
      </div>
      <div style={{ zIndex: 9999996 }} onClick={close} className="modal-overlay"></div>
    </>
  );
}

const TypeSwitcher = ({ file }: { file: any }) => {
  const [fileErr, setFIleErr] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  React.useEffect(() => {
    if (file.cat === "other") {
      checkFile();
    }
  }, []);

  const checkFile = async () => {
    if (file.cat === "other") {
      const req = await requestHandler({ type: "get", route: "upload?key=" + file.key, shouldCache: true, returnCache: true });
      if (req?.errors) return;
      if (req?.public) setIsPublic(true);
    }
  };

  switch (file.cat) {
    case "image":
      return (
        <img
          src={!fileErr ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key)}
          alt={file.name}
          className=" object-cover"
          onError={() => setFIleErr(true)}
        />
      );
    case "video":
      return (
        <video
          src={!fileErr ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key)}
          controls
          className="w-full h-full object-cover"
          onError={() => setFIleErr(true)}
        />
      );
    case "audio":
      return (
        <audio
          src={!fileErr ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key)}
          controls
          className="w-full h-full object-cover"
          onError={() => setFIleErr(true)}
        />
      );
    case "other":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="text-lg font-medium text-gray-900">{file.name} is not supported</p>

          <Button onClick={() => window.open(!isPublic ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key), "_blank")} className="mt-2">
            Download to view
          </Button>
        </div>
      );
    default:
      null;
  }
};

export default FileViewerModal;
