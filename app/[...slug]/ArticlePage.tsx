import React from "react";
import { Article, Site } from "@/_types/dbTypes";
import Nav from "../components/_Sites/SiteEditor/nav";
import ArticleViewer from "../components/_Articles/ArticleViewer/ArticleViewer";

type Props = {
  article: Article;
  site: Site;
};

function ArticlePage({ article, site }: Props) {
  return (
    <>
      <Nav siteName={site.label} readOnly={true} navOptions={site?.siteData?.navOptions} />
      <>
        <ArticleViewer article={article} data={site.siteData} users={{}} />
      </>
    </>
  );
}

export default ArticlePage;
