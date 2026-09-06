"use client";
import { Input } from "@/components/ui/input";
import CommentSection from "@/components/comment/comment-section";
import { CommentType1 } from "@/types/agent-types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createAgentComments, getAgentComments } from "../../request";
import { addToast } from "@heroui/react";
import { PaginationWithBtns } from "@/components/common/pagination";
import { useThrottleFn } from "ahooks";
import { useUser } from "@/stores";
import { Button } from "@/components/ui/button";

interface ICommentList {
  count: number;
  list: CommentType1[];
}

const CommunityCard = () => {

  const router = useRouter();
  const { authLoginStatus } = useUser();

  const { id } = useParams();
  const [comments, setComments] = useState<ICommentList>({ count: 0, list: [] });
  const [newComment, setNewComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const getComments = async (page: number = 1) => {
    const res = await getAgentComments({
      cur_page: page,
      page_size: 10,
      repo_id: Number(id)
    });
    if (res.code == 0) {
      setComments(res.data)
    }
  }

  const getList = async (page: number = 1) => {
    await getComments(page);
  }

  useEffect(() => {
    getComments();
  }, [])

  const handleSubmit = async () => {
    const loginStatus = authLoginStatus();

    if (loginStatus) {
      if (newComment.trim()) {
        const commentInfo = {
          repo_id: Number(id),
          content: newComment,
          parent_id: null,
          root_parent_id: null
        }
        const res = await createAgentComments(commentInfo);
        if (res.code == 0) {
          addToast({ title: "create comment successfully" });
          getComments();
          setNewComment("")
        } else {
          addToast({ title: "create comment failed" });
        }
      }
    }

  };

  const { run: throttledClick } = useThrottleFn(handleSubmit, {
    wait: 1000,
    leading: true,
    trailing: false
  });

  const setInputValue = (e) => {
    if (e.target.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setNewComment(e.target.value)
  }

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="relative flex items-center">
        <Input
          className="focus-visible:ring-transparent h-[62px] w-full px-4 py-3 bg-[#17181C] rounded-2xl placeholder:text-[15px] placeholder:text-[var(--common-white-four)] pr-[120px]"
          placeholder="Please enter a comment"
          value={newComment}
          onChange={(e) => setInputValue(e)}
        />

        <Button
          className="absolute right-4 bg-primary w-[100px] h-[38px] rounded-[100px] flex justify-center items-center text-black text-sm font-bold cursor-pointer"
          onClick={throttledClick}
          disabled={isDisabled}
        >Post</Button>
      </div>
      {
        comments && (
          <div className="flex flex-col gap-[23px]">
            {
              comments.list && comments.list.map(item => <div key={item.id} className="w-full rounded-2xl border border-[var(--common-white-one)] bg-[#17181C] p-[30px]">
                <CommentSection
                  api={{
                    like: "/api/front/like/repositories/comment",
                    unlike: "/api/front/unlike/repositories/comment",
                    detail: "/api/front/get/repositories/comment",
                    list: "/api/front/get/repositories/comment_list",
                    create: "/api/front/create/repositories/comment"
                  }}
                  params={{
                    repo_id: Number(id)
                  }}
                  comment={item}
                />
              </div>)
            }
          </div>
        )
      }
      <PaginationWithBtns
        totalCount={comments.count}
        pageChange={getList}
        pageSize={10}
      />
    </div>
  )
};

export default CommunityCard;