"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Dot } from "lucide-react";
import { Img as Avatar } from "@/components/common";
import ResolveCard from "./resolve-card";
import ResolveDialog from "./resolve-dialog";
import { useEffect, useState } from "react";
import { CommentType1 } from "@/types/agent-types";
import CommentSection from "@/components/comment/comment-section";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getRequestDetail, getResolveList, likeRequest, unlikeRequest } from "../request";
import { formatTimeAgo } from "@/utils";
import { createRequestComments, getRequestComments } from "../request";
import { addToast } from "@heroui/react";
import { IResolveCard } from "@/types/request-types";
import { RichTextView } from '@/components/common'
import { useUser } from "@/stores";
import { PaginationWithBtns } from "@/components/common/pagination";
import { useThrottleFn } from "ahooks";
import "../components/index.css"
import { Button } from "@/components/ui/button";


interface IResolveResponse {
  count: number
  list: IResolveCard[]
}

interface ICommentList {
  count: number;
  list: CommentType1[];
}


const RequestDetail = () => {

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [comments, setComments] = useState<ICommentList>({ count: 0, list: [] });
  const [newComment, setNewComment] = useState('');
  const [requestDetail, setRequestDetail] = useState<any>()
  const [resolveList, setResolveList] = useState<IResolveResponse>({ count: 0, list: [] });
  const { authLoginStatus } = useUser();

  const getDetail = async () => {
    const res = await getRequestDetail({ request_id: Number(id) });
    if (res.code == 0) {
      setRequestDetail({ ...res.data })
    }
  }

  const getResolves = async (page: number = 1) => {
    const res = await getResolveList({
      cur_page: page,
      page_size: 10,
      request_id: Number(id)
    });
    if (res.code == 0) {
      setResolveList(res.data)
    }
  };

  const getComments = async (page: number = 1) => {
    const res = await getRequestComments({
      cur_page: page,
      page_size: 10,
      request_id: Number(id)
    });
    if (res.code == 0) {
      setComments(res.data)
    }
  }

  const getList = async (page: number = 1) => {
    await getComments(page);
  }

  const likeAgent = async (id: number, flag: boolean) => {
    const loginStatus = authLoginStatus();
    if (loginStatus) {
      const requestMethod = flag ? unlikeRequest : likeRequest
      const res = await requestMethod({
        request_id: id
      });
      if (res.code == 0) {
        getDetail();
      } else {
        addToast({ title: `${flag ? "Unstar" : "Star"} agent failed` });
      }
    }

  }

  useEffect(() => {
    getDetail();
    getComments();
    getResolves();
  }, []);

  const openDialog = () => {
    const loginStatus = authLoginStatus();
    if (loginStatus) {
      setIsOpen(true);
    }
  }

  const handleSubmit = async () => {
    const loginStatus = authLoginStatus();

    if (loginStatus) {
      if (newComment.trim()) {
        const commentInfo = {
          request_id: Number(id),
          content: newComment,
          parent_id: null,
          root_parent_id: null
        }
        const res = await createRequestComments(commentInfo);
        if (res.code == 0) {
          addToast({ title: "create comment successfully", color: "success" });
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
    <div className="w-full pt-36 pb-[80px] border-b border-[var(--common-white-two)]">
      <div
        className="px-5 md:px-[130px] py-[19px] flex gap-3 items-center border border-solid border-x-transparent border-y-[var(--common-white-two)]"
        onClick={() => router.back()}
      >
        <img
          width={20}
          height={20}
          src="/requestsPage/back.svg"
          alt="back"
        />
        {/* <Link href="/requests"> */}
        <span className="text-[17px] text-[var(--common-white-six)] cursor-pointer">Back</span>
        {/* </Link> */}

      </div>

      <div className="px-5 md:px-[130px] pt-[50px] flex flex-col md:flex-row gap-[30px] justify-between">

        <div className="flex flex-col gap-5 flex-1">
          <div className="flex gap-5 items-center justify-start pb-5 border-b border-dashed border-[var(--common-white-two)]">
            <Link href={`/profile/${requestDetail?.create_by}`}>
              <div className="flex items-center gap-[10px]">
                <Avatar
                  width={40}
                  height={40}
                  src={requestDetail?.user_photo}
                  alt="avatar"
                  className="rounded-full overflow-hidden"
                />
                <span>{requestDetail?.username}</span>
              </div>
            </Link>

            <div className="cursor-pointer flex gap-2 ml-5 px-3 py-[5px] rounded-[60px] bg-[rgba(255,255,255,0.14)]" onClick={() => likeAgent(requestDetail.id, requestDetail.is_like)}>
              <img
                width={18}
                height={18}
                src={`/agentHub/${requestDetail?.is_like ? "star-active" : "star-default"}.svg`}
                alt="star"
              />
              <span className="text-[var(--common-white-seven)] pt-[2px]">{requestDetail?.likes_count}</span>
            </div>

          </div>

          <span className="font-bold text-2xl">{requestDetail?.title}</span>

          {
            requestDetail?.is_mobile ?
              <div className="w-full">
                {requestDetail?.content}
              </div>
              :
              <div className="editor-class">
                <RichTextView value={requestDetail?.content} />
              </div>
          }

          <div className="flex">
            <span className="text-[var(--common-white-six)] text-sm">{formatTimeAgo(requestDetail?.created_at)}</span>
            <div className="w-[23px] h-5 flex justify-between items-center">
              <Dot className="text-[var(--common-white-six)]" />
            </div>
            <div className="flex gap-[6px]">
              <img
                width={16}
                height={16}
                src="/requestsPage/comment-card.svg"
                alt="comment-card"
              />
              <span className="text-[var(--common-white-six)] text-sm pt-[2px]">{requestDetail?.comment_count}</span>
            </div>
            <div className="w-[23px] h-5 flex justify-between items-center">
              <Dot className="text-[var(--common-white-six)]" />
            </div>
            <div className="flex gap-[6px]">
              <img
                width={16}
                height={16}
                src={`/requestsPage/${requestDetail?.is_like ? "star-active" : "star-card"}.svg`}
                alt="star-card"
              />
              <span className="text-[var(--common-white-six)] text-sm pt-[2px]">{requestDetail?.likes_count}</span>
            </div>
            <div className="w-[23px] h-5 flex justify-between items-center">
              <Dot className="text-[var(--common-white-six)]" />
            </div>
            <div className="flex gap-[6px]">
              <img
                width={16}
                height={16}
                src="/requestsPage/bot-card.svg"
                alt="bot-card"
              />
              <span className="text-[var(--common-white-six)] text-sm pt-[2px]">{requestDetail?.resolve_count}</span>
            </div>
          </div>

          <div className="relative flex items-center">
            <Input
              className="focus-visible:ring-transparent h-[62px] w-full px-4 py-3 bg-[#17181C] rounded-2xl placeholder:text-[15px] placeholder:text-[var(--common-white-four)] pr-[120px]" placeholder="Please enter a comment"
              value={newComment}
              onChange={(e) => setInputValue(e)}
            />
            <Button
              className="absolute right-4 bg-primary w-[100px] h-[38px] rounded-[100px] flex justify-center items-center text-black text-sm font-bold cursor-pointer"
              onClick={throttledClick}
              disabled={isDisabled}
            >Post</Button>

          </div>

          <div className="mt-[10px] flex flex-col gap-[14px]">
            <span className="text-[var(--common-white-six)]">Comments</span>

            {
              comments && (
                <div className="flex flex-col w-full rounded-2xl border border-[var(--common-white-one)] bg-[#17181C] pb-[30px] px-5">
                  {
                    comments.list && comments.list.map(item =>
                      <CommentSection
                        key={item.id}
                        api={{
                          like: "/api/front/like/request/comment",
                          unlike: "/api/front/unlike/request/comment",
                          detail: "/api/front/get/request/comment",
                          list: "/api/front/get/request/comment_list",
                          create: "/api/front/create/request/comment"
                        }}
                        params={{
                          request_id: Number(id)
                        }}
                        comment={item}
                        className="request-comment border-b border-[var(--common-white-two)] py-[30px]"
                      />
                    )
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
        </div>

        <div className="flex flex-col gap-[14px] w-[404px]">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Resolve Leaderboard</span>
            <div className="hidden bg-primary w-[100px] h-[38px] rounded-[100px] group overflow-hidden md:flex justify-center items-center text-black text-sm font-bold cursor-pointer"
              onClick={openDialog}
            >
              <div className='duration-300 flex flex-col h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex-shrink-0 flex items-center '>
                  + Resolve
                </div>
                <div className='h-full flex-shrink-0 flex items-center'> + Resolve</div>
              </div>
            </div>
            <ResolveDialog requestMethod={getResolves} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div className="flex flex-col gap-[14px]">
            {
              resolveList.list?.map(item =>

                <ResolveCard key={item.id} content={item} />

              )
            }
            <PaginationWithBtns
              totalCount={resolveList.count}
              pageChange={getResolves}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default RequestDetail;