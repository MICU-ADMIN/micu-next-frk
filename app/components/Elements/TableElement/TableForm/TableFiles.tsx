import { formatPrivateFileKey } from "@/app/_helpers/web/formatters";
import { FileIcon } from "lucide-react";
import React from "react";

type Props = {
  row: any;
  columns: any;
};

function TableFiles({ row, columns }: Props) {
  const [files, setFiles] = React.useState([]) as any;

  React.useEffect(() => {
    const curFiles = [] as any[];
    columns.forEach((column: any) => {
      if (column.type === "file" && row[column.name] && Array.isArray(row[column.name])) {
        curFiles.push({ name: column.placeholder, files: row[column.name] });
      }
    });

    if (curFiles.length > 0) {
      setFiles(curFiles);
    }
  }, []);
  return (
    <div className="flex flex-row min-h-[350px] w-full">
      <div className="flex flex-row  flex-wrap w-full">
        {files.length !== 0 ? (
          files.map((f: any) => (
            <div>
              <p>
                <span className="text-[14px] ml-2 text-gray-400">{f.name}</span>
              </p>
              {f.files.map((file: any) => (
                <File file={file} />
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <span className="text-[13px] text-gray-400">No files attached to this item</span>
          </div>
        )}
      </div>
    </div>
  );
}
const publicUrl = "https://mosqueicu-public.s3.eu-west-2.amazonaws.com/";

const File = ({ file }: any) => {
  const [error, setError] = React.useState(false);

  return (
    <div
      onClick={() => window.open(!error ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key), "_blank")}
      className="flex flex-col h-fit bg-white p-2 m-2 border rounded-md shadow-sm border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
      key={file?.url}
    >
      {file.cat === "image" ? (
        <img
          src={!error ? publicUrl + file.key : "/api/upload/" + formatPrivateFileKey(file.key)}
          alt=""
          className="w-[75px] h-[50px] object-cover rounded shadow-md cursor-pointer  mb-1 hover:shadow-lg transition-all duration-200"
          onError={() => !error && setError(true)}
          loading="lazy"
        />
      ) : (
        <FileIcon size={50} className="text-gray-400 w-[75px] " />
      )}
      <span className="text-[13px] ">{file?.name}</span>
    </div>
  );
};

export default TableFiles;
