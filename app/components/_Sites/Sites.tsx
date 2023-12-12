import React from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import RecordViewer from "../__Layouts/RecordViewer/RecordViewer";
import { Site } from "@/_types/dbTypes";
import dynamic from "next/dynamic";
import Spinner from "../Elements/Spinner/Spinner";

const AddSites = dynamic(() => import("./AddSites"), { loading: () => <Spinner /> });

type Props = {
  sites: Site[];
  currentEstablishment: any;
  publicEstablishmentId: string;
};

function Sites({ sites = [], publicEstablishmentId = "", currentEstablishment }: Props) {
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
        route="sites"
        setRecords={setCurSites}
      />
      {showAddScreen && <AddSites setCurSites={setCurSites} publicEstablishmentId={publicEstablishmentId} close={() => setShowAddScreen(false)} />}
    </>
  );
}

export default Sites;
