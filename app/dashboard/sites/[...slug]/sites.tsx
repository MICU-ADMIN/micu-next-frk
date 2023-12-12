"use client";
import { Site } from "@/_types/dbTypes";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Sites from "@/app/components/_Sites/Sites";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

function SitesPage({ data }: { data: Site[] }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [navOpen, setNavOpen] = React.useState(true);

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <Toaster />
      <div className={navOpen ? "page-wrapper" : "page-wrapper-full"}>
        <Sites sites={data} publicEstablishmentId={publicEstablishmentId} currentEstablishment={currentEstablishment} />
      </div>
    </>
  );
}

export default SitesPage;
