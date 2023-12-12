"use client";
import React from "react";
import FormGroup from "../Form/FormGroup";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";

type Props = {
  element: any;
  onChange: (v: any) => void;
  showEditMenu: boolean;
  setShowEditMenu: (v: boolean) => void;
};

function BackgroundElement({ element, onChange, showEditMenu, setShowEditMenu }: Props) {
  const [errors, setErrors] = React.useState({});

  return (
    <>
      <div
        style={{
          backgroundColor: element.data?.color || "red",
          backgroundImage: element.data?.isGradient
            ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
            : "",
          borderRadius: element?.data?.borderRadius ? element?.data?.borderRadius + "px" : "0px",
          height: element?.size?.height || "100%",
        }}
      ></div>
      {showEditMenu && (
        <ElementMenuWrapper
          close={setShowEditMenu}
          element={element}
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
                      name: "borderRadius",
                      placeholder: "Border radius",
                      type: "input",
                      subType: "number",
                      max: 100,
                    },
                    {
                      name: "color",
                      label: "Background color",
                      type: "color",
                      subType: "color",
                      className: "w-full",
                      hidden: ({ model }: any) => model.isGradient,
                    },
                    {
                      name: "isGradient",
                      title: "Gradient Background ?",
                      type: "checkbox",
                    },
                    {
                      name: "gradientLeft",
                      label: "Gradient left",
                      type: "color",
                      subType: "color",
                      className: "w-full",
                      hidden: ({ model }: any) => !model.isGradient,
                    },
                    {
                      name: "gradientRight",
                      label: "Gradient right",
                      type: "color",
                      subType: "color",
                      className: "w-full",
                      hidden: ({ model }: any) => !model.isGradient,
                    },
                    {
                      name: "gradientDeg",
                      label: "Gradient degrees",
                      type: "input",
                      subType: "number",
                      max: 360,
                      hidden: ({ model }: any) => !model.isGradient,
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
      )}
    </>
  );
}

export default BackgroundElement;
