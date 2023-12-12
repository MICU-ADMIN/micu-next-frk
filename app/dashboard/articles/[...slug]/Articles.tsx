"use client";
import React from "react";

import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Articles from "@/app/components/_Articles/Articles";
import { Toaster } from "react-hot-toast";
import Loader from "@/app/components/Elements/Loader/Loader";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import { Article } from "@/_types/dbTypes";

function ArticlesPage({ data }: { data: Article[] }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  if (!currentEstablishment) return <Loader />;

  return (
    <>
      <Nav
        // sideBar={<PrayersSidebar />}
        currentEstablishment={currentEstablishment}
        establishemntLogin={undefined}
      />
      <Toaster />

      <div className=" page-wrapper">
        {data ? (
          <div>
            <Articles articles={data} publicEstablishmentId={publicEstablishmentId} currentEstablishment={currentEstablishment} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ArticlesPage;
