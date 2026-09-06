"use client"
import { IResolveCard } from "@/types/request-types";
import { Img as Avatar } from "@/components/common";
import { likeResolve, unlikeResolve } from "../request";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { combineColor } from "@/utils";
import { useUser } from "@/stores";
import Link from "next/link";
interface IProps {
  content: IResolveCard,
}

const ResolveCard = ({ content }: IProps) => {

  const { authLoginStatus } = useUser();
  const [gradientStyle, setGradientStyle] = useState("");

  useEffect(() => {
    const gradient = combineColor();
    setGradientStyle(gradient);
  }, [content]);

  const [likeFlag, setLikeFlag] = useState(content.is_like);
  const handleLike = async (id: number) => {
    event?.stopPropagation();
    authLoginStatus();
    const requestMethod = likeFlag ? unlikeResolve : likeResolve
    const res = await requestMethod({
      resolve_id: id
    });
    if (res.code == 0) {
      setLikeFlag(!likeFlag);
    } else {
      addToast({ title: `${likeFlag ? "Unstar" : "Star"} agent failed` });
    }
  }

  return (

    <div className="flex w-full overflow-hidden p-4 rounded-xl" style={{ background: gradientStyle }}>

      <Link href={`/agenthub/${content.repositories}`} className="flex-1 w-full" key={content.id}>
        <div className="flex flex-col gap-3 cursor-pointer"
        >
          <div className="flex gap-2 items-center justify-start">
            <Avatar
              width={20}
              height={20}
              src={content.repo_user_photo}
              alt="avatar"
              className="rounded-full overflow-hidden flex-shrink-0"
            />
            <span className="text-[13px] text-[var(--common-white-eight)]">{content.repo_username.slice(0, 8)}</span>
          </div>
          <span className="text-[15px] font-bold">{content.repo_name}</span>
        </div>
      </Link>

      <div className="flex justify-center items-center">
        <div className="h-[30px] w-[82px] flex justify-center items-center rounded-[21px] border border-solid border-[var(--common-white-four)]"
          onClick={() => handleLike(content.id)}
        >
          <div className="flex gap-[6px] justify-center cursor-pointer text-[13px]">
            <img
              width={16}
              height={16}
              src={likeFlag ? "/agentHub/star-active.svg" : "/agentHub/star.svg"}
              alt="star"
            />
            {likeFlag ? <span className="text-[#FFC637] pt-[2px]">Starred</span> : <span className="text-[var(--common-white-six)] pt-[2px]">Star</span>}
          </div>

        </div>
      </div>

    </div>

  )
};

export default ResolveCard;