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
    <div className={`relative ${className}`}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        style={{ background: color }}
        className="rounded-md mt-1 mb-[1px] w-full h-7 shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg p-1 hover:scale-105 border-[6px] border-gray-200
      "
      ></div>

      {color && (
        <XMarkIcon
          className=" h-4 w-4 absolute right-0 bg-white/90 rounded top-0 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-100
            "
          onClick={() => resetColor()}
        />
      )}
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
    </div>
  );
}

export default SketchPickerElement;
