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

    console.log("curFiles", curFiles);
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
                <div
                  onClick={() => window.open(file.url, "_blank")}
                  className="flex flex-row h-fit bg-white p-2 m-2 border rounded-md shadow-sm border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  key={file?.url}
                >
                  {file.cat === "image" ? (
                    <img
                      src={file.url}
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded shadow-md cursor-pointer mr-1 mb-1 hover:shadow-lg transition-all duration-200"
                    />
                  ) : (
                    <FileIcon size={50} className="text-gray-400 mr-1" />
                  )}
                  <span className="text-[13px] ">{file?.name}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <span className="text-[13px] text-gray-400">No files attached to this row</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableFiles;
