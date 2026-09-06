"use client";
import { request } from "@/utils";
import RequestCard from "./cards/request-card";
import { PaginationWithBtns } from "@/components/common/pagination";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { IRequestCard } from "@/types/request-types";
import { useRouter } from "next/navigation";


type ParamsType = {
  page_size?: number;
  [propName: string]: any;
}

interface IRequestResponse {
  count: number
  list: IRequestCard[]
}

interface IPros {
  api: string
  params?: ParamsType,
  autoSelect?: (id: number, index: number) => void
  ondoubleClick?: () => void
  selectedIdx?: number
  onChange?: (data: IRequestResponse) => void
}
const RequestsList = ({ api, params, autoSelect, selectedIdx, onChange }: IPros, ref) => {

  useImperativeHandle(
    ref,
    () => ({
      getList: () => fetchData()
    })
  )

  const [requestList, setRequestList] = useState<IRequestResponse>({ count: 0, list: [] });
  const fetchData = async (page: number = 1) => {
    const res = await request.post(api, {
      ...params,
      cur_page: page,
      page_size: params?.page_size || 10
    });
    if (res.code == 0) {
      autoSelect && autoSelect(res.data.list[0].id, 0)
      setRequestList(res.data)
      onChange?.(res.data)
    }
  }

  const router = useRouter();

  const getList = async (page: number = 1) => {
    await fetchData(page);
  }

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {
        requestList?.list?.map((item, index) => <RequestCard
          key={item.id}
          content={item}
          isSelected={index === selectedIdx}
          onClick={() => autoSelect && autoSelect(item.id, index)}
          ondoubleClick={() => router.push(`/requests/${item.id}`)}
        />)
      }
      <PaginationWithBtns
        totalCount={requestList.count}
        pageChange={getList}
        pageSize={params?.page_size || 10}
      />
    </div>
  )
}

export default forwardRef(RequestsList);