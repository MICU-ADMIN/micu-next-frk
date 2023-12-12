"use client";

import { Disclosure, Menu } from "@headlessui/react";
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
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  Loader,
  PencilIcon,
  PlusCircle,
  SearchX,
  WholeWord,
} from "lucide-react";
import loading from "./loading";
import { Toaster } from "react-hot-toast";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const publishingOptions = [
  {
    name: "Access",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Page(props) {
  const [selected, setSelected] = useState(publishingOptions[0]);

  return (
    <div className="p-10">
      <header>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5 sm:py-5  lg:flex lg:justify-between lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Scheduling
              </h2>
              <p className="mt-5 text-xl text-gray-500">
                Start building for free, then add a site plan to go live.
                Account plans unlock additional features.
              </p>
            </div>
            <div className="mt-10 w-full max-w-xs">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
               
              </div>
            </div>
          </div>
        </div>
      </header>

      {props.children}
    </div>
  );
}
