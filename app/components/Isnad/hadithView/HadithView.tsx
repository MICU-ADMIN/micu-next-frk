import React from "react";
import HadithContent from "./HadithContent";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import Loader from "../Loader/Loader";
import Button from "../../Elements/Button/Button";

export type Hadith = {
  id: number;
  hadithNumber: string;
  collectionId: number;
  bookId: string;
  label: string;
  isnad?: number[];
  arabic: string;
  englishTrans: string;
  narratorPrefix?: string;
  narratorPostfix?: string;
  englisNarratorPrefix?: string;
  englishNarratorPostfix?: string;
  chapterId?: string;
  orderInBook?: string;
  comments?: string;
};

export type CommentaryOptions = {
  id: number;
  name: string;
};

type HadithViewProps = {
  hadithData: Hadith[];
  currentBook?: number;
  currentCollection?: any;
  setHadithData?: any;
};

function HadithView({ hadithData, currentBook, currentCollection, setHadithData }: HadithViewProps) {
  const commentaryOptions: CommentaryOptions[] = collectionIdMap[currentCollection];
  const [isSearch, setIsSearch] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    if (isSearch && hadithData) {
      setIsSearch(false);
    }
  }, [hadithData]);

  const onSearch = async () => {
    if (searching) return;
    try {
      const data = await requestHandler({ type: "get", route: "hadith/search?q=" + searchTerm, shouldCache: true, returnCache: true });
      setHadithData(data);
      setIsSearch(true);
      setSearching(false);
    } catch (e) {
      console.log(e);
      setSearching(false);
    }
  };

  return (
    <>
      {searching && <Loader />}
      <main className="mx-auto w-full ">
        <div className="flex flex-row w-full">
          <div className=" p-5 w-full overflow-y-auto max-h-[calc(100vh-50px)]">
            <div className="flex flex-row justify-between">
              {hadithData && (
                <h5 className="mb-4 font-semibold"> ({isSearch ? hadithData.length + ' search results for "' + searchTerm + '"' : currentBook})</h5>
              )}
              <div className="flex flex-row mb-2 relative bottom-[10px]">
                <input
                  type="search"
                  className="base-input  "
                  placeholder="Search Hadith"
                  onChange={(e) => {
                    isSearch && setIsSearch(false);
                    setSearchTerm(e.target.value);
                  }}
                  value={searchTerm}
                />
                {searchTerm && (
                  <Button onClick={onSearch} size="sm" className="ml-2">
                    Search
                  </Button>
                )}
              </div>
            </div>
            {hadithData &&
              hadithData.map((hadith: Hadith) => (
                <HadithContent hadith={hadith} key={hadith.id} highlight={isSearch ? searchTerm : ""} CommentaryOptions={commentaryOptions} />
              ))}
          </div>
        </div>
        {/* <Card className="mt-6">
          <UsersTable users={[]} />
        </Card> */}
      </main>
    </>
  );
}

const collectionIdMap = {
  "1": [{ name: "Fath al-Bari", id: 1 }],
  // "2": { name: "Sahih Muslim", slug: "sahih-muslim" },
  // "3": { name: "Sunan An Nasai", slug: "sunan-an-nasai" },
  // "10": { name: "Sunan Abu Dawud", slug: "sunan-abu-dawud" },
  // "30": { name: "Jami At Tirmidhi", slug: "jami-at-tirmidhi" },
  // "38": { name: "Sunan Ibn Majah", slug: "sunan-ibn-majah" },
  // "40": { name: "Muwatta Malik", slug: "muwatta-malik" },
  // "50": { name: "Musnad Ahmad", slug: "musnad-ahmad" },
  // "80": { name: "Sunan Ad Darimi", slug: "sunan-ad-darimi" },
  // "102": { name: "Collections of Forty", slug: "collections-of-forty" },
  // "103": { name: "An Nawawi's 40 Hadith", slug: "an-nawawis-40-hadith" },
  // "110": { name: "Riyad as Salihin", slug: "riyad-as-salihin" },
  // "113": { name: "Mishkat al Masabih", slug: "mishkat-al-masabih" },
  // "115": { name: "Al Adab Al Mufrad", slug: "al-adab-al-mufrad" },
  // "130": {
  //   name: "Ash Shama'il Al Muhammadiyah",
  //   slug: "ash-shamail-al-muhammadiyah",
  // },
  // "200": { name: "Bulugh al Maram", slug: "bulugh-al-maram" },
  // "300": { name: "Hisn al Muslim", slug: "hisn-al-muslim" },
  // "350": {
  //   name: "Virtues of the Qur'an's Chapters and Verses",
  //   slug: "virtues-of-the-qurans-chapters-and-verses",
  // },
} as any;

export default HadithView;
