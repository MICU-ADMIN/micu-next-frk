"use client";
import React from "react";
import Form from "../Form/Form";
import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";
import { read } from "fs";

const RecordFormEditOptions = dynamic(() => import("./RecordFormEditOptions"), { loading: () => <Spinner /> });

type Props = {
  element: any;
  onChange: (v: string) => void;
  setShowEditMenu: (v: boolean) => void;
  showEditMenu: boolean;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
  defaultColor?: string;
  readOnly?: boolean;
};

function RecordFormElement({ element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform, defaultColor, readOnly }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [model, setModel] = React.useState({});

  if (readOnly && !element?.data?.recordId)
    return (
      <div className="flex items-center justify-center">
        <p>Please select a record in the element settings to display the form.Currently it wouldnt render anything</p>
      </div>
    );

  return (
    <>
      <style>
        {!element
          ? ""
          : `
    #rForm${element.id} {
      background: ${
        element.data?.isGradient
          ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
          : element.data?.color || "inherit"
      };
      color: ${defaultColor || "black"};
      border-radius: ${element.data?.borderRadius ? element.data?.borderRadius + "px" : "0px"};
      height: 100%;
      width: 100%;
      padding: ${element?.data?.padding ? element?.data?.padding + "px" : "10px"};
      margin: ${element?.data?.margin ? element?.data?.margin + "px" : "0px"};
      cursor: ${element.data?.showCursor ? "pointer" : "default"};
      text-align: ${element.data?.textAlign || "left"};
    }

    #rForm${element.id}:hover {
      ${
        element.data?.hoverColor || element.data?.hoverIsGradient
          ? `background: ${
              element.data?.hoverIsGradient
                ? `linear-gradient(${element.data?.hoverGradientDeg}deg, ${element.data?.hoverGradientLeft}, ${element.data?.hoverGradientRight})`
                : element.data?.hoverColor
            };`
          : ""
      }
      ${element.data?.hoverTextColor ? `color: ${element.data?.hoverTextColor};` : ""}
      ${element.data?.hoverBorderRadius ? `border-radius: ${element.data?.hoverBorderRadius}px";` : ""}
      ${element.data?.hoverPadding ? `padding: ${element.data?.hoverPadding}px;` : ""}
      ${element.data?.hoverMargin ? `margin: ${element.data?.hoverMargin}px";` : ""}
      }`}
      </style>

      {!element?.data?.recordId && (
        <div className="flex items-center justify-center">
          <p>Please select a record in the element settings to display the form.Currently it wouldnt render anything</p>
        </div>
      )}
      <Form
        id={`rForm${element?.id}`}
        className="w-full h-full"
        onSubmit={() => {}}
        model={model}
        setModel={setModel}
        loading={loading}
        fields={[{ fields: [] }]}
        title={element?.data?.title || ""}
      />

      {showEditMenu && (
        <RecordFormEditOptions
          element={element}
          onChange={onChange}
          setShowEditMenu={setShowEditMenu}
          targetRef={targetRef}
          setTransform={setTransform}
          colors={[]}
        />
      )}
    </>
  );
}

export default RecordFormElement;
