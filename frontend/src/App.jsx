import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Whiteboard from "./components/Whiteboard";
import { WhiteboardSocket } from "./services/websocket";
import { useParams } from "react-router-dom";

const App = () => {
  const params = useParams();
  const [localSocket, setLocalSocket] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const localSocket = new WhiteboardSocket(import.meta.env.VITE_BACKEND_URL);
    setLocalSocket(localSocket);
  }, []);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/join-room/${localSocket?.roomId}`
    );
  };

  return (
    <div className="absolute">
      {/* <Auth /> */}
      <Navbar localSocket={localSocket} openDialog={openDialog} />
      {localSocket && (
        <Whiteboard localSocket={localSocket} roomId={params?.roomId} />
      )}
      <dialog
        ref={dialogRef}
        className="border-none outline-none rounded-2xl p-6"
      >
        <div className="flex justify-end mb-4">
          <LucideX className="cursor-pointer" onClick={closeDialog} />
        </div>
        <div className="flex gap-4">
          <div className="border-2 border-gray-400 p-2 rounded-lg">{`${
            import.meta.env.VITE_FRONTEND_URL
          }/join-room/${localSocket?.roomId}`}</div>
          <div
            className="bg-[#4774d5] text-white p-2 cursor-pointer rounded-lg"
            onClick={copyToClipboard}
          >
            COPY
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default App;
