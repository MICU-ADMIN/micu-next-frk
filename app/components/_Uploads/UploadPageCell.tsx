import React from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Spinner from "../Elements/Spinner/Spinner";

const UploadPageComponentView = dynamic(() => import("./UploadPageComponents"), { ssr: false, loading: () => <Spinner /> });

const tabs = [
  { name: "Recently Added", href: "#" },
  { name: "Recently Viewed", href: "#" },
  { name: "Favorited", href: "#" },
];

type Props = {
  title: string;
  currentFile: any;
  setCurrentFile: (arg0: any) => void;
  currentTab: string;
  setCurrentTab: (arg0: string) => void;
  uploads: any;
  setUploads: (arg0: any) => void;
  options: any;
  setOptions: (arg0: any) => void;
};

function UploadPageCell({ title, currentFile, setCurrentFile, currentTab, setCurrentTab, uploads, setUploads, options, setOptions }: Props) {
  const [showUploader, setShowUploader] = React.useState(false);

  return (
    <UploadPageCellLayout currentTab={currentTab} setCurrentTab={setCurrentTab} setShowUploader={setShowUploader}>
      <UploadPageComponentView
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        type={title}
        showUploader={showUploader}
        setShowUploader={setShowUploader}
        uploads={uploads}
        setUploads={setUploads}
        options={options}
        setOptions={setOptions}
        currentTab={currentTab}
      />
    </UploadPageCellLayout>
  );
}

export default UploadPageCell;

function UploadPageCellLayout(props: {
  setCurrentTab: (arg0: string) => void;
  currentTab: string;
  setShowUploader: (arg0: boolean) => void;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  return (
    <div className="mx-auto h-fit min-h-screen rounded bg-white px-4 pt-2 shadow-lg sm:px-6 lg:px-8">
      <div className="flex">
        <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
          <button
            type="button"
            className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <Bars4Icon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Use list view</span>
          </button>
          <button
            type="button"
            className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {/* <Squares2X2IconMini className="h-5 w-5" aria-hidden="true" /> */}
            <span className="sr-only">Use grid view</span>
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="mt-3 sm:mt-2">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            defaultValue="Recently Viewed"
          >
            <option>Recently Added</option>

            <option>Recently Viewed</option>
            <option>Favorited</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center border-b border-gray-200">
            <nav className="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <div
                  key={tab.name}
                  onClick={() => props.setCurrentTab(tab.name)}
                  aria-current={props.currentTab === tab.name ? "page" : undefined}
                  className={classNames(
                    props.currentTab === tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                  )}
                >
                  {tab.name}
                </div>
              ))}
            </nav>
            <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use list view</span>
              </button>
              <span className="ml-0.5 cursor-pointer rounded-md p-1.5 hover:bg-white hover:shadow-sm " onClick={() => props.setShowUploader(true)}>
                Upload
              </span>

              {/* <button
                type="button"
                className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Use grid view</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Recently viewed
        </h2>

        {props.children}

        {/* <UploadPageCell  /> */}
      </section>
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
