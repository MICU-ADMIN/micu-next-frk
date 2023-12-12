import { cookies, headers } from "next/headers";
import React from "react";

import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { Site, SitePage } from "@/_types/dbTypes";
import { ResolvingMetadata, Metadata } from "next";
import { Props } from "react-contenteditable";
import { getSession } from "../_helpers/api/helpers";
import { HomePage } from "../Home";
import ServerSidePage from "../ServerSidePage";
import PageNotFound from "../components/__Layouts/404Page";

export const revalidate = 10; // revalidate the data at most every hour

//@ts-expect-error
const conn = mysql.createConnection(process.env.DATABASE_URL);

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

  const path = url.split("//")[1];

  const subdomain = url.split(".")[0];
  //const subdomain = "test";
  //check if subdomain is admin

  if (subdomain === "admin") {
    //check if user has a session cookie
    const sessionCookie = cookies().get("session");

    if (sessionCookie) {
      //@ts-expect-error
      const conn = mysql.createConnection(process.env.DATABASE_URL);

      //check if session cookie is valid
      const session = await getSession(conn);
      if (session?.establishmentName) return { site: null, sessionOrg: session.establishmentName };
    }
  } else {
    //try to fetch site from database

    const [site] = (await (
      await conn
    ) //get site page as join
      .query(
        `SELECT s.id, s.description, s.label, s.permissions, s.adminIds, s.siteData, s.userId, s.thumbnail, s.createdAt, s.updatedAt, sp.id AS SitePages_id, sp.description AS SitePages_description, sp.content AS SitePages_content, sp.label AS SitePages_label 
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
    return { site: currentSite, pageData: true };
  }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // TODO req to fetch site data for metadata

  return {
    title: params.slug[params.slug.length - 1] || "Home", // TODO: get title from siteData
    description: "test",
  };
}
export type ServerSidePageType = Site & { SitePages: SitePage[]; siteData: any };

export default async function Home({ params }: any) {
  const pageData = (await checkRootProcess(params)) as { site: ServerSidePageType; sessionOrg: string | null } | null;

  if (pageData?.site) return <ServerSidePage site={pageData.site} />;

  return <PageNotFound />;
}
