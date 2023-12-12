import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import React from "react";
import { getSession } from "./_helpers/api/helpers";
import { HomePage } from "./Home";

import mysql from "mysql2/promise";
import ServerSidePage from "./components/Craftjs/area/ServerSidePage";
import { Site, SitePage } from "@/_types/dbTypes";
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

const checkRootProcess = async () => {
  //ckeck what the subdomain is

  let url = headers().get("host");
  if (!url || !url.startsWith("http")) url = headers().get("next-url");

  //loop throogh headers and find the host
  headers().forEach((v, k) => {
    console.log(k, v);
  });

  if (!url) return null;
  const subdomain = url.split(".")[0];
  //const subdomain = "test";

  const path = url.split("/")[1];

  console.log(subdomain);
  //check if subdomain is admin

  if (subdomain === "admin") {
    //check if user has a session cookie
    const sessionCookie = cookies().get("session");
    if (sessionCookie) {
      //@ts-expect-error
      const conn = mysql.createConnection(process.env.DATABASE_URL);

      //check if session cookie is valid
      const session = await getSession(conn);
      if (session?.establishmentName) NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL + "/dashboard/home");
      return session?.establishmentName;
    }
  } else {
    //try to fetch site from database

    const [site] = (await (
      await conn
    ).query("SELECT id, description, label, permissions, adminIds, userId, thumbnail, createdAt, updatedAt , siteData FROM Site WHERE label = ?", [
      subdomain,
    ])) as any;

    if (!site || site.length === 0) return null;

    const [SitesPage] = await (
      await conn
    ).query("SELECT id, description, content, label FROM SitePage WHERE siteName = ? AND label = ?", [subdomain, path || "home"]);

    let currentSite = site[0] as any;
    currentSite.SitePages = SitesPage as any;
    currentSite.siteData = { ...defaultSiteData, ...(site.siteData || []) };

    //parse sitePage content
    currentSite.SitePages[0].content = JSON.parse(currentSite.SitePages[0].content) as any;
    return currentSite;
  }
};

export type ServerSidePageType = Site & { SitePages: SitePage[]; siteData: any };

export default async function Home() {
  const nameOrSite = (await checkRootProcess()) as ServerSidePageType | null;

  if (nameOrSite?.SitePages) return <ServerSidePage site={nameOrSite} />;

  return <HomePage name={nameOrSite} />;
}
