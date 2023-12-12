import { XMarkIcon } from "@heroicons/react/24/outline";
import { XIcon } from "lucide-react";
import React from "react";
import { SketchPicker } from "react-color";

type Props = {
  presetColors: string[];
  color: string;
  onChange: (e: any) => void;
  resetColor: () => void;
  className?: string;
};

function SketchPickerElement({ presetColors, color, onChange, resetColor, className }: Props) {
  const [showPicker, setShowPicker] = React.useState(false);
  return (
    <>
      <div className={`relative ${className}`} style={{ height: showPicker ? "160px" : "auto" } as any}>
        <div
          onClick={() => setShowPicker(!showPicker)}
          style={{ background: color || "transparent" } as any}
          className="rounded-md   w-full h-8  cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg p-1  border-[2px] border-gray-300 relative
      "
        >
          <span
            className="bg-white/90 rounded-md p-1 text-xs text-gray-600 backdrop-blur-3xl absolute top-[2.5px] transition-all duration-200 ease-in-out hover:bg-white hover:text-gray-900
        "
          >
            {color || "Pick a color"}
          </span>
        </div>

        {color && (
          <XMarkIcon
            className=" h-4 w-4 absolute right-0 bg-white/90 rounded top-0 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-100
            "
            onClick={() => resetColor()}
          />
        )}
      </div>{" "}
      {showPicker && (
        <div className="fixed " style={{ zIndex: 9999, right: 0 }}>
          <div className="fixed inset-0 w-screen h-screen " onClick={() => setShowPicker(false)}></div>
          <div style={{ zIndex: 99999, background: "white" }} className=" p-2 bg-white p-2  w-full">
            <XIcon
              className="absolute top-0 right-0 h-5 w-5 cursor-pointer text-red-600 transition-all duration-200 hover:text-gray-900 bg-white rounded-md p-1 border border-gray-200"
              onClick={() => setShowPicker(false)}
            />
            <SketchPicker styles={{ default: { picker: { background: "white" } } }} presetColors={presetColors} color={color} onChange={(e) => onChange(e)} />
          </div>
        </div>
      )}
    </>
  );
}

export default SketchPickerElement;
