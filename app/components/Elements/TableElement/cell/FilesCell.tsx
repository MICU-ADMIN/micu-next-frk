import React from "react";
import Button from "../../Button/Button";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import Badge from "../../Badge/Badge";
import Spinner from "../../Spinner/Spinner";
import { formatPrivateFileKey } from "@/app/_helpers/web/formatters";
const FileSelectorModal = dynamic(() => import("@/app/components/_Uploads/FileSelectorModal"), { loading: () => <Spinner /> });

const publicUrl = "https://mosqueicu-public.s3.eu-west-2.amazonaws.com/";

function FilesCell({ row, column, onChangeRow, isSelected, setOpenFile }: any) {
  const [showFileSelector, setShowFileSelector] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  return (
    <>
      <div style={{ maxWidth: column.width || "auto" }} className="w-full h-full  flex flex-row flex-wrap relative">
        {isSelected && (
          <Button
            className="ml-2  w-fit absolute fadeIn flex flex-row items-center right-0 "
            variant="secondary"
            size="sm"
            onClick={() => {
              setShowFileSelector(true);
            }}
          >
            {" "}
            <Plus size={15} />
            Add Files
          </Button>
        )}

        {true &&
          row[column.name] &&
          row[column.name].map((file: any) => {
            return file.cat === "image" ? (
              <img
                key={file.key}
                src={!imgError ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key)}
                alt={file.name}
                onError={() => !imgError && setImgError(true)}
                loading="lazy"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFile && setOpenFile(file);
                }}
                className="w-[50px] h-[50px] object-cover rounded shadow-md cursor-pointer mr-1 mb-1 hover:shadow-lg transition-all duration-200"
              />
            ) : (
              <Badge
                key={file.key}
                color="indigo"
                style={{ maxWidth: column.width || "auto" }}
                className="flex items-center h-fit cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFile && setOpenFile(file);
                }}
              >
                {file.name}
              </Badge>
            );
          })}
      </div>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple={true}
          allowedTypes={["images", "videos", "audio", "other"]}
          close={() => setShowFileSelector(false)}
          onFilesSelect={(files) => {
            const curFiles = [];
            const r = { ...row };

            for (const file of files) {
              if (file.cat === "image" && !r.thumbnail) r.thumbnail = file.key;
              curFiles.push({ key: file.key, cat: file.cat, name: file.name, id: file.id });
            }

            onChangeRow && onChangeRow({ ...r, [column.name]: [...(r[column.name] || []), ...curFiles] });
            setShowFileSelector(false);
          }}
        />
      )}
    </>
  );
}

export default FilesCell;
