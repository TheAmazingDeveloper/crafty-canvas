import {
  LucideChevronLeft,
  LucideMessageSquareMore,
  LucideShare2,
} from "lucide-react";
import React from "react";

/*
  -TODO:
    -- Check if the user is logged in and if they are show project name
    -- Replace Project Name with real data
    -- Replace circular avatars of collaboartors with Collaborators text.
*/

function Navbar() {
  return (
    <>
      <div
        className={`h-[64px] flex justify-between items-center p-2 ${
          /*rounded-b-2xl*/ ""
        }`}
      >
        <div className="flex gap-4 items-center">
          <div className="p-2 cursor-pointer bg-[#f2f1f1] rounded-lg">
            <LucideChevronLeft />
          </div>
          <div>
            <span className="font-semibold">Project Name</span>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div>Collaborators</div>
          <div className="p-2 rounded-lg border-2 border-[#eae9ed]">
            <LucideMessageSquareMore size="20px" />
          </div>
          <div className="flex-center gap-2 text-white rounded-lg px-4 py-2 bg-[#4774d5]">
            <span className="text-sm">Share</span>
            <LucideShare2 color="white" size="16px" fill="#ffffff" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

/* DRAFT - 1 */

// import React from "react";

// /*
//   -TODO:
//       -- Check if the user is logged in and if they are show project name
// */

// function Navbar() {
//   return (
//     <>
//       <div className="bg-stone-400 flex justify-between">
//         <div className="flex items-center gap-2">
//           <div className="h-[64px] w-[64px] bg-[#e8e0de] flex-col-center p-2">
//             <div className="p-1 bg-[#a47d7e]">
//               <span className="font-bold text-xs text-[#e8e0de]">CRAFTY</span>
//             </div>
//             <div>
//               <span className="text-sm  text-[#a47d7e]">CANVAS</span>
//             </div>
//           </div>
//           <div>Project Name</div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;
