"use client";

import React, { Fragment } from "react";

import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";

import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import { Toaster } from "react-hot-toast";
import Loading from "./[...slug]/loading";

import PrayerScreens from "@/app/components/_PrayerTimes/PrayerTimes/PrayerScreens";
import { PrayerTimesScreen } from "@/_types/dbTypes";

function PrayerScreensPage({ screens }: { screens: PrayerTimesScreen[] }) {
  const { currentEstablishment } = useEstablishment();

  return (
    <SideBarLayout
      // sideBar={<PrayersSidebar />}
      currentEstablishment={currentEstablishment}
      loading={Loading}
    >
      <Toaster />
      <header className="bg-gray-50  p-8 rounded-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Prayer Screens</h1>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
              <p className="mt-2 flex items-center text-sm text-gray-500">
                A schedule of
                <b className=" text-blue-600 font-bold px-1">obligatory</b>
                prayers conducted at the mosque.{" "}
              </p>
            </div>
          </div>
          <div className="mt-5 flex xl:ml-4 xl:mt-0">
            <div className=" ml-3 inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
              <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                <button className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-500 px-3 py-2 hover:bg-purple-600 text-white shadow-sm">
                  <p className="text-sm font-semibold">Add user</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div>
        <PrayerScreens screens={screens} />
      </div>
    </SideBarLayout>
  );
}

export default PrayerScreensPage;
