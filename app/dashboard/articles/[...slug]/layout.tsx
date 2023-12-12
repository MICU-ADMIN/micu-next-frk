"use client";

import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import {
  ChevronDownIcon,
  Loader,
  PlusCircleIcon,
  SearchX,
  UploadCloudIcon,
} from "lucide-react";
import loading from "./loading";
import { Toaster } from "react-hot-toast";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { Cards } from "@/app/components/card";

export default (props) => {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  return (
    <SideBarLayout
      currentEstablishment={currentEstablishment}
      loading={loading}
    >
      {!currentEstablishment && <Loader />}
      <Toaster />
      <Page {...props} />
    </SideBarLayout>
  );
};

function Page(props) {
  return (
    <div className="p-10">
      <header>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5 sm:py-5  lg:flex lg:justify-between lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Articles
              </h2>
              <p className="mt-5 text-xl text-gray-500">
                Start building for free, then add a site plan to go live.
                Account plans unlock additional features.
              </p>
            </div>

            <div className="mt-10 w-full max-w-xs">
              <form className="max-w-sm">
                <div className="relative mt-6">
                  <input
                    type="text"
                    placeholder="Search"
                    autoComplete="text"
                    aria-label="Search"
                    className="block w-full rounded-2xl border border-neutral-300 bg-transparent font-display tracking-wider  py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                  />
                  <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button
                      type="submit"
                      aria-label="Submit"
                      className="flex aspect-square h-full items-center justify-center rounded-xl bg-primary-400 text-white transition hover:bg-primary-800"
                    >
                      <SearchX className="w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>{" "}
          <div>
            <div className="flex flex-wrap mt-10 items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Recents
              </h1>
              <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                <a href="#" className="text-primary-600">
                  Last 7 days
                </a>
                <a href="#" className="text-gray-700">
                  Last 30 days
                </a>
                <a href="#" className="text-gray-700">
                  All-time
                </a>
              </div>
              <a
                href="#"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                New invoice
              </a>
            </div>
          </div>
          {/* <Cards/> */}
        </div>
      </header>

      {props.children}
    </div>
  );
}
