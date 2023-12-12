import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  onChangeData: (v: any) => void;
  colors: string[];
};

function EditorEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform, onChangeData, colors }: Props) {
  const [errors, setErrors] = React.useState({});
  return (
    <ElementMenuWrapper
      close={setShowEditMenu}
      element={element}
      targetRef={targetRef}
      options={[
        {
          key: "Style",
          component: (
            <div className="w-full">
              <p>Elevation/Z-index</p>
              <input
                className="base-input mb-2 w-full"
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
              <FormGroup
                className="w-full h-fit-content"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "color",
                    label: "Background color",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                    hidden: ({ model }) => model.isGradient,
                    description: "Will use default theme color if not set",
                  },
                  {
                    name: "defaultTextColor",
                    label: "Default Text color",
                    type: "color",
                    className: "w-full",
                    subType: "color",
                    presetColors: colors,
                    description: "Will use default theme text color if not set",
                  },
                  {
                    name: "borderRadius",
                    placeholder: "Border radius",
                    type: "input",
                    subType: "number",

                    max: 100,
                  },
                  {
                    name: "padding",
                    placeholder: "Padding",
                    className: "w-full",
                    defaultValue: 5,
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "margin",
                    placeholder: "Margin",
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "isGradient",
                    title: "Gradient Background ?",
                    type: "checkbox",
                  },
                  {
                    name: "gradientLeft",
                    placeholder: "Gradient left",
                    type: "color",
                    subType: "color",
                    className: "w-full",
                    presetColors: colors,
                    hidden: ({ model }) => !model.isGradient,
                  },
                  {
                    name: "gradientRight",
                    placeholder: "Gradient right",
                    type: "input",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                    hidden: ({ model }) => !model.isGradient,
                  },
                  {
                    name: "gradientDeg",
                    placeholder: "Gradient degrees",
                    type: "color",
                    subType: "number",
                    max: 360,
                    hidden: ({ model }) => !model.isGradient,
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChangeData(model);
                  // onChange(model);
                }}
              />
            </div>
          ),
        },
        {
          key: "Hover Style",
          component: (
            <div className="w-full">
              <FormGroup
                className="w-full h-fit-content"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "hoverColor",
                    label: "Background color",
                    type: "color",
                    subType: "color",
                    className: "w-full",
                    presetColors: colors,
                    hidden: ({ model }) => model.isGradientHover,
                  },
                  {
                    name: "hoverDefaultTextColor",
                    label: "Default Text color",
                    type: "color",
                    className: "w-full",
                    presetColors: colors,
                    subType: "color",
                  },
                  {
                    name: "hoverBorderRadius",
                    placeholder: "Border radius",
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "hoverPadding",
                    placeholder: "Padding",
                    defaultValue: 5,
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "hoverMargin",
                    placeholder: "Margin",
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "showCursor",
                    title: "Show cursor",
                    type: "checkbox",
                  },
                  {
                    name: "hoverIsGradient",
                    title: "Gradient Background ?",
                    type: "checkbox",
                  },
                  {
                    name: "hoverGradientLeft",
                    label: "Gradient left",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                    hidden: ({ model }) => !model.hoverIsGradient,
                  },
                  {
                    name: "hoverGradientRight",
                    label: "Gradient right",
                    type: "color",
                    subType: "color",
                    className: "w-full",
                    presetColors: colors,
                    hidden: ({ model }) => !model.hoverIsGradient,
                  },
                  {
                    name: "hoverGradientDeg",
                    placeholder: "Gradient degrees",
                    type: "input",
                    subType: "number",
                    max: 360,
                    hidden: ({ model }) => !model.hoverIsGradient,
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChangeData(model);
                  // onChange(model);
                }}
              />
            </div>
          ),
        },
      ]}
    ></ElementMenuWrapper>
  );
}

export default EditorEditOptions;
