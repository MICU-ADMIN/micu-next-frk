import { cookies, headers } from "next/headers";
import React from "react";

import { Article, Site, SitePage } from "@/_types/dbTypes";
import { ResolvingMetadata, Metadata } from "next";
import { Props } from "react-contenteditable";
import { getSession } from "../_helpers/api/helpers";
import ServerSidePage from "../ServerSidePage";
import PageNotFound from "../components/__Layouts/404Page";

export const revalidate = 10; // revalidate the data at most every hour

import { DBConnection } from "@/app/_helpers/api/configs";
import ArticlePage from "./ArticlePage";
const defaultSiteData = {
  siteColors: ["#FFFFFF", "#D8DAD3", "#4F46E5", "A3A0D8", "#000000"],
  defaultColorIndexes: {
    sectionBackground: 0,
    textColor: 4,
    buttonBackground: 4,
    buttonTextColor: 0,
    buttonHoverBackground: 2,
    buttonHoverTextColor: 0,
    buttonBorder: 0,
  },
};

const checkRootProcess = async (params: { slug: string | any[] }) => {
  //ckeck what the subdomain is

  let url = headers().get("host");
  //temp change may not work
  if (!url || !url.includes(".icu")) url = headers().get("next-url");

  if (!url) return null;

  const subdomain = url.split(".")[0];
  //const subdomain = "test";
  //check if subdomain is admin
  const conn = await DBConnection();

  if (subdomain === "admin") {
    //check if user has a session cookie
    const sessionCookie = cookies().get("session");

    if (sessionCookie) {
      //check if session cookie is valid
      const session = await getSession(conn);
      if (session?.establishmentName) return { site: null, sessionOrg: session.establishmentName };
    }
  } else {
    //try to fetch site from database

    if (params.slug[params.slug.length - 3] === "articles") {
      const [article] = (await (
        await conn
      ).query(
        "SELECT id, title, description, content, userId, likes, attachments, allowComments, showAuthor, showDate, showLikes, thumbnail, createdAt, updatedAt, deletedAt, commentKey, categoryIds FROM Article WHERE id = ?",
        [params.slug[params.slug.length - 1]]
      )) as any;
      if (!article || article.length === 0) return null;

      const site = (await (
        await conn
      ).query("SELECT id, description, label, permissions, adminIds, siteData, userId, thumbnail, createdAt, updatedAt FROM Site WHERE label = ?", [
        subdomain,
      ])) as any;

      if (!site || site.length === 0) return null;
      if (article[0].content !== " ") article[0].content = await JSON.parse(article[0].content);
      return { article: article[0], site: site[0][0] };
    }

    const [site] = (await (
      await conn
    ) //get site page as join
      .query(
        `SELECT s.id, s.description, s.establishmentPublicId, s.label, s.permissions, s.adminIds, s.siteData, s.userId, s.thumbnail, s.createdAt, s.updatedAt, sp.id AS SitePages_id, sp.description AS SitePages_description, sp.content AS SitePages_content, sp.label AS SitePages_label 
FROM Site s 
JOIN SitePage sp ON s.label = sp.siteName 
WHERE s.label = ? AND sp.label = ?
`,
        [subdomain, params.slug[params.slug.length - 1] || "home"]
      )) as any;

    if (!site || site.length === 0) return null;
    let currentSite = site[0] as any;
    currentSite.siteData = { ...defaultSiteData, ...(currentSite.siteData || []) };
    //parse sitePage content
    currentSite.SitePages = [
      {
        id: currentSite.SitePages_id,
        description: currentSite.SitePages_description,
        content: await JSON.parse(currentSite.SitePages_content),
        label: currentSite.SitePages_label,
      },
    ];
    delete currentSite.SitePages_content;
    return { siteAndPage: currentSite, pageData: true };
  }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // TODO req to fetch site data for metadata

  let title = params.slug[params.slug.length - 1] || "Home";
  if (params.slug[params.slug.length - 3] === "articles") {
    title = params.slug[params.slug.length - 2] + " - " + "Article";
  }

  return {
    title,
    description: "test",
  };
}
export type ServerSidePageType = Site & { SitePages: SitePage[]; siteData: any };

export default async function Home({ params }: any) {
  const pageData = (await checkRootProcess(params)) as
    | { siteAndPage: ServerSidePageType; sessionOrg: string | null }
    | { article?: Article; site: Site }
    | null;

  console.log("thyh6yh", pageData);

  if (pageData?.siteAndPage) return <ServerSidePage site={pageData.siteAndPage} />;
  else if (pageData?.article) return <ArticlePage article={pageData.article} site={pageData.site} />;

  return <PageNotFound />;
}
