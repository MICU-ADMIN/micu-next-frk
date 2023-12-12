import React from "react";
import AddSites from "./AddSites";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import RecordViewer from "../__Layouts/RecordViewer/RecordViewer";
import { Site } from "@/_types/dbTypes";

type Props = {
  sites: Site[];
  refetch: (page: number) => void;
  page: number;
  currentEstablishment: any;
  total: number;
  publicEstablishmentId: string;
};

function Sites({ sites = [], refetch, page = 1, publicEstablishmentId = "", total = 0, currentEstablishment }: Props) {
  const router = useRouter();
  const [curSites, setCurSites] = React.useState<Site[] | null>(null);
  const [showAddScreen, setShowAddScreen] = React.useState(false);

  React.useEffect(() => {
    if (sites && sites.length > 0) {
      setCurSites(sites);
    }
  }, [sites]);

  const navigateTo = (label: string) => {
    // router.push("/dashboard/sites/" + publicEstablishmentId + "?label=" + label);
    router.push("/dashboard/site/" + publicEstablishmentId + "?label=" + label);
  };

  if (!currentEstablishment) return null;
  return (
    <>
      <Toaster />
      <RecordViewer
        records={curSites || []}
        onPress={(label: string) => navigateTo(label)}
        addAction={setShowAddScreen}
        addLabel="Add New Site"
        labelId
        onEndReached={() => {
          if (curSites && curSites.length < total) {
            refetch(page + 1);
          }
        }}
      />
      {showAddScreen && <AddSites setCurSites={setCurSites} publicEstablishmentId={publicEstablishmentId} close={() => setShowAddScreen(false)} />}
    </>
  );
}

export default Sites;
