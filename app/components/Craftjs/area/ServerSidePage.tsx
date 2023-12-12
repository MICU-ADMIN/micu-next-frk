import React from "react";
import ServerSideArea from "./ServerSideArea";
import Nav from "../nav";
import { ServerSidePageType } from "@/app/page";

type Props = {
  site: ServerSidePageType;
};

function ServerSidePage({ site } : Props) {
  return (
    <>
      <Nav siteName={site.label} readOnly={true} />
      <>
        {/* @ts-ignore */}
        {site.SitePages[0].content.map((area, i) => (
          <ServerSideArea data={area.data} siteData={site.siteData} i={i} key={area.id} />
        ))}
      </>
    </>
  );
}

export default ServerSidePage;
