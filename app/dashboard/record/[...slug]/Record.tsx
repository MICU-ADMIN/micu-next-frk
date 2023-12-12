"use client";

import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import RecordHeader from "@/app/components/_Records/record/RecordHeader";
import RecordLayout from "@/app/components/_Records/record/RecordLayout";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import React from "react";
import { Toaster } from "react-hot-toast";

function RecordPage({ record }: { record: any }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [navOpen, setNavOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState("table"); //table, calender, [map]

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />

      <Toaster />
      <div
        style={{
          marginTop: navOpen ? "-5rem" : "2rem",
        }}
        className="flex flex-col w-full bg-white"
      >
        <RecordHeader record={record} loading={loading} setLoading={setLoading} setView={setView} view={view} />
        <RecordLayout
          loading={loading}
          setLoading={setLoading}
          properties={record.properties}
          record={record}
          navOpen={navOpen}
          publicEstablishmentId={publicEstablishmentId}
          view={view}
        />
      </div>
    </>
  );
}

export default RecordPage;
