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

const LikeIcon = ({ className, forceHover, isDone }) => {
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
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
        <path
          d="M13.6512 0C17.5203 0 20 2.87491 20 6.74411C20 9.74666 17.068 13.0534 11.2912 16.769C10.9119 17.0124 10.4614 17.1429 10 17.1429C9.53856 17.1429 9.0881 17.0124 8.70875 16.769C2.932 13.0534 0 9.74666 0 6.74411C0 2.87491 2.47975 0 6.34875 0C7.746 0 8.69375 0.452433 10 1.47892C11.3065 0.452665 12.254 0 13.6512 0Z"
          fill="url(#like-gradient)"
        />
        <defs>
          <linearGradient
            id="like-gradient"
            x1="10"
            y1="0"
            x2="10"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LikeIcon;
