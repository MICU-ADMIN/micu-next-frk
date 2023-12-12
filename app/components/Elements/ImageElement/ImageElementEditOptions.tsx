import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";
import dynamic from "next/dynamic";
import Button from "../Button/Button";

const FileSelectorModal = dynamic(() => import("../../_Uploads/FileSelectorModal"), { ssr: false });

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function ImageElementEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform }: Props) {
  const [errors, setErrors] = React.useState({});
  const [showFileSelector, setShowFileSelector] = React.useState(false);
  return (
    <>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple={false}
          allowedTypes={["images"]}
          close={() => setShowFileSelector(false)}
          onFileSelect={(file) => {
            onChange({
              ...element.data,
              file: file.url,
              isUrl: false,
            });
            setShowFileSelector(false);
          }}
        />
      )}
      <ElementMenuWrapper
        close={setShowEditMenu}
        element={element}
        targetRef={targetRef}
        options={[
          {
            key: "Content",
            component: (
              <>
                <FormGroup
                  className="w-full"
                  altSetModel={true}
                  errors={errors}
                  setErrors={setErrors}
                  fields={[
                    {
                      type: "custom",
                      name: "file",
                      component: ({ model }) => (
                        <Button
                          size="sm"
                          onClick={() => {
                            setShowFileSelector(!showFileSelector);
                          }}
                        >
                          {model.file ? "Replace image" : "Select image"}
                        </Button>
                      ),
                      hidden: ({ model }) => model.isUrl,
                    },
                    {
                      type: "custom",
                      name: "file_preview",
                      component: ({ model }) => (
                        <img
                          loading="lazy"
                          className="w-full h-full object-cover max-h-96"
                          src={model.isUrl ? model.url : model.file}
                          alt={model.altText || "Image"}
                        />
                      ),
                      hidden: ({ model }) => !model.file && !model.url,
                    },
                    {
                      name: "isUrl",
                      title: "Image URL ?",
                      type: "checkbox",
                    },
                    {
                      name: "url",
                      placeholder: "Image URL",
                      type: "input",
                      maxLength: 1000,
                      hidden: ({ model }) => !model.isUrl,
                    },
                    {
                      name: "altText",
                      placeholder: "Alt text",
                      type: "input",
                      maxLength: 100,
                    },
                    {
                      name: "objectFit",
                      placeholder: "Positioning",
                      type: "nativeSelect",
                      options: [
                        { label: "Cover", value: "cover" },
                        { label: "Contain", value: "contain" },
                        { label: "Fill", value: "fill" },
                        { label: "None", value: "none" },
                        { label: "Scale down", value: "scale-down" },
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
              </>
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
                    type: "color",
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

export default ImageElementEditOptions;
