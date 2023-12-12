import React from "react";
import Link from "next/link";
import { NavItemProps } from ".";

type Props = {
  siteName: string;
  publicEstablishmentId?: string;
  readOnly?: boolean;
  item: NavItemProps;
};

function NavItem({ siteName, publicEstablishmentId = "", readOnly = false, item }: Props) {
  return (
    <>
      <Link
        href={
          process.env.NODE_ENV === "development"
            ? readOnly
              ? "http://dev.mosque.icu:3000" + item.link
              : `http://dev.mosque.icu:3000/dashboard/site/${publicEstablishmentId}?label=${siteName}`
            : readOnly
            ? `https://${siteName}.mosque.icu${item.link}`
            : `https://${siteName}.mosque.icu/dashboard/site/dev?label=${siteName}`
        }
        className="cursor-pointer hover:text-indigo-500 transition-all duration-300 ease-in-out
            text text-gray-700 font-semibold text-lg w-fit-content"
      >
        {item.label}
      </Link>
    </>
  );
}

export default NavItem;
