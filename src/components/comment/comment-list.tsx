"use client";

import { useEffect, useState } from "react";
import { CommentType1 } from "@/types/agent-types";
import { PaginationWithBtns } from "@/components/common/pagination";
import { request } from "@/utils";
import CommentSection from "./comment-section";

interface ICommentList {
  count: number;
  list: CommentType1[];
}
type ParamsType = {
  page_size?: number;
  [propName: string]: any;
}
interface IProps {
  api: string;
  params?: ParamsType;
  onChange?: (data: ICommentList) => void
}
const CommentList = ({ api, params, onChange }: IProps) => {

  const [comments, setComments] = useState<ICommentList>({ count: 0, list: [] });
  const fetchData = async (page: number = 1) => {
    const res = await request.post(api, {
      ...params,
      cur_page: page,
      page_size: params?.page_size || 10
    });
    if (res.code == 0) {
      setComments(res.data)
      onChange?.(res.data)
    }
  }

  const getList = async (page: number = 1) => {
    await fetchData(page);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-[23px]">
      {comments && comments.list?.map((item, index) => <div key={index} className="w-full rounded-2xl border border-[var(--common-white-one)] bg-[#17181C] p-[30px]">
        <CommentSection
          type="display"
          comment={item}
        />
      </div>)}
      <PaginationWithBtns
        totalCount={comments.count}
        pageChange={getList}
        pageSize={10}
      />
    </div>
  )
};

export default CommentList;