import React from "react";
import Navbar from "./components/Navbar";
import Whiteboard from "./components/Whiteboard";

function App() {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Whiteboard />
      </div>
      {/* <div>App</div>; */}
    </>
  );
}

export default App;
