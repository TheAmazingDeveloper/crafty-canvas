import React, { useRef, useState, useEffect } from "react";
import { LucideEraser, LucidePencilLine, LucideShare } from "lucide-react";
import { CanvasManager } from "../utils/canvasManager";
import { RoomConnectionTypes, Tools } from "../utils/constants";
import { MessageTypes } from "../utils/constants";

const Whiteboard = ({ localSocket, roomId }) => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const canvasManagerRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState({ tool: Tools.PENCIL });
  const selectedToolRef = useRef(Tools.PENCIL);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    socketRef.current = localSocket;

    const canvasManager = new CanvasManager(canvasRef.current);
    canvasManagerRef.current = canvasManager;

    localSocket.connect(handleSocketMessage);

    localSocket.socket.addEventListener("open", (event) => {
      if (roomId) {
        console.log(true)
        localSocket.sendRoomConnection(roomId, RoomConnectionTypes.JOIN);
      }
    });
  }, []);

  const handleSocketMessage = (data) => {
    switch (data.type) {
      case MessageTypes.MOUSE_EVENT:
        handleRemoteMouseEvent(data);
        break;
      case MessageTypes.TOOL_EVENT:
        selectedToolRef.current = data.tool;
        setSelectedTool({ tool: data.tool });
        break;
    }
  };

  const handleRemoteMouseEvent = (data) => {
    const canvas = canvasManagerRef.current;

    switch (data.eventType) {
      case "mouse-down":
        canvas.startPath(data.x, data.y);
        break;
      case "mouse-move":
        canvas.draw(data.x, data.y, selectedToolRef.current);
        break;
      case "mouse-up":
        canvas.endPath();
        break;
    }
  };

  const handleMouseDown = (x, y) => {
    socketRef.current.sendMouseEvent("mouse-down", x, y);
    canvasManagerRef.current.startPath(x, y);
    setIsDown(true);
  };

  const handleMouseUp = () => {
    socketRef.current.sendMouseEvent("mouse-up");
    canvasManagerRef.current.endPath();
    setIsDown(false);
  };

  const handleMouseMove = (x, y) => {
    if (!isDown) return;

    socketRef.current.sendMouseEvent("mouse-move", x, y);
    canvasManagerRef.current.draw(x, y, selectedToolRef.current);
  };

  const handleToolSelect = (tool) => {
    socketRef.current.sendToolEvent(tool);
    selectedToolRef.current = tool;
    setSelectedTool({ tool });
  };

  return (
    <>
      <canvas
        className="h-[calc(100vh-64px)] w-full bg-black"
        ref={canvasRef}
        onMouseDown={(e) =>
          handleMouseDown(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        onMouseUp={handleMouseUp}
        onMouseMove={(e) =>
          handleMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
      />
      <div className="bg-white top-[45%] left-5 absolute z-10 flex flex-col gap-3 p-2 rounded-2xl">
        <div
          className={`p-1 ${
            selectedTool.tool === Tools.PENCIL ? "bg-slate-200" : ""
          } hover:bg-slate-200 cursor-pointer rounded-lg`}
        >
          <LucidePencilLine onClick={() => handleToolSelect(Tools.PENCIL)} />
        </div>
        <div
          className={`p-1 ${
            selectedTool.tool === Tools.ERASER ? "bg-slate-200" : ""
          } hover:bg-slate-200 cursor-pointer rounded-lg`}
        >
          <LucideEraser onClick={() => handleToolSelect(Tools.ERASER)} />
        </div>
      </div>
    </>
  );
};

export default Whiteboard;

/* DRAFT - 2 */

// import React, { useRef, useState } from "react";
// import { useEffect } from "react";
// import { LucideEraser, LucidePencilLine, LucideShare } from "lucide-react";

// /*
//     - selectedTool Object Structure
//         -- tool (string) : tells us which tool is currently seleected
// */

// function Whiteboard() {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const socketRef = useRef(null);
//   const clientIdRef = useRef(null);
//   const [selectedTool, setSelectedTool] = useState({ tool: "pencil" });
//   const selectedToolRef = useRef({ tool: "pencil" });
//   const [isDown, setisDown] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight - 64;
//     const ctx = canvas.getContext("2d");
//     contextRef.current = ctx;
//     socketRef.current = new WebSocket("ws://localhost:3000");
//     socketRef.current.onmessage = (message) => {
//       const data = JSON.parse(message.data);
//       if (data.type == "clientId") {
//         clientIdRef.current = data.clientId;
//       } else if (data.type == "mouse-event") {
//         if (data.eventType == "mouse-down") {
//           console.log(data.x, data.y);
//           ctx.moveTo(data.x, data.y);
//           ctx.beginPath();
//         } else if (data.eventType == "mouse-move") {
//           ctx.strokeStyle =
//             selectedToolRef.current.tool == "eraser" ? "black" : "white";
//           ctx.lineWidth = selectedToolRef.current.tool == "eraser" ? 20 : 2;
//           ctx.lineTo(data.x, data.y);
//           ctx.stroke();
//         } else if (data.eventType == "mouse-up") {
//           ctx.closePath();
//         }
//       } else if (data.type == "tool-event") {
//         selectedToolRef.current.tool = data.tool;
//         setSelectedTool({ tool: data.tool });
//       }
//     };
//   }, []);

//   const handleMouseDown = (offsetX, offsetY) => {
//     const ctx = contextRef.current;
//     const data = {
//       type: "mouse-event",
//       eventType: "mouse-down",
//       clientId: clientIdRef.current,
//       x: offsetX,
//       y: offsetY,
//     };
//     socketRef.current.send(JSON.stringify(data));
//     ctx.moveTo(offsetX, offsetY);
//     ctx.beginPath();
//     setisDown(true);
//   };

//   const handleMouseUp = () => {
//     const ctx = contextRef.current;
//     const data = {
//       type: "mouse-event",
//       eventType: "mouse-up",
//       clientId: clientIdRef.current,
//     };
//     socketRef.current.send(JSON.stringify(data));
//     ctx.closePath();
//     setisDown(false);
//   };

//   const handleMouseMove = (offsetX, offsetY) => {
//     if (isDown) {
//       const ctx = contextRef.current;
//       ctx.strokeStyle = selectedTool.tool == "eraser" ? "black" : "white";
//       ctx.lineWidth = selectedTool.tool == "eraser" ? 20 : 2;
//       const data = {
//         type: "mouse-event",
//         eventType: "mouse-move",
//         clientId: clientIdRef.current,
//         x: offsetX,
//         y: offsetY,
//       };
//       socketRef.current.send(JSON.stringify(data));
//       ctx.lineTo(offsetX, offsetY);
//       ctx.stroke();
//     }
//   };

//   return (
//     <>
//       <canvas
//         className="h-[calc(100vh-64px)] w-full bg-black"
//         ref={canvasRef}
//         onMouseDown={(e) => {
//           handleMouseDown(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//         }}
//         onMouseUp={(e) => {
//           handleMouseUp();
//         }}
//         onMouseMove={(e) => {
//           handleMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//         }}
//       ></canvas>
//       <div className="bg-white top-[45%] left-5 absolute z-10 flex flex-col gap-3 p-2 rounded-2xl">
//         <div
//           className={`p-1 ${
//             selectedTool.tool == "pencil" ? "bg-slate-200" : ""
//           } hover:bg-slate-200 cursor-pointer rounded-lg`}
//         >
//           <LucidePencilLine
//             onClick={() => {
//               const toolData = {
//                 type: "tool-event",
//                 tool: "pencil",
//                 clientId: clientIdRef.current,
//               };
//               socketRef.current.send(JSON.stringify(toolData));
//               setSelectedTool({ tool: "pencil" });
//             }}
//           />
//         </div>
//         <div
//           className={`p-1 ${
//             selectedTool.tool == "eraser" ? "bg-slate-200" : ""
//           } hover:bg-slate-200 cursor-pointer rounded-lg`}
//         >
//           <LucideEraser
//             onClick={() => {
//               const toolData = {
//                 type: "tool-event",
//                 tool: "eraser",
//                 clientId: clientIdRef.current,
//               };
//               socketRef.current.send(JSON.stringify(toolData));
//               setSelectedTool({ tool: "eraser" });
//             }}
//           />
//         </div>
//         <div
//           className={`p-1 ${
//             selectedTool.tool == "eraser" ? "bg-slate-200" : ""
//           } hover:bg-slate-200 cursor-pointer rounded-lg`}
//         >
//           <LucideShare
//             onClick={() => {
//               const connectionData = {
//                 type: "room-connection",
//                 roomId: "123",
//               };
//               socketRef.current.send(JSON.stringify(connectionData));
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Whiteboard;

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
