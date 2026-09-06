"use client"
import { useEffect, useState } from "react";
import ListCard from "./list-card"
// import Link from "next/link";
import { getGroupList } from "../request";
import { IRequestCard } from "@/types/request-types";
import useSSE, { EventType } from "@/hooks/useSse";
import LoadingComp from "./loading-comp";

const TopList = () => {

  const [recentlyCreated, setRecentlyCreated] = useState<IRequestCard[] | any>([null, null, null, null, null]);
  const [newReplies, setNewReplies] = useState<IRequestCard[] | any>([null, null, null, null, null]);
  const [trending, setTrending] = useState<IRequestCard[] | any>([null, null, null, null, null]);
  // const [loading, setLoading] = useState<boolean>(true);

  const { new_request, new_request_reply, identifier } = useSSE();

  const getTopList = async () => {
    const res = await getGroupList();
    if (res.code == 0) {
      const {
        recently_create,
        new_replies,
        trending
      } = res.data;

      setRecentlyCreated(recently_create)
      setNewReplies(new_replies)
      setTrending(trending)
      // setLoading(false)
    }
  }

  useEffect(() => {
    getTopList();
  }, [])

  useEffect(() => {
    if (identifier == EventType.REQUEST) {
      if (new_request) {
        const len = recentlyCreated.length || 0;
        if (len < 5) {
          setRecentlyCreated([new_request!, ...recentlyCreated]);
        } else {
          setRecentlyCreated([new_request!, ...recentlyCreated.slice(0, -1)]);
        }
      }
    } else {
      if (new_request_reply) {
        const len = newReplies.length || 0;
        if (len < 5) {
          setNewReplies([new_request_reply!, ...newReplies]);
        } else {
          setNewReplies([new_request_reply!, ...newReplies.slice(0, -1)]);
        }
      }
    }
  }, [new_request, new_request_reply])

  return (
    <div className="flex gap-5 flex-col px-5 md:flex-row md:px-[130px] pb-[50px] border-b border-[var(--common-white-two)]">
      <div className="flex-1 flex flex-col bg-[#202328] rounded-2xl overflow-hidden">
        <div className="w-full h-[57px] bg-[#1A1C20] flex justify-start items-center pl-3">
          <div className="flex items-center gap-2">
            <span>✏️ </span>
            <span className="font-bold common-title">New Requests</span>
          </div>
        </div>
        <div className="flex flex-col">
          {/* {
            loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <LoadingComp key={index} />
              ))
            ) : (
              recentlyCreated?.map(item =>
                <ListCard key={item.id} content={item} />
              )
            )
          } */}
          {
            recentlyCreated?.map((item, index) =>
              <ListCard key={index} content={item} />
            )
          }
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-[#202328] rounded-2xl overflow-hidden">
        <div className="w-full h-[57px] bg-[#1A1C20] flex justify-start items-center pl-3">
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span className="font-bold common-title">New Replies</span>
          </div>
        </div>
        <div className="flex flex-col h-fit">
          {/* {
            loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <LoadingComp key={index} />
              ))
            ) : (
              newReplies?.map(item =>
                <ListCard key={item.id} content={item} />
              )
            )
          } */}
          {
            newReplies?.map((item, index) =>
              <ListCard key={index} content={item} />
            )
          }
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-[#202328] rounded-2xl overflow-hidden">
        <div className="w-full h-[57px] bg-[#1A1C20] flex justify-start items-center pl-3">
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span className="font-bold common-title">Trending Requests</span>
          </div>
        </div>
        <div className="flex flex-col">
          {/* {
            loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <LoadingComp key={index} />
              ))
            ) : (
              trending?.map(item =>
                <ListCard key={item.id} content={item} />
              )
            )
          } */}
          {
            trending?.map((item, index) =>
              <ListCard key={index} content={item} />
            )
          }
        </div>
      </div>
    </div>
  )
};

export default TopList;