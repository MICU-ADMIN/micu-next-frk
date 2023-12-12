```tsx

"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Loader from "@/app/components/Loader/Loader";
import Nav from "@/app/components/Nav/Nav";
import Sites from "@/app/components/Sites/Sites";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

function SitesPage({ data }: any) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [options, setOptions] = React.useState({
    page: 1,
    total: 0,
    limit: 25,
  });
  const [loading, setLoading] = React.useState(false);
  const [sites, setSites] = React.useState(data);

  return (
    <>
      {(loading || !currentEstablishment) && <Loader />}
      <Nav currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <Toaster />
      <div className="page-wrapper">
        <Sites
          sites={sites}
          total={options.total} //@ts-ignore
          publicEstablishmentId={publicEstablishmentId}
          page={options.page}
          currentEstablishment={currentEstablishment}
          refetch={(page) => {
            setOptions({
              ...options,
              page,
            });
          }}
        />
      </div>
    </>
  );
}

export default SitesPage;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File (<<GoFile>>)
    + Use client (<<UseClient>>)
    + Import (<<Import>>)
    + Loader (<<Loader>>)
    + Nav (<<Nav>>)
    + Sites (<<Sites>>)
    + Side Bar Layout (<<SideBarLayout>>)
    + React (<<React>>)
    + Toaster (<<Toaster>>)
    + SitesPage (<<SitesPage>>)
    + Data (<<Data>>)
    + Options (<<Options>>)
    + Loading (<<Loading>>)
    + Current Establishment (<<CurrentEstablishment>>)
    + Establishment Login (<<EstablishmentLogin>>)
    + Sites (<<Sites>>)
    + Total (<<Total>>)
    + Public Establishment Id (<<PublicEstablishmentId>>)
    + Page (<<Page>>)
    + Current Establishment (<<Current

```
