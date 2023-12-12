```tsx

import React from "react";
import { parseDataIfString, publicId } from "@/app/_helpers/web/formatters";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import RecordViewer from "../RecordViewer/RecordViewer";
import AddPrayerScreen from "./AddPrayerScreen";
import { useRouter } from "next/navigation";

function PrayerScreens({ screens = [] }) {
  const router = useRouter();
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  const [curScreens, setCurScreens] = React.useState([]);
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


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + PrayerScreens
        + screens: []
        + setScreens: () -> void
        + showAddScreen: false
        + curScreens: []
        + navigateTo: (id: string) -> void
        + RecordViewer: () -> void
        + addAction: (id: string) -> void
        + addLabel: "Add New Screen"
        + showAddScreen: false
        + establishmentPublicId: string
```
This overview shows the structure of the Go file as a directed graph, with nodes representing functions, variables, and other elements of the code. The edges between nodes represent the relationships between these elements, such as function calls, variable assignments, and data passed as arguments.
The `PrayerScreens` function is the root node of the graph, and it has several sub-nodes:
* `screens`: an array of screen objects that will be rendered in the prayer screen.
* `setScreens`: a function that sets the `curScreens` state variable to a new

```
