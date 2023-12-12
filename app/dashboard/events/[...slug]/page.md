```tsx

"use client";

import React from "react";
import { EventPage } from "./EventPage";
import { Toaster } from "react-hot-toast";
// import SideBarLayout from '.../../../app/components/__Layouts/homesidebar';
import { Loader } from "react-feather";
import loading from "../../account/[...slug]/loading";
import { useEstablishment } from "../../../../app/_helpers/web/hooks/useEstablishment";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";

function page() {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  return (
    <>
      <Toaster />
      <EventPage />
    </>
  );
}

export default page;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File (${file})
    + Import (${import})
    + React (${React})
    + EventPage (${EventPage})
    + Toaster (${Toaster})
    + Loader (${Loader})
    + loading (${loading})
    + UseEstablishment (${useEstablishment})
    + SideBarLayout (${SideBarLayout})
    + page (${page})
    + Current Establishment (${currentEstablishment})
    + Public Establishment ID (${publicEstablishmentId})
```
Note: The `graph LR` directive at the top of the diagram indicates that the diagram is a directed graph, with edges representing the relationships between the components. The `+` symbols indicate that the components are imported or used by the `page` function.

```
