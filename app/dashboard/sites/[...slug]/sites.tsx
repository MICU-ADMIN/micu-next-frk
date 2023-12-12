"use client";
import { Site } from "@/_types/dbTypes";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Loader from "@/app/components/Elements/Loader/Loader";
import Sites from "@/app/components/_Sites/Sites";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

function SitesPage({ data }: { data: Site[] }) {
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
