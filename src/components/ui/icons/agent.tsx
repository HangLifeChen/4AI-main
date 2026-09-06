// "use client"

// import { cn } from "@/utils";
// import { useEffect, useState } from "react";

// const colorMap = {
//   defaultStart: "#FFEDC6",
//   defaultEnd: "#B27025",
//   hover: "#FFFDFA",
//   doneStart: "#ffffff",
//   doneEnd: "#7C7C7C",
// }

// const AgentIcon = ({
//   className,
//   forceHover = undefined,
//   isDone = false
// }) => {

//   const [isHover, setIsHover] = useState(false);

//   useEffect(() => {
//     if (typeof forceHover === "boolean") {
//       setIsHover(forceHover);
//     }
//   }, [forceHover]);

//   const currentStart = isDone ? colorMap.doneStart : (isHover ? colorMap.hover : colorMap.defaultStart);
//   const currentEnd = isDone ? colorMap.doneEnd : (isHover ? colorMap.hover : colorMap.defaultEnd);


//   // const currentStart = (isHover || isDone) ? hoverIconColorStart : iconColorStart;
//   // const currentEnd = (isHover || isDone) ? hoverIconColorEnd : iconColorEnd;
//   return (
//     <div
//       onMouseEnter={() => { if (typeof forceHover !== "boolean") setIsHover(true); }}
//       onMouseLeave={() => { if (typeof forceHover !== "boolean") setIsHover(false); }}
//       className={
//         cn(
//           "duration-300 flex justify-center items-center size-8 lg:size-[42px] bg-[rgba(0,0,0,0.42)] border border-[rgba(255,255,255,0.08)] rounded-2xl",
//           className
//         )
//       }>
//       <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
//         <path d="M14.1925 14.0229L13.6466 13.8346L11.6904 13.1758C10.9626 12.9405 10.5077 12.2347 10.4622 11.4818C10.4167 10.6818 10.8716 9.97599 11.554 9.6466L16.467 7.43494V5.64678H0V15.0581C0 15.5757 0.409422 15.9992 0.909811 15.9992H14.238C14.1925 15.8581 14.1925 15.6698 14.1925 15.5286V14.0229ZM16.467 0.941138C16.467 0.423509 16.0576 0 15.5572 0H0.909811C0.409422 0 0 0.423509 0 0.941138V4.23509H16.467V0.941138ZM3.86675 2.82339H2.04711C1.68317 2.82339 1.36474 2.494 1.36474 2.11754C1.36474 1.74108 1.68317 1.4117 2.04711 1.4117H3.86675C4.23069 1.4117 4.54912 1.74111 4.54912 2.11754C4.54912 2.49398 4.23069 2.82339 3.86675 2.82339ZM14.4199 2.82339H7.59623C7.23229 2.82339 6.91386 2.494 6.91386 2.11754C6.91386 1.74108 7.23229 1.4117 7.59623 1.4117H14.4199C14.7839 1.4117 15.1023 1.74111 15.1023 2.11754C15.1023 2.49398 14.7839 2.82339 14.4199 2.82339Z" fill="url(#paint0_linear_621_4791)" />
//         <path d="M20.3793 7.10568L12.1453 10.9643C11.7814 11.1525 11.7814 11.7172 12.1909 11.8584L14.1015 12.5172L17.7408 10.0232L15.5572 12.8466L18.1957 13.9289C18.6506 14.1171 19.1965 13.8347 19.333 13.3171L20.9707 7.67036C21.1071 7.2939 20.7432 6.91744 20.3793 7.10568ZM15.5572 15.5288C15.5572 15.9994 16.1486 16.1876 16.376 15.7641L17.1494 14.4465L15.5572 13.8347V15.5288Z" fill="url(#paint1_linear_621_4791)" />
//         <defs>
//           <linearGradient id="paint0_linear_621_4791" x1="11" y1="0" x2="11" y2="16" gradientUnits="userSpaceOnUse">
//             <stop stopColor={currentStart} />
//             <stop offset="1" stopColor={currentEnd} />
//           </linearGradient>
//           <linearGradient id="paint1_linear_621_4791" x1="11" y1="0" x2="11" y2="16" gradientUnits="userSpaceOnUse">
//             <stop stopColor={currentStart} />
//             <stop offset="1" stopColor={currentEnd} />
//           </linearGradient>
//         </defs>
//       </svg>
//     </div>
//   );
// };

