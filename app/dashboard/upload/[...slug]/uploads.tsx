"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";

import React from "react";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";

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
    name: "Videos ",
    href: "#",
    count: "2",
    current: false,
  },
  {
    name: "Images",
    href: "#",
    count: "4",
    current: false,
  },
  {
    name: "Audio",
    href: "#",
    count: "6",
    current: true,
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

function Example() {
  const [selected, setSelected] = useState(publishingOptions[0]);
  return (
    <>
      <div className="min-h-full">
        {/* Navbar */}
        <Disclosure as="nav" className="bg-gray-50">
          {({ open }) => (
            <>
              <Disclosure.Panel className="border-b border-gray-200 bg-gray-50 lg:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-100" : "hover:bg-gray-100",
                        "block rounded-md px-3 py-2 font-medium text-gray-900"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Page heading */}

        <main className="pb-16 pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              {/* Tabs */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px mt-2 flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                        )}
                      >
                        {tab.name}
                        {tab.count ? (
                          <span
                            className={classNames(
                              tab.current
                                ? "bg-primary-100 text-primary-600"
                                : "bg-gray-100 text-gray-900",
                              "ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                            )}
                          >
                            {tab.count}
                          </span>
                        ) : null}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Stacked list */}
            <ul
              role="list"
              className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
            >
              {candidates.map((candidate) => (
                <li key={candidate.email}>
                  <a href="#" className="group block">
                    <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                            src={candidate.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-primary-600">
                              {candidate.name}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <EnvelopeIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {candidate.email}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on{" "}
                                <time dateTime={candidate.appliedDatetime}>
                                  {candidate.applied}
                                </time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                  aria-hidden="true"
                                />
                                {candidate.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
              aria-label="Pagination"
            >
              <div className="-mt-px flex w-0 flex-1">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  <ArrowLongLeftIcon
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Previous
                </a>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  1
                </a>
                {/* Current: "border-primary-500 text-primary-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-primary-500 px-4 pt-4 text-sm font-medium text-primary-600"
                  aria-current="page"
                >
                  2
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  3
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  4
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  5
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  6
                </a>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  Next
                  <ArrowLongRightIcon
                    className="ml-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}

export default function AssetsPage({ data }: any) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [options, setOptions] = React.useState({
    page: 1,
    total: 0,
    limit: 25,
  });
  const [prayers, setPrayers] = React.useState(data);

  return <Example />;
}
