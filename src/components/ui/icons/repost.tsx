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

const RepostIcon = ({ className, forceHover, isDone }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none">
        <path d="M20.252 7.21155L10.9492 0.127283C10.5399 -0.184285 9.95545 0.111632 9.95545 0.630426V5.02452C4.40971 5.32711 0 9.98686 0 15.6913C0 15.8017 0.00185291 15.9117 0.00535284 16.021C0.0257348 16.6462 0.847807 16.8149 1.1243 16.2558C2.77071 12.9262 6.08123 10.5954 9.95525 10.379V14.799C9.95525 15.3177 10.5397 15.6137 10.949 15.3021L20.2518 8.21783C20.5827 7.96595 20.5827 7.46322 20.252 7.21155Z" fill="url(#paint0_linear_621_4809)" />
        <defs>
          <linearGradient id="paint0_linear_621_4809" x1="10.7381" y1="0" x2="10.7381" y2="16.5952" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default RepostIcon;
