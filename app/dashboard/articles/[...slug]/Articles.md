```tsx

"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Articles from "@/app/components/Articles/Articles";
import Loader from "@/app/components/Loader/Loader";
import Nav from "@/app/components/Nav/Nav";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import loading from "./loading";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";

function ArticlesPage({ data }: any) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [options, setOptions] = React.useState({
    page: 1,
    total: 0,
    limit: 25,
  });
  const [articles, setArticles] = React.useState(data);

  if (!currentEstablishment) return <Loader />;

  return (
    <>
      <Nav
        // sideBar={<PrayersSidebar />}
        currentEstablishment={currentEstablishment}
      />
      <Toaster />

      <div className=" page-wrapper">
        {articles ? (
          <div>
            <Articles
              articles={articles}
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
        ) : null}
      </div>
    </>
  );
}

export default ArticlesPage;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  + Go File (<<GoFile>>)
  + Use client (<<UseClient>>)
  + Import useEstablishment (<<ImportUseEstablishment>>)
  + Import Articles (<<ImportArticles>>)
  + Import Loader (<<ImportLoader>>)
  + Import Nav (<<ImportNav>>)
  + Import React (<<ImportReact>>)
  + Import Toaster (<<ImportToaster>>)
  + Import loading (<<ImportLoading>>)
  + SideBarLayout (<<SideBarLayout>>)
  + ArticlesPage (<<ArticlesPage>>)
  + Data (<<Data>>)
  + Options (<<Options>>)
  + Articles (<<Articles>>)
  + Total (<<Total>>)
  + Limit (<<Limit>>)
  + Current establishment (<<CurrentEstablishment>>)
  + Set options (<<SetOptions>>)
  + Set articles (<<SetArticles>>)
  + If (!currentEstab

```
