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

const DiscordIcon = ({ className, forceHover, isDone }) => {
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
        <path d="M20.9636 13.2948C21.2084 9.3702 20.2115 5.33294 18.2002 2.0468C17.7805 1.35201 17.7455 1.37079 17.0459 1.07034C15.9091 0.563339 14.6499 0.206558 13.4431 0.0187783L12.9009 1.18301C11.3094 0.957675 9.71783 0.957675 8.12629 1.18301L7.56663 0C6.4473 0.206557 5.32797 0.507005 4.26111 0.957676C3.99877 1.07034 3.54404 1.23935 3.31668 1.38957C3.08932 1.53979 2.63459 2.40358 2.47719 2.70403C0.710748 5.99017 -0.303642 10.0838 0.0811265 13.8769C0.0811265 13.9708 0.116105 14.0647 0.151084 14.1586C0.238531 14.3464 1.06054 14.8909 1.2879 15.0411C2.14489 15.6233 3.17676 16.1678 4.1212 16.5621C4.36605 16.6748 5.29299 17.0692 5.48538 16.9753C5.57282 16.9189 6.58721 15.2101 6.56972 15.0975C6.13249 14.7782 5.2755 14.5717 4.89073 14.2149C4.7858 14.121 5.13559 13.8581 5.20554 13.8393C5.34546 13.8018 6.18496 14.2337 6.41232 14.3276C7.4442 14.7031 8.54604 14.9285 9.63038 15.0599H11.2569C12.4987 14.9472 13.653 14.6844 14.8248 14.2337C15.0346 14.1586 15.6992 13.8018 15.8391 13.8393C15.9091 13.8393 16.2589 14.1022 16.154 14.2149C15.9266 14.4215 14.475 14.9848 14.475 15.0975C14.6324 15.3791 14.7548 15.6796 14.9122 15.9613C14.9997 16.1303 15.5069 16.9565 15.5943 16.994C15.8217 17.0692 17.2558 16.4119 17.5706 16.2617C18.4801 15.8298 20.0016 15.0036 20.7362 14.3276C21.086 14.0083 20.9286 13.7267 20.9636 13.276V13.2948ZM6.56972 11.5297C5.06563 11.079 4.71584 8.78808 5.76521 7.6614C6.6047 6.76006 8.02135 7.00418 8.61599 8.0933C9.47298 9.68942 8.35365 12.0554 6.56972 11.5297ZM12.9009 11.1729C10.7847 9.40775 13.3032 5.57705 15.2795 7.6614C16.976 9.46409 14.9122 12.8441 12.9009 11.1729Z" fill="url(#paint0_linear_641_5226)" />
        <defs>
          <linearGradient id="paint0_linear_641_5226" x1="11" y1="0" x2="11" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor={start} />
            <stop offset="1" stopColor={end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DiscordIcon;

