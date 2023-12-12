"use client";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Application from "./Applications";
import { requestHandler } from "../../_helpers/web/requestHandler";
import { useRouter } from "next/navigation";
import {
  checkRequiredAndErrs,
  handleErrors,
} from "../../_helpers/web/formatters";

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function ViewApplication({ application, userId }) {
  const [editMode, setEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  console.log(JSON.stringify(application));

  async function createEstablishment(data) {
    setLoading(true);
    requestHandler({
      type: "post",
      body: {
        name: data.institutionName,
        email: data.email,
        telephone: data.telephone,
        type: data.type,
        geoString: `${data.buildingNumber} ${data.firstLine} ${data.secondLine} ${data.city} ${data.county} ${data.country} ${data.zip}`,
        zip: data.zip,
      },
      route: "establishment",
    }).then((res) => {
      setLoading(false);
      if (!res?.errors) {
        router.push("/dashboard/home/" + data.institutionName);
      }
      handleErrors(res);
    });
  }

  if (editMode) {
    return <Application userId={userId} data={application} />;
  }

  return (
    <div className="bg-white w-screen h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Review application
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have a look and see if we have the correct information.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              You have applied as a {application.type}
            </h3>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              <li className="flex gap-x-3">{application.email}</li>
              <li className="flex gap-x-3">{application.telephone}</li>

              <li className="flex gap-x-3">{application.status}</li>
            </ul>

            <div className="mt-2 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary-600">
                Address & location
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              <li className="flex gap-x-3">{application.city}</li>
              <li className="flex gap-x-3">{application.country}</li>
              <li className="flex gap-x-3">{application.secondLine}</li>
              <li className="flex gap-x-3">{application.zip}</li>
              <li className="flex gap-x-3">{application.county}</li>
              <li className="flex gap-x-3">{application.buildingNumber}</li>
              <li className="flex gap-x-3">{application.firstLine}</li>
            </ul>
          </div>

          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  We aim to finalise checks within
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    48
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    HOURS
                  </span>
                </p>
                {/* THIS SHOULD IDEALY GO TO www.mosque.icu  */}
                <button
                  onClick={() => {
                    createEstablishment(application);
                  }}
                  className="mt-10 block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Go back ....dev for create est
                </button>
                <button
                  onClick={() => {
                    setEditMode(true);
                  }}
                  disabled={loading}
                  className="mt-2 block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Edit application
                </button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Your application is subject to checks and validation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
