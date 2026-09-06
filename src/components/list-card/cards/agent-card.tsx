"use client";
import { IAgentCard } from "@/types/agent-types";
import { formatTimeAgo, request } from "@/utils";
import { Dot } from "lucide-react";
import { Img as Avatar } from "@/components/common/img";
import Link from "next/link";
import { addToast } from "@heroui/react";
import { useState } from "react";
import { useUser } from "@/stores";
import X402Icon from "@/components/ui/x402-icon";

interface ApiType {
  list: string,
  like: string
  unlike: string,
  detail: string
}

interface IProps {
  content: IAgentCard;
  api: ApiType
}

const AgentCard = ({ content, api }: IProps) => {

  const { authLoginStatus } = useUser();
  const [agentDetail, setAgentDetail] = useState<IAgentCard>(content)

  const getDetails = async (id: number) => {
    const res = await request.get(api.detail, {
      params: { repo_id: id }
    });
    if (res.code == 0) {
      setAgentDetail(res.data)
    }
  }

  const likeAgent = async (id: number, flag: boolean) => {
    const loginStatus = authLoginStatus();

    if (loginStatus) {
      const finalPath = flag ? api.unlike : api.like
      const res = await request.post(finalPath, {
        repo_id: id
      });
      if (res.code == 0) {
        getDetails(id);
      } else {
        addToast({ title: `${flag ? "Unstar" : "Star"} agent failed` });
      }
    }
  }

  return (
    <div className="group w-full rounded-xl flex justify-between items-center py-4 px-2 md:px-5 border bg-[linear-gradient(90deg,#242731_0%,#141618_100%)] hover-bg-override">
      <div className="flex flex-col gap-[10px]">

        <div className="flex gap-2 items-center">
          <Avatar
            width={22}
            height={22}
            src={agentDetail.user_photo}
            alt="avatar"
            className="rounded-full overflow-hidden"
          />
          <Link href={`/agenthub/${agentDetail.id}`}>
            <div className="text-[15px] font-bold group-hover:text-primary">{agentDetail.username} / {agentDetail.name}</div>
          </Link>
          {
            agentDetail.is402 && <X402Icon />
          }
        </div>

        <div className="flex">
          <div className="flex gap-[6px]">
            <span className="hidden md:block text-[var(--common-white-four)] text-[13px]">Updated </span>
            <span className="text-[var(--common-white-four)] text-[13px]">{formatTimeAgo(agentDetail.created_at)}</span>
          </div>
          <div className="flex justify-between items-center">
            <Dot className="text-[var(--common-white-four)] w-[23px] h-5" />
          </div>
          <div className="flex gap-[6px]">
            <img
              width={16}
              height={16}
              src="/agentHub/download-card.svg"
              alt="download"
            />
            <span className="text-[var(--common-white-four)] text-[13px] pt-[2px]">{agentDetail.download_count}</span>
          </div>
          <div className="flex justify-between items-center">
            <Dot className="text-[var(--common-white-four)] w-[23px] h-5" />
          </div>
          <div className="flex gap-[6px]">
            <img
              width={16}
              height={16}
              src="/agentHub/comment-card.svg"
              alt="comment"
            />
            <span className="text-[var(--common-white-four)] text-[13px] pt-[2px]">{agentDetail.comment_count}</span>
          </div>
          <div className="flex justify-between items-center">
            <Dot className="text-[var(--common-white-four)] w-[23px] h-5" />
          </div>
          <div className="flex gap-[6px]">
            <img
              width={16}
              height={16}
              src={agentDetail.is_like ? "/agentHub/star-active.svg" : "/agentHub/star-card.svg"}
              alt="star"
            />
            <span className="text-[var(--common-white-four)] text-[13px] pt-[2px]">{agentDetail.likes_count}</span>
          </div>
        </div>
      </div>
      <div className="py-1 min-w-[90px] md:py-[9px] md:min-w-[100px]  felx justify-center items-center rounded-[21px] border border-solid border-[var(--common-white-two)]"
        onClick={() => likeAgent(agentDetail.id, agentDetail.is_like)}
      >
        <div className="flex gap-2 justify-center cursor-pointer min-w-[80px] text-[15px]">
          <img
            width={18}
            height={18}
            src={agentDetail.is_like ? "/agentHub/star-active.svg" : "/agentHub/star.svg"}
            alt="star"
          />
          {agentDetail.is_like ? <span className="text-[#FFC637]">Starred</span> : <span className="text-[var(--common-white-four)]">Star</span>}
        </div>

      </div>
    </div>
  )
};

export default AgentCard;