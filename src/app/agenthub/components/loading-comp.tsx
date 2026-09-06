"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { combineColor } from "@/utils";
import { useEffect, useState } from "react";


const LoadingComp = ({ type, bg }: { type?: string, bg: string }) => {
  const [gradientStyle, setGradientStyle] = useState<string>("");

  useEffect(() => {
    const gradient = combineColor(type);
    setGradientStyle(gradient);
  }, [type]);


  return (
    <div className="w-full overflow-hidden p-4 rounded-xl flex flex-col gap-3" style={{ background: gradientStyle }}>
      <div className="flex gap-2 items-center justify-start h-[22px]">
        <Skeleton className="size-5 rounded-full bg-[var(--common-white-two)]" />
        <Skeleton className="flex-1 h-4 bg-[var(--common-white-two)]" />
      </div>
      <div className="flex items-center gap-[14px]">
        <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />

        <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />

        <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />
      </div>
    </div>
  )
};

export default LoadingComp;