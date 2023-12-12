import cx from "classnames";
import React from "react";
import { Header } from "./Header";
import { currentPageType } from "@/app/dashboard/site/[...slug]/SiteEditorPage";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
import PageSidebar from "./Sidebar/PageSidebar";
import { Site, SitePage } from "@/_types/dbTypes";

const SectionSidebar = dynamic(() => import("./Sidebar/SectionSidebar"), { loading: () => <Spinner /> });
const Toolbox = dynamic(() => import("./Toolbox"), { ssr: false, loading: () => <Spinner /> });

export const Viewport: React.FC<{
  children?: React.ReactNode;
  site: any;
  save?: () => void;
  readOnly: boolean;
  preview: () => void;
  setEditSectionIndex?: (index: number) => void;
  editSectionIndex?: number;
  setNewPage: (id: number) => void;
  editStates?: any[];
  pages: SitePage[];
  updateSiteData?: (data: any) => void;
  currentPage?: currentPageType;
  undo?: (index: number) => void;
  onDataChange?: (data: any) => void;
}> = ({
  children,
  site,
  save,
  readOnly,
  preview,
  editSectionIndex,
  setEditSectionIndex,
  currentPage,
  pages,
  editStates = [],
  setNewPage,
  undo,
  onDataChange,
  updateSiteData,
}) => {
  const [showPageSidebar, setShowPageSidebar] = React.useState(false);

  return (
    <div className="viewport">
      <div className={cx(["fixed flex h-full w-full flex-row overflow-hidden"])}>
        <Toolbox />
        <div className="page-container flex h-full flex-1 flex-col">
          <Header
            pages={pages || []}
            save={save}
            preview={preview}
            readOnly={readOnly}
            undo={undo}
            editStates={editStates}
            currentPage={currentPage}
            setNewPage={setNewPage}
            setShowPageSidebar={setShowPageSidebar}
          />
          <div
            className={cx([
              "craftjs-renderer h-full w-full flex-1 overflow-auto pb-8 transition",
              {
                "bg-renderer-gray": false,
              },
            ])}
          >
            <div className="relative flex flex-col items-center ">{children}</div>
            <div className={"text-light-gray-2 flex w-full items-center justify-center pt-6 text-xs"}></div>
          </div>
        </div>
        {editSectionIndex != -1 && (
          <SectionSidebar
            setEditSectionIndex={setEditSectionIndex}
            onDataChange={onDataChange}
            currentPage={currentPage}
            sidebarIndex={editSectionIndex}
            siteData={site?.siteData || {}}
          />
        )}

        {showPageSidebar && (
          <PageSidebar
            setShowPageSidebar={setShowPageSidebar}
            currentPage={currentPage}
            onDataChange={updateSiteData}
            sidebarIndex={undefined}
            siteData={site?.siteData || {}}
          />
        )}
      </div>
    </div>
  );
};
