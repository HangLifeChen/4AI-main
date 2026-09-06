"use client"
import Link from "next/link";
import TopTitle from "./top-title"
import ListCard from "./list-card"
import { getGroupList } from "../request";
import { IAgentCard } from "@/types/agent-types";
import useSSE, { EventType } from "@/hooks/useSse";
import { useEffect, useState } from "react";
import "./index.scss"
// import { Skeleton } from "@/components/ui/skeleton";

const TopList = () => {

  const { new_repository, new_repository_download, identifier } = useSSE();

  const [recentlyCreated, setRecentlyCreated] = useState<IAgentCard[] | any>([null, null, null, null, null]);
  const [newDownload, setNewDownload] = useState<IAgentCard[] | any>([null, null, null, null, null]);
  const [trending, setTrending] = useState<IAgentCard[] | any>([null, null, null, null, null]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [colorList, setColorList] = useState<any>()

  const getTopList = async () => {
    const res = await getGroupList();
    if (res.code == 0) {
      const {
        recently_create,
        new_download,
        trending
      } = res.data;

      setRecentlyCreated(recently_create)
      setNewDownload(new_download)
      setTrending(trending)
    }
  }

  useEffect(() => {
    // getColors()
    getTopList()
  }, [])

  useEffect(() => {
    if (identifier == EventType.REPOSITORY) {
      if (new_repository) {
        const len = recentlyCreated.length || 0;
        if (len < 5) {
          setRecentlyCreated([new_repository!, ...recentlyCreated]);
        } else {
          setRecentlyCreated([new_repository!, ...recentlyCreated.slice(0, -1)]);
        }
      }
    } else {
      if (new_repository_download) {
        const len = newDownload.length || 0;
        if (len < 5) {
          setNewDownload([new_repository_download!, ...newDownload]);
        } else {
          setNewDownload([new_repository_download!, ...newDownload.slice(0, -1)]);
        }
      }
    }
  }, [new_repository, new_repository_download])


  return (
    <div className="flex gap-5 flex-col px-5 md:flex-row md:px-[130px] pb-[52px] border-b border-[var(--common-white-two)]">
      <div className="flex-1 flex flex-col">
        <TopTitle type="agent">
          <div className="flex items-center gap-1">
            <span>🔔 </span>
            <span className="text-lg font-bold agent-title">New Agents</span>
          </div>
        </TopTitle>
        <div className={`flex flex-col gap-4 -mt-5`}>
          {
            recentlyCreated?.map((item, index) =>
              <Link key={index} href={`/agenthub/${item?.id}`}>
                <ListCard type="one" content={item} />
              </Link>)
          }
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <TopTitle type="download">
          <div className="flex items-center gap-1">
            <span>⬇️ </span>
            <span className="text-lg font-bold download-title">New Downloads</span>
          </div>
        </TopTitle>
        <div className={`flex flex-col gap-4 -mt-5`}>
          {
            newDownload?.map((item, index) =>
              <Link key={index} href={`/agenthub/${item?.id}`}>
                <ListCard type="two" content={item} />
              </Link>)
          }
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <TopTitle type="trending">
          <div className="flex items-center gap-1">
            <span>🔥 </span>
            <span className="text-lg font-bold trending-title">Trending Agents</span>
          </div>
        </TopTitle>
        <div className={`flex flex-col gap-4 -mt-5`}>
          {
            trending?.map((item, index) =>
              <Link key={index} href={`/agenthub/${item?.id}`}>
                <ListCard type="three" content={item} />
              </Link>)
          }
        </div>
      </div>
    </div>
  )
};

export default TopList;