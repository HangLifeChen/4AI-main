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

const XIcon = ({ className, forceHover, isDone }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M13.3885 0H15.9953L10.3002 7.20103L17 17H11.7541L7.64539 11.057L2.94405 17H0.335697L6.42711 9.29769L0 0H5.37904L9.09299 5.43215L13.3885 0ZM12.4736 15.2738H13.918L4.59417 1.63549H3.04413L12.4736 15.2738Z" fill="url(#paint0_linear_621_4797)" />
        <defs>
          <linearGradient id="paint0_linear_621_4797" x1="8.90476" y1="0" x2="8.90476" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default XIcon;

