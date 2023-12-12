"use client";
import React, { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "../Elements/Spinner/Spinner";
import { getCurrentUser } from "@/actions/user-actions";
import { OrgUser, User } from "@/_types/dbTypes";
import Nav from "../__Layouts/Nav/Nav";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { Toaster } from "react-hot-toast";
import Loader from "../Elements/Loader/Loader";
import { ArrowDown, ArrowRight, ArrowUp } from "react-feather";
import Button from "../Elements/Button/Button";
import Link from "next/link";
import { ArrowRightCircle, SatelliteDish } from "lucide-react";

const DropDowns = dynamic(() => import("./DashboardDropDowns"), {
  loading: () => <Spinner />,
});

const Chart = dynamic(() => import("./DashbardChart"), {
  loading: () => <Spinner />,
});

const people = [
  {
    name: "btc",
    img: "/assets/admin/analytics-dashboard/btc.png",
    price: "$224,300.40",
    percentage: "7.2526",
    color: "red",
  },
  {
    name: "ust",
    img: "/assets/admin/analytics-dashboard/ust.png",
    price: "$13,400.20",
    percentage: "9.5256",
    color: "green",
  },
  {
    name: "eth",
    img: "/assets/admin/analytics-dashboard/eth.png",
    price: "$4,000.80",
    percentage: "8.4",
    color: "green",
  },
  {
    name: "car",
    img: "/assets/admin/analytics-dashboard/car.png",
    price: " $1,900.1,",
    percentage: "8.4",
    color: "red",
  },
];

const userList = [
  "/assets/admin/analytics-dashboard/user1.svg",
  "/assets/admin/analytics-dashboard/user2.svg",
  "/assets/admin/analytics-dashboard/user3.svg",
  "/assets/admin/analytics-dashboard/user4.svg",
  "/assets/admin/analytics-dashboard/user5.svg",
];

const TableData = [
  {
    title: "Insurance",
    description: "Property Coverage",
    account: "LTC Wallet",
    balance: "-$4.012",
    payment: "Mon, 20 May - 01:10",
    image: "/assets/admin/analytics-dashboard/table-icon1.svg",
    color: "red",
  },
  {
    title: "Electricity",
    description: "Utility Payment",
    account: "BTC Wallet",
    balance: "-$2.092",
    payment: "Mon, 20May - 01:10",
    image: "/assets/admin/analytics-dashboard/table-icon2.svg",
    color: "red",
  },
  {
    title: "Omar Griffith ",
    description: "Utility Payment ",
    account: "ETH Wallet ",
    balance: "+$1.089 ",
    payment: "Mon, 28 Apr - 01:10 ",
    image: "/assets/admin/analytics-dashboard/table-icon3.svg",
    color: "green",
  },
  {
    title: "Electricity",
    description: "Utility Payment ",
    account: "BTC Wallet ",
    balance: " -$833",
    payment: " Mon, 28 Apr - 01:10",
    image: "/assets/admin/analytics-dashboard/table-icon4.svg",
    color: "red",
  },
  {
    title: "Insurance ",
    description: " Property Coverage",
    account: "BTC Wallet ",
    balance: "-$1.458 ",
    payment: "Mon, 28 Apr - 01:10 ",
    image: "/assets/admin/analytics-dashboard/table-icon5.svg",
    color: "red",
  },
  {
    title: "Nettie Barnett ",
    description: "Property Coverage ",
    account: "LTC Wallet ",
    balance: " +$1.089",
    payment: "Mon, 18 Apr - 01:10 ",
    image: "/assets/admin/analytics-dashboard/table-icon6.svg",
    color: "green",
  },
  {
    title: "Junaid Horn ",
    description: " Property Coverage",
    account: "ETH Wallet",
    balance: "+$1.089 ",
    payment: "Mon, 16 Apr - 01:10",
    image: "/assets/admin/analytics-dashboard/table-icon7.svg",
    color: "red",
  },
];

const crypto = [
  {
    name: "btc",
    img: "/assets/admin/analytics-dashboard/btc.png",
    price: "$224,300.40",
    percentage: "7.2526",
    color: "red",
  },
  {
    name: "ust",
    img: "/assets/admin/analytics-dashboard/ust.png",
    price: "$13,400.20",
    percentage: "9.5256",
    color: "green",
  },
  {
    name: "eth",
    img: "/assets/admin/analytics-dashboard/eth.png",
    price: "$4,000.80",
    percentage: "8.4",
    color: "green",
  },
  {
    name: "car",
    img: "/assets/admin/analytics-dashboard/car.png",
    price: " $1,900.1,",
    percentage: "8.4",
    color: "red",
  },
];
const DashboardLayout = ({ data }) => {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  const [show, setShow] = useState(false);
  const [user, setUser] = useState<(User & { orgs: OrgUser[] }) | null>(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [navOpen, setNavOpen] = React.useState(true);

  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  }, []);

  if (!user) return <Loader />;

  return (
    <>
      <Toaster />
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <div className={navOpen ? "page-wrapper" : "page-wrapper-full"}>
        <div className={`w-full bg-white min-h-[100vh] admin-analytics  font-poppins sm:overflow-auto ${show ? "overflow-hidden h-screen" : "overflow-auto"}`}>
          <div className="w-full flex">
            <div className="flex flex-col w-full mt-4">
              {/* <div className="flex py-5 px-4 sm:px-7 w-full items-center justify-between sm:justify-end bg-white sm:gap-11">
              <div
                className="cursor-pointer sm:hidden border border-[#E7E7E7] hover:border-blue-600 group rounded-md flex justify-center items-center"
                onClick={openSidebar}
              >
                <svg
                  className="group-hover:text-blue-600 text-[#637381] w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div className="flex sm:hidden gap-2 items-center">
                <Logo />
                <span className="font-inter text-xl font-semibold text-[#233047] cursor-pointer">infyToken</span>
              </div>
            </div> */}
              <div
                className={`py-7 px-7 flex w-full gap-7 transition-all duration-1000 ease-in-out ${
                  openSideBar
                    ? "sm:max-w-[calc(100vw_-_229px)] lg:max-w-[calc(100vw_-_286px)] "
                    : "sm:max-w-[calc(100vw_-_99px)] lg:max-w-[calc(100vw_-_110px)] xl:max-w-[calc(100vw_-_138px)]"
                }`}
              >
                <div
                  className={`flex flex-col w-full gap-7 ${
                    openSideBar ? "w-full lg:max-w-[calc(100%_-_320px)]" : "md:max-w-[calc(100%_-_255px)] lg:max-w-[calc(100%_-_420px)]"
                  } xl:max-w-[calc(100%_-_390px)]`}
                >
                  <div className="bg-gradient-to-tl to-indigo-600 from-blue-500 rounded-xl p-5 relative overflow-hidden">
                    <svg
                      width="581"
                      height="239"
                      viewBox="0 0 581 239"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -top-14 -right-[27rem] sm:-right-64 lg:-top-28"
                    >
                      <path
                        d="M527.607 1.7273C580.879 -33.0372 543.535 -81.6071 518.204 -101.546C439.881 -162.473 430.701 -91.4797 317.582 -143.722C204.463 -195.965 227.141 -159.2 83.8863 17.2559C-59.3679 193.712 128.456 191.653 151.46 157.066C174.465 122.48 215.973 138.631 267.533 191.898C319.093 245.165 448.712 151.23 426.229 94.617C403.746 38.0046 461.017 45.183 527.607 1.7273Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                      <path
                        d="M504.037 3.63866C552.037 -27.7193 518.379 -71.544 495.551 -89.5367C424.965 -144.515 416.703 -80.4656 314.764 -127.614C212.825 -174.762 233.264 -141.589 104.2 17.5917C-24.8647 176.773 144.384 174.939 165.109 143.738C185.834 112.537 223.239 127.114 269.707 175.178C316.175 223.243 432.963 138.51 412.696 87.4313C392.43 36.3523 444.038 42.836 504.037 3.63866Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                      <path
                        d="M485.755 5.0211C529.659 -23.6299 498.882 -63.6584 478.006 -80.0913C413.456 -130.304 405.891 -71.7948 312.664 -114.85C219.438 -157.906 238.127 -127.606 120.065 17.8189C2.00333 163.244 156.797 161.547 175.756 133.043C194.715 104.539 228.924 117.849 271.416 161.749C313.909 205.649 420.734 128.232 402.205 81.5755C383.675 34.9188 430.875 40.8348 485.755 5.0211Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                      <path
                        d="M468.499 6.88949C508.518 -19.2443 480.459 -55.7637 461.428 -70.7567C402.583 -116.569 395.692 -63.1941 310.707 -102.48C225.722 -141.766 242.761 -114.123 135.153 18.5341C27.5446 151.191 168.648 149.656 185.928 123.654C203.208 97.6522 234.392 109.798 273.13 149.85C311.868 189.902 409.239 119.286 392.344 76.721C375.45 34.1558 418.476 39.5567 468.499 6.88949Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                      <path
                        d="M449.738 8.32684C485.547 -15.0868 460.432 -47.8173 443.399 -61.2558C390.732 -102.319 384.573 -54.4882 308.515 -89.7062C232.456 -124.924 247.709 -100.15 151.43 18.7138C55.1508 137.577 181.423 136.222 196.883 112.923C212.343 89.6242 240.251 100.513 274.924 136.411C309.596 172.309 396.722 109.041 381.597 70.8944C366.473 32.7477 404.977 37.5939 449.738 8.32684Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                      <path
                        d="M430.012 9.82216C461.401 -10.6816 439.392 -39.336 424.464 -51.1002C378.306 -87.047 372.903 -45.1683 306.242 -75.9951C239.581 -106.822 252.947 -85.1321 168.546 18.9493C84.1452 123.031 194.822 121.83 208.375 101.429C221.928 81.0282 246.389 90.5588 276.775 121.985C307.161 153.412 383.533 98.0083 370.281 64.6106C357.028 31.213 390.777 35.4519 430.012 9.82216Z"
                        stroke="white"
                        strokeOpacity="0.13"
                      />
                    </svg>
                    <div className="flex gap-4 sm:flex-wrap ssm:gap-12 xl:gap-6 flex-col xl:flex-row xl:justify-between xl:items-end lg:h-fit">
                      <div className="flex flex-col gap-3">
                        <span className="text-[22px] font-semibold text-[#FDFDFF]">
                          Welcome back, {user?.firstName} {user?.lastName}
                        </span>
                        <div className="flex gap-1 items-center">
                          <span className="font-medium text-sm text-white/80"> {user?.email}</span>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.90625 9.375H2.65625C2.53193 9.375 2.4127 9.32561 2.32479 9.23771C2.23689 9.1498 2.1875 9.03057 2.1875 8.90625V2.5C2.1875 2.41712 2.22042 2.33763 2.27903 2.27903C2.33763 2.22042 2.41712 2.1875 2.5 2.1875H8.90625C9.03057 2.1875 9.1498 2.23689 9.23771 2.32479C9.32561 2.4127 9.375 2.53193 9.375 2.65625V8.90625C9.375 9.03057 9.32561 9.1498 9.23771 9.23771C9.1498 9.32561 9.03057 9.375 8.90625 9.375Z"
                              fill="white"
                              fillOpacity="0.8"
                            />
                            <path
                              d="M2.1875 1.5625H7.8125V1.09375C7.8125 0.96943 7.76311 0.850201 7.67521 0.762294C7.5873 0.674386 7.46807 0.625 7.34375 0.625H1.17188C1.02683 0.625 0.887735 0.682617 0.785176 0.785176C0.682617 0.887735 0.625 1.02683 0.625 1.17188V7.34375C0.625 7.46807 0.674386 7.5873 0.762294 7.67521C0.850201 7.76311 0.96943 7.8125 1.09375 7.8125H1.5625V2.1875C1.5625 2.02174 1.62835 1.86277 1.74556 1.74556C1.86277 1.62835 2.02174 1.5625 2.1875 1.5625Z"
                              fill="white"
                              fillOpacity="0.8"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-[#FDFDFF] tracking-[1.4px] mb-[80px]"> {user?.orgs[0]?.role || "Admin"}</span>

                        {/* <span className="text-[22px] font-bold text-[#FDFDFF]">$31,300.40</span>
                        <span className="text-sm font-medium text-[#FDFDFF] tracking-[1.4px]">28.6165489 BTC</span> */}
                      </div>
                      <div className="flex gap-7 flex-col ssm:flex-row h-full sm:justify-start self-start ssm:self-auto z-10">
                        <div className="flex flex-col gap-3 h-fit">
                          <div className="flex flex-col pl-1">
                            <span className="text-sm font-semibold text-white/80 tracking-[1.5px]">Income</span>
                            <span className="text-lg font-semibold text-[#FDFDFF]">$459.20</span>
                          </div>
                          <button className="py-2.5 rounded-[10px] font-semibold text-white text-center bg-[#f9f9f94d] min-w-[150px] text-lg hover:scale-105">
                            Receive
                          </button>
                        </div>
                        <div className="flex flex-col gap-3 h-fit">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white/80 tracking-[1.5px]">Income</span>
                            <span className="text-lg font-semibold text-[#FDFDFF]">$250.40</span>
                          </div>
                          <button className="py-2.5 rounded-[10px] font-semibold text-white text-center bg-[#f9f9f94d] min-w-[150px] text-lg hover:scale-105">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={` block ${openSideBar ? " lg:hidden" : "md:hidden"}`}>
                    <CryptoCoin />
                  </div>
                  <div className="bg-[#FDFDFF] rounded-md ">
                    <div className="p-5 flex flex-col overflow-hidden overflow-x-auto gap-5 scrollbar-thin !scrollbar-thumb-[#7851BD] scrollbar-track-[#EDEDED] rounded-xl">
                      <span className="text-[#212B36] text-lg font-semibold">Monthly metrics</span>
                      <div className="flex flex-col sm:flex-row gap-5">
                        {data.monthlyMetrics?.map((data, index) => (
                          <div className="flex flex-col gap-5 border border-[#7851bd33] p-5 rounded-xl w-full sm:max-w-xs" key={index}>
                            <div className="flex justify-between w-full sm:min-w-[200px] items-center">
                              <div className="flex gap-2.5 items-center">
                                <SatelliteDish className="text-indigo-500" />
                                <span className="text-sm font-medium text-[#212B36] !capitalize">{data?.name}</span>
                              </div>

                              <Link href={`/dashboard/${data?.name.toLowerCase()}/${publicEstablishmentId}?create=true`} passHref>
                                <Button size="sm" variant="icon">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[12px]"> Create new </span>
                                    <ArrowRightCircle className="text-gray-500" size={16} />
                                  </div>
                                </Button>
                              </Link>

                              {/* <img src="/assets/admin/analytics-dashboard/dots.svg" alt="dots" className="cursor-pointer" /> */}
                            </div>
                            <div>{/* <img src={data?.graph} alt="graph" className="object-fill w-full" /> */}</div>
                            <div className="flex justify-between flex-wrap sm:flex-nowrap">
                              <div className="flex gap-2.5">
                                {/* <img src={data?.coinImage} alt="crypto image" className="h-9 w-9" /> */}
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-[#637381]">Last 30 days</span>
                                  <span className="text-sm font-medium text-[#212B36] ">{data?.value}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 self-end">
                                {data.percentage > 0 ? <ArrowUp className="text-[#45CB85]" /> : <ArrowDown className="text-[#DC3545]" />}

                                <span className={`font-inter text-xs font-medium ${data?.color == "green" ? "text-[#45CB85]" : "text-[#DC3545]"}`}>
                                  {data?.percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FDFDFF] rounded-2xl block md:hidden">
                    <Chat />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <span className="text-lg font-semibold text-[#212B36]">Activity</span>
                      <div className="w-full overflow-x-scroll scrollbar-thumb-[#7851BD] scrollbar-track-[#EDEDED] scrollbar-thin md:overflow-auto max-w-xl xs:max-w-xl sm:max-w-xl md:max-w-7xl 2xl:max-w-none mt-1">
                        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1.5">
                          <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                            <tr className="">
                              <th className="py-3 pl-3 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">Activity</th>
                              <th className="py-3 pl-2 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">Account</th>
                              <th className="py-3 pl-2 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">Last Payment</th>
                              <th className="py-3 pl-2 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap  rounded-r-lg">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {TableData.map((data, index) => (
                              <tr key={index} className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:drop-shadow-2xl cursor-pointer bg-[#f6f8fa]">
                                <td className="py-5 pl-3 text-sm font-normal text-[#637381] rounded-l-lg border-y border-l border-[#7851BD]/20">
                                  <div className="relative flex gap-3 items-center">
                                    <div className="">
                                      <img src={data?.image} alt="hepta-brown" className="min-w-[42px] min-h-[42px]" />
                                    </div>
                                    <div className="flex flex-col whitespace-nowrap">
                                      <span className="text-xs md:text-sm text-[#212B36]">{data?.title}</span>
                                      <span className="text-xs md:text-sm text-[#637381] mt-1">{data?.description}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-5 px-2 text-xs md:text-sm font-normal text-[#637381]  border-y  border-x-0 border-[#7851BD]/20">
                                  {data.account}
                                </td>
                                <td className="py-5 px-2 text-xs md:text-sm font-normal text-[#637381]  border-y border-x-0 border-[#7851BD]/20">
                                  {data.payment}
                                </td>
                                <td className={`py-5 px-2 text-xs md:text-sm font-normal text-[#637381] rounded-r-lg  border-y border-r border-[#7851BD]/20`}>
                                  {data.balance}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl block md:hidden">
                    <Chart />
                  </div>
                </div>
                <div
                  className={`flex-col gap-7 w-full max-w-[230px] ${openSideBar ? " lg:max-w-[336px]" : "lg:max-w-[400px]"} xl:max-w-[390px] ${
                    openSideBar ? "hidden lg:flex" : "hidden sm:flex"
                  }`}
                >
                  <div className="">
                    <CryptoCoin />
                  </div>
                  <div className="bg-[#FDFDFF] rounded-2xl">
                    <Chat />
                  </div>
                  <div className="bg-white rounded-2xl">
                    <Chart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const CryptoCoin = () => {
  return (
    <div className="flex flex-col gap-3.5 w-ful justify-between h-full">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-[#212B36]">Assets</span>
        <span className="text-sm font-medium text-[#637381] cursor-pointer hover:text-[#7851BD] mr-2">View All</span>
      </div>
      <div className="overflow-hidden overflow-x-auto flex gap-5 pb-2 scrollbar-thumb-[#7851BD] scrollbar-track-[#EDEDED] scrollbar-thin">
        {crypto?.map?.((data, index) => (
          <div className="py-5 px-3.5 flex gap-3.5 flex-col min-w-[183px] rounded-lg bg-white border border-[#7851bd33]" key={index}>
            <div className="flex gap-2.5 items-center">
              <img src={data?.img} />
              <span className="text-lg font-medium tracking-[1.8px] text-[#637381] uppercase">{data?.name}</span>
            </div>
            <span className="text-lg font-semibold text-[#212B36] tracking-[1.8px]">$224,300.40</span>
            <span className={`text-sm font-medium ${data?.color == "red" ? "text-[#DA1818]" : "text-[#32A953]"} `}>7.2526</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export const Chat = () => {
  return (
    <div className="py-6 flex flex-col gap-5 ">
      <div className="flex flex-col gap-3 px-5">
        <div className="flex justify-between md:flex-col gap-3 lg:flex-row lg:justify-between">
          <span className="text-lg font-semibold text-[#212B36] whitespace-nowrap">Send Money</span>
          <button className="px-5 py-1.5 text-[#637381] hover:bg-gradient-to-tl hover:to-[#7851BD] hover:from-[#4E4BCF] text-base tracking-[1.6px] bg-[#EDEDED] rounded-[40px] text-center h-fit w-fi hover:text-white whitespace-nowrap self-end">
            View All
          </button>
        </div>
        <div className="flex justify-between flex-wrap gap-2 lg:gap-0 lg:flex-nowrap ">
          <div className="flex gap-7 flex-wrap">
            {userList?.map((data, index) => (
              <img src={data} alt="user" key={index} className="h-9 w-9" />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#7851bd33] px-5 pt-5 flex gap-7 flex-col">
        <div className="flex flex-col gap-2 xl:flex-row xl:justify-between w-full">
          <span className="font-semibold text-lg text-[#212B36] tracking-[1px]">Operations</span>
          <div className="p-2 bg-[#EDEDED] rounded-lg flex flex-wrap">
            <span className="bg-[#EDEDED] hover:bg-white text-sm px-2.5 py-1.5 rounded-md tracking-[1.5px] cursor-pointer hover:shadow-[0_2px_10px_0_rgba(0,0,0,0.1)]">
              Buy
            </span>
            <span className="bg-[#EDEDED] hover:bg-white text-sm px-2.5 py-1.5 rounded-md tracking-[1.5px] cursor-pointer hover:shadow-[0_2px_10px_0_rgba(0,0,0,0.1)]">
              Sell
            </span>
            <span className="bg-[#EDEDED] hover:bg-white text-sm px-2.5 py-1.5 rounded-md cursor-pointer tracking-[1.5px] hover:shadow-[0_2px_10px_0_rgba(0,0,0,0.1)]">
              Exchange
            </span>
          </div>
        </div>
        <div className="">
          <div className="">
            <span className="text-sm text-[#637381]">You pay</span>
            <div className="py-2 pl-1.5 bg-[#EDEDED] flex justify-between flex-wrap gap-3 rounded-lg">
              <DropDowns
                list={people}
                selectedIcon={people[1]}
                type="crypto"
                style="flex p-1.5 bg-[#FDFDFF] gap-2 items-center w-fit rounded-lg tracking-[1.4px] uppercase w-[95px]"
              />
              <div className="flex gap-4 items-center mr-4 ml-1.5">
                <span className="text-[#212B36] font-semibold text-sm tracking-[1.5px]">$321.40</span>
                <button className="px-2 py-0.5 text-xs uppercase bg-indigo-500 rounded-[20px] text-[#FDFDFF] font-bold tracking-[1px]">Max</button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path
                d="M8.32195 15.7694L11.7481 12.5688C11.828 12.4942 11.8913 12.4057 11.9345 12.3082C11.9778 12.2107 12 12.1062 12 12.0007C12 11.7876 11.9094 11.5833 11.7481 11.4326C11.5868 11.282 11.3681 11.1973 11.14 11.1973C10.9119 11.1973 10.6931 11.282 10.5318 11.4326L8.57034 13.273L8.57034 3.99927C8.57034 3.78706 8.4801 3.58354 8.31947 3.43349C8.15884 3.28343 7.94097 3.19913 7.71381 3.19913C7.48664 3.19913 7.26877 3.28343 7.10814 3.43349C6.94751 3.58354 6.85727 3.78706 6.85727 3.99927L6.85727 15.2013C6.85811 15.3593 6.90899 15.5135 7.0035 15.6445C7.098 15.7755 7.2319 15.8774 7.38832 15.9374C7.54431 15.9987 7.71622 16.0155 7.88238 15.9856C8.04854 15.9556 8.2015 15.8804 8.32195 15.7694ZM5.14419 12.0007L5.14419 0.798694C5.14335 0.640725 5.09247 0.486524 4.99796 0.355524C4.90346 0.224524 4.76956 0.122587 4.61314 0.0625601C4.45715 0.00128542 4.28524 -0.0154558 4.11908 0.014449C3.95292 0.0443537 3.79996 0.119564 3.67951 0.230591L0.253364 3.43117C0.173082 3.50556 0.109359 3.59405 0.0658735 3.69156C0.0223882 3.78906 3.81443e-07 3.89365 3.76826e-07 3.99927C3.72209e-07 4.1049 0.0223881 4.20949 0.0658734 4.30699C0.109359 4.4045 0.173082 4.49299 0.253364 4.56738C0.33299 4.64237 0.427723 4.7019 0.5321 4.74252C0.636477 4.78314 0.748431 4.80406 0.861505 4.80406C0.974578 4.80406 1.08653 4.78314 1.19091 4.74252C1.29529 4.7019 1.39002 4.64237 1.46965 4.56738L3.43112 2.72704L3.43112 12.0007C3.43112 12.2129 3.52136 12.4165 3.68199 12.5665C3.84262 12.7166 4.06049 12.8009 4.28766 12.8009C4.51482 12.8009 4.73269 12.7166 4.89332 12.5665C5.05395 12.4165 5.14419 12.2129 5.14419 12.0007Z"
                fill="#212B36"
              />
            </svg>
          </div>
          <div className="mt-0.5">
            <span className="text-sm text-[#637381]">You get</span>
            <div className="py-2 pl-1.5 bg-[#EDEDED] flex justify-between flex-wrap gap-3 rounded-lg">
              <DropDowns
                list={people}
                type="crypto"
                selectedIcon={people[0]}
                style={"flex p-1.5bg-indigo-500 gap-2 items-center w-fit rounded-lg tracking-[1.4px] uppercase w-[95px]"}
              />
              <div className="flex gap-4 items-center mr-4 ml-1.5">
                <span className="text-[#212B36] font-semibold text-sm tracking-[1.5px]">0.05BTC</span>
                <button className="px-2 py-0.5 text-xs uppercase bg-indigo-500  rounded-[20px] text-[#FDFDFF] font-bold tracking-[1px]">min</button>
              </div>
            </div>
          </div>
        </div>
        <button className="px-5 py-5 bg-gradient-to-tl to-indigo-600 from-blue-400 rounded-xl text-lg font-semibold mt-3 text-white hover:scale-105">
          Buy Bitcoin
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
