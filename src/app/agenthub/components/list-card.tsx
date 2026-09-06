"use client";
import { cn, combineColor } from "@/utils";
import { Img as Avatar } from "@/components/common";
import { IAgentCard } from "@/types/agent-types";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import X402Icon from "@/components/ui/x402-icon";

interface IProps {
  content: IAgentCard,
  type: string,
  bg?: string,
}

const Card = memo(({ content, type, bg }: IProps) => {

  const [gradientStyle, setGradientStyle] = useState<string>("");

  useEffect(() => {
    const gradient = combineColor(type);
    setGradientStyle(gradient);
  }, []);

  return (
    <div className={
      cn(
        "w-full min-h-[88px] overflow-hidden p-4 rounded-xl flex flex-col gap-3"
      )
    }
      style={{ background: gradientStyle }}>
      {
        content ?
          <>
            <div className="flex gap-2 items-center justify-start">
              <Avatar
                width={20}
                height={20}
                src={content.user_photo}
                alt="avatar"
                className="rounded-full overflow-hidden flex-shrink-0"
              />
              <span className="text-[15px] font-bold">{`${content.username.slice(0, 8)}/${content.name}`}</span>
              {

                content.is402 && <X402Icon />
              }
            </div>
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center gap-1">
                <img
                  width={16}
                  height={16}
                  src="/agentHub/download-card.svg"
                  alt="download"
                />
                <span className="text-[13px] pt-[2px] text-[var(--common-white-six)]">{content.download_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <img
                  width={16}
                  height={16}
                  src="/agentHub/comment-card.svg"
                  alt="comment"
                />
                <span className="text-[13px] pt-[2px] text-[var(--common-white-six)]">{content.comment_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <img
                  width={16}
                  height={16}
                  src="/agentHub/star-card.svg"
                  alt="star"
                />
                <span className="text-[13px] pt-[2px] text-[var(--common-white-six)]">{content.likes_count}</span>
              </div>
            </div>
          </>
          : <>
            <div className="flex gap-2 items-center justify-start h-[22px]">
              <Skeleton className="size-5 rounded-full bg-[var(--common-white-two)]" />
              <Skeleton className="flex-1 h-4 bg-[var(--common-white-two)]" />
            </div>
            <div className="flex items-center gap-[14px]">
              <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />

              <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />

              <Skeleton className="size-[21px] rounded-full bg-[var(--common-white-two)]" />
            </div>
          </>
      }
    </div>

  )
});

export default Card;