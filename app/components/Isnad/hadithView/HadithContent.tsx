import React from "react";
import HadithFooter from "./HadithFooter";
import { CommentaryOptions, Hadith } from "./HadithView";

type Props = {
  hadith: Hadith;
  highlight?: string | RegExp;
  CommentaryOptions?: CommentaryOptions[];
};

const HadithContent = ({ hadith, highlight, CommentaryOptions }: Props) => {
  return (
    <div key={hadith.id} className="w-full mb-5 card bg-white shadow-sm border border-gray-100 p-5 rounded-md">
      <p>
        {hadith.narratorPrefix} ( {hadith?.englisNarratorPrefix} ){/* narrates: */}
      </p>
      <div className="flex md:flex-row flex-col justify-between mt-3">
        <p
          dangerouslySetInnerHTML={{
            __html: highlight ? onHighlight(hadith?.englishTrans, highlight) : hadith.englishTrans,
          }}
          className="text-gray-700 mr-2"
        ></p>{" "}
        <p
          className="text-gray-700 text-[21px] md:ml-0 ml-3 mt-5 md:mt-0"
          dir="rtl"
          dangerouslySetInnerHTML={{
            __html: highlight ? onHighlight(hadith.arabic, highlight) : hadith.arabic,
          }}
        ></p>
      </div>
      <HadithFooter hadith={hadith} CommentaryOptions={CommentaryOptions} />
    </div>
  );
};

const onHighlight = (html: string, highlightTerm: string | RegExp) => {
  if (!highlightTerm) {
    return html;
  }
  const regex = new RegExp(highlightTerm, "gi");
  const result = html.replace(regex, (match) => `<mark>${match}</mark>`);
  return result;
};

export default HadithContent;
