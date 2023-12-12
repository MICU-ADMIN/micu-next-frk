"use client";
import React from "react";
import { useState } from "react";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { Toaster } from "react-hot-toast";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import UploadPageCell from "@/app/components/_Uploads/UploadPageCell";
import UploadMobileSearch from "@/app/components/_Uploads/UploadMobileSearch";
import FileSidebar from "@/app/components/_Uploads/FileSidebar";

function UploadPageLayout(props: {
  nav: {
    default:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | React.PromiseLikeOfReactNode
      | null
      | undefined;
  };
  mainLayout:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  sideBar:
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
    <>
      <div
        className="flex h-full"
        style={{
          marginTop: "-5rem",
        }}
      >
        {/* Mobile menu */}
        {/* {props.nav.mobile} */}

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {props.nav.default}

          <div className="flex flex-1 items-stretch overflow-hidden slideLeft">
            {/* Main content */}
            {props.mainLayout}
            {/* Details sidebar */}
            {props.sideBar}
          </div>
        </div>
      </div>
    </>
  );
}

const UploadPage = () => {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [currentTab, setCurrentTab] = useState("Recently Added");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState();
  // const { pathname, search, g } = useLocation();

  let search = "";
  let pathname = "";
  let hash = "";

  const [uploads, setUploads] = useState({
    images: [],
    videos: [],
    audio: [],
    other: [],
  });
  const [options, setOptions] = React.useState({
    page: 1,
    total: 0,
  });

  return (
    <>
      {/* <SideBarLayout
        // sideBar={<PrayersSidebar />}
        currentEstablishment={currentEstablishment}
        loading={Loading}
      > */}

      <Nav currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />

      <Toaster />
      <UploadPageLayout
        nav={
          search != "?true" && {
            mobile: <UploadMobileSearch mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />,
            default:
              // header comment at bottom of file
              null,
          }
        }
        mainLayout={
          hash == ("#Photos" || "#Videos" || "#Audio" || "#Other") ? (
            <main className=" overflow-y-auto">
              <UploadPageCell
                setCurrentFile={setCurrentFile}
                currentFile={currentFile}
                title={hash.replace("#", "")}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                uploads={uploads}
                setUploads={setUploads}
                options={options}
                setOptions={setOptions}
              />
              )
            </main>
          ) : (
            <main className="  flex-1 overflow-y-auto">
              {["Photos"].map((value, index, array) => {
                return (
                  <>
                    <UploadPageCell
                      setCurrentFile={setCurrentFile}
                      currentFile={currentFile}
                      key={index}
                      title={"Uploads"}
                      currentTab={currentTab}
                      setCurrentTab={setCurrentTab}
                      uploads={uploads}
                      setUploads={setUploads}
                      options={options}
                      setOptions={setOptions}
                    />
                  </>
                );
              })}
            </main>
          )
        }
        sideBar={
          (search == "?true" || currentFile) && (
            <FileSidebar
              currentFile={currentFile}
              setCurrentFile={setCurrentFile}
              hash={hash}
              pathname={pathname}
              setUploads={setUploads}
              setOptions={setOptions}
            />
          )
        }
      ></UploadPageLayout>
      {/* </SideBarLayout> */}
    </>
  );
};

export default UploadPage;
