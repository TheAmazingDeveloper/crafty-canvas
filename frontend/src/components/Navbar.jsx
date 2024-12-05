import React from "react";

/* 
  -TODO:
      -- Check if the user is logged in and if they are show project name  
*/

function Navbar() {
  return (
    <>
      <div className="bg-stone-400 flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[64px] w-[64px] bg-[#e8e0de] flex-col-center p-2">
            <div className="p-1 bg-[#a47d7e]">
              <span className="font-bold text-xs text-[#e8e0de]">CRAFTY</span>
            </div>
            <div>
              <span className="text-sm  text-[#a47d7e]">CANVAS</span>
            </div>
          </div>
          <div>Project Name</div>
        </div>
      </div>
      {/* <div className="bg-stone-400">
        <div className="object-cover">
          <img className="h-[64px]" src="/images/favicon-96x96.png" />
        </div>
        <div></div>
      </div> */}
      {/* <div className="h-screen flex-center bg-stone-400">
        <div className="h-[500px] w-[500px] p-8 flex-center bg-white rounded-2xl">
          
        </div>
      </div> */}
    </>
  );
}

export default Navbar;
