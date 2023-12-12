import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";
import FileSelectorModal from "../../_Uploads/FileSelectorModal";
import Button from "../Button/Button";

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function VideoElementEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform }: Props) {
  const [errors, setErrors] = React.useState({});
  const [showFileSelector, setShowFileSelector] = React.useState(false);

  return (
    <>
      {showFileSelector && (
        <FileSelectorModal
          allowMultiple={false}
          allowedTypes={["videos"]}
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
                        {model.file ? "Replace Video" : "Select Video"}
                      </Button>
                    ),
                    hidden: ({ model }) => model.isUrl,
                  },
                  {
                    type: "custom",
                    name: "file_preview",
                    component: ({ model }) => (
                      <video className="w-full h-full object-cover max-h-96" src={model.isUrl ? model.url : model.file} autoPlay={false} controls={true} />
                    ),
                    hidden: ({ model }) => !model.file && !model.url,
                  },
                  {
                    name: "isUrl",
                    title: "Video URL ?",
                    type: "checkbox",
                    description: "If you want to use a video from a custom URL",
                  },
                  {
                    name: "url",
                    placeholder: "Video URL",
                    type: "input",
                    maxLength: 1000,
                    hidden: ({ model }: any) => !model.isUrl,
                  },
                  {
                    name: "altText",
                    placeholder: "Alt text",
                    type: "input",
                    maxLength: 100,
                  },
                  {
                    name: "controls",
                    title: "Show controls",
                    type: "checkbox",
                  },
                  {
                    name: "autoPlay",
                    title: "Auto play",
                    type: "checkbox",
                  },
                  {
                    name: "loop",
                    title: "Loop",
                    type: "checkbox",
                  },
                  {
                    name: "muted",
                    title: "Muted",
                    type: "checkbox",
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
                    name: "opacity",
                    placeholder: "Opacity",
                    type: "input",
                    subType: "number",
                    max: 1,
                    min: 0,
                    step: 0.1,
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
                    hidden: ({ model }: any) => !model.filter || model.filter === "",
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
            key: "Hover Styles",
            component: (
              <FormGroup
                className="w-full"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "hoverBackgroundColor",
                    label: "Background",
                    type: "input",
                    className: "w-[140px]",
                    subType: "color",
                  },
                  {
                    name: "hoverColor",
                    label: "Text color",
                    type: "input",
                    className: "w-[140px]",

                    subType: "color",
                  },
                  {
                    name: "hoverShadowColor",
                    label: "Shadow color",
                    type: "input",
                    subType: "color",
                    className: "w-[140px]",
                  },
                  {
                    name: "hoverShadowWidth",
                    label: "Shdw width",
                    type: "input",
                    subType: "number",

                    max: 100,
                    hidden: ({ model }: any) => !model?.hoverShadowColor,
                    min: 0,
                  },
                  {
                    name: "hoverBorderRadius",
                    placeholder: "Border radius",
                    type: "input",
                    subType: "number",
                    max: 100,
                    label: "Border radius",
                    min: 0,
                  },

                  {
                    name: "hoverOpacity",
                    placeholder: "Opacity",
                    type: "input",
                    label: "Opacity",
                    subType: "number",
                    max: 1,
                    min: 0,
                    step: 0.1,
                  },
                  {
                    name: "hoverFilter",
                    placeholder: "Filter",
                    label: "Filter",
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

export default VideoElementEditOptions;
