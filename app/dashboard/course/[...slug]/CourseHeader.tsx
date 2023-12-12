"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import React from "react";

function CourseHeader() {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  const [navOpen, setNavOpen] = React.useState(true);
  return <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />;
}

export default CourseHeader;
