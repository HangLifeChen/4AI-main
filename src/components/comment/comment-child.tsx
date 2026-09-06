import React, { useState } from 'react';
import Link from "next/link";
import { ApiType, CommentType1 } from '@/types/agent-types';
import { Img as Avatar } from "@/components/common/img";
import { motion } from 'framer-motion';
import { Dot } from "lucide-react";
import { cn, formatTimeAgo } from '@/utils';
import { addToast } from '@heroui/react';
import { request } from '@/utils';
import { useUser } from '@/stores';

interface CommentChildProps {
  comment: CommentType1;
  handleChildInput: (pId: number, id: number, name: string) => void
  className?: string,
  type?: "display" | "reply",
  api?: ApiType
}

const CommentChild = ({ comment, className, handleChildInput, type = "reply", api }: CommentChildProps) => {

  const [displayComment, setDispalyComment] = useState<CommentType1>(comment);
  const { authLoginStatus } = useUser();

  const handleLikeMethod = async (id: number, isLike: boolean) => {
    const loginStatus = authLoginStatus();
    if (loginStatus) {
      const apiPath = isLike ? api?.unlike : api?.like
      const res = await request.post(apiPath!, {
        comment_id: id
      })
      if (res.code == 0) {
        getDetail(id);
      } else {
        addToast({ title: `${isLike ? "Unlike" : "Like"} comment failed` });
      }
    }
  }

  const getDetail = async (id: number) => {
    const res = await request.post(api?.detail!, { comment_id: id })
    if (res.code == 0) {
      setDispalyComment({ ...res.data })
    }
  }

  return (
    <div className={
      cn("mb-[17px] last:mb-0", className)
    }>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <div className="flex gap-3 items-start">
          <Link href={`/profile/${displayComment.create_by}`}>
            <Avatar
              width={30}
              height={30}
              src={displayComment.user_photo}
              alt="user"
              className="rounded-full overflow-hidden"
            />
          </Link>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center">
              <Link href={`/profile/${displayComment.create_by}`}>
                <span className="text-sm text-[var(--common-white-six)]">{displayComment.username}</span>
              </Link>
              <Dot className="text-[var(--common-white-six)]" />
              <span className="text-[var(--common-white-six)] text-sm">{formatTimeAgo(displayComment.created_at)}</span>
            </div>
            <p className="text-[var(--common-white-eight)] text-[15px]">{displayComment.content}</p>
            {
              type == "reply" && <div className="flex items-center gap-5">
                <div
                  className="cursor-pointer flex items-center gap-[6px] rounded-[110px] border border-[#2A2C30] px-[10px] py-[5px] text-[13px] text-[var(--common-white-six)]"
                  onClick={() => handleLikeMethod(displayComment.id, displayComment.is_like)}
                >
                  <img
                    width={16}
                    height={16}
                    src={displayComment.is_like ? "/agentHub/like-active.svg" : "/agentHub/like.svg"}
                    alt="like"
                  />
                  {displayComment.likes_count}
                </div>
                <div
                  className="cursor-pointer flex items-center gap-[6px] rounded-[110px] border border-[#2A2C30] px-[10px] py-[5px] text-[13px] text-[var(--common-white-six)]"
                  onClick={() => handleChildInput(displayComment.parent_id, displayComment.id, displayComment.username)}
                >
                  <img
                    width={16}
                    height={16}
                    src="/agentHub/comment-light.svg"
                    alt="comment"
                  />
                  {
                    displayComment.comment_count == 1 ? `${displayComment.comment_count} Reply` : (displayComment.comment_count ? `${displayComment.comment_count} Replies` : `Reply`)
                  }
                </div>
              </div>
            }

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentChild;