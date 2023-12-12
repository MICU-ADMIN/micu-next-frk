import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ScholarInfo, { ScholarData } from "./ScholarInfo";
import InfoCardFooter from "./InfoCardFooter";
import { getCacheValue, addCacheValue } from "@/app/_helpers/web/cache/cache";

import { ScholarNodeData } from "../IsnadViewer";
import Button from "@/app/components/Button/Button";
import Badge from "@/app/components/Badge/Badge";
import Loader from "../../Loader/Loader";
type InfoCardProps = {
  data: ScholarNodeData;
  closeModal: () => void;
};

const InfoCardModal = ({ data, closeModal }: InfoCardProps) => {
  const [scholarData, setScholarData] = React.useState<ScholarData>({
    bio: "",
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchScholarData(data.id);
  }, [data]);

  const fetchScholarData = async (id: number) => {
    //check if cached
    try {
      const cachedValue = await getCacheValue("/api/muslim-scholar?id=" + id);
      if (cachedValue) {
        setScholarData(parseScholarHtml(cachedValue, data, setLoading));
        return;
      }

      const request = await fetch("/api/muslim-scholar?id=" + id).then((res) => res.text());

      addCacheValue(request, "/api/muslim-scholar?id=" + id);

      //parse html to dom
      setScholarData(parseScholarHtml(request, data, setLoading));
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white p-6 text-left align-middle shadow-tremor transition-all rounded-xl">
                <div className="flex flex-row justify-between">
                  <p className="text-base text-indigo-500 font-medium">{scholarData?.designation || "Details"}</p>
                  <span className="uppercase">{data.name}</span>
                </div>{" "}
                <Button
                  className="mt-2 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 md:hidden block"
                  onClick={closeModal}
                >
                  Go back
                </Button>
                <input placeholder="Search..." className="mt-6 base-input" />
                {/* id, name, bornAt, diedAt, livedIn, nickName */}
                <div className="relative mt-4 h-[700px] overflow-y-scroll">
                  <p>
                    {scholarData?.bornAt || data?.bornAt} - {scholarData?.diedAt || data?.diedAt} (Age)
                  </p>

                  <ScholarInfo scholarData={scholarData} />

                  {loading && <Loader />}
                  {scholarData?.bio !== `&nbsp;&nbsp;<br><a href="" target="_new"></a>` && (
                    <div
                      dangerouslySetInnerHTML={{ __html: scholarData?.bio }}
                      className="w-full h-[400px] border border-gray-200 mt-3  text-sm overflow-y-scroll p-2 hide-scroll"
                    ></div>
                  )}
                  <p className="mt-4 mb-2">Locations</p>
                  {formatLoccations(data?.livedIn).map((location: string) => (
                    <Badge key={location} className="mr-2 cursor-pointer hover:shadow-sm" color="blue">
                      {location}
                    </Badge>
                  ))}

                  <p className="mt-4 mb-2">Placeholer metrics</p>
                  {
                    data?.id !== 1 && null
                    // <BarList
                    //   data={hadithData}
                    //   className="mr-4" // to give room for scrollbar
                    //   showAnimation={false}
                    //   valueFormatter={(value) => `${value} hadiths related`}
                    // />
                  }
                  <div className="sticky inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white to-transparent h-20" />
                </div>
                <InfoCardFooter closeModal={closeModal} data={data} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const formatLoccations = (locations: string) => {
  if (locations.includes("/")) {
    return locations.split("/");
  }

  return locations.split(",");
};

const parseScholarHtml = (requestData: string, data: any, setLoading: (b: boolean) => void) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(requestData, "text/html");
  //find bio
  const bio = htmlDoc.getElementById("bio" + data.id)?.innerHTML;
  //parse though table
  const table = htmlDoc.querySelector(".form") as any;
  const rows = Array.from(table?.children[0].children).map((row: any) => Array.from(row.children).map((cell: any) => cell.innerText));
  // console.log(rows);

  setLoading(false);
  const sdata = {} as any;

  for (const row of rows) {
    if (row[0] === "Full Name:") sdata.fullName = row[1];
    else if (row[0] === "Scholar:") sdata.designation = row[2];
    else if (row[0] === "Parents:") sdata.parents = row[1];
    else if (row[0] === "Siblings: ") sdata.siblings = row[1];
    else if (row[0] === "Birth Date/Place: ") sdata.bornAt = row[1];
    else if (row[0] === "Death Date/Place: ") sdata.diedAt = row[1];
    else if (row[0] === "Area of Interest:") sdata.areaOfInterest = row[1];
    else if (row[0] === "Spouse(s):") sdata.spouses = row[1];
    else if (row[0] === "Children:") sdata.children = row[1];
    else if (row[0] === "Teachers/Narrated From:") sdata.teachers = row[1];
    else if (row[0] === "Students/Narrated By:") sdata.students = row[1];
    else if (row[0] === "Tags :") sdata.tags = row[1];
  }

  return { bio: bio, ...sdata };
};

const hadithData = [
  {
    name: "Bukhari",
    value: 300,
  },
  //...
  {
    name: "Nasai",
    value: 30,
  },
  {
    name: "Tirmidhi",
    value: 57,
  },
];

export default InfoCardModal;
