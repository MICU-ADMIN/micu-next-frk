import { Site, SitePage } from "./dbTypes";

export type ServerSidePage = Site & { SitePages: SitePage[]; siteData: any };
