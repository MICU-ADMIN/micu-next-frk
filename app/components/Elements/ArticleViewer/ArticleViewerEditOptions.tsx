import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { Record } from "@/_types/dbTypes";
import { handleErrors } from "@/app/_helpers/web/formatters";
import Link from "next/link";

type Props = {
  element: any;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  onChange: (v: any) => void;
  colors: string[];
};

function ArticleViewerEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform, colors }: Props) {
  const [errors, setErrors] = React.useState({});

  return (
    <ElementMenuWrapper
      close={setShowEditMenu}
      element={element}
      targetRef={targetRef}
      width={700}
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
                    type: "custom",
                    name: "e",
                    component: () => (
                      <Link href={`/dashboard/article/dev?id=${element.data?.articleId}`} className="text-indigo-500" target="_blank">
                        <span>Go to article</span>
                      </Link>
                    ),
                    hidden: ({ model }) => !model.articleId,
                  },
                  {
                    name: "articleId",
                    placeholder: "Linked Article",
                    type: "select",
                    options: [],
                    isCreatable: true,
                    // customChange: (v: any, l, o) => {
                    //   onChange({ ...element.data, article: o });
                    // },
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
                    name: "accentColor",
                    label: "Accent colour",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                  },
                  {
                    name: "dividerColor",
                    label: "Divider colour",
                    type: "color",
                    subType: "color",
                    presetColors: colors,
                    className: "w-full",
                  },
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
                    name: "hideTitle",
                    title: "Hide title",
                    type: "checkbox",
                  },

                  {
                    type: "checkbox",
                    title: "Hide featured image",
                    name: "hideFeatureImage",
                  },
                  {
                    type: "checkbox",
                    title: "Hide sidebar",
                    name: "hideSideBar",
                  },
                  {
                    type: "checkbox",
                    title: "Hide Metadata",
                    name: "hideMetaData",
                  },
                  {
                    type: "checkbox",
                    title: "Hide Share",
                    name: "hideShare",
                  },
                  {
                    type: "checkbox",
                    title: "Hide Comments",
                    name: "hideComment",
                    description: "To completely disable comments, go to the setting menu on the article page",
                  },
                  {
                    type: "checkbox",
                    title: "Hide Divider",
                    name: "hideDivider",
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
                    name: "textAlign",
                    placeholder: "Alignment",
                    type: "nativeSelect",
                    options: [
                      { label: "Left", value: "left" },
                      { label: "Center", value: "center" },
                      { label: "Right", value: "right" },
                    ],
                  },
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

export default ArticleViewerEditOptions;
