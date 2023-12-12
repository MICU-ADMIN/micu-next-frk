import React from "react";
import dynamic from "next/dynamic";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";

const FileSelectorModal = dynamic(() => import("../../_Uploads/FileSelectorModal"), {});
import { Trash2Icon } from "lucide-react";

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function SliderElementEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform }: Props) {
  const [errors, setErrors] = React.useState({});
  const [showFileSelector, setShowFileSelector] = React.useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(-1);
  return (
    <>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple={false}
          allowedTypes={["images", "videos"]}
          close={() => setShowFileSelector(false)}
          onFileSelect={(file) => {
            const newOptions = [...element.data.options];
            newOptions[currentSlideIndex].file = file.url;
            onChange({ ...element.data, options: newOptions });

            setShowFileSelector(false);
          }}
        />
      )}
      <ElementMenuWrapper
        close={setShowEditMenu}
        element={element}
        targetRef={targetRef}
        width={1000}
        options={[
          {
            key: "Content",
            component: (
              <FormGroup
                className="w-full"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "options",
                    title: "Slider options",
                    addRow: ({ model, field }) => {
                      const newOptions = [...model.options];
                      newOptions.push({
                        id: Date.now(),
                        type: "file",
                        url: "",
                        "File-select": "",
                      });

                      onChange({ ...model, options: newOptions });
                    },
                    draggable: true,
                    type: "table", //@ts-ignore
                    height: "500px",
                    columns: [
                      {
                        title: "",
                        name: "",
                        type: "button",
                        variant: "secondary",
                        width: "60px",
                        style: { background: "white" },
                        icon: <Trash2Icon className="text-red-500" />,
                        onClick: (row: any, index: number) => {
                          const newOptions = [...element.data.options];
                          newOptions.splice(index, 1);
                          onChange({ ...element.data, options: newOptions });
                        },
                      },
                      {
                        type: "select",
                        name: "type",
                        placeholder: "Type",
                        width: "150px",
                        options: [
                          { value: "file", label: "File" },
                          { value: "url", label: "Custom url" },
                        ],
                      },
                      {
                        name: "File-select",
                        type: "button",
                        title: "Choose file",
                        width: "150px",
                        hidden: ({ row }) => row?.type !== "file",
                        onClick: (_row, index) => {
                          setCurrentSlideIndex(index);
                          setShowFileSelector(true);
                        },
                      },
                      {
                        type: "input",
                        name: "url",
                        placeholder: "Image or Vidoe URL",
                        subType: "url",
                        width: "400px",
                        className: "w-[370px] base-input",
                        hidden: ({ row }) => row?.type !== "url",
                      },
                      {
                        type: "custom",
                        name: "preview",
                        component: ({ row }) => {
                          return (
                            <>
                              <img
                                loading="lazy"
                                src={row?.type === "file" ? row.file : row?.url}
                                className="w-[90px] m-1 rounded h-[70px] object-cover"
                                onLoad={(e) => {
                                  e.currentTarget.style.display = "initial";
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </>
                          );
                        },
                      },
                    ],
                  },

                  {
                    type: "custom",
                    name: "zindex",
                    component: () => (
                      <>
                        <p>Elevation/Z-index</p>
                        <input
                          className="base-input"
                          type="number"
                          max="10"
                          min="0"
                          value={element.position?.z || 0}
                          onChange={(e) => {
                            setTransform({
                              ...element.position,
                              z: parseInt(e.target.value),
                            });
                          }}
                        />
                      </>
                    ),
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChange(model);
                }}
              />
            ),
          },
          {
            key: "Style",
            component: (
              <FormGroup
                className="w-full"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "borderRadius",
                    placeholder: "Border radius",
                    type: "input",
                    subType: "number",
                    max: 100,
                    min: 0,
                  },
                  {
                    name: "opacity",
                    placeholder: "Opacity",
                    type: "input",
                    subType: "number",
                    max: 1,
                    min: 0,
                    step: 0.1,
                  },
                  {
                    name: "shadowColor",
                    label: "Shadow color",
                    type: "input",
                    subType: "color",
                    className: "w-full",
                  },
                  {
                    name: "shadowWidth",
                    placeholder: "Shadow width",
                    type: "input",
                    subType: "number",
                    max: 100,
                    hidden: ({ model }) => !model?.shadowColor,
                    min: 0,
                  },
                  {
                    name: "filter",
                    placeholder: "Filter",
                    type: "nativeSelect",
                    options: [
                      { label: "None", value: "none" },
                      { label: "Blur", value: "blur" },
                      { label: "Brightness", value: "brightness" },
                      { label: "Contrast", value: "contrast" },
                      { label: "Grayscale", value: "grayscale" },
                      { label: "Hue rotate", value: "hue-rotate" },
                      { label: "Invert", value: "invert" },
                      { label: "Saturate", value: "saturate" },
                      { label: "Sepia", value: "sepia" },
                    ],
                  },
                  {
                    name: "filterValue",
                    placeholder: "Filter percentage",
                    type: "input",
                    subType: "number",
                    max: 1000,
                    min: 0,
                    hidden: ({ model }) => !model.filter || model.filter === "",
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChange(model);
                }}
              />
            ),
          },
        ]}
      ></ElementMenuWrapper>
    </>
  );
}

export default SliderElementEditOptions;
