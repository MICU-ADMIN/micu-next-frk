"use client";
import React from "react";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";
import { handleErrors, parseDataIfString } from "@/app/_helpers/web/formatters";
import ArticleViewer from "../../_Articles/ArticleViewer/ArticleViewer";
import { fetchUsers } from "@/actions/user-actions";

const ArticleViewerEditOptions = dynamic(() => import("./ArticleViewerEditOptions"), { loading: () => <Spinner /> });

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function ArticleViewerElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform }: Props) {
  const [article, setArticle] = React.useState(null) as any;
  const [users, setUsers] = React.useState({}) as any;
  React.useEffect(() => {
    if (!element?.data?.articleId) return;
    fetchArticle();
  }, [element?.data?.articleId]);

  const fetchArticle = async () => {
    const res = await requestHandler({ type: "get", route: "articles/single?id=" + element?.data?.articleId, shouldCache: true, returnCache: true });

    if (res?.errors) return handleErrors(res);
    res.content = await parseDataIfString(res.content);
    setArticle(res);

    await fetchUsers((c, m) => {
      setUsers(m);
    });
  };

  return (
    <>
      <style>
        {`
    #artv${element.id} {
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
    }

    #artv${element.id}:hover {
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
      <div id={`artv${element.id}`} className="h-full w-full text-wrapper">
        {article && <ArticleViewer article={article} data={element.data} users={users} />}
      </div>
      {showEditMenu && (
        <ArticleViewerEditOptions
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

export default ArticleViewerElement;
