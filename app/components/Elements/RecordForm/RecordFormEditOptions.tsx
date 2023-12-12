import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { Record } from "@/_types/dbTypes";
import { handleErrors } from "@/app/_helpers/web/formatters";
import Badge from "../Badge/Badge";

type Props = {
  element: any;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  onChange: (v: any) => void;
  colors: string[];
};

function RecordFormEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform, colors }: Props) {
  const [errors, setErrors] = React.useState({});
  const [currentRecord, setCurrentRecord] = React.useState<Record | null>(null);

  React.useEffect(() => {
    if (!element?.data?.recordId) return;
    fetchRecord();
  }, [element?.data?.recordId]);

  const fetchRecord = async () => {
    const res = (await requestHandler({ type: "get", route: "records/single?id=" + element?.data?.recordId, shouldCache: true, returnCache: true })) as
      | Record
      | { errors: any }
      | undefined;
    if (res?.errors) return handleErrors(res);
    setCurrentRecord(res);
  };

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
                      <span className="text-sm text-gray-800">To collect form data link a created record or create a new one by typing a new name</span>
                    ),
                  },
                  {
                    name: "recordId",
                    placeholder: "Linked record",
                    type: "select",
                    options: [],
                    isCreatable: true,
                    customChange: (v: any, l, o) => {
                      onChange({ ...element.data, record: o });
                    },
                    optionFetcher: async (search: string, cb: (options: any) => void) => {
                      const res = (await requestHandler({
                        type: "post",
                        route: "records/search",
                        body: { searchTerm: search },
                        shouldCache: true,
                        returnCache: true,
                      })) as Record[] | { errors: any } | undefined;
                      if (res?.errors) return handleErrors(res);
                      cb(res);
                    },
                  },
                  {
                    type: "custom",
                    name: "h",
                    component: () => <div className="bg-transparent h-[250px]" />,
                    hidden: ({ model }) => model.recordId,
                  },
                  {
                    type: "custom",
                    name: "fields",
                    component: ({ model }) => {
                      return (
                        <div className="h-[300px]">
                          <p className="mb-1 text-indigo-500">{model?.record?.label}</p>
                          <p className="text-xs text-gray-800 mb-1">Available Fields</p>
                          {model?.record?.properties?.map((field: any) => {
                            if (
                              field.type === "users" ||
                              field.type === "id" ||
                              field.type === "createdAt" ||
                              field.type === "updatedAt" ||
                              field.type === "userId"
                            )
                              return null;
                            return (
                              <Badge key={field.name} className="mb-2 mr-2" color="gray">
                                {field.placeholder} ({field.type}) {field?.subType ? `(${field?.subType})` : ""} {field.isRequired ? "*" : ""}
                              </Badge>
                            );
                          })}

                          <p className="text-xs text-gray-800 mb-2">Form Layout</p>
                          <div className="flex flex-col border border-gray-200 rounded-md p-2 h-[200px] overflow-y-auto"></div>
                        </div>
                      );
                    },
                    hidden: ({ model }) => !model.recordId,
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

export default RecordFormEditOptions;
