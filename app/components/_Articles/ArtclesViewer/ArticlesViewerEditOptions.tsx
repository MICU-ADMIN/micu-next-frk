import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../../Elements/Form/FormGroup";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { handleErrors } from "@/app/_helpers/web/formatters";

type Props = {
  element: any;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  onChange: (v: any) => void;
  colors: string[];
};

function ArticlesViewerEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform, colors }: Props) {
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
            <div className="w-full">
              <FormGroup
                className="w-full h-fit-content"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "catId",
                    placeholder: "Filter by category",
                    description: "Only show articles from this category",
                    type: "select",
                    options: [],

                    fetchOnMount: true,
                    optionFetcher: async (search: string, cb: (options: any) => void) => {
                      const res = (await requestHandler({
                        type: "post",
                        route: "articles/search",
                        body: { searchTerm: search },
                        shouldCache: true,
                        returnCache: true,
                      })) as Record[] | { errors: any } | undefined;
                      if (res?.errors) return handleErrors(res);
                      cb(res);
                    },
                  },
                  {
                    name: "columns",
                    placeholder: "Grid columns",
                    type: "nativeSelect",
                    options: [
                      { label: "1", value: 1 },
                      { label: "2", value: 2 },
                      { label: "3", value: 3 },
                      { label: "4", value: 4 },
                      { label: "5", value: 5 },
                      { label: "6", value: 6 },
                      { label: "7", value: 7 },
                      { label: "8", value: 8 },
                      { label: "9", value: 9 },
                      { label: "10", value: 10 },
                    ],
                  },
                  {
                    name: "accentColor",
                    label: "Accent colour",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                  },

                  {
                    type: "nativeSelect",
                    placeholder: "Sidebar position",
                    name: "sidebarPos",
                    options: [
                      { label: "Left", value: "left" },
                      { label: "Right", value: "right" },
                    ],
                  },
                  {
                    type: "checkbox",
                    title: "Hide sidebar",
                    name: "hideSidebar",
                  },
                  {
                    type: "checkbox",
                    title: "Hide search",
                    name: "hideSearch",
                  },
                  {
                    type: "checkbox",
                    title: "Hide sort",
                    name: "hideSort",
                  },

                  {
                    name: "hideTitle",
                    title: "Hide card title",
                    type: "checkbox",
                  },

                  {
                    type: "checkbox",
                    title: "Hide card image",
                    name: "hideFeatureImage",
                  },
                  {
                    type: "checkbox",
                    title: "Open article in new tab",
                    name: "openInNewTab",
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChange(model);
                  // onChange(model);
                }}
              />
            </div>
          ),
        },

        //   borderColor: element?.data?.borderColor || "#E5E7EB",
        //             borderRadius: element?.data?.borderRadius || 4,
        //             borderWidth: element?.data?.borderWidth || 0,
        //             borderStyle: element?.data?.borderStyle || "solid",
        {
          key: "Card Style",
          component: (
            <div className="w-full">
              <FormGroup
                className="w-full h-fit-content"
                altSetModel={true}
                errors={errors}
                setErrors={setErrors}
                fields={[
                  {
                    name: "titleColor",
                    label: "Title colour",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                  },
                  {
                    name: "titleSize",
                    placeholder: "Title size",
                    type: "input",
                    subType: "number",
                    max: 100,
                    min: 0,
                  },
                  {
                    name: "titleWeight",
                    placeholder: "Title weight",
                    type: "input",
                    subType: "number",
                    max: 1000,
                    min: 0,
                    step: 100,
                  },
                  {
                    name: "borderRadius",
                    placeholder: "Border radius",
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "borderWidth",
                    placeholder: "Border width",
                    type: "input",
                    subType: "number",
                    max: 100,
                  },
                  {
                    name: "borderStyle",
                    placeholder: "Border style",
                    type: "select",
                    options: [
                      { label: "Solid", value: "solid" },
                      { label: "Dashed", value: "dashed" },
                      { label: "Dotted", value: "dotted" },
                      { label: "Double", value: "double" },
                      { label: "Groove", value: "groove" },
                      { label: "Ridge", value: "ridge" },
                      { label: "Inset", value: "inset" },
                      { label: "Outset", value: "outset" },
                      { label: "None", value: "none" },
                      { label: "Hidden", value: "hidden" },
                    ],
                  },
                  {
                    name: "borderColor",
                    label: "Border colour",
                    type: "color",
                    presetColors: colors,
                    className: "w-full",
                  },
                ]}
                model={element.data}
                setModel={(model) => {
                  onChange(model);
                  // onChange(model);
                }}
              />
            </div>
          ),
        },
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
                  //   {
                  //     name: "defaultTextColor",
                  //     label: "Default Text color",
                  //     type: "color",
                  //     className: "w-full",
                  //     subType: "color",
                  //     presetColors: colors,
                  //     description: "Will use default theme text color if not set",
                  //   },
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
                  onChange(model);
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
                  onChange(model);
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

export default ArticlesViewerEditOptions;