// export default AgentIcon;
"use client";

import { cn } from "@/utils";
import { useEffect, useState } from "react";

const iconColorVariants = {
  default: { start: "#FFEDC6", end: "#B27025" },
  hover: { start: "#FFFDFA", end: "#FFFDFA" },
  done: { start: "#ffffff", end: "#7C7C7C" },
};

const getState = (isDone, isHover) => {
  if (isHover) return "hover";
  if (isDone) return "done";
  return "default";
};

const AgentIcon = ({ className, forceHover, isDone }) => {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (typeof forceHover === "boolean") setIsHover(forceHover);
  }, [forceHover]);

  const state = getState(isDone, isHover);
  const { start, end } = iconColorVariants[state];

  return (
    <div
      onMouseEnter={() => typeof forceHover !== "boolean" && setIsHover(true)}
      onMouseLeave={() => typeof forceHover !== "boolean" && setIsHover(false)}
      className={cn(
        "duration-300 flex justify-center items-center size-8 lg:size-[42px] " +
        "bg-[rgba(0,0,0,0.42)] border border-[rgba(255,255,255,0.08)] rounded-2xl",
        className
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
        <path d="M14.1925 14.0229L13.6466 13.8346L11.6904 13.1758C10.9626 12.9405 10.5077 12.2347 10.4622 11.4818C10.4167 10.6818 10.8716 9.97599 11.554 9.6466L16.467 7.43494V5.64678H0V15.0581C0 15.5757 0.409422 15.9992 0.909811 15.9992H14.238C14.1925 15.8581 14.1925 15.6698 14.1925 15.5286V14.0229ZM16.467 0.941138C16.467 0.423509 16.0576 0 15.5572 0H0.909811C0.409422 0 0 0.423509 0 0.941138V4.23509H16.467V0.941138ZM3.86675 2.82339H2.04711C1.68317 2.82339 1.36474 2.494 1.36474 2.11754C1.36474 1.74108 1.68317 1.4117 2.04711 1.4117H3.86675C4.23069 1.4117 4.54912 1.74111 4.54912 2.11754C4.54912 2.49398 4.23069 2.82339 3.86675 2.82339ZM14.4199 2.82339H7.59623C7.23229 2.82339 6.91386 2.494 6.91386 2.11754C6.91386 1.74108 7.23229 1.4117 7.59623 1.4117H14.4199C14.7839 1.4117 15.1023 1.74111 15.1023 2.11754C15.1023 2.49398 14.7839 2.82339 14.4199 2.82339Z" fill="url(#paint0_linear_621_4791)" />
        <path d="M20.3793 7.10568L12.1453 10.9643C11.7814 11.1525 11.7814 11.7172 12.1909 11.8584L14.1015 12.5172L17.7408 10.0232L15.5572 12.8466L18.1957 13.9289C18.6506 14.1171 19.1965 13.8347 19.333 13.3171L20.9707 7.67036C21.1071 7.2939 20.7432 6.91744 20.3793 7.10568ZM15.5572 15.5288C15.5572 15.9994 16.1486 16.1876 16.376 15.7641L17.1494 14.4465L15.5572 13.8347V15.5288Z" fill="url(#paint1_linear_621_4791)" />
        <defs>
          <linearGradient id="paint0_linear_621_4791" x1="11" y1="0" x2="11" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
          <linearGradient id="paint1_linear_621_4791" x1="11" y1="0" x2="11" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AgentIcon;

