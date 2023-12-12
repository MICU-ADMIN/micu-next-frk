import React from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import RecordViewer from "../__Layouts/RecordViewer/RecordViewer";
import AddRecords from "./AddRecords";
import { Record } from "@/_types/dbTypes";

type Props = {
  records: Record[];
  currentEstablishment: any;
  publicEstablishmentId: string;
};

function Records({ records = [], publicEstablishmentId = "", currentEstablishment }: Props) {
  const router = useRouter();
  const [curRecords, setCurRecords] = React.useState<Record[] | null>(null);
  const [showAddScreen, setShowAddScreen] = React.useState(false);

  React.useEffect(() => {
    if (records && records.length > 0) {
      setCurRecords(records);
    }
  }, [records]);

  const navigateTo = (id: string) => {
    // router.push("/dashboard/sites/" + publicEstablishmentId + "?label=" + label);
    router.push("/dashboard/record/" + publicEstablishmentId + "?id=" + id);
  };

  if (!currentEstablishment) return null;
  return (
    <>
      <Toaster />
      <RecordViewer
        records={curRecords || []}
        onPress={(_label: string, data: any) => navigateTo(data?.id)}
        addAction={setShowAddScreen}
        addLabel="Add New Record"
        labelId
        route="records"
        setRecords={setCurRecords}
      />
      {showAddScreen && <AddRecords setCurRecords={setCurRecords} publicEstablishmentId={publicEstablishmentId} close={() => setShowAddScreen(false)} />}
    </>
  );
}

export default Records;
