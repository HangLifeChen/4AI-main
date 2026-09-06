"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import FormDialog from "./components/form-dialog";
import { use, useEffect, useRef, useState } from "react";
import { useUser } from "@/stores";
import RankList from "./components/rank-list";
import TopList from "./components/top-list";
import { useWindow } from "@/hooks";

const RequestPage = () => {

  const { authLoginStatus } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const [selectFilter, setSelectFilter] = useState("trending_7d");

  const { searchParams } = useWindow();
  const autoCreate = searchParams.get('create');

  const getAllList = async () => {
    // await (listRef.current as any).getList();
  }

  const openDialog = () => {
    const loginStatus = authLoginStatus();

    if (loginStatus) {
      setIsOpen(true);
    }
  }

  const selectValueChange = async (value: string) => {
    setSelectFilter(value);
  }

  // useEffect(() => {
  //   if (autoCreate) {
  //     openDialog();
  //   }
  // }, [autoCreate])

  return (
    <div className="w-full pt-[84px] lg:pt-[165px]">

      <TopList />

      <div className="px-5 md:px-[130px] py-[50px] border-b border-[var(--common-white-two)]">
        <div className="flex flex-col gap-4 lg:gap-[30px]">
          <div className="flex justify-between gap-5 items-center w-full">
            <div className="flex flex-col gap-3 lg:gap-0 items-start md:flex-row flex-1 justify-between md:items-center">
              <span className="text-[26px] font-bold">All Requests</span>
              <div className="flex gap-4 lg:gap-5">
                <Select onValueChange={(value) => selectValueChange(value)}>
                  <SelectTrigger className="data-[state=open]:border-white focus:ring-0 focus:ring-offset-0 w-[200px] h-9 lg:w-[298px] lg:h-11 rounded-[100px] px-5 text-[var(--common-white-eight)] border-[var(--common-white-two)]">
                    <SelectValue placeholder="Sort: Trending" />
                  </SelectTrigger>
                  <SelectContent className="!w-[90%] left-[5%] mt-[6px] pt-1 !rounded-xl">
                    <SelectGroup className="gap-4 pl-[6px] pr-[6px] lg:pr-[38px] text-[var(--common-white-six)]">
                      <SelectItem value="most_replies">Sort: Most Replies</SelectItem>
                      <SelectItem value="new_replies">Sort: New Replies</SelectItem>
                      <SelectItem value="most_likes">Sort: Most Likes</SelectItem>
                      <SelectItem value="new_likes">Sort: New Likes</SelectItem>
                      <SelectItem value="most_solved">Sort: Most Solved</SelectItem>
                      <SelectItem value="recently_solved">Sort: Recently Solved</SelectItem>
                      <SelectItem value="recently_create">Sort: Recently Create</SelectItem>
                      <SelectItem value="trending_7d">Sort: Trending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="w-[118px] h-9 lg:w-[168px] lg:h-11 bg-primary group rounded-[100px] overflow-hidden cursor-pointer flex justify-center items-center text-[13px] lg:text-sm font-bold text-[#000]"
                  onClick={openDialog}
                >
                  <div className='duration-300 flex flex-col h-full group-hover:translate-y-[-100%]'>
                    <div className='h-full flex-shrink-0 flex items-center '>
                      + New Request
                    </div>
                    <div className='h-full flex-shrink-0 flex items-center'>+ New Request</div>
                  </div>
                </div>

                <FormDialog getNewList={getAllList} isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
            <div className="w-[404px] shrink-0 hidden md:block"></div>
          </div>
          <RankList selectFilter={selectFilter} />
        </div>
      </div>
    </div>
  )
}

export default RequestPage