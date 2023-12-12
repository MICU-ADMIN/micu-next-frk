import React from "react";
import { parseDataIfString } from "@/app/_helpers/web/formatters";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import AddPrayerScreen from "./AddPrayerScreen";
import { useRouter } from "next/navigation";
import RecordViewer from "../../__Layouts/RecordViewer/RecordViewer";
import { PrayerTimesScreen } from "@/_types/dbTypes";

function PrayerScreens({ screens }: { screens: PrayerTimesScreen[] }) {
  const router = useRouter();
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  const [curScreens, setCurScreens] = React.useState<PrayerTimesScreen[]>([]);
  const [showAddScreen, setShowAddScreen] = React.useState(false);

  const setScreens = async () => {
    const newScreens = [];
    for (const screen of screens) {
      console.log("screen", screen);
      if (screen.images) screen.images = await parseDataIfString(screen.images);
      else screen.images = [];
      newScreens.push(screen);
    }

    setCurScreens(newScreens);
  };

  React.useEffect(() => {
    console.log("screens", screens);
    if (screens && screens.length > 0) {
      setScreens();
    }
  }, [screens]);

  if (!currentEstablishment) return null;

  const navigateTo = (id: string) => {
    router.push(`/dashboard/prayerscreen/${publicEstablishmentId}?screenId=${id}`);
  };

  return (
    <>
      <RecordViewer records={curScreens} onPress={(id) => navigateTo(id)} addAction={setShowAddScreen} addLabel="Add New Screen" />
      {showAddScreen && <AddPrayerScreen setCurScreens={setCurScreens} close={() => setShowAddScreen(false)} establishmentPublicId={publicEstablishmentId} />}
    </>
  );
}

export default PrayerScreens;
