"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import "./components/index.scss"


import { Input } from "@/components/ui/input";
import { memo, use, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";
import { useUser } from "@/stores";
import AgentList from "@/components/list-card/agent";
import TopList from "./components/top-list";
import { getTags } from "./request";
import { addToast } from "@heroui/react";
import CommonChild from "./components/common-child";
import { cn } from "@/utils";

const AgentHub = () => {

  const { authLoginStatus } = useUser();
  const router = useRouter();

  const [selectType, setSelectType] = useState("trending_7d");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [agentTagList, setAgentTagList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("")


  const getTagsMethod = async () => {
    const res = await getTags();
    if (res.code == 0) {
      setAgentTagList(res.data)
    } else {
      addToast({ title: "Get agent list failed" });
    }
  }

  const handleTagClick = (value: number) => {
    setSelectedTags(prev =>
      prev.includes(value)
        ? prev.filter(id => id !== value)
        : [...prev, value]
    );
  };



  const jumpToCreate = () => {
    const loginStatus = authLoginStatus();
    if (loginStatus) {
      router.push("/agenthub/create")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = inputRef.current?.value;
      setSearchValue(inputValue || "");
    }
  };

  useEffect(() => {
    getTagsMethod()
  }, [])

  const requestParams = useMemo(() => {
    return {
      page_size: 15,
      order_by: selectType,
      tags: selectedTags,
      name: searchValue
    }
  }, [selectType, selectedTags, searchValue])


  return (
    <div className="w-full pt-[84px] lg:pt-[165px]">

      <TopList />

      <div className="px-5 md:px-[130px] border-b border-[var(--common-white-two)] flex gap-[30px]">

        <div className="hidden w-[344px] flex-shrink-0 border-r border-[var(--common-white-two)] pt-[50px] md:flex flex-col gap-4">
          <div className="pb-[30px] border-b border-[var(--common-white-two)] text-[26px] font-bold">
            Tag
          </div>
          {
            agentTagList.map(item => <CommonChild key={item.value}>
              <span className="text-[var(--common-white-six)] text-[15px]">{item.label}</span>
              <div className="flex flex-wrap gap-[10px]">
                {
                  item.children.map((tag, index) =>
                    <span
                      key={index}
                      onClick={() => handleTagClick(tag.value)}
                      className={
                        cn(
                          "cursor-pointer hover:text-white hover:bg-[linear-gradient(354deg,rgba(32,197,222,0.20)_4.24%,rgba(255,255,255,0.05)_95.44%)] px-3 py-[5px] rounded-[15px] border border-solid text-sm transition-colors duration-300 border-[rgba(255,255,255,0.15)] text-[var(--common-white-six)]",
                          selectedTags.includes(tag.value) && "bg-[linear-gradient(354deg,rgba(32,197,222,0.20)_4.24%,rgba(255,255,255,0.05)_95.44%)] text-primary"
                        )
                      }
                    >
                      {tag.label}
                    </span>
                  )
                }
              </div>
            </CommonChild>)
          }
        </div>

        <div className="flex-1 pt-[50px] flex flex-col gap-5 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-[372fr_278fr_188fr] gap-4 min-w-0">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                placeholder="Search agent name"
                className="w-full min-w-0 focus-visible:ring-transparent rounded-[100px] bg-black pl-[50px] h-11 placeholder:text-[var(--common-white-four)] placeholder:text-[15px]"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={e => { e.target.value == "" && setSearchValue(e.target.value) }}
              />
              <img
                width={20}
                height={20}
                src="/agentHub/search.svg"
                alt="search"
                className="absolute left-4"
              />
            </div>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setSelectType(value)}>
                <SelectTrigger className="data-[state=open]:border-white focus:ring-0 focus:ring-offset-0 w-full min-w-0  h-9 lg:h-11 text-[var(--common-white-eight)] rounded-[100px] px-5 border-[var(--common-white-two)]">
                  <SelectValue placeholder="Sort: Trending" />
                </SelectTrigger>
                <SelectContent className="!w-[90%] left-[5%] mt-[6px] pt-1 !rounded-xl" align="center">
                  <SelectGroup className="gap-4 pl-[6px] pr-4 lg:pr-8 text-[var(--common-white-six)]">
                    <SelectItem className="pr-4 lg:pr-8" value="most_download">Sort: Most Download</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="recently_create">Sort: Recently Create</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="new_likes">Sort: New Like</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="most_likes">Sort: Most Likes</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="most_replies">Sort: Most Replies</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="new_replies">Sort: New Reply</SelectItem>
                    <SelectItem className="pr-4 lg:pr-8" value="trending_7d">Sort: Trending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button className="flex w-[118px] h-9 min-w-[118px] lg:w-full lg:min-w-0 lg:h-11 text-[13px] lg:text-sm font-bold" onClick={jumpToCreate}>+ New Agent</Button>
            </div>
          </div>
          <AgentList
            api={
              {
                list: "/api/front/get/repositories/ranklist",
                detail: "/api/front/get/repositories",
                like: "/api/front/like/repositories",
                unlike: "/api/front/unlike/repositories"
              }
            }
            params={requestParams}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(AgentHub);