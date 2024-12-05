import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { LucideEraser, LucidePencilLine } from "lucide-react";

/*
    - selectedTool Object Structure
        -- tool (string) : tells us which tool is currently seleected
*/

function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState({ tool: "pencil" });
  const [isDown, setisDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
  }, []);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = contextRef.current;
    ctx.moveTo(offsetX, offsetY);
    ctx.beginPath();
    setisDown(true);
  };

  const handleMouseUp = (e) => {
    const ctx = contextRef.current;
    ctx.closePath();
    setisDown(false);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDown) {
      const ctx = contextRef.current;
      ctx.strokeStyle = selectedTool.tool == "eraser" ? "black" : "white";
      ctx.lineWidth = 2;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  return (
    <>
      <canvas
        className="h-[calc(100vh-64px)] w-full bg-black"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
      <div className="bg-white top-1/2 left-10 absolute z-10 flex flex-col gap-3 p-2 rounded-2xl">
        <div className="bg-slate-500 p-2">
          <LucidePencilLine />
        </div>
        <div className="bg-slate-500 p-2">
          <LucideEraser
            onClick={() => {
              setSelectedTool({ tool: "eraser" });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Whiteboard;

/* DRAFT - 1 Complex erasing logic  */

// import React, { useRef, useState } from "react";
// import { useEffect } from "react";
// import { LucideEraser, LucidePencilLine } from "lucide-react";

// /*
//     - selectedTool Object Structure
//         -- tool (string) : tells us which tool is currently seleected

//     - path Array Structure
//         -- [ {x:, y:} , {x:, y:}, ...] : path array will contain multiple objects

//     - strokes Array Structure
//         -- [ [ {x:, y:} , {x:, y:}, ...], [{x:, y:}, ...], ... ] : strokes array will contain multiple arrays which will contain multiple objects
// */

// function Whiteboard() {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [selectedTool, setSelectedTool] = useState({ tool: "pencil" });
//   const [strokes, setStrokes] = useState([]);
//   const [path, setPath] = useState([]);
//   const [isDown, setisDown] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight - 64;
//     const ctx = canvas.getContext("2d");
//     contextRef.current = ctx;
//   }, []);

//   const handleMouseDown = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     const ctx = contextRef.current;
//     ctx.moveTo(offsetX, offsetY);
//     ctx.beginPath();
//     setPath([{ x: offsetX, y: offsetY }]);
//     setisDown(true);
//   };

//   const handleMouseUp = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     const ctx = contextRef.current;
//     ctx.closePath();
//     setPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
//     setisDown(false);
//     if (selectedTool.tool === "pencil") {
//       setStrokes((prevStrokes) => {
//         console.log([...prevStrokes, path].length);
//         return [...prevStrokes, path];
//       });
//       setPath([]);
//     } else if (selectedTool.tool == "eraser") {
//       console.log(path);
//       console.log(strokes);
//       const editedStrokes = strokes.map((stroke) => {
//         return stroke.filter((strokeItem) => {
//           // Check if the current point is far enough from eraser path
//           for (let eraserPoint of path) {
//             const distance = Math.sqrt(
//               Math.pow(strokeItem.x - eraserPoint.x, 2) +
//                 Math.pow(strokeItem.y - eraserPoint.y, 2)
//             );
//             // If point is too close to eraser path, filter it out
//             if (distance < 5) {
//               // 5 pixels threshold
//               return false;
//             }
//           }
//           return true; // Keep points that are far enough from eraser
//         });
//       });
//       console.log(editedStrokes);
//       setStrokes(editedStrokes);
//       ctx.reset();
//       editedStrokes.forEach((stroke) => {
//         stroke.forEach((strokeItem, index) => {
//           {
//             if (index == 0) {
//               ctx.moveTo(strokeItem.x, strokeItem.y);
//               ctx.beginPath();
//             } else if (index == strokes.length - 1) {
//               ctx.closePath();
//             } else {
//               ctx.strokeStyle = "white";
//               ctx.lineTo(strokeItem.x, strokeItem.y);
//               ctx.stroke();
//             }
//           }
//         });
//       });
//     }
//   };

//   const handleMouseMove = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     if (isDown) {
//       const ctx = contextRef.current;
//       ctx.strokeStyle = selectedTool.tool == "eraser" ? "black" : "white";
//       ctx.lineWidth = 2;
//       setPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
//       ctx.lineTo(offsetX, offsetY);
//       ctx.stroke();
//     }
//   };

//   return (
//     <>
//       <canvas
//         className="h-[calc(100vh-64px)] w-full bg-black"
//         ref={canvasRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       ></canvas>
//       <div className="bg-white top-1/2 left-10 absolute z-10 flex flex-col gap-3 p-2 rounded-2xl">
//         <div className="bg-slate-500 p-2">
//           <LucidePencilLine />
//         </div>
//         <div className="bg-slate-500 p-2">
//           <LucideEraser
//             onClick={() => {
//               setSelectedTool({ tool: "eraser" });
//             }}
//           />
//         </div>
//         <div className="bg-slate-500 p-2">
//           <LucidePencilLine />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Whiteboard;
