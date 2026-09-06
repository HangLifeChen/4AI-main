import React, { useState } from 'react';
import { CommentType1 } from '@/types/agent-types';
// import Image from "next/image";
import { motion } from 'framer-motion';
import { Dot } from "lucide-react";
import { cn, formatTimeAgo } from '@/utils';
import { Input } from '@/components/ui/input';
import { createRequestComments, getRequestComments, getCommentDetail, likeRequestComment, unlikeRequestComment } from '../request';

import { addToast } from '@heroui/react';
import CommentChild from './comment-child';
import { useUser } from '@/stores';

interface CommentSectionProps {
  comment: CommentType1;
  handleLike?: (id: number, isLike: boolean, parent_id: number) => void
  addComment?: (comment: string, cid: number, pId: number) => void
  className?: string,
  requestId: number
}

type CommentIds = {
  id: number;
  pId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comment, className, requestId }) => {

  const { authLoginStatus } = useUser();
  const [replyContent, setReplyContent] = useState('');
  const [currentId, setCurrentId] = useState<CommentIds>({ id: 0, pId: 0 });
  const [showInput, setShowInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false)
  const [secondaryReplies, setSecondaryReplies] = useState<CommentType1[]>([]);

  const [displayComment, setDispalyComment] = useState<CommentType1>(comment);

  const handleLikeMethod = async (id: number, isLike: boolean) => {
    authLoginStatus();
    const requestMethod = isLike ? unlikeRequestComment : likeRequestComment
    const res = await requestMethod({
      comment_id: id
    })
    if (res.code == 0) {
      addToast({ title: `${isLike ? "Unlike" : "Like"} comment successfully` });
      getDetail(id);
    } else {
      addToast({ title: `${isLike ? "Unlike" : "Like"} comment failed` });
    }
  }

  const getDetail = async (id: number) => {
    const res = await getCommentDetail({ comment_id: id })
    if (res.code == 0) {
      setDispalyComment({ ...res.data })
    }
  }

  const handleReply = async () => {
    authLoginStatus();
    const res = await createRequestComments({
      request_id: requestId,
      content: replyContent,
      parent_id: currentId.id,
      root_parent_id: currentId.pId
    })
    if (res.code == 0) {
      addToast({ title: "create comment successfully", color: "success" });
      setShowInput(!showInput)
      setReplyContent('')
      await getDetail(currentId.pId)
      await getReplyChildren()
    } else {
      addToast({ title: "create comment failed" });
    }
  };

  const handleInput = (pId: number, id: number) => {
    setCurrentId({ id, pId })
    setShowInput(!showInput)
  }

  const handleChildInput = (pId: number, id: number, name: string) => {
    setCurrentId({ id, pId })
    setShowInput(!showInput)
    setReplyContent(`reply to @${name.slice(6)} `)
  }

  const getReplyChildren = async (id?: number) => {
    const res = await getRequestComments({
      cur_page: 1,
      page_size: 10,
      request_id: requestId,
      root_parent_id: id || currentId.pId
    });
    if (res.code == 0) {
      setSecondaryReplies([...res.data?.list])
    }
  }

  const showReplyChildren = async (id: number) => {
    await getReplyChildren(id)
    setShowReplies(!showReplies)
  }

  return (
    <div className={
      cn("mb-[17px] last:mb-0 last:pb-0 last:border-b-transparent", className)
    }>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <div className="flex gap-3 items-start">
          <img
            width={30}
            height={30}
            src="/agentHub/deepseek.svg"
            alt="deepseek"
            className="rounded-full overflow-hidden"
          />
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center">
              <span className="text-sm text-[var(--common-white-six)]">{displayComment.username}</span>
              <Dot className="text-[var(--common-white-six)]" />
              <span className="text-[var(--common-white-six)] text-sm">{formatTimeAgo(displayComment.created_at)}</span>
            </div>
            <p className="text-[var(--common-white-eight)] text-[15px]">{displayComment.content}</p>
            <div className="flex items-center gap-5">
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
                onClick={() => handleInput(displayComment.parent_id, displayComment.id)}
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

            {!displayComment.parent_id && displayComment.comment_count > 0 && (
              <div
                className={`flex gap-1 cursor-pointer items-center ${showReplies && 'mb-[30px]'} `}
                onClick={() => showReplyChildren(displayComment.id)}
              >
                <span className="text-sm text-[#3A9BF6]">
                  {showReplies ? 'Hide replies' : `Show replies`}
                </span>
                <img
                  width={16}
                  height={16}
                  src="/agentHub/expand.svg"
                  alt="expand"
                  className={`transform ${showReplies ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>
        </div>

        {showReplies && secondaryReplies.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="ml-12"
          >
            {secondaryReplies.map((reply) => (
              <CommentChild
                key={reply.id}
                comment={reply}
                handleChildInput={handleChildInput}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {showInput && (
        <div className="relative flex items-center mt-6">
          <Input
            className="focus-visible:ring-transparent h-[50px] w-full pl-5 py-[6px] bg-[#111212] border border-[var(--common-white-two)] rounded-[88px] placeholder:text-[16px] text-white"
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div
            onClick={handleReply}
            className="absolute right-4 bg-primary w-[100px] h-[38px] rounded-[100px] flex justify-center items-center text-black text-sm font-bold cursor-pointer hover:bg-[#20cce6]"
          >
            Reply
          </div>
        </div>
      )}

    </div>
  );
};

export default CommentSection;