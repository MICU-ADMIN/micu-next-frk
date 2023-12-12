"use client";

import {
  useState,
  useEffect,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useRouter } from "next/navigation";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { removeFromCache } from "@/app/_helpers/web/requestHandler";
import { ChevronLeft } from "react-feather";

const navigation = [
  {
    name: "Website",
    href: "sites",
    current: true,
  },
  {
    name: "Displays",
    href: "displays",
    current: true,
  },
  {
    name: "Articles",
    href: "articles",
    current: true,
  },
  {
    name: "Uploads",
    href: "upload",
    current: false,
  },
  {
    name: "Prayers",
    href: "prayers",
    current: false,
  },

  {
    name: "Records",
    href: "records",
    current: false,
  },
  // {
  // 	name: 'Commerce',
  // 	href: 'sites',
  // 	icon: UsersIcon,
  // 	current: false,
  // },
  {
    name: "Events",
    href: "events",
    current: false,
  },
  {
    name: "Marketing",
    href: "marketing",
    current: false,
  },
  {
    name: "Scheduling",
    href: "scheduling",
    current: false,
  },
  {
    name: "Assets",
    href: "assets",
    current: false,
  },
  {
    name: "Incidents",
    href: "incidents",
    current: false,
  },
  {
    name: "Analytics",
    href: "analytics",
    current: false,
  },
  {
    name: "Settings",
    href: "settings",
    current: false,
  },
  {
    name: "Help",
    href: "help",
    current: false,
  },
];

const publicId = (currentEstablishment: {
  establishmentName: any;
  name: any;
}) => {
  console.log("currentEstablishment", currentEstablishment);
  return currentEstablishment?.establishmentName || currentEstablishment?.name;
};

