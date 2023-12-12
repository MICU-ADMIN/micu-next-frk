"use client";
import React, { useState } from "react";
import ArticlesSidebar from "./ArticlesSidebar";
import Link from "next/link";
import dynamic from "next/dynamic";
import Spinner from "../../Elements/Spinner/Spinner";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors } from "@/app/_helpers/web/formatters";
import { Article } from "@/_types/dbTypes";

const ArticlesViewerEditOptions = dynamic(() => import("./ArticlesViewerEditOptions"), { ssr: false, loading: () => <Spinner /> });

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  publicEstablishmentId: string;
};

function ArticlesViewer({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, publicEstablishmentId }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchArticles = async (id = 0, refetch = false) => {
    const request = await requestHandler({
      type: "get",
      route: "articles/public?lastId=" + id + "&publicId=" + publicEstablishmentId,
      shouldCache: true,
      returnCache: true,
    });
    if (request?.errors) return handleErrors(request);
    else if (refetch) setArticles(request);
    else setArticles((prev) => [...prev, ...request]);
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  // State for grid columns and sort option
  const [sortOption, setSortOption] = useState(element?.data?.defaultSort || "latest"); // Default sort option

  return (
    <>
      <style>
        {`
    #artsv${element.id} {
     border-radius: ${element?.data?.borderRadius || 0}px; 
     padding: ${element?.data?.padding || 0}px;
     background-color: ${element?.data?.color || "transparent"};
        border: ${element?.data?.borderWidth || 0}px ${element?.data?.borderStyle || "solid"} ${element?.data?.borderColor || "transparent"};
     object-fit: ${element?.data?.objectFit || "cover"};
    opacity: ${element?.data?.opacity || 1};
      filter: ${element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none"};
      box-shadow: ${element?.data?.shadowColor ? `${element?.data?.shadowColor} 0px 0px 10px ${element?.data?.shadowOpacity || 0.5}` : "none"};
      transition: all 0.1s ease-in-out;
      max-height: ${element?.size?.height || "100%"};
      overflow-y: auto;
    width: 100%;
    height: 100%;
    }

    #artsv${element.id}:hover {
      ${element.data?.hoverBorderRadius ? `border-radius: ${element?.data?.hoverBorderRadius}px;` : ""}
      ${element.data?.hoverObjectFit ? `object-fit: ${element?.data?.hoverObjectFit};` : ""}
      ${element.data?.hoverOpacity ? `opacity: ${element?.data?.hoverOpacity};` : ""}
      ${
        element.data?.hoverFilter && element.data?.hoverFilterValue !== "none"
          ? `filter: ${element?.data?.hoverFilter}(${element?.data?.hoverFilterValue || "50"}%);`
          : ""
      }
      ${element.data?.hoverShadowColor ? `box-shadow: ${element?.data?.hoverShadowColor} 0px 0px 10px ${element?.data?.hoverShadowOpacity || 0.5};` : ""}
      }`}
      </style>

      <div id={`artsv${element.id}`} className="flex justify-center">
        {!element?.data.hideSidebar && element?.data.sidebarPos === "left" && <ArticlesSidebar articles={articles} />}
        {loading && (
          <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-white bg-opacity-50 z-50">
            <Spinner />
          </div>
        )}

        {/* Article Grid */}
        <div className="md:w-3/4 p-4 w-full">
          {/* Sort Options */}
          <div className="mb-4 flex justify-between ">
            <div className="flex items-center">
              {!element?.data?.hideSort && (
                <>
                  <label htmlFor="sortOptions" className="mr-2">
                    Sort by:
                  </label>
                  <select id="sortOptions" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded px-2 py-1">
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                    {/* Add more sort options */}
                  </select>
                </>
              )}
            </div>
            <div className="flex items-center">{!element?.data?.hideSearch && <input className="base-input mr-2" type="text" placeholder="Search" />}</div>
          </div>

          {/* Article Grid with Customizable Columns */}
          <div
            className={`grid  gap-4`}
            style={{
              gridTemplateColumns: `repeat(${element?.data?.columns || 3}, minmax(0, 1fr))`,
            }}
          >
            {/* Render articles in grid */}
            {articles.map((article) => (
              <Link
                href={`/articles/${article.title.replace(/\s+/g, "-").toLowerCase()}/${article.id}`}
                key={article.id}
                target={element?.data?.openInNewTab ? "_blank" : ""}
              >
                <div
                  style={{
                    borderColor: element?.data?.borderColor || "#E5E7EB",
                    borderRadius: element?.data?.borderRadius || 4,
                    borderWidth: element?.data?.borderWidth || 0,
                    borderStyle: element?.data?.borderStyle || "solid",
                  }}
                  className="border cursor-pointer overflow-hidden rounded-lg  bg-white shadow-sm transition duration-500 ease-in-out hover:scale-101 hover:transform hover:shadow-lg relative "
                >
                  {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="h-[150px] w-full object-cover" />}
                  <div className="p-4">
                    <h3
                      style={{
                        color: element?.data?.titleColor || "#212B36",
                        fontSize: element?.data?.titleSize ? element?.data?.titleSize + "px" : "1.25rem",
                        fontWeight: element?.data?.titleWeight || "500",
                      }}
                      className="text-lg"
                    >
                      {article.title}
                    </h3>
                    <span className="text-sm text-gray-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="overflow-hidden overflow-ellipsis text-sm text-gray-400">{article.description}</span>
                  </div>
                  {/* Add more details or customize the article display */}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {!element?.data.hideSidebar && (!element?.data.sidebarPos || element?.data.sidebarPos === "right") && <ArticlesSidebar articles={articles} />}
      </div>

      {showEditMenu && (
        <ArticlesViewerEditOptions
          element={element}
          onChange={onChange}
          setShowEditMenu={setShowEditMenu}
          targetRef={targetRef}
          setTransform={setTransform}
          colors={[]}
        />
      )}
    </>
  );
}

export default ArticlesViewer;
