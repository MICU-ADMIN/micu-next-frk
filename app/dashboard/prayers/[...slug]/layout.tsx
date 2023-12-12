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
    name: "Live",
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
                Prayers
              </h2>
              <p className="mt-5 text-xl text-gray-500">
                Start building for free, then add a site plan to go live.
                Account plans unlock additional features.
              </p>
            </div>
            <div className="mt-10 w-full max-w-xs">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
                <div className="mt-5 flex xl:ml-4 xl:mt-0">
                  <span className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <WholeWord
                        className="-ml-0.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Import
                    </button>
                  </span>

                  <span className="ml-3 hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <LinkIcon
                        className="-ml-0.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Export
                    </button>
                  </span>

                  <Listbox
                    as="div"
                    value={selected}
                    onChange={setSelected}
                    className="sm:ml-3"
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Label className="sr-only">Live</Listbox.Label>
                        <div className="relative">
                          <div className="inline-flex divide-x divide-primary-600 rounded-md shadow-sm">
                            <div className="inline-flex divide-x divide-primary-600 rounded-md shadow-sm">
                              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-primary-500 px-3 py-2 text-white shadow-sm">
                                <CheckIcon
                                  className="-ml-0.5 h-5 w-5"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-semibold">
                                  {selected.name}
                                </p>
                              </div>
                              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-primary-500 p-2 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50">
                                <span className="sr-only">
                                  Change live status
                                </span>
                                <ChevronDownIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </Listbox.Button>
                            </div>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute left-0 z-10 -mr-1 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                              {publishingOptions.map((option) => (
                                <Listbox.Option
                                  key={option.name}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-primary-500 text-white"
                                        : "text-gray-900",
                                      "cursor-default select-none p-4 text-sm"
                                    )
                                  }
                                  value={option}
                                >
                                  {({ selected, active }) => (
                                    <div className="flex flex-col">
                                      <div className="flex justify-between">
                                        <p
                                          className={
                                            selected
                                              ? "font-semibold"
                                              : "font-normal"
                                          }
                                        >
                                          {option.name}
                                        </p>
                                        {selected ? (
                                          <span
                                            className={
                                              active
                                                ? "text-white"
                                                : "text-primary-500"
                                            }
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </div>
                                      <p
                                        className={classNames(
                                          active
                                            ? "text-primary-200"
                                            : "text-gray-500",
                                          "mt-2"
                                        )}
                                      >
                                        {option.description}
                                      </p>
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>

                  {/* Dropdown */}
                  <Menu as="div" className="relative ml-3 sm:hidden">
                    <Menu.Button className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                      More
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Domain
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              View
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {props.children}
    </div>
  );
}
