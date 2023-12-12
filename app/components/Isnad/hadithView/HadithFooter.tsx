"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Grading from "../Grading";
import IsnadFallbak from "../IsnadViewer/IsnadFallbak";
import { CommentaryOptions, Hadith } from "./HadithView";
import Loader from "../Loader/Loader";

const IsnadViewer = dynamic(() => import("../IsnadViewer/IsnadViewer"), {
  loading: () => <Loader />,
});
const Commentary = dynamic(() => import("../commentary/Commentary"), {
  loading: () => <Loader />,
});

interface HadithFooterProps {
  hadith: Hadith;
  CommentaryOptions?: CommentaryOptions;
}

function HadithFooter({ hadith, CommentaryOptions }: HadithFooterProps) {
  const [isnadData, setIsnadData] = React.useState(null) as any;
  const [showCommentaries, setShowCommentaries] = React.useState(false);
  const [showGrading, setShowGrading] = React.useState(false);

  return (
    <>
      <div className="flex flex-row  mt-2">
        <div>
          <p className="text-gray-700  mt-1 text-sm">
            Reference{" "}
            <Link
              href={`https://isnad.mosque.icu/hadith/${
                collectionIdMap[hadith.collectionId]?.slug
              }:${hadith.bookId}:${hadith.orderInBook}?id=${hadith.id}`}
              className="text-primary-500  cursor-pointer hover:underline"
              target="_blank"
            >
              {collectionIdMap[hadith.collectionId]?.name} : {hadith.bookId} :{" "}
              {hadith.orderInBook}
            </Link>
          </p>

          <p className="text-gray-700   text-sm">
            Hadith{" "}
            <Link
              href={`https://isnad.mosque.icu/hadith/${
                collectionIdMap[hadith.collectionId]?.slug
              }:${hadith.bookId}:${hadith.orderInBook}?id=${hadith.id}`}
              className="text-primary-500 cursor-pointer hover:underline"
              target="_blank"
            >
              {hadith.hadithNumber}
            </Link>
          </p>
        </div>
        <div className="ml-12 flex flex-row mt-5">
          <p
            className="text-gray-700   text-sm hover:text-primary-500 cursor-pointer hover:shadow-sm rounded-md p-1"
            onClick={() => {
              setIsnadData(hadith);
            }}
          >
            Explore Isnad{" "}
          </p>
          <p
            onClick={() => setShowCommentaries(!showCommentaries)}
            className="text-gray-700  ml-3  text-sm hover:text-primary-500 cursor-pointer hover:shadow-sm rounded-md p-1"
          >
            Commentaries
          </p>

          <p
            onClick={() =>
              hadith.collectionId == 1 || hadith.collectionId == 2
                ? setShowGrading(!showGrading)
                : null
            }
            title="Placeholder for grading of hadith. Only show for hadith not in Sahih Bukhari or muslim with multiple grading"
            className="text-gray-700  ml-3  text-sm hover:text-primary-500 cursor-pointer hover:shadow-sm rounded-md p-1"
          >
            Gradings
          </p>
        </div>
      </div>

      {showGrading && <Grading />}

      {showCommentaries && (
        <Commentary
          CommentaryOptions={CommentaryOptions}
          hadith={hadith}
          close={() => setShowCommentaries(false)}
        />
      )}

      {isnadData && (
        <>
          {isnadData?.isnad ? (
            <IsnadViewer
              isnadData={isnadData}
              close={() => setIsnadData(null)}
            />
          ) : (
            <IsnadFallbak setIsnadData={setIsnadData} />
          )}
        </>
      )}
    </>
  );
}

export default HadithFooter;

const collectionIdMap = {
  "1": { name: "Sahih Bukhari", slug: "sahih-bukhari" },
  "2": { name: "Sahih Muslim", slug: "sahih-muslim" },
  "3": { name: "Sunan An Nasai", slug: "sunan-an-nasai" },
  "10": { name: "Sunan Abu Dawud", slug: "sunan-abu-dawud" },
  "30": { name: "Jami At Tirmidhi", slug: "jami-at-tirmidhi" },
  "38": { name: "Sunan Ibn Majah", slug: "sunan-ibn-majah" },
  "40": { name: "Muwatta Malik", slug: "muwatta-malik" },
  "50": { name: "Musnad Ahmad", slug: "musnad-ahmad" },
  "80": { name: "Sunan Ad Darimi", slug: "sunan-ad-darimi" },
  "102": { name: "Collections of Forty", slug: "collections-of-forty" },
  "103": { name: "An Nawawi's 40 Hadith", slug: "an-nawawis-40-hadith" },
  "110": { name: "Riyad as Salihin", slug: "riyad-as-salihin" },
  "113": { name: "Mishkat al Masabih", slug: "mishkat-al-masabih" },
  "115": { name: "Al Adab Al Mufrad", slug: "al-adab-al-mufrad" },
  "130": {
    name: "Ash Shama'il Al Muhammadiyah",
    slug: "ash-shamail-al-muhammadiyah",
  },
  "200": { name: "Bulugh al Maram", slug: "bulugh-al-maram" },
  "300": { name: "Hisn al Muslim", slug: "hisn-al-muslim" },
  "350": {
    name: "Virtues of the Qur'an's Chapters and Verses",
    slug: "virtues-of-the-qurans-chapters-and-verses",
  },
} as any;
