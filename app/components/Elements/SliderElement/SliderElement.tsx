"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import dynamic from "next/dynamic";

const SliderElementEditOptions = dynamic(() => import("./SliderElementEditOptions"));

type Props = {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  element: any;
  onChange?: (v: string) => void;
  setShowEditMenu: (v: any) => void;
  showEditMenu?: boolean;
  targetRef?: React.MutableRefObject<HTMLDivElement> | null;
  readonly?: boolean;
  setTransform?: (v: any) => void;
};

const Slider = ({ autoSlide = false, autoSlideInterval = 4000, element, onChange, showEditMenu, setShowEditMenu, targetRef, setTransform }: Props) => {
  const [curr, setCurr] = useState(0);
  let slideInterval: any = React.useRef(null);

  const prev = () => setCurr((curr) => (curr === 0 ? element?.data?.options.length - 1 : curr - 1));

  const next = () => setCurr((curr) => (curr === element?.data?.options.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (element?.data?.autoSlide || autoSlide) {
      slideInterval.current = setInterval(next, element?.data?.slideInterval ? element?.data?.slideInterval * 1000 : autoSlideInterval);
      return () => clearInterval(slideInterval.current);
    }
  }, []);

  return (
    <>
      <style>
        {`
    #sldr${element.id} {
     border-radius: ${element?.data?.borderRadius || 0}px; 
     height: ${element?.size?.height || "100%"};
     object-fit: ${element?.data?.objectFit || "cover"};
      opacity: ${element?.data?.opacity || 1};
      filter: ${element?.data?.filter && element?.data?.filterValue !== "none" ? `${element?.data?.filter}(${element?.data?.filterValue || "50"}%)` : "none"};
      box-shadow: ${element?.data?.shadowColor ? `${element?.data?.shadowColor} 0px 0px 10px ${element?.data?.shadowOpacity || 0.5}` : "none"};
      transition: all 0.1s ease-in-out;
    }

    #sldr${element.id}:hover {
      ${element.data?.hoverBorderRadius ? `border-radius: ${element?.data?.hoverBorderRadius}px;` : ""}
      ${element.data?.hoverObjectFit ? `object-fit: ${element?.data?.hoverObjectFit};` : ""}
      ${element.data?.hoverOpacity ? `opacity: ${element?.data?.hoverOpacity};` : ""}
      ${
        element.data?.hoverFilter && element.data?.hoverFilterValue !== "none"
          ? `filter: ${element?.data?.hoverFilter}(${element?.data?.hoverFilterValue || "50"}%);`
          : ""
      }
      ${element.data?.hoverShadowColor ? `box-shadow: ${element?.data?.hoverShadowColor} 0px 0px 10px ${element?.data?.hoverShadowOpacity || 0.5};` : ""}
      }`}
      </style>
      <div id={`sldr${element.id}`} className="overflow-hidden relative">
        <div className="flex 0">
          {element?.data?.options && element?.data?.options[curr] && (
            <div className=" w-full h-full  fadeIn">
              <img
                loading="lazy"
                className="w-full h-full object-fit"
                src={element?.data?.options[curr]?.type === "file" ? element?.data?.options[curr].file : element?.data?.options[curr]?.url}
              />
            </div>
          )}
        </div>
        <div>
          {element?.data?.options[curr - 1] && (
            <button onClick={prev} className="p-1 h-fit rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
              <ChevronLeft />
            </button>
          )}
        </div>

        {/* <div className="absolute  flex items-center justify-between p-4 right-0">
          {element?.data?.options[curr + 1] && (
            <button onClick={next} className="p-1 h-fit rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
              <ChevronRight />
            </button>
          )}
        </div> */}

        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {element?.data?.options &&
              element?.data?.options.length > 1 &&
              element?.data?.options.map((s: any, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    if (slideInterval?.current) {
                      clearInterval(slideInterval.current);
                      slideInterval.current = setInterval(next, element?.data?.slideInterval ? element?.data?.slideInterval * 1000 : autoSlideInterval);
                    }
                    setCurr(i);
                  }}
                  className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`}
                />
              ))}
          </div>
        </div>
      </div>
      {showEditMenu && (
        <SliderElementEditOptions element={element} onChange={onChange} setShowEditMenu={setShowEditMenu} targetRef={targetRef} setTransform={setTransform} />
      )}
    </>
  );
};

export default Slider;
