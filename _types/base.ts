import { Site, SitePage } from "./dbTypes";

export type ServerSidePage = Site & { SitePages: SitePage[]; siteData: any };

export type Session = {
  role: string;
  establishmentId: number;
  email: string;
  userId: number;
  firstName: string;
  lastName: string;
  establishmentName: string;
};
