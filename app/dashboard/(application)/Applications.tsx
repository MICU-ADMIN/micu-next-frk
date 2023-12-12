"use client";

import React from "react";
import { Application } from "@/_types/dbTypes";
import ApplicationLayout from "./ApplicationLayout";
import { createApplication } from "./page";

type Props = {
  data: Application[];
  userId: string;
};

function Applications({ data, userId }: Props) {
  const createApplicationWithId = createApplication.bind(null, userId);
  const [formData, setFormData] = React.useState({ ...data });

  return (
    <ApplicationLayout>
      <form
        action={createApplicationWithId}
        className="w-full max-w-md lg:col-span-5 lg:pt-2"
      >
        <div className="grid gap-4">
          {/* Email */}
          <label htmlFor="institution name" className="text-white">
            Institution name
          </label>
          <input
            id="institution name"
            value={formData.institutionName}
            name="institution name"
            type="institution name"
            autoComplete="institution name"
            required
            maxLength={255}
            onChange={(e) =>
              setFormData({ ...formData, institutionName: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Institution name"
          />

          {/* Email */}
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            id="email"
            value={formData.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Email"
          />

          {/* Telephone  */}
          <label htmlFor="buildingNumber" className="text-white">
            Telephone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="number"
            autoComplete="off"
            maxLength={50}
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Telephone"
          />

          {/* Type */}
          <label htmlFor="type" className="text-white">
            Type
          </label>
          <select
            id="type"
            value={formData.type}
            name="type"
            required
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="min-w-0 py-1.5 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          >
            <option value="mosque">Mosque</option>
            <option value="school">School</option>
            <option value="charity">Charity</option>
            <option value="other">Other</option>
          </select>

          {/* Building Number */}
          <label htmlFor="buildingNumber" className="text-white">
            Building Number
          </label>
          <input
            id="buildingNumber"
            name="buildingNumber"
            type="number"
            autoComplete="off"
            maxLength={50}
            value={formData.buildingNumber}
            onChange={(e) =>
              setFormData({ ...formData, buildingNumber: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Building Number"
          />

          {/* First Line */}
          <label htmlFor="firstLine" className="text-white">
            First Line
          </label>
          <input
            id="firstLine"
            name="firstLine"
            value={formData.firstLine}
            type="text"
            autoComplete="off"
            maxLength={255}
            onChange={(e) =>
              setFormData({ ...formData, firstLine: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="First Line"
          />

          {/* Second Line */}
          <label htmlFor="secondLine" className="text-white">
            Second Line
          </label>
          <input
            id="secondLine"
            name="secondLine"
            value={formData.secondLine}
            type="text"
            autoComplete="off"
            maxLength={255}
            onChange={(e) =>
              setFormData({ ...formData, secondLine: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Second Line"
          />

          {/* City */}
          <label htmlFor="city" className="text-white">
            City
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            type="text"
            autoComplete="off"
            maxLength={50}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="City"
          />

          {/* County */}
          <label htmlFor="county" className="text-white">
            County
          </label>
          <input
            id="county"
            name="county"
            value={formData.county}
            type="text"
            autoComplete="off"
            maxLength={50}
            onChange={(e) =>
              setFormData({ ...formData, county: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="County"
          />

          {/* Country */}
          <label htmlFor="country" className="text-white">
            Country
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            type="text"
            autoComplete="off"
            maxLength={50}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Country"
          />

          {/* Postal Code */}
          <label htmlFor="zip" className="text-white">
            Postal Code
          </label>
          <input
            id="zip"
            name="zip"
            value={formData.zip}
            type="text"
            autoComplete="off"
            maxLength={50}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Postal Code"
          />

          <button
            type="submit"
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {formData.length >= 1
              ? "Resubmit application"
              : "Create application"}
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          We care about your data. Read our{" "}
          <a
            href="#"
            className="font-semibold text-white hover:text-primary-50"
          >
            privacy policy
          </a>
          .
        </p>
      </form>
    </ApplicationLayout>
  );
}

export default Applications;
