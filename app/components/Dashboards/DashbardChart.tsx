import Highcharts from "highcharts";
import dynamic from "next/dynamic";
import Spinner from "../Elements/Spinner/Spinner";
import DropDowns from "./DashboardDropDowns";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  loading: () => <Spinner />,
});

const Chart = () => {
  return (
    <div className="py-5 pl-5 pr-10 flex flex-col gap-5 overflow-hidden overflow-x-auto scrollbar-thumb-[#7851BD] scrollbar-track-[#EDEDED] scrollbar-thin">
      <div className="flex gap-60">
        <div className="flex flex-col gap-2.5 ">
          <span className="text-lg text-[#212B36 font-semibold">Transactions</span>
          <span className="text-[#637381] text-xs font-medium whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur</span>
        </div>
        <div className="">
          <DropDowns
            list={chartData}
            selectedIcon={chartData[1]}
            style="rounded-[40px] gap-10 border border-[#D5D5D8] text-[#000000] font-medium text-sm py-4 px-5 flex justify-center items-center"
            type="chart"
          />
        </div>
      </div>
      <div className="flex gap-[21rem] justify-between pr-5">
        <span className="text-sm font-medium text-[#212B36] whitespace-nowrap">
          Last Month
          <span className="text-sm font-medium text-[#32A953]"> $42,443</span>
        </span>
        <div className="text-[#000000] font-semibold text-xl gap-2.5 flex items-start pl-1">
          <span> $48,525.21</span>
          <span className="text-[#32A953] flex">
            7%
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="ic_chevron">
                <path id="Vector" d="M7.03275 15L13.1448 9L19.2568 15" fill="#37D159" />
              </g>
            </svg>
          </span>
        </div>
      </div>
      <div className="w-[630px]">
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </div>
    </div>
  );
};

const chartData = [
  { name: "Weekly" },
  {
    name: "Monthly",
  },
  { name: "Yearly" },
];
const userList = [
  "/assets/admin/analytics-dashboard/user1.svg",
  "/assets/admin/analytics-dashboard/user2.svg",
  "/assets/admin/analytics-dashboard/user3.svg",
  "/assets/admin/analytics-dashboard/user4.svg",
  "/assets/admin/analytics-dashboard/user5.svg",
];
const options2 = {
  chart: {
    type: "column",
    height: 400,
    width: 650,
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yAxis: {
    categories: null,
    title: {
      text: null,
    },
  },
  title: false,
  series: [
    {
      name: "Bitcoin",
      data: [27500, 50000, 60000, 65000, 40000, 50000, 27500, 50000, 60000, 65000, 40000, 50000],
      color: "#3b82f6",
      borderRadius: 5,
    },
    {
      name: "Ethereum",
      data: [18000, 30000, 37000, 37000, 25000, 26000, 18000, 30000, 37000, 37000, 25000, 26000],
      color: "#4549D0",
      borderRadius: 5,
    },
  ],
  exporting: {
    enabled: true,
  },
  credits: {
    enabled: false,
  },
};

export default Chart;
