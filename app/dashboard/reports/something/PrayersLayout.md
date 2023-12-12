```tsx

"use client";

import React from "react";

import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Nav from "@/app/components/Nav/Nav";
import PrayerScreens from "@/app/components/PrayerScreens/PrayerScreens";
import Loader from "@/app/components/Loader/Loader";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import PrayersSidebar from "./PrayersSidebar";
import PrayersPage from "./PrayersPage";
import ArticlesPage from "../../articles/[...slug]/Articles";
function PrayerScreensPage({ screens, orgUsers }) {
  const { currentEstablishment, loading } = useEstablishment(orgUsers);

  return (
    <SideBarLayout
      sideBar={<PrayersSidebar />}
      currentEstablishment={currentEstablishment}
      loading={loading}
    >
      <PrayersPage />
      {/* <ArticlesPage /> */}
    </SideBarLayout>
  );
}

export default PrayerScreensPage;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + UseClient[use client]
    + React[React]
    + UseEstablishment[useEstablishment]
    + PrayerScreens[PrayerScreens]
    + Loader[Loader]
    + SideBarLayout[SideBarLayout]
    + PrayersSidebar[PrayersSidebar]
    + PrayersPage[PrayersPage]
    + ArticlesPage[ArticlesPage]
    + currentEstablishment[currentEstablishment]
    + loading[loading]
```
This overview shows the relationships between the different components and libraries in your Go file, using the `graph` keyword to create a directed graph. Each node in the graph represents a component or library, and the edges between them show how they are related.
The `+` symbol before each node is used to indicate that it is a dependency of the previous node. For example, `+ UseClient` means that `UseClient` depends on `React`.
The `graph` keyword

```
