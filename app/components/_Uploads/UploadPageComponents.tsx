import React, { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Button from "@/app/components/Elements/Button/Button";
import { getFiles, getRecentFiles, upload } from "@/actions/file-utils";
import { errorMessage, niceBytes } from "@/app/_helpers/web/formatters";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Loader from "../Elements/Loader/Loader";
import Spinner from "../Elements/Spinner/Spinner";
import { CheckIcon } from "lucide-react";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  setCurrentFile: (arg0: any) => void;
  showUploader: boolean;
  setShowUploader: (arg0: boolean) => void;
  uploads: any;
  setUploads: (arg0: any) => void;
  options: any;
  setOptions: (arg0: any) => void;
  selectionProps;
  currentTab: string;
  allowedTypes?: string[];
  selection?: boolean;
};

const tabs = [
  { name: "Recently Added", href: "#" },
  { name: "Recently Viewed", href: "#" },
  { name: "Favorited", href: "#" },
];

export const UploadPageComponentView = ({
  setCurrentFile,
  showUploader,
  setShowUploader,
  uploads,
  setUploads,
  selection,
  options,
  setOptions,
  currentTab,
  selectionProps,
  allowedTypes = ["images", "videos", "audio", "other"],
}: Props) => {
  const { currentEstablishment } = useEstablishment();
  const [files, setFiles] = useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastIds, setLastIds] = useState({ "Recently Added": null, "Recently Viewed": null, Favorited: null });
  const [seletedFiles, setSelectedFiles] = React.useState<any[]>([]);
  const [selectedIds = [], setSelectedIds] = React.useState<any[]>([]);

  const onSetUploads = (uploads: any, upload = false) => {
    const uploadTypes = {
      images: [],
      videos: [],
      audio: [],
      other: [],
    } as any;

    let count = 0;

    setLastIds((prev) => ({ ...prev, [currentTab]: uploads[uploads.length - 1]?.id }));

    for (let file of uploads) {
      count++;
      if (file.type.startsWith("image")) {
        file.cat = "image";
        uploadTypes.images.push(file);
      } else if (file.type.startsWith("video")) {
        file.cat = "video";
        uploadTypes.videos.push(file);
      } else if (file.type.startsWith("audio")) {
        file.cat = "audio";
        uploadTypes.audio.push(file);
      } else {
        file.cat = "other";
        uploadTypes.other.push(file);
      }
    }

    if (upload) {
      setUploads((prev: { images: any; videos: any; audio: any; other: any }) => ({
        images: [...uploadTypes.images, ...prev.images],
        videos: [...uploadTypes.videos, ...prev.videos],
        audio: [...uploadTypes.audio, ...prev.audio],
        other: [...uploadTypes.other, ...prev.other],
      }));
    } else {
      setUploads((prev: { images: any; videos: any; audio: any; other: any }) => ({
        images: [...prev.images, ...uploadTypes.images],
        videos: [...prev.videos, ...uploadTypes.videos],
        audio: [...prev.audio, ...uploadTypes.audio],
        other: [...prev.other, ...uploadTypes.other],
      }));
    }

    // setCurrentLength((prev) => prev + count);
  };

  const fetchUploads = async () => {
    setLoading(true);
    let response;

    if (currentTab === "Recently Added") response = await getFiles(options.page, files.length > 0 ? files[files.length - 1].id : lastIds[currentTab] || 0);
    else if (currentTab === "Recently Viewed")
      response = await getRecentFiles(options.page, files.length > 0 ? files[files.length - 1].id : lastIds[currentTab] || 0);
    else response = await getFiles(options.page, files.length > 0 ? files[files.length - 1].id : lastIds[currentTab] || 0);

    setLoading(false);

    onSetUploads(response || []);
    // setOptions({ ...options, total: response.total });
  };

  const onUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    try {
      const result = await upload(files);
      setUploading(false);
      onSetUploads(result, true);
      setShowUploader(false);
      setFiles([]);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (uploads.length > 0) setUploads({} as any);
    fetchUploads();
  }, [currentTab]);

  const onSelectFiles = () => {
    selectionProps?.allowMultiple ? selectionProps.onFilesSelect(seletedFiles) : selectionProps.onFileSelect(seletedFiles[0]);
  };
  const pUrl = "https://mosqueicu-public.s3.eu-west-2.amazonaws.com/";

  if (!currentEstablishment) return null;

  return (
    <>
      {Loading && <Loader />}
      {selection && seletedFiles.length !== 0 && (
        <Button onClick={onSelectFiles} className="absolute top-3 right-[130px] z-50">
          Confirm Selection
        </Button>
      )}
      <div>
        {["images", "videos", "audio", "other"].map((type) => (
          <>
            {allowedTypes.includes(type) && (
              <div className="mb-3">
                <h2 className="mb-2">{type}</h2>
                <ul
                  // role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6"
                >
                  {uploads[type].length !== 0 ? (
                    uploads[type].map((upload) => (
                      <div
                        className="relative"
                        onClick={() => {
                          setCurrentFile(upload);
                          if (selection && upload.public) {
                            selectionProps?.allowMultiple ? setSelectedFiles((prev) => [...prev, upload]) : setSelectedFiles([upload]);
                            selectionProps?.allowMultiple ? setSelectedIds((prev) => [...prev, upload.id]) : setSelectedIds([upload.id]);
                          } else if (selection && !upload.public) {
                            errorMessage("Only public files can be added to the page. Please make the file public and try again.");
                          }
                        }}
                      >
                        <UploadPageEachLayout name={upload.originalname} key={upload.key} source={encodeURI(pUrl + upload.key)} current={false} file={upload} />
                        {selection && selectedIds.includes(upload.id) && (
                          <CheckIcon className="absolute top-2 right-2 text-green-500 bg-white rounded-full p-1 h-8 w-8 border-2 border-green-500" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No {type} found</div>
                  )}
                </ul>
              </div>
            )}
          </>
        ))}

        <hr className=" mb-2 mt-2" />
        {/* <p>
          Total files: {currentLength} / {options.total}
        </p> */}
      </div>

      {showUploader && (
        <>
          <div className="sidebar-right relative  p-3 hide-scrollbar hide-scroll slideLeft">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={5}
              credits={false}
              labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
            />
            <Button disabled={uploading} onClick={onUpload} className="absolute bottom-4">
              <span>Upload</span>
            </Button>
          </div>
          <div onClick={() => setShowUploader(false)} className="sidebar-overlay"></div>
        </>
      )}

      {uploading && (
        <div
          style={{ zIndex: 999999 }}
          className="slideInLeft fixed left-[50px] top-5 rounded-lg  bg-white text-indigo-500
        p-4 font-semibold shadow-md"
        >
          <p>Uploading</p> <Spinner />
          <p>{files.map((file) => file.filename).join(", ")}</p>
        </div>
      )}
    </>
  );
};

type UploadPageCellEachProps = {
  current: boolean;
  name: string;
  file: any;
  key: string;
  source: string;
};

export function UploadPageEachLayout({ current, name, file, key, source }: UploadPageCellEachProps) {
  return (
    <li key={key} className="relative">
      <div
        className={classNames(
          current
            ? "ring-2 ring-indigo-500 ring-offset-2"
            : "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
          "group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100"
        )}
      >
        {file.cat === "image" ? (
          <img src={source} alt="" loading="lazy" className={classNames(current ? "" : "group-hover:opacity-75", "pointer-events-none object-cover")} />
        ) : (
          <div className={classNames(current ? "" : "group-hover:opacity-75", "pointer-events-none object-cover")}>
            <DocumentIcon className=" m-auto h-full text-gray-300 " aria-hidden="true" />
          </div>
        )}

        <p className=" absolute bottom-[10px] left-0 flex items-center justify-center rounded bg-indigo-200 p-1 text-sm font-medium text-indigo-500">
          {file.name} | {niceBytes(file.size)}
        </p>

        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {name}</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{name}</p>
      {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">
        {file.size}
      </p> */}
    </li>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default UploadPageComponentView;
