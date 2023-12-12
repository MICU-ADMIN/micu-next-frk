import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function ButtonElementEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform }: Props) {
  const [errors, setErrors] = React.useState({});

  return (
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
                  name: "text",
                  placeholder: "Text",
                  type: "input",
                  maxLength: 100,
                  defaultValue: "Click here",
                },
                {
                  name: "link",
                  placeholder: "Link",
                  type: "input",
                  maxLength: 500,
                },
                {
                  name: "newTab",
                  title: "Open link in new tab ?",
                  type: "checkbox",
                },
                {
                  name: "variant",
                  label: "Variant",
                  type: "nativeSelect",
                  wrapperHorizontal: true,
                  options: [
                    { label: "Primary", value: "" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Icon", value: "icon" },
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
                  name: "backgroundColor",
                  label: "Background",
                  type: "input",
                  className: "w-[140px]",
                  subType: "color",
                  wrapperHorizontal: true,
                },
                {
                  name: "color",
                  label: "Text color",
                  type: "input",
                  className: "w-[140px]",
                  wrapperHorizontal: true,

                  subType: "color",
                },
                {
                  name: "shadowColor",
                  label: "Shadow color",
                  type: "input",
                  subType: "color",
                  className: "w-[140px]",
                  wrapperHorizontal: true,
                },
                {
                  name: "shadowWidth",
                  label: "Shdw width",
                  type: "input",
                  subType: "number",
                  wrapperHorizontal: true,

                  max: 100,
                  hidden: ({ model }: any) => !model?.shadowColor,
                  min: 0,
                },
                {
                  name: "borderRadius",
                  placeholder: "Border radius",
                  type: "input",
                  subType: "number",
                  max: 100,
                  wrapperHorizontal: true,
                  label: "Border radius",
                  min: 0,
                },

                {
                  name: "opacity",
                  placeholder: "Opacity",
                  type: "input",
                  wrapperHorizontal: true,
                  label: "Opacity",
                  subType: "number",
                  max: 1,
                  min: 0,
                  step: 0.1,
                },
                {
                  name: "filter",
                  placeholder: "Filter",
                  label: "Filter",
                  type: "nativeSelect",
                  wrapperHorizontal: true,

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
                  wrapperHorizontal: true,
                },
                {
                  name: "hoverColor",
                  label: "Text color",
                  type: "input",
                  className: "w-[140px]",
                  wrapperHorizontal: true,

                  subType: "color",
                },
                {
                  name: "hoverShadowColor",
                  label: "Shadow color",
                  type: "input",
                  subType: "color",
                  className: "w-[140px]",
                  wrapperHorizontal: true,
                },
                {
                  name: "hoverShadowWidth",
                  label: "Shdw width",
                  type: "input",
                  subType: "number",
                  wrapperHorizontal: true,

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
                  wrapperHorizontal: true,
                  label: "Border radius",
                  min: 0,
                },

                {
                  name: "hoverOpacity",
                  placeholder: "Opacity",
                  type: "input",
                  wrapperHorizontal: true,
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
                  wrapperHorizontal: true,
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
  );
}

export default ButtonElementEditOptions;
