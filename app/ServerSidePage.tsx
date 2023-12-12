import React from "react";
import { ServerSidePageType } from "@/app/page";
import Nav from "./components/_Sites/SiteEditor/nav";
import ServerSideArea from "./components/_Sites/SiteEditor/area/ServerSideArea";

type Props = {
  site: ServerSidePageType;
};

function ServerSidePage({ site }: Props) {
  return (
    <>
      <Nav siteName={site.label} readOnly={true} navOptions={site.siteData.navOptions} />
      <>
        {/* @ts-ignore */}
        {site.SitePages[0].content.map((area, i) => (
          <ServerSideArea data={area.data} siteData={site.siteData} i={i} key={area.id} publicId={site.establishmentPublicId} />
        ))}
      </>
    </>
  );
}

export default ServerSidePage;