export default function SideBarLayout(props: {
  currentEstablishment: any;
  sideBar: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animationProp, setAnimationProp] = useState({ status: false });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // this is the animation prop so when a animation needs to be made we change this to show,hide ect
  // I made this to allow us to remotely activate animations and diverse animations

  //First name and last name are from user . There should be aservice which fetches it from the user table

  async function userNavigationFunctionHandler(func: string) {
    switch (func) {
      case "logOut":
        // console.log('logging out')
        localStorage.removeItem(publicId(props.currentEstablishment));
        localStorage.removeItem("currentUser");
        removeFromCache(publicId(props.currentEstablishment));
        await logOut();
        router.push("/login");
        break;
      case "home":
        router.push("/dashboard/home/" + publicId(props.currentEstablishment));
        break;
      case "displays":
        router.push(
          "/dashboard/displays/" + publicId(props.currentEstablishment)
        );
        break;
      case "articles":
        router.push(
          "/dashboard/articles/" + publicId(props.currentEstablishment)
        );
        break;
      case "upload":
        router.push(
          "/dashboard/upload/" + publicId(props.currentEstablishment)
        );
        break;
      case "sites":
        router.push("/dashboard/sites/" + publicId(props.currentEstablishment));
        break;
      case "prayers":
        router.push(
          "/dashboard/prayers/" + publicId(props.currentEstablishment)
        );
        break;
      case "records":
        router.push(
          "/dashboard/records/" + publicId(props.currentEstablishment)
        );
        break;
      case "events":
        router.push(
          "/dashboard/events/" + publicId(props.currentEstablishment)
        );
        break;
      case "marketing":
        router.push(
          "/dashboard/marketing/" + publicId(props.currentEstablishment)
        );
        break;
      case "analytics":
        router.push(
          "/dashboard/analytics/" + publicId(props.currentEstablishment)
        );
        break;
      case "settings":
        router.push(
          "/dashboard/settings/" + publicId(props.currentEstablishment)
        );
        break;
      case "incidents":
        router.push(
          "/dashboard/incidents/" + publicId(props.currentEstablishment)
        );
        break;
      case "assets":
        router.push(
          "/dashboard/assets/" + publicId(props.currentEstablishment)
        );
        break;
      case "scheduling":
        router.push(
          "/dashboard/scheduling/" + publicId(props.currentEstablishment)
        );
        break;
      case "help":
        // navigate(routes.events({ publicId: publicId(currentEstablishment) }))
        router.push("/dashboard/help/" + publicId(props.currentEstablishment));
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div>
        <div>
          {showMobileMenu ? (
            <div className="relative z-50 lg:hidden slideLeft">
              <div
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-gray-900/80"
                  onClick={() => setShowMobileMenu(false)}
                ></div>
              </div>

              <div className="fixed inset-0 flex">
                <div
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative mr-16 flex w-full max-w-xs flex-1">
                    <div
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-400 px-6 pb-2">
                      <div className="flex h-16 shrink-0 items-center">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                          alt="Your Company"
                        />
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul className="group block flex-1 flex-col gap-y-7 transition duration-300 ease-in-out">
                          <li>
                            <SidebarFadeAnimation
                              sideBar={props.sideBar}
                              setAnimationProp={setAnimationProp}
                              trigger={animationProp?.status}
                              enter={"transition-opacity duration-700"}
                              enterFrom={"opacity-0"}
                              enterTo={"opacity-100"}
                              leave={"transition-opacity duration-300"}
                              leaveFrom={"opacity-100"}
                              leaveTo={"opacity-0"}
                            >
                              {props.sideBar ? (
                                <>{props.sideBar}</>
                              ) : (
                                <ul className="-mx-2 space-y-1 h-screen">
                                  {navigation.map((item) => (
                                    <li
                                      key={item.name}
                                      onClick={() =>
                                        userNavigationFunctionHandler(item.href)
                                      }
                                    >
                                      <p className="group text-3xl transition duration-300 hover:text-primary-600 cursor-pointer mb-2">
                                        {item.name}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </SidebarFadeAnimation>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex  lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-hidden  border-r border-gray-200 bg-[#F8F9FA] px-6">
            <div className="fadeIn flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/islamicware-c2616.appspot.com/o/symbol_82%20Background%20Removed.svg?alt=media&token=f6abeb15-eeed-4f10-b5b1-26ea9aac3c21"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7  pt-10">
                <li>
                  <SidebarFadeAnimation
                    sideBar={props.sideBar}
                    setAnimationProp={setAnimationProp}
                    trigger={animationProp?.status}
                    enter={"transition-opacity duration-700"}
                    enterFrom={"opacity-0"}
                    enterTo={"opacity-100"}
                    leave={"transition-opacity duration-300"}
                    leaveFrom={"opacity-100"}
                    leaveTo={"opacity-0"}
                  >
                    {props.sideBar ? (
                      <>{props.sideBar}</>
                    ) : (
                      <>
                        <ul className="mx-2">
                          {navigation.map((item) => (
                            <div key={item}>
                              <button
                                onClick={() =>
                                  userNavigationFunctionHandler(item.href)
                                }
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                                className="group cursor-pointer  font-bold tracking-tight text-2xl text-black subpixel-antialiased transition duration-300 hover:text-primary-600"
                              >
                                {item.name}
                                <span className="block h-1 max-w-0 rounded-md bg-primary-600 transition-all duration-700 group-hover:max-w-full"></span>
                              </button>
                            </div>
                          ))}
                        </ul>
                      </>
                    )}
                  </SidebarFadeAnimation>
                </li>

                <li
                  onClick={() => {
                    router.push(
                      "/dashboard/account/" +
                        publicId(props.currentEstablishment)
                    );
                  }}
                  className="slideIn -mx-6 mt-auto"
                >
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <div className="flex-col">
                      <span aria-hidden="true">Tom Cook</span>
                      <p
                        style={{
                          fontWeight: "100",
                          color: "#474748",
                        }}
                      >
                        Hossamsulleman@gmail.com
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#F8F9FA] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <p>
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </p>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
        </main>
      </div>
    </>
  );
}

function SidebarFadeAnimation(props: {
  setAnimationProp: (arg0: boolean) => void;
  sideBar: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  useEffect(() => {
    props.setAnimationProp(true);
  }, []);

  const [isShowing, setIsShowing] = useState(true);

  return (
    <div>
      {props.sideBar ? (
        <button
          className="mb-10 flex align-center"
          onClick={() => window.history.back()}
        >
          <ChevronLeft /> Go back
        </button>
      ) : null}
      <div
        show={isShowing}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-800 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {props.children}
      </div>
      {/* {props.children} */}
    </div>
  );
}

function logOut() {
  throw new Error("Function not implemented.");
}
