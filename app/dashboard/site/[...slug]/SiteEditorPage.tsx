"use client";
import { Site, SitePage } from "@/_types/dbTypes";
import { handleSuccess, handleErrors, parseDataIfString } from "@/app/_helpers/web/formatters";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { addToCache, requestHandler } from "@/app/_helpers/web/requestHandler";
import Loader from "@/app/components/Elements/Loader/Loader";
import Area from "@/app/components/_Sites/SiteEditor/area";
import { Viewport } from "@/app/components/_Sites/SiteEditor/editor/Viewport";
import Nav from "@/app/components/_Sites/SiteEditor/nav";
import dynamic from "next/dynamic";

import React from "react";
// import LZString from 'lz-string'

const SectionMenu = dynamic(() => import("@/app/components/_Sites/SiteEditor/sections/SectionMenu"), { ssr: false });

export type currentPageType = {
  id: number;
  label?: string;
  description?: string;
  content: any;
} | null;

function SiteEditorPage({ currentSite, isPublic = false }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [siteName, setSiteName] = React.useState("");
  const [site, setSite] = React.useState<Site | null>(null);
  const [pages, setPages] = React.useState<SitePage[]>([]);
  const [editSectionIndex, setEditSectionIndex] = React.useState(-1);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(true);
  const [editStates, setEditStates] = React.useState([]) as any;
  const [currentPage, setCurrentPage] = React.useState<currentPageType>(null);
  const [diableEditStates, setDisableEditStates] = React.useState(false);
  const [showSectionMenu, setShowSectionMenu] = React.useState(false);

  React.useEffect(() => {
    const name = window.location.href.split("?label=")[1];
    setSiteName(name);
    if (currentSite) {
      setSitePage(currentSite);
    } else {
      setLoading(true);
      requestHandler({ type: "get", route: `sites/single?siteName=` + name, shouldCache: true, returnCache: true }).then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
        if (!res?.errors) {
          setSitePage(res);
          addToCache("sitePage/single?id=" + res.SitePages[0].id, res.SitePages[0]);
        }
      });
    }

    requestHandler({ type: "get", route: `sitePage?siteName=` + name, shouldCache: true, returnCache: true }).then((res) => {
      if (!res?.errors) {
        setPages(res);
      }
    });
  }, []);

  const undoTimout = React.useRef<any>(null);

  React.useEffect(() => {
    if (currentPage?.content && !diableEditStates) {
      if (undoTimout.current) clearTimeout(undoTimout.current);
      undoTimout.current = setTimeout(() => {
        if (JSON.stringify(currentPage.content) === JSON.stringify(editStates[editStates.length - 1])) return;
        setEditStates((prev: any) => [...prev, currentPage.content]);
      }, 100);
    }
  }, [currentPage]);

  const setSitePage = async (site: any) => {
    site.siteData = { ...defaultSiteData, ...site.siteData };
    setSite(site);
    console.log("site", site, pageIndex);
    if (site.SitePages.length === 0) return;

    if (typeof site.SitePages[pageIndex].content === "string") {
      // site.SitePages[pageIndex].content = parseDataIfString(        //LzString library doesnt work properly with graphql encoding so commented for now
      //   LZString.decompress(site.SitePages[pageIndex].content)
      // )
      site.SitePages[pageIndex].content = await JSON.parse(site.SitePages[pageIndex].content);
    }
    setCurrentPage(site.SitePages[pageIndex]);
  };

  const addSection = (sectionDatadata = null) => {
    if (sectionDatadata) sectionDatadata.id = Date.now();

    const newSection = {
      id: Date.now(),
      data: [],
    };

    setCurrentPage({
      ...currentPage,
      content: [...currentPage.content, sectionDatadata || newSection],
    });
  };

  const deleteSection = (index: number) => {
    const cP = [...currentPage.content];
    cP.splice(index, 1);
    setCurrentPage({ ...currentPage, content: cP });
  };

  const save = async () => {
    console.log("save", currentPage);
    if (!currentPage) return;
    console.log("Copy this:", JSON.stringify(currentPage.content[0]));
    //remove whitespace from json
    const json = JSON.stringify(currentPage.content);

    // const encodedData = LZString.compress(json)   //LzString library doesnt work properly with graphql encoding so commented for now

    setLoading(true);
    requestHandler({ type: "put", route: "sitePage", body: { id: currentPage.id, content: json, siteName: siteName } }).then((res) => {
      setLoading(false);
      if (!res?.errors) {
        handleSuccess(`${currentPage.label} page updated successfully`);
        const curSite = { ...site };
        curSite.SitePages[pageIndex] = currentPage;
        setSite(curSite);
        setEditSectionIndex(-1);
        addToCache("sites?siteName=" + siteName, curSite);
        return setReadOnly(true);
      }
      handleErrors(res);
    });
  };

  const undo = (index: number) => {
    if (!editStates.length) return;
    setDisableEditStates(true);
    setCurrentPage((prev) => {
      const cP = { ...prev };
      cP.content = editStates[editStates.length - 1];
      return cP;
    });
    setEditStates((prev: any) => prev.slice(0, prev.length - 1));
    setTimeout(() => {
      setDisableEditStates(false);
    }, 1000);
  };

  const setNewPage = async (id: number) => {
    const page = await requestHandler({ type: "get", route: `sitePage/single?id=${id}`, shouldCache: true, returnCache: true });
    if (!page?.errors) {
      const index = pages.findIndex((p) => p.id == id);
      setPageIndex(index);
      page.content = await parseDataIfString(page.content);
      setCurrentPage(page);
    }
  };

  const updateSiteData = async (data: any) => {
    setLoading(true);
    const req = await requestHandler({ type: "put", route: "sites/siteData", body: { siteData: JSON.stringify(data), id: site.id } });
    setLoading(false);
    if (req?.errors) return handleErrors(req);
    setSite((prev) => {
      const cP = { ...prev };
      cP.siteData = data;
      return cP;
    });
    handleSuccess("Site data updated successfully");
  };

  if (!currentEstablishment) return null;
  return (
    <>
      {loading && <Loader />}
      <div className={` ${loading ? "opacity-10" : ""}`}>
        <Viewport
          site={site}
          save={save}
          readOnly={readOnly}
          currentPage={currentPage}
          editStates={editStates}
          pages={pages}
          setNewPage={setNewPage}
          preview={() => {
            setReadOnly(!readOnly);
            setEditSectionIndex(-1);
          }}
          editSectionIndex={editSectionIndex}
          setEditSectionIndex={setEditSectionIndex}
          undo={undo}
          updateSiteData={(data) => {
            setSite((prev) => {
              const cP = { ...prev };
              cP.siteData = data;
              return cP;
            });
          }}
          onDataChange={(data) => {
            setCurrentPage((prev) => {
              const cP = [...prev.content];
              cP[editSectionIndex].data = data;
              return { ...prev, content: cP };
            });
          }}
        >
          {/* header */}

          <Nav
            siteName={siteName}
            publicEstablishmentId={publicEstablishmentId}
            readOnly={readOnly}
            navOptions={site?.siteData?.navOptions || {}}
            onUpdate={(navOptions: any) => {
              updateSiteData({ ...site?.siteData, navOptions });
            }}
          />

          {currentPage && currentPage?.content?.length > 0
            ? currentPage.content.map((page: { id: React.Key | null | undefined; data: any }, i: React.SetStateAction<number> | undefined) => {
                return (
                  <div key={page.id} className={`h-full w-full`}>
                    <Area
                      readOnly={readOnly}
                      index={i}
                      rows={1}
                      siteData={site.siteData}
                      publicEstablishmentId={publicEstablishmentId}
                      isSlide={false}
                      columns={1}
                      updateWrapperHeight={(height) => {
                        setCurrentPage((prev) => {
                          const cP = [...prev.content];
                          if (!cP[i].data) cP[i].data = {};
                          cP[i].data.height = height;
                          return { ...prev, content: cP };
                        });
                      }}
                      deleteSection={() => deleteSection(i)}
                      setEditSectionIndex={() => {
                        editSectionIndex === i && setEditSectionIndex(-1);
                        editSectionIndex !== i && setEditSectionIndex(i);
                      }}
                      onDataChange={(data) => {
                        setCurrentPage((prev) => {
                          const cP = [...prev.content];
                          cP[i].data = data;

                          return { ...prev, content: cP };
                        });
                      }}
                      moveUp={() => {
                        setCurrentPage((prev) => {
                          const cP = [...prev.content];
                          const temp = cP[i];
                          cP[i] = cP[i - 1];
                          cP[i - 1] = temp;
                          return { ...prev, content: cP };
                        });
                      }}
                      moveDown={() => {
                        setCurrentPage((prev) => {
                          const cP = [...prev.content];
                          const temp = cP[i];
                          cP[i] = cP[i + 1];
                          cP[i + 1] = temp;
                          return { ...prev, content: cP };
                        });
                      }}
                      data={page.data}
                      lastItem={i === currentPage.content.length - 1}
                    />
                  </div>
                );
              })
            : null}
          {!readOnly && (
            <p
              onClick={() => setShowSectionMenu(true)}
              className="mt-1 cursor-pointer rounded px-2  py-1 text-center text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"
            >
              Add Section
            </p>
          )}
        </Viewport>

        {showSectionMenu && (
          <SectionMenu
            addSection={(data: null | undefined) => {
              addSection(data);
              setShowSectionMenu(false);
            }}
            close={() => setShowSectionMenu(false)}
            siteData={site.siteData}
          />
        )}
      </div>
    </>
  );
}

export default SiteEditorPage;

const defaultSiteData = {
  siteColors: ["#FFFFFF", "#D8DAD3", "#4F46E5", "#A3A0D8", "#4T46E5", "#000000"],
  defaultColorIndexes: {
    sectionBackground: 0,
    textColor: 5,
    buttonBackground: 2,
    buttonTextColor: 0,
    buttonHoverBackground: 2,
    buttonHoverTextColor: 0,
    buttonBorder: 0,
  },
};
