"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";

import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import React from "react";
import { Toaster } from "react-hot-toast";
import PrayersSidebar from "../something/PrayersSidebar";
import loading from "./loading";

import { Fragment, useState } from "react";
import { Disclosure, Listbox, Menu, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Loader from "@/app/components/Elements/Loader/Loader";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Dashboard",
    href: "#",
    current: true,
  },
  {
    name: "Jobs",
    href: "#",
    current: false,
  },
  {
    name: "Applicants",
    href: "#",
    current: false,
  },
  {
    name: "Company",
    href: "#",
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const tabs = [
  {
    name: "Assets ",
    href: "#",
    count: "2",
    current: false,
  },
  {
    name: "Maintenance",
    href: "#",
    count: "4",
    current: false,
  },
  {
    name: "Procuremnet",
    href: "#",
    count: "6",
    current: true,
  },
  {
    name: "Renewals",
    href: "#",
    current: false,
  },
  {
    name: "Disposal",
    href: "#",
    current: false,
  },
];
const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  // More candidates...
];
const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selected, setSelected] = useState(publishingOptions[0]);

  return (
    <main className="pb-16">
      {/*  */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 lg:max-w-7xl">
          <div className="relative overflow-hidden rounded-lg lg:h-96">
            <div className="absolute inset-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              aria-hidden="true"
              className="relative h-96 w-full lg:hidden"
            />
            <div
              aria-hidden="true"
              className="relative h-32 w-full lg:hidden"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Workspace Collection
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  Upgrade your desk with objects that keep you organized and
                  clear-minded.
                </p>
              </div>
              <a
                href="#"
                className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
              >
                View the collection
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </main>
  );
}
