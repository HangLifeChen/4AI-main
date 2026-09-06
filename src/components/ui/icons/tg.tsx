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

const TgIcon = ({ className, forceHover, isDone }) => {
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
        <path d="M19.2952 0.19094L0.690182 7.04528C-0.058509 7.36446 -0.311743 8.00371 0.509191 8.35061L5.28222 9.79974L16.8227 2.98582C17.4528 2.55804 18.0979 2.67211 17.5428 3.14267L7.63109 11.7165L7.31972 15.345C7.60812 15.9052 8.13616 15.9078 8.47297 15.6294L11.2152 13.1504L15.9117 16.5103C17.0025 17.1273 17.596 16.7291 17.8307 15.5983L20.9112 1.66288C21.231 0.270935 20.6856 -0.342353 19.2952 0.19094Z" fill="url(#paint0_linear_621_4803)" />
        <defs>
          <linearGradient id="paint0_linear_621_4803" x1="11" y1="0" x2="11" y2="16.8" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TgIcon;
