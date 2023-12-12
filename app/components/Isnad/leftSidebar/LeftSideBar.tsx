"use client";
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
//@ts-expect-error
import collectionsList from "public/json/collectionsList.json";
import HadithBooks from "./HadithBooks";

export type Collection = {
  id: number;
  slug: string;
  collectionId: number;
  title: string;
  books: {
    id: number;
    title: string;
  }[];
};

type LeftSideBarProps = {
  children?: React.ReactNode;
  setCurrentParams: ({ collectionId, bookId }: { collectionId: number; bookId: number }) => void;
};

function LeftSideBar({ children, setCurrentParams }: LeftSideBarProps) {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [currentBook, setCurrentBook] = React.useState<any>("0");

  //hide sidebar on mobile
  return (
    <>
      <div
        className="w-[410px] card bg-white shadow-sm min-h-full border border-gray-100  mt-[1px] flex flex-row relative slideLeft overflow-y-scroll"
        style={{ display: showSidebar ? "flex" : "none" }}
      >
        <Bars3Icon className="absolute top-2 right-2 w-5 h-5 text-gray-600 cursor-pointer z-50" onClick={() => setShowSidebar(false)} />
        {/* <div
            className="  w-[50px] border border-gray-100 
            "
          ></div> */}

        <div className="flex flex-col w-full p-3 mt-2">
          <p
            className="mb-4  text-lg  text-underline
          "
          >
            Hadith Collections
          </p>
          {collectionsList.map((data: Collection) => (
            <HadithBooks
              key={data.id}
              data={data}
              currentBook={currentBook}
              navigate={(slug: any, bookId: any) => {
                setCurrentBook(data.id + bookId);
                setCurrentParams({ collectionId: data.collectionId, bookId: bookId });
              }}
            />
          ))}
          <p className=" text-xs text-gray-500 absolute bottom-0">
            Content provided by{" "}
            <a href="https://sunnah.com" target="_blank">
              Sunnah.com
            </a>
          </p>
        </div>
      </div>
      {!showSidebar && <Bars3Icon className="fixed top-[50px] left-2 w-5 h-5 text-gray-600 z-50 cursor-pointer " onClick={() => setShowSidebar(true)} />}
      {children}
    </>
  );
}

export default LeftSideBar;
