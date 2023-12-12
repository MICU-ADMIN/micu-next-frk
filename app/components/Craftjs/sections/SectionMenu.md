```tsx

import React from "react";
import { sectionData } from "./sectionData";
import Area from "../area";
import { Button } from "../selectors/Button";

const sectionList = ["Home", "About", "Contact", "Donations", "Articles", "PrayerTimes", "Blog", "Shop", "FAQ", "Cart"];

function SectionMenu({ close, addSection, siteData }) {
  const [selectedSection, setSelectedSection] = React.useState("Home");
  const [curSectionData, setCurSectionData] = React.useState(sectionData[selectedSection]);
  return (
    <>
      <div className="modal-center">
        <div className=" h-[950px] w-[85vw] p-8">
          {/* <h2 className="text-2xl font-bold">Page Settings</h2> */}

          <div className="flex flex-row">
            <div className="absolute ">
              <div className=" flex flex-col">
                <h2
                  className="semibold mb-2 text-gray-700
                "
                >
                  Sections
                </h2>

                <div className="mt-5">
                  <Button size="sm" onClick={() => addSection(null)}>
                    Add Empty Section
                  </Button>
                </div>
                <div className="mt-5">
                  {sectionList.map((section, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedSection(section);
                          setCurSectionData(sectionData[section]);
                        }}
                        className={`semi-bold flex cursor-pointer flex-row items-center rounded-md p-1 hover:bg-gray-100 hover:shadow-md ${
                          selectedSection === section ? "border-2 border-indigo-500 bg-gray-100 shadow-md" : ""
                        }`}
                      >
                        <div className="ml-2">{section}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="ml-[155px] h-[910px] overflow-y-auto">
              {curSectionData.map((section, i) => {
                return (
                  <div
                    key={section.id}
                    title="Add Section"
                    onClick={() => addSection(section)}
                    className=" w-[75vw] cursor-pointer rounded shadow-md hover:border-2 hover:border-indigo-500 hover:shadow-lg"
                  >
                    <Area
                      readOnly={true}
                      index={i}
                      rows={1}
                      columns={1}
                      updateWrapperHeight={(height) => () => {}}
                      deleteSection={() => {}}
                      setEditSectionIndex={() => {}}
                      onDataChange={(data) => {}}
                      siteData={siteData}
                      data={section.data}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  );
}

export default SectionMenu;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  + SectionMenu[Section Menu] --> SectionList[Section List]
  SectionList --> Area[Section Area]
  Area --> + readOnly[Read Only]
  Area --> + title[Section Title]
  Area --> + deleteSection[Delete Section]
  Area --> + updateWrapperHeight[Update Wrapper Height]
  Area --> + setEditSectionIndex[Set Edit Section Index]
  Area --> + onDataChange[On Data Change]
  Area --> + siteData[Site Data]
  Area --> + data[Section Data]
```
Explanation:
* The `graph LR` directive at the top of the file defines the graph structure of the code. In this case, we have a single node labeled "SectionMenu" that has several edges connecting it to other nodes.
* The `+ SectionMenu[Section Menu]` node represents the `SectionMenu` component, which is the top-level component in the file.
* The `SectionList[Section List]` node represents the list of sections that are available in the application

```
