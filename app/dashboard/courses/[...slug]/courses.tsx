"use client";
import { Course } from "@/_types/dbTypes";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import Courses from "@/app/components/_Courses/Courses";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

function CoursesPage({ data }: { data: Course[] }) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [navOpen, setNavOpen] = React.useState(true);

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <Toaster />
      <div className={navOpen ? "page-wrapper" : "page-wrapper-full"}>
        <Courses courses={data} publicEstablishmentId={publicEstablishmentId} currentEstablishment={currentEstablishment} />
      </div>
    </>
  );
}

export default CoursesPage;
