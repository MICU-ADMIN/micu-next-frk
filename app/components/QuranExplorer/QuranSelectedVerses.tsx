import React from "react";
import QuranExplorer from "./QuranExplorer";
import { quranExplorerData } from "./QuranExplorer.data";
import Button from "../Elements/Button/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  onDataChange: (data: any) => void;
  verses?: any[];
  readOnly?: boolean;
  insertVerses: (text: any) => void;
};

function QuranSelectedVerses({ onDataChange, verses = [], readOnly = false, insertVerses }: Props) {
  const [selectedVerses, setSelectedVerses] = React.useState([]) as any;
  const [showQuranExplorer, setShowQuranExplorer] = React.useState(false);
  const [presetIndex, setPresetIndex] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(false);

  React.useEffect(() => {
    setSelectedVerses(verses);
  }, []);

  const addVerse = (verse: any, text: any) => {
    console.log(verse, text);
    setSelectedVerses([...selectedVerses, verse]);
    onDataChange([...selectedVerses, verse]);
    insertVerses(text);
  };

  const spliceVerse = (index: number) => {
    const newVerses = [...selectedVerses];
    newVerses.splice(index, 1);
    setSelectedVerses(newVerses);
    onDataChange(newVerses);
  };

  return (
    <div>
      <div className="mt-2 mb-5 flex flex-row flex-wrap ">
        {selectedVerses.map((verse, i) => {
          return (
            <Label
              key={i}
              verse={verse}
              readOnly={readOnly}
              spliceVerse={() => spliceVerse(i)}
              onClick={(verse: { surah: any; ayah: any }) => {
                !firstLoad && setFirstLoad(true);
                setPresetIndex({ surah: verse.surah, ayah: verse.ayah });
                setShowQuranExplorer(true);
              }}
            />
          );
        })}
      </div>
      {!readOnly && (
        <Button
          className="mb-1"
          size="sm"
          onClick={() => {
            !firstLoad && setFirstLoad(true);
            setShowQuranExplorer(true);
          }}
        >
          Open Quran Explorer
        </Button>
      )}
      {firstLoad && (
        <div style={{ display: showQuranExplorer ? "initial" : "none" }}>
          <QuranExplorer
            addVerse={(verse: any, text: any) => addVerse(verse, text)}
            readOnly={readOnly}
            close={() => {
              setShowQuranExplorer(false);
              // setPresetIndex(null)
            }}
            presetIndex={presetIndex}
          />
        </div>
      )}
    </div>
  );
}

const Label = ({ verse, onClick, spliceVerse, readOnly }: any) => {
  const [hovering, setHovering] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      title="Click to View in Quran Explorer"
      onClick={() => {
        onClick(verse);
      }}
      className="relative mb-1 mr-1 flex w-fit cursor-pointer flex-col rounded-md bg-gray-100 px-2 py-1 text-[13.5px] shadow-md hover:bg-gray-200 hover:shadow-lg"
    >
      Surah {quranExplorerData.surahOptions[verse.surah - 1].label} ({verse.surah}) : {verse.ayah}
      {!readOnly && hovering && (
        <div
          title="Remove Verse"
          onClick={(e) => {
            e.stopPropagation();
            spliceVerse();
          }}
          className="absolute right-[-5px] top-[-13px] mr-1 mt-1 transition-all duration-300 ease-in-out"
        >
          <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        </div>
      )}
    </div>
  );
};

export default QuranSelectedVerses;
