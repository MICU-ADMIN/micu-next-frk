```tsx

import React from "react";
import ServerSideArea from "./ServerSideArea";
import Nav from "../nav";

function ServerSidePage({ site }) {
  return (
    <>
      <Nav siteName={site.label} readOnly={true} />
      <>
        {site.SitePages[0].content.map((area, i) => (
          <ServerSideArea data={area.data} siteData={site.siteData} i={i} key={area.id} />
        ))}
      </>
    </>
  );
}

export default ServerSidePage;


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  nav[Nav] --> ServerSidePage[ServerSidePage]
  nav[Nav] --> SitePages[SitePages]
  SitePages[0] --> content[content]
  content[0] --> area[area]
  area[0] --> data[data]
  area[0] --> siteData[siteData]
  area[0] --> i[i]
  area[0] --> key[key]
```
Explanation:

* `nav` represents a `Nav` component, which is imported from the `../nav` module.
* `ServerSidePage` represents the `ServerSidePage` component, which is the main component of the file.
* `SitePages` represents an array of `SitePage` objects, which are imported from the `SitePage` module.
* `content` represents an array of `content` objects, which are imported from the `content` module.
* `area` represents a `Area` object, which is imported from the `Area` module.
* `

```
