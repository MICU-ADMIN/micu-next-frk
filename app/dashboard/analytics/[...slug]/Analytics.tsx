"use client";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";

import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import { Toaster } from "react-hot-toast";
import React, { Fragment, useState } from "react";
import Loader from "@/app/components/Elements/Loader/Loader";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import DashboardLayout from "@/app/components/Dashboards/DashboardLayout";

const Logo = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="cursor-pointer h-8 w-8"
    >
      <mask id="mask0_566_52282" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <rect width="28" height="28" rx="10" transform="matrix(-1 0 0 1 28 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_566_52282)"></g>
      <mask id="mask1_566_52282" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <rect width="28" height="28" rx="10" transform="matrix(-1 0 0 1 28 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask1_566_52282)">
        <rect width="32.3855" height="31.7108" rx="10" transform="matrix(-1 0 0 1 30.0244 -2.02411)" fill="url(#pattern0)" />
        <rect width="32.3855" height="31.7108" rx="10" transform="matrix(-1 0 0 1 30.0244 -2.02411)" fill="url(#paint0_linear_566_52282)" fillOpacity="0.8" />
      </g>
      <mask id="mask2_566_52282" maskUnits="userSpaceOnUse" x="4" y="4" width="28" height="28">
        <rect width="28" height="28" rx="10" transform="matrix(-1 0 0 1 32 4)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask2_566_52282)">
        <rect width="32.3855" height="31.7108" rx="10" transform="matrix(-1 0 0 1 34.0244 1.97589)" fill="url(#pattern1)" />
        <rect width="32.3855" height="31.7108" rx="10" transform="matrix(-1 0 0 1 34.0244 1.97589)" fill="url(#paint1_linear_566_52282)" fillOpacity="0.6" />
      </g>
      <path
        d="M27.3149 15.132C26.9362 15.132 26.63 15.4401 26.63 15.8209V21.2811C26.63 21.8078 26.348 22.2578 25.8766 22.4847C25.4052 22.7117 24.8774 22.655 24.4705 22.3225L19.0958 17.9987L24.2368 13.6867C24.4182 13.5611 24.539 13.3545 24.539 13.1153C24.539 12.7344 24.2327 12.4264 23.8541 12.4264C23.713 12.4264 23.5801 12.4709 23.4713 12.5439C23.4552 12.552 23.4431 12.5642 23.4269 12.5764L17.9999 17.1151L12.3835 12.6008C11.5657 11.9402 10.4738 11.8146 9.53109 12.2725C8.58431 12.7264 8 13.6665 8 14.7201V21.2809C8 22.3346 8.58416 23.2707 9.53109 23.7286C10.4739 24.1824 11.5696 24.0569 12.3835 23.4002L17.9999 18.8818L23.6122 23.4002C24.1038 23.7974 24.696 24 25.2964 24C25.6912 24 26.094 23.9108 26.4689 23.7286C27.4157 23.2707 27.9998 22.3346 27.9998 21.2809V15.8209C27.9998 15.4401 27.6936 15.132 27.3149 15.132ZM11.5293 22.3225C11.1184 22.6548 10.5945 22.7117 10.1233 22.4847C9.65185 22.2578 9.36985 21.808 9.36985 21.2811V14.7203C9.36985 14.1935 9.65185 13.7396 10.1233 13.5127C10.3127 13.4235 10.51 13.379 10.7035 13.379C10.9976 13.379 11.2837 13.4763 11.5295 13.6748L16.904 17.9987L11.5293 22.3225ZM28 12.689C28 13.0694 27.6933 13.3779 27.3151 13.3779C26.9369 13.3779 26.6301 13.0694 26.6301 12.689C26.6301 12.3086 26.9369 12.0001 27.3151 12.0001C27.6934 12.0001 28 12.3084 28 12.689Z"
        fill="white"
      />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_566_52282" transform="matrix(0.00492505 0 0 0.00505465 -4.83333 -7.94331)" />
        </pattern>
        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_566_52282" transform="matrix(0.00492505 0 0 0.00505465 -4.83333 -7.94331)" />
        </pattern>
        <linearGradient id="paint0_linear_566_52282" x1="28.5242" y1="16.0241" x2="2.02417" y2="21.5241" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A5CCE2" />
          <stop offset="1" stopColor="#A5CCE2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_566_52282" x1="6.02417" y1="6.02411" x2="29.0242" y2="27.0241" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9517AF" />
          <stop offset="1" stopColor="#3206D3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function AnalyticsPage({ data }: any) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [options, setOptions] = React.useState({
    page: 1,
    total: 0,
    limit: 25,
  });
  const [navOpen, setNavOpen] = React.useState(true);

  return (
    <>
      {!currentEstablishment && <Loader />}
      <Toaster />
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />

      <div className={navOpen ? "page-wrapper" : "page-wrapper-full"}>
        <DashboardLayout />
      </div>
    </>
  );
}
