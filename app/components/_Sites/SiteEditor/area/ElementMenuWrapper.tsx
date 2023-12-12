import { useDrag } from "@/app/_helpers/web/hooks/useDrag";
import Button from "@/app/components/Elements/Button/Button";
import { XIcon } from "lucide-react";
import React, { useRef } from "react";

type Props = {
  element: any;
  options: any;
  close?: any;
  targetRef?: any;
  width?: number;
  submit?: any;
};

function ElementMenuWrapper({ element, options, close, targetRef, width = 330, submit }: Props) {
  const [renderedIndex, setRenderedIndex] = React.useState(0);

  const draggableRef = useRef(null);

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
  });

  const targetLeft = targetRef?.current?.offsetLeft + targetRef?.current?.offsetWidth + 10;
  const targetTop = targetRef?.current?.offsetTop ? targetRef?.current?.offsetTop + targetRef?.current?.offsetHeight : 300;

  return (
    <>
      <div
        ref={draggableRef}
        style={{
          position: "fixed",
          left:
            position.x !== 0
              ? position.x + "px"
              : targetRef?.current?.offsetLeft
              ? window.innerWidth - targetLeft < width
                ? window.innerWidth - width
                : targetLeft
              : "55vw",

          top:
            position.y !== 0
              ? position.y + "px"
              : window.innerHeight - targetTop < draggableRef?.current?.offsetHeight
              ? window.innerHeight - draggableRef?.current?.offsetHeight
              : targetTop,
          zIndex: 9999,
        }}
      >
        <div
          style={{ bottom: "200px", width: width + "px", overflowY: "scroll", maxHeight: "calc(100vh - 200px)", overflowX: "hidden" }}
          className=" slideLeft relative  items-center   rounded-md border border-gray-200 bg-white p-2 drop-shadow-lg hide-scroll hide-scrollbar bg-opacity-95 backdrop-blur-10 shadow-blur-10 shadow-2xl border-2 border-gray-300"
        >
          <XIcon
            className="absolute top-1 right-1 h-5 w-5 cursor-pointer text-gray-600 transition-all duration-200 hover:text-gray-900"
            onClick={() => close(null)}
          />
          <div className="flex flex-row items-center cursor-move" onMouseDown={handleMouseDown}>
            {options.map((option: any, i: number) => {
              return (
                <div
                  key={option.key}
                  className={`flex flex-row mx-1  cursor-pointer
                  ${renderedIndex === i ? "text-indigo-500 font-semibold border-b-1 border-indigo-500 border-indigo-500 transition-all duration-200" : ""}`}
                  onClick={() => {
                    setRenderedIndex(i);
                  }}
                >
                  <div className="flex flex-row items-center">
                    {option.icon}
                    <span className="ml-[10px]">{option.key}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="flex-column mt-2 flex w-full min-w-[255px] p-2 slideLeft">{options[renderedIndex].component}</div>{" "}
          {submit && (
            <Button className="mt-2 ml-2 w-full" onClick={() => submit()} size="sm">
              Save Changes
            </Button>
          )}
        </div>
      </div>
      <div className="z-9998 fixed inset-0 " onClick={() => close(null)} />
    </>
  );
}

export default ElementMenuWrapper;
