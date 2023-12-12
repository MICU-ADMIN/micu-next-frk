import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "react-feather";

const DrawingCanvas = ({ readOnly, drawingActions, setDrawingActions }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [brushColor, setBrushColor] = useState("#000000");
  const [eraser = false, setEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    setTimeout(() => {
      resizeCanvas();
    }, 500);
    // window.addEventListener("resize", resizeCanvas);

    // return () => {
    //   window.removeEventListener("resize", resizeCanvas);
    // };
  }, []);

  const startDrawing = (event) => {
    setIsDrawing(true);
    setPrevPosition(getPercentagePosition(event));
  };

  const endDrawing = (event) => {
    setIsDrawing(false);

    // Add drawing action to the list of actions get poditions as percentages of canvas width and height
    const updatedDrawingActions = [
      ...drawingActions,
      {
        prevPosition: { x: prevPosition.x / canvasRef.current.width, y: prevPosition.y / canvasRef.current.height },
        currentPosition: { x: event.clientX / canvasRef.current.width, y: event.clientY / canvasRef.current.height },
        brushColor,
        eraser,
      },
    ];
    setDrawingActions(updatedDrawingActions);
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const currentPosition = getPercentagePosition(event);
    drawOnCanvas(prevPosition, currentPosition);

    setPrevPosition(currentPosition);
  };

  const drawOnCanvas = (prevPos, currentPos) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(prevPos.x, prevPos.y);
    context.lineTo(currentPos.x, currentPos.y);

    if (eraser) {
      context.strokeStyle = "#ffffff"; // Set to white for erasing
      context.lineWidth = 10; // Adjust this value to change the eraser size
    } else {
      context.strokeStyle = brushColor;
      context.lineWidth = 2;
    }

    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingActions([]); // Clear drawing actions when clearing the canvas
  };

  const getPercentagePosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };
  const saveAsJSON = () => {
    // Convert drawing actions to JSON and display in console
    const jsonDrawing = JSON.stringify(drawingActions);
    console.log(jsonDrawing);
    // Here you can do further processing like saving to a file or sending to a server
  };

  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full cursor-pointer" onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={draw} />{" "}
      {!readOnly && (
        <div className="flex items-center justify-center space-x-1 absolute top-0 left-[50px] bg-white p-2 rounded-md shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-1">
            {colours.map((colour) => {
              return (
                <div
                  className={`w-4 h-4 rounded-full bg-black cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out border-2 border-gray-200
                  ${brushColor == colour ? "border-2 border-indigo-500 transform scale-125 transition-all duration-200 ease-in-out" : ""}`}
                  onClick={() => {
                    setEraser(false);
                    setBrushColor(colour);
                  }}
                  style={{ background: colour }}
                />
              );
            })}
          </div>
          <div
            title="Eraser"
            className={`w-5 h-5 ml-2 cursor-pointer ${eraser ? "border-2 border-indigo-500 transform scale-125 transition-all duration-200 ease-in-out" : ""}`}
            onClick={() => setEraser((prev) => !prev)}
          >
            <Trash2 size={15} />
          </div>
        </div>
      )}
    </>
  );
};

//github colours
const colours = ["#000000", "#4f46e5", "#ff0000", "#0000ff", "#ffff00", "#00ff00", "#ff00ff", "#00ffff", "#c0c0c0", "#808080"];

export default DrawingCanvas;
