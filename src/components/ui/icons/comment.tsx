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

const CommentIcon = ({ className, forceHover, isDone }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
        <path d="M9.5 0C14.7466 0 19 4.25339 19 9.49999C19 14.7466 14.7466 19 9.5 19C7.7815 19.0025 6.09478 18.5368 4.62104 17.6529C4.47258 17.5649 4.32374 17.4776 4.17454 17.3909L1.8499 18.0251C1.3179 18.1699 0.830072 17.6819 0.975184 17.1501L1.60836 14.8281C1.36326 14.412 1.20271 14.1329 1.12291 13.984C0.383592 12.6052 -0.00222457 11.0645 9.64854e-06 9.49999C9.64854e-06 4.25339 4.25339 0 9.5 0ZM7.22404 12.2407C7.15209 12.1809 7.06906 12.1359 6.97969 12.1081C6.89032 12.0804 6.79637 12.0705 6.70319 12.0791C6.61001 12.0877 6.51944 12.1145 6.43664 12.1581C6.35383 12.2017 6.28043 12.2612 6.22061 12.3331C6.16079 12.4051 6.11572 12.4881 6.08799 12.5775C6.06026 12.6669 6.0504 12.7608 6.05898 12.854C6.06756 12.9472 6.09441 13.0377 6.13799 13.1205C6.18157 13.2033 6.24104 13.2767 6.31299 13.3366C7.20768 14.0817 8.33564 14.4891 9.5 14.4875C10.6794 14.4875 11.7976 14.0759 12.6863 13.337C12.7593 13.2776 12.8199 13.2042 12.8644 13.1212C12.9089 13.0382 12.9365 12.9473 12.9457 12.8535C12.9548 12.7598 12.9452 12.6652 12.9176 12.5751C12.8899 12.4851 12.8447 12.4015 12.7845 12.329C12.7243 12.2566 12.6503 12.1968 12.5668 12.1532C12.4834 12.1095 12.3921 12.0828 12.2983 12.0746C12.2045 12.0665 12.1099 12.077 12.0202 12.1056C11.9305 12.1342 11.8473 12.1803 11.7755 12.2412C11.1368 12.7734 10.3313 13.0641 9.5 13.0625C8.66844 13.064 7.86281 12.7732 7.22404 12.2407Z" fill="url(#paint0_linear_621_4812)" />
        <defs>
          <linearGradient id="paint0_linear_621_4812" x1="9.95238" y1="0" x2="9.95238" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CommentIcon;

