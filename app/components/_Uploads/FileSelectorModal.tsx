import React from "react";
import UploadPageComponentView from "./UploadPageComponents";
import FileSidebar from "./FileSidebar";
import { File } from "@/_types/dbTypes";

type Props = {
  close: () => void;
  allowMultiple: boolean;
  allowedTypes:
    | ["videos", "images", "audio", "other"]
    | ["videos", "images", "audio"]
    | ["videos", "images", "other"]
    | ["videos", "audio", "other"]
    | ["images", "audio", "other"]
    | ["videos", "images"]
    | ["videos", "audio"]
    | ["videos", "other"]
    | ["images", "audio"]
    | ["images", "other"]
    | ["audio", "other"]
    | ["videos"]
    | ["images"]
    | ["audio"]
    | ["other"];
  onFileSelect?: (file: any) => void;
  onFilesSelect?: (files: any[]) => void;
};

const pUrl = "https://mosqueicu-public.s3.eu-west-2.amazonaws.com/";

function FileSelectorModal({ close, allowMultiple, allowedTypes, onFileSelect, onFilesSelect }: Props) {
  const [showUploader, setShowUploader] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState("Recently Added");
  const [uploads, setUploads] = React.useState({ images: [], videos: [], audio: [], other: [] });

  return (
    <>
      <div style={{ minWidth: "95vw", zIndex: 999997 }} className="modal-center modal-center-large  h-[95vh] flex flex-row p-5">
        <div className=" hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex fixed top-3 right-10 w-fit" style={{ zIndex: 999 }}>
          <span className="ml-0.5 cursor-pointer rounded-md p-1.5 hover:bg-white hover:shadow-sm " onClick={() => setShowUploader(true)}>
            Upload
          </span>
        </div>
        <UploadPageComponentView
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          type={"Uploads"}
          showUploader={showUploader}
          setShowUploader={setShowUploader}
          uploads={uploads}
          setUploads={setUploads}
          options={{}}
          setOptions={() => {}}
          currentTab={currentTab}
          selection
          allowedTypes={allowedTypes}
          selectionProps={{
            onFileSelect: (file: File & { url: string }) => {
              console.log(pUrl + file.key);
              if (!onFileSelect) return;
              file.url = encodeURI(pUrl + file.key);
              onFileSelect(file);
            },
            onFilesSelect: (files: File & { url: string }[]) => {
              if (!onFilesSelect) return;
              files.forEach((f) => {
                f.url = encodeURI(pUrl + f.key);
              });
              onFilesSelect(files);
            },
            allowMultiple: allowMultiple,
          }}
        />
        {currentFile && (
          <div className="min-w-[500px] slideLeft">
            <FileSidebar currentFile={currentFile} setCurrentFile={setCurrentFile} hash={""} pathname={""} setUploads={setUploads} setOptions={() => {}} />
          </div>
        )}
      </div>
      <div style={{ zIndex: 999996 }} onClick={close} className="modal-overlay"></div>
    </>
  );
}

export default FileSelectorModal;
