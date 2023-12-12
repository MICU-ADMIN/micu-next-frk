"use client";

import React from "react";
import { EventPage } from "./EventPage";
import { Toaster } from "react-hot-toast";
// import SideBarLayout from '.../../../app/components/__Layouts/homesidebar';
import { Loader } from "react-feather";
import loading from "../../account/[...slug]/loading";
import { useEstablishment } from "../../../../app/_helpers/web/hooks/useEstablishment";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";

function page() {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  return (
    <>
      <Toaster />
      <EventPage />
    </>
  );
}

export default page;
