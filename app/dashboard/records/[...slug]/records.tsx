"use client";
import React from "react";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Records from "@/app/components/_Records/Records";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import { Toaster } from "react-hot-toast";
import { Site } from "@/_types/dbTypes";

function RecordsPage({ data }: { data: Site[] }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [navOpen, setNavOpen] = React.useState(true);

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <Toaster />
      <div className={navOpen ? "page-wrapper" : "page-wrapper-full"}>
        <Records records={data} publicEstablishmentId={publicEstablishmentId} currentEstablishment={currentEstablishment} />
      </div>
    </>
  );
}

export default RecordsPage;
