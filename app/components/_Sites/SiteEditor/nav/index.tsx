"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Menu } from "react-feather";
import dynamic from "next/dynamic";
import NavItem from "./NavItem";

const NavEditOptions = dynamic(() => import("./NavEditOptions"), { ssr: false });

export type NavItemProps = {
  id: string;
  label: string;
  link: string;
  type: string;
  external?: boolean;
  data?: any;
  active?: boolean;
};

export type NavOptions = {
  navItems: NavItemProps[];
};

type Props = {
  siteName: string;
  publicEstablishmentId?: string;
  readOnly?: boolean;
  navOptions: NavOptions;
  onUpdate?: (data: NavOptions) => void;
};

function Nav({ siteName, publicEstablishmentId = "", readOnly = false, navOptions, onUpdate }: Props) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [model, setModel] = React.useState<NavOptions>({ navItems: [] });
  const [hovering, setHovering] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (navOptions) setModel(navOptions);
  }, [navOptions]);

  console.log("navOptions", navOptions);
  return (
    <>
      <nav
        className={` top-0 inset-x-0 z-50 w-full h-16 hidden lg:block mb-2 transition-all duration-300 ease-in-out ${!readOnly ? "hover:bg-gray-100" : ""}`}
        onMouseEnter={() => !readOnly && setHovering(true)}
        onMouseLeave={() => !readOnly && setHovering(false)}
      >
        {hovering && (
          <button
            style={{ zIndex: 99999 }}
            onClick={() => setEditMode(true)}
            className="fixed top-[70px] w-fit h-fit h-16  text-center text-gray-700 font-semibold text-lg hover:text-indigo-500 transition-all duration-300 ease-in-out cursor-pointer z-50 right-[48vw]"
          >
            Edit NavBar
          </button>
        )}
        <div className="flex flex-row m-5 mx-20  items-center ">
          {model?.navItems?.map((item: NavItemProps, i: number) => {
            return <NavItem key={item.id || i} siteName={siteName} publicEstablishmentId={publicEstablishmentId} readOnly={readOnly} item={item} />;
          })}
        </div>
      </nav>
      {showMobileMenu ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40 slideLeft">
          <div className="flex flex-col items-center  h-full mt-20 relative">
            <XMarkIcon
              className="absolute top-[-10px] left-10 cursor-pointer hover:text-indigo-500 transition-all duration-300 ease-in-out h-[24px] w-[24px] z-60"
              onClick={() => setShowMobileMenu(false)}
            />
            {model?.navItems?.map((item: NavItemProps) => {
              if (!item?.active) return null;
              return <NavItem siteName={siteName} publicEstablishmentId={publicEstablishmentId} readOnly={readOnly} item={item} />;
            })}
          </div>
        </div>
      ) : (
        <Menu
          className="absolute top-[25px] left-10  cursor-pointer lg:hidden hover:text-indigo-500 transition-all duration-300 ease-in-out block z-50"
          size={24}
          onClick={() => setShowMobileMenu(true)}
        />
      )}
      {editMode && <NavEditOptions setEditMode={setEditMode} model={model} setModel={setModel} onUpdate={onUpdate} />}
    </>
  );
}

export default Nav;
